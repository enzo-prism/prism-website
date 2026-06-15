'use client'

import { track as trackVercel } from '@vercel/analytics'

import {
  GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
  IS_ANALYTICS_ENABLED,
} from '@/lib/constants'
import { getAttributionContext } from '@/lib/marketing-attribution'
import { buildVercelCustomEvent } from '@/lib/vercel-analytics'
import {
  addBreadcrumb,
  captureErrorWithContext,
  isSentryInitialized,
} from './sentry-helpers'

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    rewardful?: (...args: any[]) => void
    __PRISM_LAST_PAGEVIEW?: {
      path: string
      timestamp: number
    }
  }
}

type AttributionEventContext = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  landing_path?: string
  first_touch_source?: string
  first_touch_medium?: string
  first_touch_campaign?: string
}

export type LeadConversionContext = {
  form_name?: string
  form_location?: string
  lead_type?: string
  lead_source?: string
  value?: number
  currency?: string
  service_count?: number
  primary_goal?: string
  has_website?: string
  budget?: string
  timeline?: string
  elapsed_seconds?: number
}

type FormSubmissionOptions = Omit<
  LeadConversionContext,
  'form_name' | 'form_location'
> & {
  conversionMode?: 'pending' | 'immediate' | 'none'
  sendGoogleAdsConversion?: boolean
}

type LeadTrackingOptions = {
  sendGoogleAdsConversion?: boolean
}

type PageViewOptions = {
  previousPath?: string | null
  previousUrl?: string | null
}

const PENDING_LEAD_CONTEXT_STORAGE_KEY = 'prism_pending_lead_context_v1'
const PENDING_LEAD_CONTEXT_TTL_MS = 30 * 60 * 1000
const SAFE_MARKETING_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const
const FORBIDDEN_ANALYTICS_PARAM_KEYS = new Set([
  'additional_context',
  'email',
  'email_address',
  'email_hash',
  'error_message',
  'event_time',
  'fbclid',
  'first_name',
  'first_touch_at',
  'full_name',
  'gclid',
  'href',
  'last_name',
  'message',
  'mobile',
  'msclkid',
  'name',
  'notes',
  'phone',
  'project',
  'project_description',
  'referrer',
  'review_link',
  'tel',
  'timestamp',
  'url',
  'website',
])
const RAW_URL_PARAM_KEYS = new Set([
  'destination_url',
  'link_url',
  'previous_url',
  'source_url',
])
const SAFE_URL_PARAM_KEYS = new Set(['page_location', 'page_referrer'])

function getGtag() {
  if (typeof window === 'undefined') return null

  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: any[]) => {
      window.dataLayer?.push(args)
    }
  }

  return window.gtag
}

function compactAnalyticsParams(params: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  )
}

function getSafeSearchParams(searchParams: URLSearchParams) {
  const safeParams = new URLSearchParams()

  for (const key of SAFE_MARKETING_PARAM_KEYS) {
    const value = searchParams.get(key)
    if (value) safeParams.set(key, value)
  }

  return safeParams
}

function getSafeAnalyticsUrl(url: string, base?: string) {
  try {
    const parsed = new URL(url, base)
    parsed.search = getSafeSearchParams(parsed.searchParams).toString()
    parsed.hash = ''
    return parsed.toString()
  } catch {
    const [pathWithoutHash] = url.split('#')
    const [basePath, rawSearch = ''] = pathWithoutHash.split('?')
    const safeParams = getSafeSearchParams(new URLSearchParams(rawSearch))
    const safeSearch = safeParams.toString()
    return safeSearch ? `${basePath}?${safeSearch}` : basePath
  }
}

function getSafePageLocation() {
  if (typeof window === 'undefined') return undefined
  return getSafeAnalyticsUrl(window.location.href)
}

function sanitizePathValue(value: string) {
  try {
    const parsed = new URL(value, window.location.origin)
    const safeSearch = getSafeSearchParams(parsed.searchParams).toString()
    return `${parsed.pathname}${safeSearch ? `?${safeSearch}` : ''}`
  } catch {
    const [pathWithoutHash] = value.split('#')
    const [basePath, rawSearch = ''] = pathWithoutHash.split('?')
    const safeSearch = getSafeSearchParams(
      new URLSearchParams(rawSearch),
    ).toString()
    return safeSearch ? `${basePath}?${safeSearch}` : basePath
  }
}

function looksLikeEmail(value: string) {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(value)
}

function looksLikePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && /(?:\+?\d[\d\s().-]{8,}\d)/.test(value)
}

function sanitizeDestinationValue(value: string) {
  if (value.startsWith('/')) return sanitizePathValue(value)

  try {
    const parsed = new URL(value)
    return parsed.hostname
  } catch {
    return value
  }
}

function sanitizeAnalyticsParamValue(key: string, value: unknown) {
  const lowerKey = key.toLowerCase()

  if (
    FORBIDDEN_ANALYTICS_PARAM_KEYS.has(lowerKey) ||
    RAW_URL_PARAM_KEYS.has(lowerKey)
  ) {
    return undefined
  }

  if (value === undefined || value === null || value === '') return undefined

  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value === 'boolean') return value

  if (typeof value !== 'string') return undefined

  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (looksLikeEmail(trimmed) || looksLikePhone(trimmed)) return undefined

  if (SAFE_URL_PARAM_KEYS.has(lowerKey)) {
    return getSafeAnalyticsUrl(trimmed)
  }

  if (lowerKey === 'page_path' || lowerKey === 'destination') {
    return sanitizeDestinationValue(trimmed)
  }

  if (/^https?:\/\//i.test(trimmed)) return undefined

  if (trimmed.length > 160) return undefined

  return trimmed
}

function sanitizeAnalyticsParams(params: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(params)
      .map(([key, value]) => [key, sanitizeAnalyticsParamValue(key, value)])
      .filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}

function getAnalyticsAttributionContext(): AttributionEventContext {
  const attribution = getAttributionContext()

  return compactAnalyticsParams({
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    landing_path: attribution.landing_path,
    first_touch_source: attribution.first_touch_source,
    first_touch_medium: attribution.first_touch_medium,
    first_touch_campaign: attribution.first_touch_campaign,
  })
}

function getExternalDestinationContext(url: string) {
  try {
    const parsed = new URL(url)
    return compactAnalyticsParams({
      destination_host: parsed.hostname,
    })
  } catch {
    return compactAnalyticsParams({
      destination_host: undefined,
    })
  }
}

function isExternalHttpUrl(url: string) {
  if (typeof window === 'undefined') return /^https?:\/\//i.test(url)

  try {
    const parsed = new URL(url, window.location.origin)
    return parsed.protocol.startsWith('http') && parsed.origin !== window.location.origin
  } catch {
    return false
  }
}

function isBookingUrl(url: string) {
  try {
    const parsed = new URL(
      url,
      typeof window !== 'undefined' ? window.location.origin : undefined,
    )
    return /(^|\.)calendar\.notion\.so$|(^|\.)calendly\.com$/.test(
      parsed.hostname,
    )
  } catch {
    return false
  }
}

function hasBookingIntent(value: string) {
  return /\b(book|booking|call|demo|kickoff|meeting|schedule)\b/i.test(value)
}

// Custom event types
export type EventType =
  | 'page_view'
  | 'form_submit_success'
  | 'apply_form_view'
  | 'apply_form_start'
  | 'apply_question_view'
  | 'apply_question_complete'
  | 'apply_question_skip'
  | 'apply_review_view'
  | 'apply_validation_error'
  | 'apply_step_1_complete'
  | 'apply_step_2_complete'
  | 'apply_submit_attempt'
  | 'apply_submit'
  | 'apply_submit_success'
  | 'apply_success'
  | 'apply_error'
  | 'apply_abandon_step_1'
  | 'apply_abandon_step_2'
  | 'apply_budget_selected'
  | 'apply_service_selected'
  | 'website_build_estimator_start'
  | 'website_build_estimate_update'
  | 'website_build_validation_error'
  | 'website_build_submit_attempt'
  | 'website_build_submit_success'
  | 'website_build_submit_error'
  | 'contact_request'
  | 'service_view'
  | 'cta_click'
  | 'navigation'
  | 'industry_tab_select'
  | 'case_study_link_click'
  | 'client_showcase_interaction'
  | 'benefits_slideshow_interaction'
  | 'service_card_click'
  | 'search_params_change'
  | 'page_engagement'
  | 'file_download'
  | 'external_link_click'
  | 'book_call_click'
  | 'contact_action_click'
  | 'video_interaction'
  | 'error'
  | 'scroll_milestone'
  | 'user_preference'
  | 'skool_email_submission'
  | 'generate_lead'

function canUseSessionStorage() {
  return typeof window !== 'undefined' && 'sessionStorage' in window
}

function readStoredLeadContext():
  | (LeadConversionContext & {
      savedAt: number
    })
  | null {
  if (!canUseSessionStorage()) return null

  try {
    const raw = window.sessionStorage.getItem(PENDING_LEAD_CONTEXT_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as LeadConversionContext & {
      savedAt?: number
    }
    if (
      !parsed.savedAt ||
      Date.now() - parsed.savedAt > PENDING_LEAD_CONTEXT_TTL_MS
    ) {
      window.sessionStorage.removeItem(PENDING_LEAD_CONTEXT_STORAGE_KEY)
      return null
    }

    return {
      ...parsed,
      savedAt: parsed.savedAt,
    }
  } catch {
    return null
  }
}

export function storePendingLeadConversion(context: LeadConversionContext) {
  if (!canUseSessionStorage()) return

  try {
    window.sessionStorage.setItem(
      PENDING_LEAD_CONTEXT_STORAGE_KEY,
      JSON.stringify({
        ...context,
        savedAt: Date.now(),
      }),
    )
  } catch {
    // no-op
  }
}

export function consumePendingLeadConversion(): LeadConversionContext | null {
  const stored = readStoredLeadContext()
  if (!stored || !canUseSessionStorage()) {
    return stored
  }

  window.sessionStorage.removeItem(PENDING_LEAD_CONTEXT_STORAGE_KEY)
  const { savedAt: _savedAt, ...context } = stored
  return context
}

export const storePendingApplyLeadContext = storePendingLeadConversion
export const consumePendingApplyLeadContext = consumePendingLeadConversion

export function getDefaultLeadSource() {
  const attribution = getAttributionContext()

  return attribution.utm_source || attribution.first_touch_source || undefined
}

function getLeadConversionParams(context: LeadConversionContext) {
  const leadSource = context.lead_source || getDefaultLeadSource()

  return compactAnalyticsParams({
    currency: context.currency || 'USD',
    value: context.value ?? 1,
    ...context,
    lead_type: context.lead_type || context.form_name,
    lead_source: leadSource,
  })
}

export function trackGoogleAdsLeadConversion(
  context: LeadConversionContext = {},
) {
  if (typeof window === 'undefined' || !IS_ANALYTICS_ENABLED) {
    return
  }

  const params = getLeadConversionParams(context)

  try {
    getGtag()?.('event', 'conversion', {
      send_to: GOOGLE_ADS_LEAD_CONVERSION_SEND_TO,
      value: params.value,
      currency: params.currency,
    })
  } catch (error) {
    console.error(
      '[Analytics] Error tracking Google Ads lead conversion:',
      error,
    )
  }
}

export function trackLeadConversion(
  context: LeadConversionContext,
  options: LeadTrackingOptions = {},
) {
  const params = getLeadConversionParams(context)

  trackEvent('generate_lead', params)

  if (options.sendGoogleAdsConversion !== false) {
    trackGoogleAdsLeadConversion(params)
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName The name of the event
 * @param params Additional parameters to send with the event
 */
export function trackEvent(eventName: EventType, params?: Record<string, any>) {
  if (typeof window === 'undefined') {
    return
  }

  const pageTitle = typeof document !== 'undefined' ? document.title : ''
  const pageLocation = getSafePageLocation()

  // Add attribution and page context to all events without adding unique,
  // high-cardinality values that make GA reports harder to use.
  const enhancedParams = sanitizeAnalyticsParams({
    ...getAnalyticsAttributionContext(),
    page_location: pageLocation,
    page_title: pageTitle,
    page_path: window.location.pathname,
    ...params,
  })

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Tracked event: ${eventName}`, {
      ...enhancedParams,
      event_time: new Date().toISOString(),
    })
  }

  const vercelEvent = buildVercelCustomEvent(eventName, enhancedParams)
  if (vercelEvent) {
    try {
      trackVercel(vercelEvent.name, vercelEvent.properties)
    } catch (error) {
      console.error('[Analytics] Error tracking Vercel event:', error)
    }
  }

  if (!IS_ANALYTICS_ENABLED) {
    return
  }

  try {
    getGtag()?.('event', eventName, enhancedParams)
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error)
  }
}

/**
 * Track a page view in Google Analytics
 * @param path The path of the page
 * @param title The title of the page
 */
export function trackPageView(
  path: string,
  title: string,
  options: PageViewOptions = {},
) {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedPath = path || window.location.pathname || '/'
  const now = Date.now()
  const lastPageView = window.__PRISM_LAST_PAGEVIEW
  if (
    lastPageView &&
    lastPageView.path === normalizedPath &&
    now - lastPageView.timestamp < 1000
  ) {
    return
  }

  window.__PRISM_LAST_PAGEVIEW = {
    path: normalizedPath,
    timestamp: now,
  }

  const pageTitle =
    title || (typeof document !== 'undefined' ? document.title : normalizedPath)
  const pageLocation = getSafePageLocation()
  const pageReferrer =
    options.previousUrl ??
    (typeof document !== 'undefined' ? document.referrer : '')

  trackEvent('page_view', {
    page_path: normalizedPath,
    page_title: pageTitle,
    page_referrer: pageReferrer,
    page_location: pageLocation,
    previous_path: options.previousPath,
  })
}

/**
 * Track a CTA button click with enhanced tracking
 * @param ctaText The text of the CTA
 * @param location The location of the CTA on the page
 */
export function trackCTAClick(ctaText: string, location: string) {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: location,
  })

  // Add breadcrumb for user journey tracking
  if (isSentryInitialized()) {
    addBreadcrumb(`CTA clicked: ${ctaText}`, 'user', 'info', {
      ctaText,
      location,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }
}

/**
 * Track a navigation click
 * @param linkText The text of the navigation link
 * @param destination The destination path
 */
export function trackNavigation(linkText: string, destination: string) {
  trackEvent('navigation', {
    link_text: linkText,
    destination: destination,
    navigation_type: 'user_click',
  })
}

/**
 * Track a service card click
 * @param serviceName The name of the service
 * @param destination The destination path
 */
export function trackServiceCardClick(
  serviceName: string,
  destination: string,
) {
  trackEvent('service_card_click', {
    service_name: serviceName,
    destination: destination,
  })
}

/**
 * Track a form submission
 * @param formName The name of the form
 * @param formLocation The location of the form on the site
 */
export function trackFormSubmission(
  formName: string,
  formLocation: string,
  options: FormSubmissionOptions = {},
) {
  const {
    conversionMode = 'pending',
    sendGoogleAdsConversion,
    ...leadContext
  } = options
  const conversionContext: LeadConversionContext = {
    ...leadContext,
    form_name: formName,
    form_location: formLocation,
    lead_type: leadContext.lead_type || formName,
  }

  trackEvent('form_submit_success', {
    form_name: formName,
    form_location: formLocation,
    lead_type: conversionContext.lead_type,
  })

  if (conversionMode === 'immediate') {
    trackLeadConversion(conversionContext, { sendGoogleAdsConversion })
    return
  }

  if (conversionMode === 'pending') {
    storePendingLeadConversion(conversionContext)
  }
}

/**
 * Track client showcase interaction
 * @param interactionType The type of interaction (scroll, click, etc.)
 * @param clientName The name of the client if applicable
 */
export function trackClientShowcaseInteraction(
  interactionType: string,
  clientName?: string,
) {
  trackEvent('client_showcase_interaction', {
    interaction_type: interactionType,
    client_name: clientName || 'not specified',
  })
}

/**
 * Track benefits slideshow interaction
 * @param interactionType The type of interaction (next, prev, indicator click)
 * @param slideName The name or number of the slide
 */
export function trackBenefitsInteraction(
  interactionType: string,
  slideName: string,
) {
  trackEvent('benefits_slideshow_interaction', {
    interaction_type: interactionType,
    slide_name: slideName,
  })
}

/**
 * Track video interactions
 * @param videoId The ID of the video
 * @param action The action performed (play, pause, complete, etc.)
 * @param videoTitle The title of the video if available
 */
export function trackVideoInteraction(
  videoId: string,
  action: string,
  videoTitle?: string,
) {
  trackEvent('video_interaction', {
    video_id: videoId,
    action: action,
    video_title: videoTitle || 'not specified',
  })
}

/**
 * Track external link clicks
 * @param url The URL being navigated to
 * @param linkText The text of the link if available
 */
export function trackExternalLinkClick(url: string, linkText?: string) {
  trackEvent('external_link_click', {
    ...getExternalDestinationContext(url),
    link_text: linkText || 'not specified',
  })
}

export function trackBookCallClick(
  linkText: string,
  location: string,
  url?: string,
) {
  trackEvent('book_call_click', {
    ...getExternalDestinationContext(url || ''),
    link_text: linkText,
    booking_location: location,
  })
}

export function trackContactActionClick(
  contactMethod: 'email' | 'phone',
  location: string,
) {
  trackEvent('contact_action_click', {
    contact_method: contactMethod,
    contact_location: location,
  })
}

export function trackLinkInteraction(
  href: string,
  label: string,
  location: string,
) {
  trackCTAClick(label, location)

  if (href.startsWith('mailto:')) {
    trackContactActionClick('email', location)
    return
  }

  if (href.startsWith('tel:')) {
    trackContactActionClick('phone', location)
    return
  }

  if (isBookingUrl(href) || hasBookingIntent(label) || hasBookingIntent(location)) {
    trackBookCallClick(label, location, href)
  }

  if (isExternalHttpUrl(href)) {
    trackExternalLinkClick(href, label)
  }
}

/**
 * Track file downloads
 * @param fileName The name of the file being downloaded
 * @param fileType The type/extension of the file
 */
export function trackFileDownload(fileName: string, fileType: string) {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  })
}

/**
 * Track scroll milestones
 * @param percentage The percentage scrolled (25, 50, 75, 100)
 * @param pageTitle The title of the page
 */
export function trackScrollMilestone(percentage: number, pageTitle: string) {
  trackEvent('scroll_milestone', {
    scroll_percentage: percentage,
    page_title: pageTitle,
  })
}

/**
 * Track errors encountered by users with enhanced Sentry integration
 * @param errorType The type of error
 * @param errorMessage The error message
 * @param errorLocation Where the error occurred
 * @param additionalContext Optional additional context for debugging
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  errorLocation: string,
  additionalContext?: Record<string, any>,
) {
  // Track in Google Analytics for business metrics
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation,
  })

  // Also capture in Sentry for detailed debugging (if available)
  if (isSentryInitialized()) {
    captureErrorWithContext(errorMessage, {
      errorType,
      component: errorLocation,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      additionalData: {
        errorLocation,
        ...additionalContext,
      },
    })
  }
}

/**
 * Track user preferences
 * @param preferenceType The type of preference (theme, language, etc.)
 * @param preferenceValue The value selected
 */
export function trackUserPreference(
  preferenceType: string,
  preferenceValue: string,
) {
  trackEvent('user_preference', {
    preference_type: preferenceType,
    preference_value: preferenceValue,
  })
}

// Add a new function to track email submissions specifically for the Skool community
/**
 * Track email submission for Skool community
 * @param email The email address submitted
 * @param source The source of the submission (top form or bottom form)
 */
export function trackSkoolEmailSubmission(_email: string, source: string) {
  trackEvent('skool_email_submission', {
    source: source,
    destination_host: 'skool.com',
  })
}

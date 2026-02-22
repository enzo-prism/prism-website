"use client"

import { GA_MEASUREMENT_ID, IS_ANALYTICS_ENABLED } from "@/lib/constants"
import { addBreadcrumb, captureErrorWithContext, isSentryInitialized } from "./sentry-helpers"

declare global {
  interface Window {
    dataLayer?: Record<string, any>[]
    gtag?: (...args: any[]) => void
    rewardful?: (...args: any[]) => void
    __PRISM_LAST_PAGEVIEW?: {
      path: string
      timestamp: number
    }
  }
}

type AttributionPayload = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  landing_path?: string
  first_touch_source?: string
  first_touch_medium?: string
  first_touch_campaign?: string
  first_touch_at?: string
}

const ATTRIBUTION_STORAGE_KEY = "prism_attribution_v1"
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000

function parseAttributionFromUrl(): AttributionPayload {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
    msclkid: params.get("msclkid") ?? undefined,
  }
}

function readStoredAttribution(): (AttributionPayload & { savedAt?: number }) | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AttributionPayload & { savedAt?: number }
    if (!parsed.savedAt || Date.now() - parsed.savedAt > ATTRIBUTION_TTL_MS) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function writeStoredAttribution(payload: AttributionPayload) {
  if (typeof window === "undefined") return
  try {
    const existing = readStoredAttribution() ?? {}
    const merged: AttributionPayload & { savedAt: number } = {
      ...existing,
      ...payload,
      landing_path: existing.landing_path ?? window.location.pathname,
      first_touch_source: existing.first_touch_source ?? payload.utm_source,
      first_touch_medium: existing.first_touch_medium ?? payload.utm_medium,
      first_touch_campaign: existing.first_touch_campaign ?? payload.utm_campaign,
      first_touch_at: existing.first_touch_at ?? new Date().toISOString(),
      savedAt: Date.now(),
    }
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // no-op
  }
}

function getAttributionContext(): AttributionPayload {
  if (typeof window === "undefined") return {}

  const fromUrl = parseAttributionFromUrl()
  const hasCampaignParams = Boolean(
    fromUrl.utm_source || fromUrl.utm_medium || fromUrl.utm_campaign || fromUrl.gclid || fromUrl.fbclid || fromUrl.msclkid,
  )
  if (hasCampaignParams) writeStoredAttribution(fromUrl)

  const stored = readStoredAttribution() ?? {}
  return {
    utm_source: fromUrl.utm_source ?? stored.utm_source,
    utm_medium: fromUrl.utm_medium ?? stored.utm_medium,
    utm_campaign: fromUrl.utm_campaign ?? stored.utm_campaign,
    utm_content: fromUrl.utm_content ?? stored.utm_content,
    utm_term: fromUrl.utm_term ?? stored.utm_term,
    gclid: fromUrl.gclid ?? stored.gclid,
    fbclid: fromUrl.fbclid ?? stored.fbclid,
    msclkid: fromUrl.msclkid ?? stored.msclkid,
    landing_path: stored.landing_path,
    first_touch_source: stored.first_touch_source,
    first_touch_medium: stored.first_touch_medium,
    first_touch_campaign: stored.first_touch_campaign,
    first_touch_at: stored.first_touch_at,
  }
}

// Custom event types
export type EventType =
  | "page_view"
  | "click"
  | "form_submit"
  | "contact_request"
  | "service_view"
  | "cta_click"
  | "navigation"
  | "client_showcase_interaction"
  | "benefits_slideshow_interaction"
  | "service_card_click"
  | "search_params_change"
  | "page_engagement"
  | "file_download"
  | "external_link_click"
  | "video_interaction"
  | "error"
  | "scroll_milestone"
  | "user_preference"
  | "skool_email_submission"

/**
 * Track a custom event in Google Analytics
 * @param eventName The name of the event
 * @param params Additional parameters to send with the event
 */
export function trackEvent(eventName: EventType, params?: Record<string, any>) {
  if (typeof window === "undefined") {
    return
  }

  const pageLocation = window.location.href
  const pageTitle = typeof document !== "undefined" ? document.title : ""

  // Add timestamp and attribution context to all events
  const enhancedParams = {
    ...getAttributionContext(),
    ...params,
    event_time: new Date().toISOString(),
    page_location: pageLocation,
    page_title: pageTitle,
    page_path: window.location.pathname,
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Tracked event: ${eventName}`, enhancedParams)
  }

  if (!IS_ANALYTICS_ENABLED) {
    return
  }

  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...enhancedParams })
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, enhancedParams)
    }
  } catch (error) {
    console.error("[Analytics] Error tracking event:", error)
  }
}

/**
 * Track a page view in Google Analytics
 * @param path The path of the page
 * @param title The title of the page
 */
export function trackPageView(path: string, title: string) {
  if (typeof window === "undefined") {
    return
  }

  const normalizedPath = path || window.location.pathname || "/"
  const now = Date.now()
  const lastPageView = window.__PRISM_LAST_PAGEVIEW
  if (lastPageView && lastPageView.path === normalizedPath && now - lastPageView.timestamp < 1000) {
    return
  }

  window.__PRISM_LAST_PAGEVIEW = {
    path: normalizedPath,
    timestamp: now,
  }

  const pageTitle = title || (typeof document !== "undefined" ? document.title : normalizedPath)
  const pageLocation = window.location.href
  const pageReferrer = typeof document !== "undefined" ? document.referrer : ""

  trackEvent("page_view", {
    page_path: normalizedPath,
    page_title: pageTitle,
    page_referrer: pageReferrer,
    page_location: pageLocation,
  })

  if (IS_ANALYTICS_ENABLED && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: normalizedPath,
      page_title: pageTitle,
      page_location: pageLocation,
      page_referrer: pageReferrer,
    })
  }
}

/**
 * Track a CTA button click with enhanced tracking
 * @param ctaText The text of the CTA
 * @param location The location of the CTA on the page
 */
export function trackCTAClick(ctaText: string, location: string) {
  trackEvent("cta_click", {
    cta_text: ctaText,
    cta_location: location,
  })

  // Add breadcrumb for user journey tracking
  if (isSentryInitialized()) {
    addBreadcrumb(
      `CTA clicked: ${ctaText}`,
      "user",
      "info",
      {
        ctaText,
        location,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      }
    )
  }
}

/**
 * Track a navigation click
 * @param linkText The text of the navigation link
 * @param destination The destination path
 */
export function trackNavigation(linkText: string, destination: string) {
  trackEvent("navigation", {
    link_text: linkText,
    destination: destination,
    navigation_type: "user_click",
  })
}

/**
 * Track a service card click
 * @param serviceName The name of the service
 * @param destination The destination path
 */
export function trackServiceCardClick(serviceName: string, destination: string) {
  trackEvent("service_card_click", {
    service_name: serviceName,
    destination: destination,
  })
}

/**
 * Track a form submission
 * @param formName The name of the form
 * @param formLocation The location of the form on the site
 */
export function trackFormSubmission(formName: string, formLocation: string) {
  trackEvent("form_submit", {
    form_name: formName,
    form_location: formLocation,
  })
}

/**
 * Track client showcase interaction
 * @param interactionType The type of interaction (scroll, click, etc.)
 * @param clientName The name of the client if applicable
 */
export function trackClientShowcaseInteraction(interactionType: string, clientName?: string) {
  trackEvent("client_showcase_interaction", {
    interaction_type: interactionType,
    client_name: clientName || "not specified",
  })
}

/**
 * Track benefits slideshow interaction
 * @param interactionType The type of interaction (next, prev, indicator click)
 * @param slideName The name or number of the slide
 */
export function trackBenefitsInteraction(interactionType: string, slideName: string) {
  trackEvent("benefits_slideshow_interaction", {
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
export function trackVideoInteraction(videoId: string, action: string, videoTitle?: string) {
  trackEvent("video_interaction", {
    video_id: videoId,
    action: action,
    video_title: videoTitle || "not specified",
  })
}

/**
 * Track external link clicks
 * @param url The URL being navigated to
 * @param linkText The text of the link if available
 */
export function trackExternalLinkClick(url: string, linkText?: string) {
  trackEvent("external_link_click", {
    destination_url: url,
    link_text: linkText || "not specified",
  })
}

/**
 * Track file downloads
 * @param fileName The name of the file being downloaded
 * @param fileType The type/extension of the file
 */
export function trackFileDownload(fileName: string, fileType: string) {
  trackEvent("file_download", {
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
  trackEvent("scroll_milestone", {
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
  additionalContext?: Record<string, any>
) {
  // Track in Google Analytics for business metrics
  trackEvent("error", {
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation,
  })

  // Also capture in Sentry for detailed debugging (if available)
  if (isSentryInitialized()) {
    captureErrorWithContext(errorMessage, {
      errorType,
      component: errorLocation,
      url: typeof window !== "undefined" ? window.location.href : undefined,
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
export function trackUserPreference(preferenceType: string, preferenceValue: string) {
  trackEvent("user_preference", {
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
export function trackSkoolEmailSubmission(email: string, source: string) {
  trackEvent("skool_email_submission", {
    email_hash: hashEmail(email), // Hash the email for privacy
    source: source,
    destination: "skool.com/prism-5437",
  })
}

/**
 * Create a simple hash of an email for tracking without storing PII
 * @param email The email to hash
 * @returns A simple hash representation
 */
function hashEmail(email: string): string {
  // This is a simple hash function for demonstration
  // In production, use a proper hashing algorithm
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(16)
}

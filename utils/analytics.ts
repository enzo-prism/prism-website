"use client"

import { GA_MEASUREMENT_ID } from "@/lib/constants"
import { addBreadcrumb, captureErrorWithContext, isSentryInitialized } from "./sentry-helpers"

declare global {
  interface Window {
    dataLayer?: Record<string, any>[]
    gtag?: (...args: any[]) => void
    rewardful?: (...args: any[]) => void
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
  try {
    if (typeof window === "undefined") {
      return
    }
    // Add timestamp to all events
    const enhancedParams = {
      ...params,
      event_time: new Date().toISOString(),
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_title: typeof document !== "undefined" ? document.title : "",
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: eventName, ...enhancedParams })
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, { send_to: GA_MEASUREMENT_ID, ...enhancedParams })
    }
    console.log(`[Analytics] Tracked event: ${eventName}`, enhancedParams)
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
  trackEvent("page_view", {
    page_path: path,
    page_title: title,
    page_referrer: typeof document !== "undefined" ? document.referrer : "",
  })
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

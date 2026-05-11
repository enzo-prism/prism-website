/**
 * utils/skool-pixel.ts
 *
 * This file provides utility functions for tracking Skool community related events.
 * It's designed to be lightweight and avoid external dependencies.
 */

import { trackEvent } from "@/utils/analytics"

/**
 * Track email submission for Skool community
 * @param _email The email address submitted. It is intentionally not sent to analytics.
 * @param source The source of the submission (top form or bottom form)
 */
export function trackSkoolEmailSubmission(_email: string, source: string) {
  trackEvent("skool_email_submission", {
    source: source,
    destination_host: "skool.com",
  })
}

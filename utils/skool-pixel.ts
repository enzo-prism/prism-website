/**
 * utils/skool-pixel.ts
 *
 * This file provides utility functions for tracking Skool community related events.
 * It's designed to be lightweight and avoid external dependencies.
 */

import { trackEvent } from "@/utils/analytics"

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
    hash = hash & 0xffffffff // Convert to 32bit integer
  }
  return hash.toString(16)
}

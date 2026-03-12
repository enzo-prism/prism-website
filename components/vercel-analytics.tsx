"use client"

import { Analytics } from "@vercel/analytics/next"

import { sanitizeVercelAnalyticsEvent } from "@/lib/vercel-analytics"

export default function VercelAnalytics() {
  return <Analytics beforeSend={sanitizeVercelAnalyticsEvent} />
}

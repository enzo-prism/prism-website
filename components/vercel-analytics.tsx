"use client"

import { Analytics } from "@vercel/analytics/next"

import { isInternalTraffic } from "@/lib/internal-traffic"
import { sanitizeVercelAnalyticsEvent } from "@/lib/vercel-analytics"

export default function VercelAnalytics() {
  return (
    <Analytics
      // Browsers that opted out with ?internal=1 send nothing.
      beforeSend={(event) =>
        isInternalTraffic() ? null : sanitizeVercelAnalyticsEvent(event)
      }
    />
  )
}

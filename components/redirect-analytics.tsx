"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function RedirectAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    // Check if this is a redirect (indicated by the 'from' query parameter)
    const fromPath = searchParams.get("from")

    if (fromPath) {
      // Track the redirect in analytics
      const redirectData = {
        from: fromPath,
        to: pathname,
        timestamp: new Date().toISOString(),
      }

      // Log to console (in production, send to your analytics service)
      console.log("Redirect tracked:", redirectData)

      // You could send this data to your analytics endpoint
      // Example: fetch('/api/track-redirect', { method: 'POST', body: JSON.stringify(redirectData) })
    }

    prevPathRef.current = pathname
  }, [pathname, searchParams])

  return null // This component doesn't render anything
}

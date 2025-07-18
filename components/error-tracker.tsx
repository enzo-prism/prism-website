"use client"

import { useEffect } from "react"
import { trackError } from "@/utils/analytics"

export default function ErrorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const originalOnError = window.onerror
    const originalOnUnhandledRejection = window.onunhandledrejection

    // Track JavaScript errors
    window.onerror = (message, source, lineno, colno, error) => {
      trackError(
        "js_error",
        typeof message === "string" ? message : JSON.stringify(message),
        `${source}:${lineno}:${colno}`,
        {
          source,
          lineno,
          colno,
          stack: error?.stack,
          userAgent: window.navigator.userAgent,
        }
      )

      // Call the original handler if it exists
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error)
      }

      return false
    }

    // Track unhandled promise rejections
    window.onunhandledrejection = (event) => {
      trackError(
        "unhandled_promise_rejection",
        event.reason?.message || "Unknown promise rejection",
        event.reason?.stack || "No stack trace available",
        {
          reason: event.reason,
          promiseRejection: true,
          userAgent: window.navigator.userAgent,
        }
      )

      // Call the original handler if it exists
      if (originalOnUnhandledRejection) {
        return originalOnUnhandledRejection.call(window, event)
      }
    }

    return () => {
      window.onerror = originalOnError
      window.onunhandledrejection = originalOnUnhandledRejection
    }
  }, [])

  return null // This component doesn't render anything
}

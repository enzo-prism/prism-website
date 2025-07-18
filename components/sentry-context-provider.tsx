"use client"

import { useEffect } from "react"
import { setContextTags, addBreadcrumb, isSentryInitialized } from "@/utils/sentry-helpers"

interface SentryContextProviderProps {
  children: React.ReactNode
}

export default function SentryContextProvider({ children }: SentryContextProviderProps) {
  useEffect(() => {
    if (!isSentryInitialized()) return

    // Set initial context tags
    const contextTags: Record<string, string> = {
      environment: process.env.NODE_ENV || "development",
      deployment: "vercel",
    }

    // Add browser information
    if (typeof window !== "undefined") {
      contextTags.browser = window.navigator.userAgent.includes("Chrome") ? "chrome" :
                           window.navigator.userAgent.includes("Firefox") ? "firefox" :
                           window.navigator.userAgent.includes("Safari") ? "safari" : "other"
      
      contextTags.device_type = window.innerWidth < 768 ? "mobile" : 
                               window.innerWidth < 1024 ? "tablet" : "desktop"
      
      contextTags.screen_resolution = `${window.screen.width}x${window.screen.height}`
    }

    setContextTags(contextTags)

    // Add initial breadcrumb for session start
    addBreadcrumb(
      "Session started",
      "session",
      "info",
      {
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
        url: typeof window !== "undefined" ? window.location.href : "unknown",
        referrer: typeof document !== "undefined" ? document.referrer : "unknown",
        timestamp: new Date().toISOString(),
      }
    )

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        addBreadcrumb("Page hidden", "navigation", "info")
      } else {
        addBreadcrumb("Page visible", "navigation", "info")
      }
    }

    // Track page unload
    const handleBeforeUnload = () => {
      addBreadcrumb("Page unloading", "navigation", "info")
    }

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return <>{children}</>
}
"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackEvent, trackPageView } from "@/utils/analytics"

interface EnhancedAnalyticsProps {
  title: string
}

export default function EnhancedAnalytics({ title }: EnhancedAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    const previous = previousPathname.current
    if (previous !== pathname) {
      trackPageView(pathname, title)
      trackEvent("navigation", {
        from_path: previous || "(initial)",
        to_path: pathname,
        navigation_type: previous ? "client_side" : "initial_load",
        page_title: title,
      })
      previousPathname.current = pathname
    }
  }, [pathname, title])

  // Track when search params change
  useEffect(() => {
    if (previousPathname.current === pathname) {
      trackEvent("search_params_change", {
        path: pathname,
        search_params: searchParams.toString(),
      })
    }
  }, [searchParams, pathname])

  // Track page engagement metrics
  useEffect(() => {
    if (typeof window === "undefined") return

    const startTime = Date.now()
    let scrollDepth = 0
    let engaged = false

    const trackEngagement = () => {
      engaged = true
    }

    const trackScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.body.scrollHeight
      const currentScrollDepth = Math.floor((scrollPosition / documentHeight) * 100)

      if (currentScrollDepth > scrollDepth) {
        scrollDepth = currentScrollDepth
      }
    }

    const reportEngagement = () => {
      if (!engaged) return

      const timeOnPage = Math.floor((Date.now() - startTime) / 1000)

      trackEvent("page_engagement", {
        path: pathname,
        time_on_page_seconds: timeOnPage,
        max_scroll_depth_percent: scrollDepth,
      })
    }

    // Add event listeners
    window.addEventListener("scroll", trackScroll, { passive: true })
    window.addEventListener("click", trackEngagement)
    window.addEventListener("keydown", trackEngagement)
    window.addEventListener("mousemove", trackEngagement)
    window.addEventListener("touchstart", trackEngagement)

    // Report engagement when user leaves page
    window.addEventListener("beforeunload", reportEngagement)

    return () => {
      reportEngagement()
      window.removeEventListener("scroll", trackScroll)
      window.removeEventListener("click", trackEngagement)
      window.removeEventListener("keydown", trackEngagement)
      window.removeEventListener("mousemove", trackEngagement)
      window.removeEventListener("touchstart", trackEngagement)
      window.removeEventListener("beforeunload", reportEngagement)
    }
  }, [pathname])

  return null // This component doesn't render anything
}

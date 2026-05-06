"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackCTAClick, trackEvent, trackPageView } from "@/utils/analytics"

interface EnhancedAnalyticsProps {
  title: string
}

export default function EnhancedAnalytics({ title }: EnhancedAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousPathname = useRef<string | null>(null)
  const previousUrl = useRef<string | null>(null)
  const previousSearchParams = useRef<string | null>(null)

  useEffect(() => {
    const previous = previousPathname.current
    if (previous !== pathname) {
      const currentUrl = typeof window !== "undefined" ? window.location.href : null

      trackPageView(pathname, title, {
        previousPath: previous,
        previousUrl: previousUrl.current,
      })

      if (previous) {
        trackEvent("navigation", {
          from_path: previous,
          to_path: pathname,
          navigation_type: "client_side",
          page_title: title,
        })
      }

      previousPathname.current = pathname
      previousUrl.current = currentUrl
    }
  }, [pathname, title])

  // Track when search params change
  useEffect(() => {
    const currentSearchParams = searchParams.toString()
    const previous = previousSearchParams.current

    if (previous !== null && previous !== currentSearchParams) {
      const safeSearchParams = {
        utm_source: searchParams.get('utm_source') ?? undefined,
        utm_medium: searchParams.get('utm_medium') ?? undefined,
        utm_campaign: searchParams.get('utm_campaign') ?? undefined,
        utm_content: searchParams.get('utm_content') ?? undefined,
        utm_term: searchParams.get('utm_term') ?? undefined,
      }

      trackEvent("search_params_change", {
        path: pathname,
        ...safeSearchParams,
      })
    }

    previousSearchParams.current = currentSearchParams
  }, [searchParams, pathname])

  // Track page engagement metrics
  useEffect(() => {
    if (typeof window === "undefined") return

    const startTime = Date.now()
    let scrollDepth = 0
    let engaged = false
    let reported = false

    const trackEngagement = () => {
      engaged = true
    }

    const handleTrackedClick = (event: MouseEvent) => {
      engaged = true

      const target = event.target as HTMLElement | null
      if (!target) return

      const tracked = target.closest<HTMLElement>("[data-cta-text]")
      if (!tracked) return

      const ctaText = tracked.getAttribute("data-cta-text")?.trim()
      if (!ctaText) return

      const ctaLocation = tracked.getAttribute("data-cta-location")?.trim() || title || pathname
      trackCTAClick(ctaText, ctaLocation)
    }

    const trackScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.body.scrollHeight
      const currentScrollDepth = Math.floor((scrollPosition / documentHeight) * 100)

      if (currentScrollDepth > scrollDepth) {
        scrollDepth = currentScrollDepth
      }

      if (scrollDepth >= 25) {
        engaged = true
      }
    }

    const reportEngagement = () => {
      if (reported || !engaged) return

      const timeOnPage = Math.floor((Date.now() - startTime) / 1000)
      if (timeOnPage < 10 && scrollDepth < 25) return

      reported = true

      trackEvent("page_engagement", {
        path: pathname,
        time_on_page_seconds: timeOnPage,
        max_scroll_depth_percent: scrollDepth,
      })
    }

    // Add event listeners
    window.addEventListener("scroll", trackScroll, { passive: true })
    window.addEventListener("click", handleTrackedClick)
    window.addEventListener("keydown", trackEngagement)
    window.addEventListener("touchstart", trackEngagement)

    // Report engagement when user leaves page
    window.addEventListener("beforeunload", reportEngagement)

    return () => {
      reportEngagement()
      window.removeEventListener("scroll", trackScroll)
      window.removeEventListener("click", handleTrackedClick)
      window.removeEventListener("keydown", trackEngagement)
      window.removeEventListener("touchstart", trackEngagement)
      window.removeEventListener("beforeunload", reportEngagement)
    }
  }, [pathname, title])

  return null // This component doesn't render anything
}

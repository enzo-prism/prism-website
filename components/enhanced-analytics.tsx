'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackCTAClick, trackEvent, trackPageView } from '@/utils/analytics'

interface EnhancedAnalyticsProps {
  title: string
}

const PAGE_VIEW_METADATA_SETTLE_DELAY_MS = 50

function getCurrentPageTitle(fallbackTitle: string, pathname: string) {
  if (typeof document === 'undefined') return fallbackTitle || pathname
  return document.title || fallbackTitle || pathname
}

function getCurrentPageLocation() {
  if (typeof window === 'undefined') return undefined
  return window.location.href
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
      const previousTrackedUrl = previousUrl.current

      const timeoutId = window.setTimeout(() => {
        const currentUrl = getCurrentPageLocation() ?? null
        const currentTitle = getCurrentPageTitle(title, pathname)

        trackPageView(pathname, currentTitle, {
          previousPath: previous,
          previousUrl: previousTrackedUrl,
        })

        if (previous) {
          trackEvent('navigation', {
            from_path: previous,
            to_path: pathname,
            navigation_type: 'client_side',
            page_location: currentUrl,
            page_path: pathname,
            page_title: currentTitle,
          })
        }

        previousPathname.current = pathname
        previousUrl.current = currentUrl
      }, PAGE_VIEW_METADATA_SETTLE_DELAY_MS)

      return () => {
        window.clearTimeout(timeoutId)
      }
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

      trackEvent('search_params_change', {
        page_path: pathname,
        ...safeSearchParams,
      })
    }

    previousSearchParams.current = currentSearchParams
  }, [searchParams, pathname])

  // Track page engagement metrics
  useEffect(() => {
    if (typeof window === 'undefined') return

    const startTime = Date.now()
    const pageLocation = getCurrentPageLocation()
    const pageTitle = getCurrentPageTitle(title, pathname)
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

      const tracked = target.closest<HTMLElement>('[data-cta-text]')
      if (!tracked) return

      const ctaText = tracked.getAttribute('data-cta-text')?.trim()
      if (!ctaText) return

      const ctaLocation =
        tracked.getAttribute('data-cta-location')?.trim() ||
        pageTitle ||
        pathname
      trackCTAClick(ctaText, ctaLocation)
    }

    const trackScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.body.scrollHeight
      const currentScrollDepth = Math.floor(
        (scrollPosition / documentHeight) * 100,
      )

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

      trackEvent('page_engagement', {
        page_location: pageLocation,
        page_path: pathname,
        page_title: pageTitle,
        time_on_page_seconds: timeOnPage,
        max_scroll_depth_percent: scrollDepth,
      })
    }

    // Add event listeners
    window.addEventListener('scroll', trackScroll, { passive: true })
    window.addEventListener('click', handleTrackedClick)
    window.addEventListener('keydown', trackEngagement)
    window.addEventListener('touchstart', trackEngagement)

    // Report engagement when user leaves page
    window.addEventListener('beforeunload', reportEngagement)

    return () => {
      reportEngagement()
      window.removeEventListener('scroll', trackScroll)
      window.removeEventListener('click', handleTrackedClick)
      window.removeEventListener('keydown', trackEngagement)
      window.removeEventListener('touchstart', trackEngagement)
      window.removeEventListener('beforeunload', reportEngagement)
    }
  }, [pathname, title])

  return null // This component doesn't render anything
}

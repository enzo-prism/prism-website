'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import AnalyticsProvider from '@/components/analytics-provider'
import RouteSurfaceController from '@/components/route-surface-controller'
import VercelAnalytics from '@/components/vercel-analytics'

type IdleCapableWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number
    cancelIdleCallback?: (handle: number) => void
  }

const RuntimeDeferredFeatures = dynamic(
  () => import('@/components/runtime-deferred-features'),
  { ssr: false },
)

function scheduleNonCriticalHydration(callback: () => void, timeout = 1200) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const idleWindow = window as IdleCapableWindow
  let cancelled = false

  const runCallback = () => {
    if (!cancelled) {
      callback()
    }
  }

  if (typeof idleWindow.requestIdleCallback === 'function') {
    const idleId = idleWindow.requestIdleCallback(runCallback, { timeout })

    return () => {
      cancelled = true
      idleWindow.cancelIdleCallback?.(idleId)
    }
  }

  const timerId = window.setTimeout(runCallback, 1)

  return () => {
    cancelled = true
    window.clearTimeout(timerId)
  }
}

export default function RuntimeClientShell() {
  const [shouldLoadDeferredFeatures, setShouldLoadDeferredFeatures] =
    useState(false)

  useEffect(() => {
    return scheduleNonCriticalHydration(() => {
      setShouldLoadDeferredFeatures(true)
    })
  }, [])

  return (
    <>
      <RouteSurfaceController />
      <AnalyticsProvider />
      {/* Vercel Analytics loads with the first-party analytics layer instead of
        waiting for idle. Its pageview beacon is tiny and non-blocking, and the
        idle deferral was undercounting fast-bounce traffic on the link-in-bio
        landing pages (/ig, /tiktok, /youtube), whose mobile in-app-browser
        visitors often leave before requestIdleCallback ever fires. */}
      <VercelAnalytics />
      {shouldLoadDeferredFeatures ? <RuntimeDeferredFeatures /> : null}
    </>
  )
}

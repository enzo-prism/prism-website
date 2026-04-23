'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import AnalyticsProvider from '@/components/analytics-provider'
import RouteSurfaceController from '@/components/route-surface-controller'

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
      {shouldLoadDeferredFeatures ? <RuntimeDeferredFeatures /> : null}
    </>
  )
}

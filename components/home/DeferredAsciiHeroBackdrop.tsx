'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

type PerformanceAwareNavigator = Navigator & {
  connection?: {
    effectiveType?: string
    saveData?: boolean
  }
  deviceMemory?: number
}

type IdleCapableWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number
    cancelIdleCallback?: (handle: number) => void
  }

const AsciiHeroBackdrop = dynamic(
  () => import('@/components/ascii/AsciiHeroBackdrop'),
  { ssr: false },
)

type DeferredAsciiHeroBackdropProps = {
  animationName: string
  frameCount: number
  fps?: number
  quality?: 'low' | 'medium' | 'high'
  textSize?: string
  ariaLabel?: string
  className?: string
  loadStrategy?: 'batch' | 'all'
  batchSize?: number
  maxConcurrentFetches?: number
  continueOnFrameError?: boolean
}

function shouldEnableAsciiBackdrop() {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    return false
  }

  const performanceNavigator = navigator as PerformanceAwareNavigator
  const connection = performanceNavigator.connection

  if (
    connection?.saveData ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g'
  ) {
    return false
  }

  const deviceMemory = performanceNavigator.deviceMemory
  if (typeof deviceMemory === 'number' && deviceMemory <= 4) {
    return false
  }

  if (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) {
    return false
  }

  return true
}

function scheduleBackdropLoad(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const idleWindow = window as IdleCapableWindow
  let cancelled = false
  let idleId: number | null = null
  let timerId: number | null = null

  const runCallback = () => {
    if (!cancelled) {
      callback()
    }
  }

  const startIdleWork = () => {
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleId = idleWindow.requestIdleCallback(runCallback, { timeout: 1800 })
      return
    }

    timerId = window.setTimeout(runCallback, 250)
  }

  if (document.readyState === 'complete') {
    startIdleWork()
  } else {
    const onLoad = () => {
      window.removeEventListener('load', onLoad)
      startIdleWork()
    }

    window.addEventListener('load', onLoad, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
    }
  }

  return () => {
    cancelled = true

    if (idleId !== null) {
      idleWindow.cancelIdleCallback?.(idleId)
    }

    if (timerId !== null) {
      window.clearTimeout(timerId)
    }
  }
}

export default function DeferredAsciiHeroBackdrop(
  props: DeferredAsciiHeroBackdropProps,
) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!shouldEnableAsciiBackdrop()) {
      return
    }

    return scheduleBackdropLoad(() => {
      setShouldRender(true)
    })
  }, [])

  if (!shouldRender) {
    return null
  }

  return <AsciiHeroBackdrop {...props} />
}

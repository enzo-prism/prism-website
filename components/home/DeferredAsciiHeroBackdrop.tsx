'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

import { resolveAsciiBackdropProfile } from '@/lib/ascii-backdrop-policy'

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
  scrimClassName?: string
  focusScrimClassName?: string
  fit?: 'contain' | 'cover'
  zoom?: number
  offsetY?: number
  loadStrategy?: 'batch' | 'all'
  batchSize?: number
  maxConcurrentFetches?: number
  continueOnFrameError?: boolean
  forceAutoplay?: boolean
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
  const {
    fps = 24,
    quality = 'medium',
    loadStrategy = 'batch',
    batchSize = 24,
    maxConcurrentFetches = 6,
    fit,
    offsetY,
    zoom,
  } = props
  const [shouldRender, setShouldRender] = useState(false)
  const [profile, setProfile] = useState(() =>
    resolveAsciiBackdropProfile({
      fps,
      quality,
      loadStrategy,
      batchSize,
      maxConcurrentFetches,
      reducedMotion: true,
      viewportWidth: 0,
    }),
  )

  const evaluateProfile = useCallback(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return
    }

    const performanceNavigator = navigator as PerformanceAwareNavigator
    const connection = performanceNavigator.connection

    setProfile(
      resolveAsciiBackdropProfile({
        fps,
        quality,
        loadStrategy,
        batchSize,
        maxConcurrentFetches,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
          .matches,
        viewportWidth: window.innerWidth,
        saveData: Boolean(connection?.saveData),
        effectiveType: connection?.effectiveType ?? '',
        deviceMemory: performanceNavigator.deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
      }),
    )
  }, [batchSize, fps, loadStrategy, maxConcurrentFetches, quality])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const handleChange = () => evaluateProfile()

    evaluateProfile()

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleChange)
    } else {
      reducedMotionQuery.addListener(handleChange)
    }

    window.addEventListener('resize', handleChange)

    return () => {
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', handleChange)
      } else {
        reducedMotionQuery.removeListener(handleChange)
      }
      window.removeEventListener('resize', handleChange)
    }
  }, [evaluateProfile])

  useEffect(() => {
    if (!profile.shouldRender) {
      setShouldRender(false)
      return
    }

    return scheduleBackdropLoad(() => {
      setShouldRender(true)
    })
  }, [profile.shouldRender])

  if (!shouldRender || !profile.shouldRender) {
    return null
  }

  // The ASCII backdrop is purely decorative. Wrap it in an aria-hidden layer
  // with `contain: paint` so (a) it is removed from the accessibility tree and
  // (b) its painted <pre> text is not selected as the LCP element — the hero
  // headline should win LCP instead. `ariaLabel` is intentionally dropped here
  // so the inner container does not get role="img"/aria-label.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ contain: 'paint' }}
    >
      <AsciiHeroBackdrop
        {...props}
        ariaLabel={undefined}
        fps={profile.fps}
        quality={profile.quality}
        loadStrategy={profile.loadStrategy}
        batchSize={profile.batchSize}
        maxConcurrentFetches={profile.maxConcurrentFetches}
        fit={fit ?? profile.fit}
        zoom={zoom ?? profile.zoom}
        offsetY={offsetY ?? profile.offsetY}
      />
    </div>
  )
}

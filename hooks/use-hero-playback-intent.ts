'use client'

import { useCallback, useEffect, useState } from 'react'

import {
  isTouchCoarseEnvironment,
  TOUCH_MEDIA_QUERY,
} from '@/lib/media-environment'
import {
  resolveHeroPlaybackPolicy,
  resolveHeroPlaybackPlatform,
  type HeroPlaybackIntent,
  type HeroPlaybackPolicyOverride,
} from '@/lib/hero-media-policy'

type PlaybackConnection = {
  effectiveType?: string
  saveData?: boolean
  addEventListener?: (type: 'change', listener: EventListener) => void
  removeEventListener?: (type: 'change', listener: EventListener) => void
}

type PlaybackNavigator = Navigator & {
  connection?: PlaybackConnection
}

type UseHeroPlaybackIntentOptions = {
  playbackPolicy?: HeroPlaybackPolicyOverride
  hasAutoplayError?: boolean
  onPlaybackStateChange?: (intent: HeroPlaybackIntent) => void
}

const DEFAULT_INTENT = resolveHeroPlaybackPolicy({
  playbackPolicy: 'auto',
  reducedMotion: false,
  isTouchCoarse: false,
  viewportWidth: Number.NaN,
  hasAutoplayError: false,
  platform: 'unknown',
})

export function useHeroPlaybackIntent({
  playbackPolicy = 'auto',
  hasAutoplayError = false,
  onPlaybackStateChange,
}: UseHeroPlaybackIntentOptions) {
  const [playbackIntent, setPlaybackIntent] = useState<HeroPlaybackIntent>(
    DEFAULT_INTENT,
  )

  const evaluatePlayback = useCallback(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return
    }

    const playbackNavigator = navigator as PlaybackNavigator
    const connection = playbackNavigator.connection

    setPlaybackIntent(
      resolveHeroPlaybackPolicy({
        playbackPolicy,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isTouchCoarse: isTouchCoarseEnvironment(),
        viewportWidth: window.innerWidth,
        hasAutoplayError,
        platform: resolveHeroPlaybackPlatform(navigator.userAgent),
        saveData: Boolean(connection?.saveData),
        effectiveType: connection?.effectiveType ?? '',
      }),
    )
  }, [hasAutoplayError, playbackPolicy])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(TOUCH_MEDIA_QUERY)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const playbackNavigator = navigator as PlaybackNavigator
    const connection = playbackNavigator.connection

    const listener = () => evaluatePlayback()
    evaluatePlayback()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener)
      reducedMotionQuery.addEventListener('change', listener)
    } else {
      mediaQuery.addListener(listener)
      reducedMotionQuery.addListener(listener)
    }

    if (typeof connection?.addEventListener === 'function') {
      connection.addEventListener('change', listener)
    }

    window.addEventListener('resize', listener)

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener)
        reducedMotionQuery.removeEventListener('change', listener)
      } else {
        mediaQuery.removeListener(listener)
        reducedMotionQuery.removeListener(listener)
      }

      if (typeof connection?.removeEventListener === 'function') {
        connection.removeEventListener('change', listener)
      }

      window.removeEventListener('resize', listener)
    }
  }, [evaluatePlayback])

  useEffect(() => {
    onPlaybackStateChange?.(playbackIntent)
  }, [onPlaybackStateChange, playbackIntent])

  return playbackIntent
}

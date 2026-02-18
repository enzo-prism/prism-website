'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

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

type HeroBackgroundLoopProps = {
  videoSrc: string
  posterSrc: string
  posterAlt: string
  videoClassName: string
  posterClassName?: string
  posterSizes?: string
  videoType?: string
  preload?: 'auto' | 'metadata' | 'none'
  posterPriority?: boolean
  posterUnoptimized?: boolean
  onVideoError?: () => void
  playbackPolicy?: HeroPlaybackPolicyOverride
  onPlaybackStateChange?: (intent: HeroPlaybackIntent) => void
}

export default function HeroBackgroundLoop({
  videoSrc,
  posterSrc,
  posterAlt,
  videoClassName,
  posterClassName = '',
  posterSizes = '100vw',
  videoType = 'video/mp4',
  preload = 'metadata',
  posterPriority = false,
  posterUnoptimized = false,
  onVideoError,
  playbackPolicy = 'auto',
  onPlaybackStateChange,
}: HeroBackgroundLoopProps) {
  const [videoError, setVideoError] = useState(false)
  const [playbackIntent, setPlaybackIntent] = useState(() =>
    resolveHeroPlaybackPolicy({
      playbackPolicy,
      reducedMotion: false,
      isTouchCoarse: false,
      viewportWidth: Number.NaN,
      hasAutoplayError: false,
    }),
  )

  const evaluatePlayback = useCallback(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return
    }

    const intent = resolveHeroPlaybackPolicy({
      playbackPolicy,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      isTouchCoarse: isTouchCoarseEnvironment(),
      viewportWidth: window.innerWidth,
      hasAutoplayError: videoError,
      platform: resolveHeroPlaybackPlatform(navigator.userAgent),
    })

    setPlaybackIntent(intent)
    onPlaybackStateChange?.(intent)
  }, [playbackPolicy, videoError, onPlaybackStateChange])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(TOUCH_MEDIA_QUERY)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const listener = () => evaluatePlayback()
    evaluatePlayback()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener)
      reducedMotionQuery.addEventListener('change', listener)
    } else {
      mediaQuery.addListener(listener)
      reducedMotionQuery.addListener(listener)
    }

    window.addEventListener('resize', listener)

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener)
      } else {
        mediaQuery.removeListener(listener)
      }
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', listener)
      } else {
        reducedMotionQuery.removeListener(listener)
      }
      window.removeEventListener('resize', listener)
    }
  }, [evaluatePlayback])

  useEffect(() => {
    evaluatePlayback()
  }, [evaluatePlayback])

  const handleVideoError = () => {
    setVideoError(true)
    onVideoError?.()
  }

  const shouldRenderVideo = playbackIntent.mode === 'video-autoplay'

  return (
    <>
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        unoptimized={posterUnoptimized}
        priority={posterPriority}
        sizes={posterSizes}
        className={posterClassName}
      />
      {shouldRenderVideo ? (
        <video
          className={`hero-loop-video ${videoClassName}`}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          draggable={false}
          poster={posterSrc}
          preload={preload}
          aria-hidden="true"
          data-hero-loop="true"
          onError={handleVideoError}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      ) : null}
    </>
  )
}

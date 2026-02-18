'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
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

const DEFAULT_VIDEO_SRC =
  'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761612491/surfer_loop_vduya4.mp4'
const DEFAULT_POSTER_SRC =
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761612479/Frame_63_gbe1tk.png'

type HeroLoopingVideoProps = {
  className?: string
  aspectClassName?: string
  videoClassName?: string
  videoSrc?: string
  posterSrc?: string
  alt?: string
  priority?: boolean
  posterSizes?: string
  playbackPolicy?: HeroPlaybackPolicyOverride
  onPlaybackStateChange?: (intent: HeroPlaybackIntent) => void
}

export default function HeroLoopingVideo({
  className,
  aspectClassName,
  videoClassName,
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = DEFAULT_POSTER_SRC,
  alt = 'Surfer looping background preview',
  priority = true,
  posterSizes = '(min-width: 1280px) 1024px, (min-width: 768px) 80vw, 100vw',
  playbackPolicy = 'auto',
  onPlaybackStateChange,
}: HeroLoopingVideoProps) {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
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
      hasAutoplayError: hasVideoError,
      platform: resolveHeroPlaybackPlatform(navigator.userAgent),
    })

    setPlaybackIntent(intent)
    onPlaybackStateChange?.(intent)
  }, [hasVideoError, playbackPolicy, onPlaybackStateChange])

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

  const shouldRenderVideo = playbackIntent.mode === 'video-autoplay'

  useEffect(() => {
    if (!shouldRenderVideo) {
      setIsVideoReady(false)
    }
  }, [shouldRenderVideo])

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950/5 shadow-lg',
        className,
      )}
    >
      <div
        className={cn(
          'relative aspect-[4/5] w-full sm:aspect-[16/9]',
          aspectClassName,
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-700',
            isVideoReady && shouldRenderVideo ? 'opacity-0' : 'opacity-100',
          )}
        >
          <Image
            src={posterSrc}
            alt={alt}
            fill
            priority={priority}
            sizes={posterSizes}
            className="h-full w-full object-cover"
            onLoad={() => setIsPosterLoaded(true)}
          />
          {!isPosterLoaded && (
            <div
              className="absolute inset-0 animate-pulse bg-neutral-200"
              aria-hidden
            />
          )}
        </div>

        {shouldRenderVideo && (
          <video
            className={cn(
              'hero-loop-video pointer-events-none absolute inset-0 z-10 hidden h-full w-full object-cover transition-opacity duration-700 sm:block',
              isVideoReady ? 'opacity-100' : 'opacity-0',
              videoClassName,
            )}
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
            preload="auto"
            aria-hidden="true"
            data-hero-loop="true"
            onCanPlay={() => setIsVideoReady(true)}
            onLoadedData={() => setIsVideoReady(true)}
            onError={() => {
              setHasVideoError(true)
              setIsVideoReady(false)
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  )
}

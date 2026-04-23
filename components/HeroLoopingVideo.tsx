'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { useHeroPlaybackIntent } from '@/hooks/use-hero-playback-intent'
import type {
  HeroPlaybackIntent,
  HeroPlaybackPolicyOverride,
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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPosterLoaded, setIsPosterLoaded] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const playbackIntent = useHeroPlaybackIntent({
    playbackPolicy,
    hasAutoplayError: hasVideoError,
    onPlaybackStateChange,
  })

  const shouldRenderVideo = playbackIntent.mode === 'video-autoplay'

  useEffect(() => {
    if (!shouldRenderVideo) {
      setIsVideoReady(false)
      videoRef.current?.pause()
    }
  }, [shouldRenderVideo])

  useEffect(() => {
    if (!shouldRenderVideo) {
      return
    }

    const video = videoRef.current
    if (!video) {
      return
    }

    let cancelled = false
    let isIntersecting = true
    let observer: IntersectionObserver | null = null

    const attemptPlay = async () => {
      if (cancelled || document.hidden || !isIntersecting) {
        return
      }

      try {
        video.muted = true
        video.defaultMuted = true
        const playResult = video.play()
        if (playResult && typeof playResult.catch === 'function') {
          await playResult
        }
      } catch {
        if (!cancelled) {
          setHasVideoError(true)
          setIsVideoReady(false)
        }
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
        return
      }

      void attemptPlay()
    }

    if (
      typeof IntersectionObserver !== 'undefined' &&
      containerRef.current
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          isIntersecting = Boolean(entry?.isIntersecting)

          if (isIntersecting) {
            void attemptPlay()
          } else {
            video.pause()
          }
        },
        { threshold: 0.15 },
      )

      observer.observe(containerRef.current)
    } else {
      void attemptPlay()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelled = true
      observer?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      video.pause()
    }
  }, [shouldRenderVideo, videoSrc])

  return (
    <div
      ref={containerRef}
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
            ref={videoRef}
            className={cn(
              'hero-loop-video pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700',
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

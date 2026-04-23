'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { useHeroPlaybackIntent } from '@/hooks/use-hero-playback-intent'
import type {
  HeroPlaybackIntent,
  HeroPlaybackPolicyOverride,
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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoError, setVideoError] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const playbackIntent = useHeroPlaybackIntent({
    playbackPolicy,
    hasAutoplayError: videoError,
    onPlaybackStateChange,
  })

  const handleVideoError = () => {
    setVideoError(true)
    setIsVideoReady(false)
    onVideoError?.()
  }

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
          setVideoError(true)
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
    <div ref={containerRef} className="absolute inset-0">
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isVideoReady && shouldRenderVideo ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          unoptimized={posterUnoptimized}
          priority={posterPriority}
          sizes={posterSizes}
          className={posterClassName}
        />
      </div>
      {shouldRenderVideo ? (
        <video
          ref={videoRef}
          className={`hero-loop-video transition-opacity duration-700 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          } ${videoClassName}`}
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
          onCanPlay={() => setIsVideoReady(true)}
          onLoadedData={() => setIsVideoReady(true)}
          onError={handleVideoError}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      ) : null}
    </div>
  )
}

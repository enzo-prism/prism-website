'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import {
  isTouchCoarseEnvironment,
  TOUCH_MEDIA_QUERY,
} from '@/lib/media-environment'

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
}: HeroBackgroundLoopProps) {
  const [videoError, setVideoError] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(TOUCH_MEDIA_QUERY)

    // Avoid iOS Safari fullscreen takeover from autoplayed off-screen/hidden video:
    // mount decorative loops only on non-touch/coarse-pointer environments.
    const evaluatePlayback = () => {
      setShowVideo(!isTouchCoarseEnvironment() && !videoError)
    }

    const listener = () => evaluatePlayback()
    evaluatePlayback()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener)
    } else {
      mediaQuery.addListener(listener)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener)
      } else {
        mediaQuery.removeListener(listener)
      }
    }
  }, [videoError])

  const handleVideoError = () => {
    setVideoError(true)
    onVideoError?.()
  }

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
      {showVideo ? (
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

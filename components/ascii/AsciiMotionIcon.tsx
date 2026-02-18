'use client'

import { useEffect, useState } from 'react'

import AsciiIcon from '@/components/ascii/AsciiIcon'
import {
  isTouchCoarseEnvironment,
  TOUCH_MEDIA_QUERY,
} from '@/lib/media-environment'

type AsciiMotionIconProps = {
  videoSrc: string
  posterSrc: string
  alt: string
  size?: number
  className?: string
  ariaHidden?: boolean
}

export default function AsciiMotionIcon({
  videoSrc,
  posterSrc,
  alt,
  size = 50,
  className,
  ariaHidden = false,
}: AsciiMotionIconProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia(TOUCH_MEDIA_QUERY)

    // Decorative loop icons should never autoplay on touch/coarse-pointer devices
    // to avoid fullscreen/inline playback quirks in Safari.

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    const handleTouchChange = () => {
      setIsTouchDevice(isTouchCoarseEnvironment())
    }

    setPrefersReducedMotion(motionQuery.matches)
    setIsTouchDevice(isTouchCoarseEnvironment())

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange)
    } else {
      motionQuery.addListener(handleMotionChange)
    }
    if (touchQuery.addEventListener) {
      touchQuery.addEventListener('change', handleTouchChange)
    } else {
      // Safari/WebKit compatibility fallback for older MediaQueryList implementations.
      touchQuery.addListener(handleTouchChange)
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange)
      } else {
        motionQuery.removeListener(handleMotionChange)
      }
      if (touchQuery.removeEventListener) {
        touchQuery.removeEventListener('change', handleTouchChange)
      } else {
        touchQuery.removeListener(handleTouchChange)
      }
    }
  }, [])

  if (prefersReducedMotion || isTouchDevice || videoFailed) {
    return (
      <AsciiIcon
        src={posterSrc}
        alt={alt}
        size={size}
        aria-hidden={ariaHidden}
        className={className}
        priority={false}
      />
    )
  }

  return (
    <video
      src={videoSrc}
      width={size}
      height={size}
      className={[
        'block',
        // Sora outputs are typically 16:9. Prevent squishing inside square icon slots.
        'object-contain',
        'bg-transparent',
        // Try to keep the pixel vibe crisp when the video is scaled down.
        '[image-rendering:pixelated]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      poster={posterSrc}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden={ariaHidden}
      onError={() => setVideoFailed(true)}
    />
  )
}

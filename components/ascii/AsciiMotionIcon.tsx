"use client"

import { useEffect, useState } from "react"

import AsciiIcon from "@/components/ascii/AsciiIcon"

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (prefersReducedMotion || videoFailed) {
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
      className={
        [
          "block",
          // Sora outputs are typically 16:9. Prevent squishing inside square icon slots.
          "object-contain",
          "bg-transparent",
          // Try to keep the pixel vibe crisp when the video is scaled down.
          "[image-rendering:pixelated]",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
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

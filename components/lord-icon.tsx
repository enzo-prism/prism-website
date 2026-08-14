'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type LordIconProps = {
  src: string
  size?: number
  /** When provided, the parent controls playback (e.g. card hover state). */
  active?: boolean
  /** Play once on mount (used for success/booking moments). */
  playOnMount?: boolean
  className?: string
}

export default function LordIcon({
  src,
  size = 48,
  active,
  playOnMount = false,
  className,
}: LordIconProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<any>(null)
  const reducedMotionRef = useRef(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    reducedMotionRef.current = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let cancelled = false
    let animation: any = null

    import('lottie-web').then((lottie) => {
      if (cancelled || !containerRef.current) return

      animation = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: src,
      })
      animationRef.current = animation

      animation.addEventListener('data_failed', () => setFailed(true))

      if (reducedMotionRef.current) {
        animation.goToAndStop(Math.floor(animation.totalFrames * 0.35), true)
      } else if (playOnMount) {
        animation.goToAndPlay(0, true)
      } else {
        animation.goToAndStop(0, true)
      }
    })

    return () => {
      cancelled = true
      animation?.destroy()
      animationRef.current = null
    }
  }, [src, playOnMount])

  const play = useCallback(() => {
    const animation = animationRef.current
    if (!animation || reducedMotionRef.current) return
    animation.goToAndPlay(0, true)
  }, [])

  const prevActiveRef = useRef(active)
  useEffect(() => {
    if (active && !prevActiveRef.current) {
      play()
    }
    prevActiveRef.current = active
  }, [active, play])

  if (failed) return null

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, display: 'inline-block' }}
      aria-hidden="true"
    />
  )
}

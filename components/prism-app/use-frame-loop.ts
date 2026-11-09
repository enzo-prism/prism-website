'use client'

import { useEffect, useRef } from 'react'

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const smoothstep = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export const easeOutCubic = (value: number) => 1 - (1 - clamp01(value)) ** 3

/**
 * Runs `tick` once per frame while the page is scrolling or resizing, and for
 * as long as `tick` returns true (so damped values can settle after the last
 * scroll event). Sleeps otherwise.
 */
export function useFrameLoop(tick: () => boolean) {
  const tickRef = useRef(tick)

  useEffect(() => {
    tickRef.current = tick
  })

  useEffect(() => {
    let frame = 0

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run)
    }

    const run = () => {
      frame = 0
      if (tickRef.current()) schedule()
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}

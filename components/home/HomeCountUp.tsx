'use client'

import { useEffect, useRef, useState } from 'react'

type HomeCountUpProps = {
  /** Final stat text, e.g. "+25%", "10-30", "22". */
  value: string
  className?: string
  durationMs?: number
}

type Segment = { text: string; numeric: boolean }

function splitSegments(value: string): Segment[] {
  const segments: Segment[] = []
  const pattern = /\d+/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: value.slice(lastIndex, match.index), numeric: false })
    }
    segments.push({ text: match[0], numeric: true })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < value.length) {
    segments.push({ text: value.slice(lastIndex), numeric: false })
  }

  return segments
}

function easeOut(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

/**
 * Counts every number inside `value` up from zero the first time the stat
 * scrolls into view. Falls back to static text for reduced motion, missing
 * IntersectionObserver support, or values without digits. A hidden copy of
 * the final value reserves layout space so cards never shift while counting.
 */
export default function HomeCountUp({
  value,
  className,
  durationMs = 1300,
}: HomeCountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const segments = splitSegments(value)
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (
      reducedMotion ||
      typeof IntersectionObserver === 'undefined' ||
      !segments.some((segment) => segment.numeric)
    ) {
      return
    }

    // Stats already on screen at hydration stay static; dropping them to zero
    // after they were visible would read as a glitch, not an animation.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.88) {
      return
    }

    let started = false

    const renderProgress = (progress: number) => {
      setDisplay(
        segments
          .map((segment) =>
            segment.numeric
              ? String(Math.round(Number(segment.text) * progress))
              : segment.text,
          )
          .join(''),
      )
    }

    const start = () => {
      if (started) return
      started = true

      const startTime = performance.now()

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startTime) / durationMs)
        renderProgress(easeOut(progress))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick)
        }
      }

      renderProgress(0)
      frameRef.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )

    renderProgress(0)
    observer.observe(node)

    return () => {
      observer.disconnect()
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [durationMs, value])

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className ?? ''}`}>
      <span aria-hidden="true" className="invisible">
        {value}
      </span>
      <span className="absolute inset-0">{display}</span>
    </span>
  )
}

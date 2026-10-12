'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type InfinityRotatingWordProps = {
  words: readonly string[]
  /** CSS module class applying the word-in animation. */
  animationClassName: string
  /** Fill for the visible word (e.g. `text-spectrum`). */
  wordClassName?: string
  /** Trailing punctuation that travels with the word (e.g. "."). */
  suffix?: string
  intervalMs?: number
}

/**
 * Cycles through owner-valued deliverable names in the Prism Infinity hero.
 *
 * Server-renders the first word so crawlers, no-JS visitors, and the LCP
 * paint all see real copy. A hidden stack of every word reserves the widest
 * layout slot so the headline never shifts while cycling. Reduced-motion
 * users keep the static first word.
 */
export default function InfinityRotatingWord({
  words,
  animationClassName,
  wordClassName,
  suffix = '',
  intervalMs = 2400,
}: InfinityRotatingWordProps) {
  const [index, setIndex] = useState(0)
  const [cycling, setCycling] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || words.length < 2) return

    intervalRef.current = window.setInterval(() => {
      setCycling(true)
      setIndex((current) => (current + 1) % words.length)
    }, intervalMs)

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [intervalMs, words.length])

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.08em] align-baseline">
      {/* Invisible copies reserve the widest word's space: no layout shift. */}
      {words.map((word) => (
        <span
          key={word}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
          {suffix}
        </span>
      ))}
      <span
        key={cycling ? words[index] : 'static'}
        className={cn(
          'col-start-1 row-start-1 whitespace-nowrap',
          cycling && animationClassName,
          wordClassName,
        )}
      >
        {words[index]}
        {suffix}
      </span>
    </span>
  )
}

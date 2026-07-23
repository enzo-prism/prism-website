'use client'

import { useEffect, useRef, useState } from 'react'

type InfinityRotatingWordProps = {
  words: readonly string[]
  /** CSS module class applying the word-in animation. */
  animationClassName: string
  /** Trailing punctuation that travels with the word (e.g. "."). */
  suffix?: string
  intervalMs?: number
}

/**
 * Cycles through service words in the Prism Infinity hero headline.
 *
 * Server-renders the first word so crawlers, no-JS visitors, and the LCP
 * paint all see real copy. A hidden stack of every word reserves the widest
 * layout slot so the headline never shifts while cycling. Reduced-motion
 * users keep the static first word.
 */
export default function InfinityRotatingWord({
  words,
  animationClassName,
  suffix = '',
  intervalMs = 2200,
}: InfinityRotatingWordProps) {
  const [index, setIndex] = useState(0)
  const [cycling, setCycling] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || words.length < 2) return

    setCycling(true)
    intervalRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, intervalMs)

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [intervalMs, words.length])

  return (
    <span className="relative inline-grid overflow-hidden align-baseline">
      {/* Invisible copies reserve the widest word's space — no layout shift. */}
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
        className={`col-start-1 row-start-1 whitespace-nowrap ${
          cycling ? animationClassName : ''
        }`}
      >
        <span className="text-[#d8bc79]">{words[index]}</span>
        {suffix ? <span className="text-[#f5f0e8]">{suffix}</span> : null}
      </span>
    </span>
  )
}

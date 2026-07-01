'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'

import CoverFlowStaticFallback from '@/components/home/CoverFlowStaticFallback'
import type { HomepageClientWinSlide } from '@/components/home/homepage-content'

type DeckProps = { slides: readonly HomepageClientWinSlide[] }

/**
 * Defers the interactive 3D cover-flow deck (and its framer-motion
 * dependency, ~55KB gzipped together) until the section approaches the
 * viewport. Until then — and in the server HTML — it renders the static
 * card rail, so the case-study links stay crawlable and nothing shifts
 * for no-JS visitors.
 */
export default function HomeClientCoverFlowLazy({ slides }: DeckProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [Deck, setDeck] = useState<ComponentType<DeckProps> | null>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      // Start loading well before the deck scrolls into view so the swap
      // happens off-screen.
      { rootMargin: '600px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || Deck) return

    let cancelled = false
    void import('@/components/home/HomeClientCoverFlow').then((mod) => {
      if (!cancelled) setDeck(() => mod.default)
    })

    return () => {
      cancelled = true
    }
  }, [shouldLoad, Deck])

  return (
    <div ref={containerRef}>
      {Deck ? (
        <Deck slides={slides} />
      ) : (
        <CoverFlowStaticFallback slides={slides} />
      )}
    </div>
  )
}

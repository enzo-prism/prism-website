'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

import impossibleStyles from '@/components/home/HomeImpossibleHero.module.css'
import styles from '@/components/home/HomeScrollCue.module.css'
import { cn } from '@/lib/utils'

const HERO_SECTION_ID = 'home-impossible-hero'

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * The quiet scroll cue under the Impossible hero tagline. A client island:
 * the scene itself stays a zero-JS server component; only this cue observes
 * scroll (rAF-throttled tone shift) and hero visibility (dismiss past the
 * hero). Server-rendered markup is the static still, so no-JS visitors see
 * exactly the resting cue.
 */
export default function HomeScrollCue() {
  const motionRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = motionRef.current
    if (!node || typeof window === 'undefined') return
    if (prefersReducedMotion()) return

    let ticking = false
    let rafId: number | null = null

    const heroHeight = () =>
      document.getElementById(HERO_SECTION_ID)?.clientHeight ||
      window.innerHeight

    const updateTone = () => {
      ticking = false
      rafId = null
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / (heroHeight() * 0.6)),
      )
      node.style.setProperty('--cue-tone', progress.toFixed(3))
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      rafId = window.requestAnimationFrame(updateTone)
    }

    updateTone()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const hero = document.getElementById(HERO_SECTION_ID)
    const observer =
      hero && typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  node.removeAttribute('data-cue-dismissed')
                } else {
                  node.setAttribute('data-cue-dismissed', 'true')
                }
              }
            },
            { threshold: 0.15 },
          )
        : null
    observer?.observe(hero as Element)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer?.disconnect()
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <a
      href="#homepage-hero"
      data-testid="home-scroll-cue"
      className={cn(
        'relative z-10 mt-8 flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 sm:mt-10',
        styles.row,
        impossibleStyles.cue,
      )}
    >
      <span
        ref={motionRef}
        className={cn('flex items-center gap-2.5', styles.motion)}
      >
        <ChevronDown
          aria-hidden="true"
          focusable="false"
          className="h-3 w-3"
        />
        scroll
      </span>
    </a>
  )
}

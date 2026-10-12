'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import styles from './stories.module.css'

/** Keep in sync with the deck rules in stories.module.css. */
const DECK_QUERY = '(min-width: 1024px) and (min-height: 760px)'
const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
const STACK_GAP_REM = 1.25
const STACK_STEP_REM = 0.875
const STACK_BOTTOM_PX = 12

/**
 * The story list. Server-rendered panels come in as children; this island
 * only writes two numbers per panel while the section is on screen:
 *
 * - `--recede` (0..1): how far the next panel has slid over this one, and
 *   `--depth` (how many panels sit on top of it), which the CSS turns into
 *   a small scale-down and dim on lg+ (the stacked deck).
 * - `data-playing`: whether the captures inside a panel should browse. Only
 *   panels that are on screen and not buried under the next one play.
 *
 * It also sets `data-fit` on the list: the deck only turns sticky when the
 * tallest story fits under the header with every card stacked above it.
 * No JS or a short viewport leaves the plain stack (the finished frame).
 */
export function StoriesDeck({
  children,
  className,
  'aria-label': ariaLabel,
}: {
  children: ReactNode
  className?: string
  'aria-label'?: string
}) {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (
      !list ||
      typeof window.matchMedia !== 'function' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return
    }

    const items = Array.from(list.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    )
    const deckQuery = window.matchMedia(DECK_QUERY)
    const motionQuery = window.matchMedia(MOTION_QUERY)
    const visible = new Set<Element>()
    const written = new Map<HTMLElement, string>()
    let frame = 0
    let listening = false
    let fits = false

    const measure = () => {
      if (!deckQuery.matches || items.length === 0) {
        fits = false
      } else {
        const root = getComputedStyle(document.documentElement)
        const rem = parseFloat(root.fontSize) || 16
        const header =
          parseFloat(root.getPropertyValue('--prism-header-height')) || 64
        const lastTop =
          header + (STACK_GAP_REM + (items.length - 1) * STACK_STEP_REM) * rem
        const tallest = Math.max(...items.map((item) => item.offsetHeight))
        fits = lastTop + tallest + STACK_BOTTOM_PX <= window.innerHeight
      }
      const value = fits ? 'true' : 'false'
      if (list.dataset.fit !== value) list.dataset.fit = value
    }

    const render = () => {
      frame = 0
      const motion = motionQuery.matches
      // The dim runs whenever the deck is sticky (reduced motion included),
      // so stacked cards never overlap at full brightness; only the scale
      // and the browse loop are motion.
      const deck = fits
      const recede = items.map(() => 0)

      if (deck) {
        const rects = items.map((item) => item.getBoundingClientRect())
        for (let index = 0; index < items.length - 1; index += 1) {
          const current = rects[index]
          const next = rects[index + 1]
          const covered = (current.bottom - next.top) / (current.height * 0.94)
          recede[index] = Math.min(1, Math.max(0, covered))
        }
      }

      items.forEach((item, index) => {
        let depth = 0
        for (let j = index; j < recede.length; j += 1) depth += recede[j]
        const playing =
          motion && visible.has(item) && recede[index] < 0.55 ? 'true' : 'false'
        const signature = `${recede[index].toFixed(3)}|${depth.toFixed(3)}|${playing}`
        if (written.get(item) === signature) return
        written.set(item, signature)
        item.style.setProperty('--recede', recede[index].toFixed(3))
        item.style.setProperty('--depth', depth.toFixed(3))
        item.dataset.playing = playing
      })
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    const setListening = (next: boolean) => {
      if (next === listening) return
      listening = next
      if (next) {
        window.addEventListener('scroll', schedule, { passive: true })
      } else {
        window.removeEventListener('scroll', schedule)
      }
    }

    const itemObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setListening(visible.size > 0)
        schedule()
      },
      { threshold: 0.12 },
    )
    items.forEach((item) => itemObserver.observe(item))

    // Panel heights change with fonts, images and the viewport.
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(remeasure)
    resizeObserver?.observe(list)
    window.addEventListener('resize', remeasure)
    deckQuery.addEventListener('change', remeasure)
    motionQuery.addEventListener('change', remeasure)
    remeasure()

    return () => {
      itemObserver.disconnect()
      resizeObserver?.disconnect()
      setListening(false)
      window.removeEventListener('resize', remeasure)
      deckQuery.removeEventListener('change', remeasure)
      motionQuery.removeEventListener('change', remeasure)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ol
      ref={listRef}
      aria-label={ariaLabel}
      className={cn(styles.deck, className)}
    >
      {children}
    </ol>
  )
}

export default StoriesDeck

'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
  as?: ElementType
}

// Every Reveal instance uses the same observer options, so one shared
// IntersectionObserver can drive them all. (Pages render hundreds of
// Reveals; an observer per instance wastes memory and main-thread time
// without changing when anything is revealed.)
const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.08,
}

let sharedObserver: IntersectionObserver | null = null
const sharedCallbacks = new WeakMap<Element, () => void>()

function observeReveal(node: Element, onIntersect: () => void) {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        sharedCallbacks.get(entry.target)?.()
        sharedCallbacks.delete(entry.target)
        sharedObserver?.unobserve(entry.target)
      }
    }, REVEAL_OBSERVER_OPTIONS)
  }

  sharedCallbacks.set(node, onIntersect)
  sharedObserver.observe(node)

  return () => {
    sharedCallbacks.delete(node)
    sharedObserver?.unobserve(node)
  }
}

/**
 * Scroll reveal for redesigned routes. Server HTML is the finished frame:
 * nothing is hidden until hydration, and only elements that start below the
 * fold are hidden and then revealed, so crawlers, no-JS and reduced-motion
 * visitors always see the content.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Component = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static')

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || typeof IntersectionObserver === 'undefined') return
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return

    setState('hidden')
    return observeReveal(node, () => setState('shown'))
  }, [])

  return (
    <Component
      ref={ref}
      data-reveal={state}
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  )
}

export default Reveal

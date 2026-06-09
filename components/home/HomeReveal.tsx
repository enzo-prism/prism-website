'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

type HomeRevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds applied to the reveal transition. */
  delay?: number
}

/**
 * Progressive scroll reveal for homepage sections.
 *
 * Server-rendered content stays fully visible until hydration. After mount,
 * only elements still below the viewport are hidden and revealed on
 * intersection, so no-JS visitors, crawlers, and reduced-motion users always
 * see the content immediately.
 */
export default function HomeReveal({
  children,
  className,
  delay = 0,
}: HomeRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'revealed'>(
    'static',
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      return
    }

    // Anything already in (or near) the viewport stays visible; animating it
    // after hydration would read as a flash instead of a reveal.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) {
      return
    }

    setState('hidden')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('revealed')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.1 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-home-reveal={state}
      className={cn('home-reveal', className)}
      style={{ '--home-reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

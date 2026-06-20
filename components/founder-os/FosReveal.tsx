'use client'

import { useEffect } from 'react'

/**
 * Progressive scroll reveal for the Founder OS surface.
 *
 * Server-rendered content stays fully visible until hydration. After mount,
 * and only when motion is allowed, content still below the viewport is
 * hidden and revealed on intersection. No-JS visitors, crawlers, and
 * reduced-motion users always see everything immediately.
 *
 * Targets each section's primary content block automatically, plus any element
 * explicitly marked with `data-fos-reveal`.
 */
export default function FosReveal() {
  useEffect(() => {
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || typeof IntersectionObserver === 'undefined') return

    const surface = document.querySelector('[data-surface="founder-os"]')
    if (!surface) return

    const targets: Element[] = []
    surface.querySelectorAll('main > section').forEach((section) => {
      const content = section.querySelector(':scope > div')
      if (content) targets.push(content)
    })
    surface.querySelectorAll('[data-fos-reveal]').forEach((el) => {
      if (!targets.includes(el)) targets.push(el)
    })
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-fos-reveal', 'in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    for (const el of targets) {
      const rect = el.getBoundingClientRect()
      // Anything already in (or near) the viewport stays visible, since animating it
      // after hydration would read as a flash rather than a reveal.
      if (rect.top < window.innerHeight * 0.92) {
        el.setAttribute('data-fos-reveal', 'in')
      } else {
        el.setAttribute('data-fos-reveal', 'pending')
        observer.observe(el)
      }
    }

    return () => observer.disconnect()
  }, [])

  return null
}

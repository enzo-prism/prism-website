'use client'

import { useEffect } from 'react'

// Marquee rails, explicit loop containers, and every section of the page:
// most decorative loops live inside a section, so pausing an off-screen
// section pauses them without each component opting in.
const LOOP_SELECTOR = '.prism-marquee, [data-loop], main section'

/**
 * Pauses every infinite loop while it is off screen (DESIGN.md "Motion":
 * never spending GPU or battery where nobody can see it). Marks marquee
 * rails, `[data-loop]` containers and page sections `data-offscreen="true"`
 * outside the viewport; app/globals.css pauses the animations inside, so a
 * one-shot entrance also waits until it is seen. Mounted once in the root
 * layout; renders nothing.
 */
export function LoopVisibility() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.setAttribute('data-offscreen', entry.isIntersecting ? 'false' : 'true')
        }
      },
      { rootMargin: '120px 0px' },
    )

    const observed = new WeakSet<Element>()
    const scan = (root: ParentNode) => {
      root.querySelectorAll(LOOP_SELECTOR).forEach((element) => {
        if (observed.has(element)) return
        observed.add(element)
        observer.observe(element)
      })
    }

    scan(document)

    // Client-side navigations mount new sections without a reload.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(LOOP_SELECTOR) && !observed.has(node)) {
              observed.add(node)
              observer.observe(node)
            }
            scan(node)
          }
        })
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}

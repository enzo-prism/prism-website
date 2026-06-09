'use client'

import { useEffect } from 'react'

const HASH_SCROLL_GAP_PX = 24
const HASH_SCROLL_RETRIES_MS = [0, 80, 240, 600, 1200]
// If the page has moved further than this from the last anchored position,
// treat it as an intentional scroll and stop issuing corrections.
const EXTERNAL_SCROLL_TOLERANCE_PX = 24

function getHashTargetScrollTop(): number | null {
  const hash = window.location.hash
  if (!hash) return null

  const id = decodeURIComponent(hash.slice(1))
  const target = document.getElementById(id)
  if (!target) return null

  const headerHeight =
    document.querySelector('header')?.getBoundingClientRect().height ?? 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY

  return Math.max(0, targetTop - headerHeight - HASH_SCROLL_GAP_PX)
}

export default function HomeHashScrollStabilizer() {
  useEffect(() => {
    const timeoutIds = new Set<number>()
    let lastAnchoredScrollY: number | null = null
    let abandoned = false

    // Anchor the hash target below the fixed header. Retries keep anchoring
    // until they succeed once (the target may not exist before hydration) and
    // keep correcting afterwards, because layout above the target can shift
    // late (font swaps, deferred media). The moment the visitor scrolls away
    // from the anchored position, all further corrections stop so the page
    // never fights manual scrolling.
    const anchorOrCorrect = () => {
      if (abandoned) return

      if (
        lastAnchoredScrollY !== null &&
        Math.abs(window.scrollY - lastAnchoredScrollY) >
          EXTERNAL_SCROLL_TOLERANCE_PX
      ) {
        abandoned = true
        return
      }

      const top = getHashTargetScrollTop()
      if (top === null) return

      window.scrollTo({ behavior: 'auto', top })
      lastAnchoredScrollY = window.scrollY
    }

    const scheduleHashScroll = () => {
      if (!window.location.hash) return

      lastAnchoredScrollY = null
      abandoned = false

      for (const delay of HASH_SCROLL_RETRIES_MS) {
        const timeoutId = window.setTimeout(() => {
          timeoutIds.delete(timeoutId)
          anchorOrCorrect()
        }, delay)

        timeoutIds.add(timeoutId)
      }
    }

    scheduleHashScroll()
    window.addEventListener('hashchange', scheduleHashScroll)

    if ('fonts' in document) {
      document.fonts.ready
        .then(() => anchorOrCorrect())
        .catch(() => {
          // Font readiness is a best-effort correction signal only.
        })
    }

    return () => {
      window.removeEventListener('hashchange', scheduleHashScroll)
      for (const timeoutId of timeoutIds) {
        window.clearTimeout(timeoutId)
      }
      timeoutIds.clear()
    }
  }, [])

  return null
}

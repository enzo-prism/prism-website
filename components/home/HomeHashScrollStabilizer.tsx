'use client'

import { useEffect } from 'react'

const HASH_SCROLL_GAP_PX = 24
const HASH_SCROLL_RETRIES_MS = [0, 80, 240, 600]

function scrollCurrentHashIntoPosition() {
  const hash = window.location.hash
  if (!hash) return

  const id = decodeURIComponent(hash.slice(1))
  const target = document.getElementById(id)
  if (!target) return

  const headerHeight =
    document.querySelector('header')?.getBoundingClientRect().height ?? 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY

  window.scrollTo({
    behavior: 'auto',
    top: Math.max(0, targetTop - headerHeight - HASH_SCROLL_GAP_PX),
  })
}

export default function HomeHashScrollStabilizer() {
  useEffect(() => {
    const timeoutIds = new Set<number>()

    const scheduleHashScroll = () => {
      for (const delay of HASH_SCROLL_RETRIES_MS) {
        const timeoutId = window.setTimeout(() => {
          scrollCurrentHashIntoPosition()
          timeoutIds.delete(timeoutId)
        }, delay)

        timeoutIds.add(timeoutId)
      }
    }

    scheduleHashScroll()
    window.addEventListener('hashchange', scheduleHashScroll)

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

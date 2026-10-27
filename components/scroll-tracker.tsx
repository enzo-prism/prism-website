"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackScrollMilestone } from "@/utils/analytics"

export default function ScrollTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const tracked = new Set<number>()
    let frame = 0

    const sampleScroll = () => {
      frame = 0
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      if (documentHeight <= 0) return
      const scrollPercentage = Math.max(0, Math.min(100, (scrollPosition / documentHeight) * 100))

      for (const milestone of [25, 50, 75, 100]) {
        // Treat the last 5% as complete to allow for sticky/footer geometry.
        if (scrollPercentage >= (milestone === 100 ? 95 : milestone) && !tracked.has(milestone)) {
          tracked.add(milestone)
          trackScrollMilestone(milestone, document.title)
        }
      }
    }

    // Coalesce scroll events to one geometry sample per animation frame:
    // scrollHeight reads can force layout, and milestones do not need
    // per-event resolution. The sampled values and fired events are the same.
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sampleScroll)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return null // This component doesn't render anything
}

"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackScrollMilestone } from "@/utils/analytics"

export default function ScrollTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const tracked = new Set<number>()

    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  return null // This component doesn't render anything
}

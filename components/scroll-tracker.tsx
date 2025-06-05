"use client"

import { useEffect, useRef } from "react"
import { trackScrollMilestone } from "@/utils/analytics"

export default function ScrollTracker() {
  const tracked25 = useRef(false)
  const tracked50 = useRef(false)
  const tracked75 = useRef(false)
  const tracked100 = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.body.scrollHeight
      const scrollPercentage = (scrollPosition / documentHeight) * 100

      if (scrollPercentage >= 25 && !tracked25.current) {
        trackScrollMilestone(25, document.title)
        tracked25.current = true
      }

      if (scrollPercentage >= 50 && !tracked50.current) {
        trackScrollMilestone(50, document.title)
        tracked50.current = true
      }

      if (scrollPercentage >= 75 && !tracked75.current) {
        trackScrollMilestone(75, document.title)
        tracked75.current = true
      }

      if (scrollPercentage >= 95 && !tracked100.current) {
        trackScrollMilestone(100, document.title)
        tracked100.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null // This component doesn't render anything
}

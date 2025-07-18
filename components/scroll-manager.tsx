"use client"

import { useEffect } from "react"
import { initializeScrollOptimizations, isTouchDevice, optimizeTouchScrolling } from "@/utils/scroll-optimization"

export default function ScrollManager() {
  useEffect(() => {
    // Initialize all scroll optimizations
    initializeScrollOptimizations()

    // Additional mobile-specific optimizations
    if (isTouchDevice()) {
      // Optimize main scrollable areas
      const scrollableElements = document.querySelectorAll(".scroll-container, [data-scrollable]")
      scrollableElements.forEach((element) => {
        optimizeTouchScrolling(element as HTMLElement)
      })

      // Prevent zoom on double tap for better UX
      let lastTouchEnd = 0
      document.addEventListener(
        "touchend",
        (e) => {
          const now = new Date().getTime()
          if (now - lastTouchEnd <= 300) {
            e.preventDefault()
          }
          lastTouchEnd = now
        },
        { passive: false },
      )

      // Improve scroll momentum on iOS
      ;(document.body.style as any).webkitOverflowScrolling = "touch"
      ;(document.documentElement.style as any).webkitOverflowScrolling = "touch"
    }

    // Optimize for different screen sizes
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const handleMobileChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Mobile optimizations
        document.body.classList.add("mobile-optimized")
        document.documentElement.style.setProperty("scroll-behavior", "smooth")
      } else {
        // Desktop optimizations
        document.body.classList.remove("mobile-optimized")
      }
    }

    mediaQuery.addListener(handleMobileChange)
    handleMobileChange(mediaQuery as any) // Initial check

    // Cleanup
    return () => {
      mediaQuery.removeListener(handleMobileChange)
    }
  }, [])

  return null // This component doesn't render anything
}

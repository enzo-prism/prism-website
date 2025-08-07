"use client"

import { initializeScrollOptimizations, isTouchDevice, optimizeTouchScrolling } from "@/utils/scroll-optimization"
import { useEffect } from "react"

export default function ScrollManager() {
  useEffect(() => {
    // Detect Safari desktop more accurately
    const isSafariDesktop = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && 
                           !('ontouchstart' in window) && 
                           !navigator.maxTouchPoints &&
                           !window.matchMedia("(pointer: coarse)").matches
    
    // Initialize scroll optimizations only for non-Safari desktop
    if (!isSafariDesktop) {
      initializeScrollOptimizations()
    }

    // Additional mobile-specific optimizations
    if (isTouchDevice() && !isSafariDesktop) {
      // Optimize main scrollable areas
      const scrollableElements = document.querySelectorAll(".scroll-container, [data-scrollable]")
      scrollableElements.forEach((element) => {
        optimizeTouchScrolling(element as HTMLElement)
      })

      // Removed double-tap zoom prevention to allow accessibility-friendly zoom

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
        // Only apply smooth scroll on mobile, not on desktop Safari
        if (!isSafariDesktop) {
          document.documentElement.style.setProperty("scroll-behavior", "smooth")
        }
      } else {
        // Desktop optimizations
        document.body.classList.remove("mobile-optimized")
        // Always remove smooth scroll on Safari desktop
        if (isSafariDesktop) {
          document.documentElement.style.removeProperty("scroll-behavior")
          document.documentElement.classList.remove("scroll-smooth")
          document.body.style.removeProperty("scroll-behavior")
        }
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

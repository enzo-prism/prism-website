"use client"

import { UseInViewOptions, Variants } from "framer-motion"
import { useEffect, useState } from "react"

interface DeviceCapabilities {
  isMobile: boolean
  isLowEnd: boolean
  supportsGPU: boolean
  prefersReducedMotion: boolean
}

export function useMobileAnimations() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    supportsGPU: true,
    prefersReducedMotion: false,
  })

  useEffect(() => {
    const checkDeviceCapabilities = () => {
      // Check if mobile device
      const isMobile = 
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth <= 768

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      // Estimate if device is low-end based on various factors
      const isLowEnd = (() => {
        // Check for low memory (if available)
        const deviceMemory = (navigator as any).deviceMemory
        if (deviceMemory && deviceMemory < 4) return true

        // Check for low core count
        const hardwareConcurrency = navigator.hardwareConcurrency
        if (hardwareConcurrency && hardwareConcurrency < 4) return true

        // Check connection quality
        const connection = (navigator as any).connection
        if (connection) {
          const effectiveType = connection.effectiveType
          if (effectiveType === "slow-2g" || effectiveType === "2g") return true
        }

        // Check if it's an older iOS device
        const isOldIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) &&
          parseInt(
            (navigator.userAgent.match(/OS (\d+)_/) || ["", "0"])[1],
            10
          ) < 12

        return isOldIOS
      })()

      // Check GPU support (simplified check)
      const supportsGPU = (() => {
        try {
          const canvas = document.createElement("canvas")
          const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
          return !!gl
        } catch {
          return false
        }
      })()

      setCapabilities({
        isMobile,
        isLowEnd,
        supportsGPU,
        prefersReducedMotion,
      })
    }

    checkDeviceCapabilities()

    // Re-check on resize
    const handleResize = () => {
      checkDeviceCapabilities()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Return optimized animation settings based on device capabilities
  const getAnimationConfig = () => {
    if (capabilities.prefersReducedMotion) {
      return {
        duration: 0,
        delay: 0,
        staggerChildren: 0,
        useGPU: false,
        complexity: "none" as const,
      }
    }

    if (capabilities.isLowEnd || !capabilities.supportsGPU) {
      return {
        duration: 0.2,
        delay: 0.05,
        staggerChildren: 0.03,
        useGPU: false,
        complexity: "simple" as const,
      }
    }

    if (capabilities.isMobile) {
      return {
        duration: 0.3,
        delay: 0.1,
        staggerChildren: 0.05,
        useGPU: true,
        complexity: "moderate" as const,
      }
    }

    return {
      duration: 0.6,
      delay: 0.2,
      staggerChildren: 0.1,
      useGPU: true,
      complexity: "full" as const,
    }
  }

  // Helper to select appropriate animation variant
  const selectVariant = <T extends Record<string, Variants>>(
    variants: T,
    preference: "mobile" | "simple" | "full" = "full"
  ): Variants => {
    const config = getAnimationConfig()

    if (config.complexity === "none") {
      return {} // No animations
    }

    if (config.complexity === "simple" && variants.mobile) {
      return variants.mobile
    }

    if (config.complexity === "moderate" && variants.mobile) {
      return variants.mobile
    }

    if (preference === "mobile" && variants.mobile) {
      return variants.mobile
    }

    return variants.default || variants.full || {}
  }

  // Get viewport configuration for animations
  const getViewportConfig = (): UseInViewOptions => {
    const config = getAnimationConfig()

    if (capabilities.isLowEnd) {
      return {
        once: true,
        amount: 0.5, // Higher threshold for low-end devices
        margin: "50px",
      }
    }

    if (capabilities.isMobile) {
      return {
        once: true,
        amount: 0.3,
        margin: "20px",
      }
    }

    return {
      once: true,
      amount: 0.2,
      margin: "0px",
    }
  }

  return {
    ...capabilities,
    animationConfig: getAnimationConfig(),
    selectVariant,
    getViewportConfig,
  }
}

// Hook to optimize animation performance on scroll
export function useScrollAnimationOptimization() {
  useEffect(() => {
    let rafId: number | null = null
    let isScrolling = false

    const optimizeAnimations = () => {
      const scrollElements = document.querySelectorAll("[data-scroll-animate]")
      
      scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0

        if (isInViewport && !isScrolling) {
          element.classList.remove("animation-paused")
        } else {
          element.classList.add("animation-paused")
        }
      })
    }

    const handleScroll = () => {
      isScrolling = true

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        optimizeAnimations()
        
        setTimeout(() => {
          isScrolling = false
          optimizeAnimations()
        }, 150)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])
}
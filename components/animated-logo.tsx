"use client"

import { useEffect, useState } from "react"
import CoreImage from "./core-image"
import { LOGO_CONFIG, LOGO_SIZES } from "@/lib/constants"
import { useMobile } from "@/hooks/use-mobile"

export default function AnimatedLogo() {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // For mobile or reduced motion, show immediately without animation
    if (isMobile || mediaQuery.matches) {
      setIsVisible(true)
    } else {
      // Delay the appearance for a subtle entrance on desktop
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 200) // Reduced delay to prevent conflicts
      
      return () => {
        clearTimeout(timer)
        mediaQuery.removeEventListener('change', handleChange)
      }
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isMobile])

  // Skip animation for mobile and reduced motion users
  const shouldAnimate = !isMobile && !prefersReducedMotion
  const animationClasses = shouldAnimate 
    ? `transition-[opacity,transform] duration-700 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`
    : "opacity-100"

  return (
    <div className="relative mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
      <div className={`absolute inset-0 rounded-xl overflow-hidden ${animationClasses}`}>
        <CoreImage
          src={LOGO_CONFIG.src}
          alt={LOGO_CONFIG.alt}
          width={LOGO_SIZES.hero.width}
          height={LOGO_SIZES.hero.height}
          className={`object-contain ${LOGO_CONFIG.className}`}
          sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
          priority
          fallbackSrc={LOGO_CONFIG.fallbackSrc}
          trackingId="animated_logo"
          quality={90}
          showLoadingIndicator={true}
        />
      </div>
    </div>
  )
}

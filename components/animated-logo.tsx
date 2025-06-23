"use client"

import { useEffect, useState } from "react"
import CoreImage from "./core-image"

export default function AnimatedLogo() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay the appearance for a subtle entrance
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
      <div
        className={`absolute inset-0 rounded-xl overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 scale-90"
        }`}
      >
        <CoreImage
          src="/prism-logo-new.svg"
          alt="Prism logo"
          width={96}
          height={96}
          className="object-contain"
          sizes="(max-width: 768px) 64px, (max-width: 1200px) 80px, 96px"
          priority
          fallbackSrc="/prism-logo.jpeg"
          trackingId="animated_logo"
        />
      </div>
    </div>
  )
}

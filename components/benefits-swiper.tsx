"use client"

import { trackBenefitsInteraction } from "@/utils/analytics"
import { throttle } from "@/utils/scroll-optimization"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PixelishImg from "@/components/pixelish/PixelishImg"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

interface BenefitItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  bgColor: string
  iconColor: string
}

const BenefitsSwiper: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      id: 1,
      title: "step-by-step guide",
      description:
        "follow our proven process to 10x your views in 30 days with actionable steps you can implement immediately",
      icon: (
        <PixelishImg
          src="/pixelish/document-letter.svg"
          alt="Guide icon"
          size={36}
          invert={false}
        />
      ),
      bgColor: "bg-amber-50",
      iconColor: "text-rose-600",
    },
    {
      id: 2,
      title: "internal tool map",
      description:
        "access our curated list of the best software and tools to accelerate each step of your growth journey",
      icon: (
        <PixelishImg
          src="/pixelish/kanban.svg"
          alt="Tool map icon"
          size={36}
          invert={false}
        />
      ),
      bgColor: "bg-orange-50",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "seasoned pros community",
      description:
        "connect with entrepreneurs who've already 10x'd their views and bounce ideas off people who've done it successfully",
      icon: (
        <PixelishImg
          src="/pixelish/users.svg"
          alt="Community icon"
          size={36}
          invert={false}
        />
      ),
      bgColor: "bg-blue-50",
      iconColor: "text-green-600",
    },
    {
      id: 4,
      title: "exclusive offers",
      description:
        "get special member-only rates on our professional website and app development services to accelerate your growth",
      icon: (
        <PixelishImg
          src="/pixelish/award-plus.svg"
          alt="Offer icon"
          size={36}
          invert={false}
        />
      ),
      bgColor: "bg-red-50",
      iconColor: "text-purple-600",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchDeltaX = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)

  useEffect(() => {
    if (autoplayPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, autoplayPaused])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = e.targetTouches[0].clientX
    touchDeltaX.current = 0
    setIsDragging(true)
    setAutoplayPaused(true)
  }

  const handleTouchMove = throttle((e: React.TouchEvent) => {
    if (!touchStartX.current) return

    touchEndX.current = e.targetTouches[0].clientX
    touchDeltaX.current = touchStartX.current - touchEndX.current

    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const maxDrag = containerWidth * 0.3
      const rawOffset = -touchDeltaX.current

      if ((currentIndex === 0 && rawOffset > 0) || (currentIndex === benefits.length - 1 && rawOffset < 0)) {
        setDragOffset(rawOffset * 0.3)
      } else {
        setDragOffset(Math.max(Math.min(rawOffset, maxDrag), -maxDrag))
      }
    }
  }, 8)

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const difference = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (difference > minSwipeDistance) {
      nextSlide()
      trackBenefitsInteraction("swipe_left", `slide_${((currentIndex + 1) % benefits.length) + 1}`)
    } else if (difference < -minSwipeDistance) {
      prevSlide()
      trackBenefitsInteraction("swipe_right", `slide_${((currentIndex - 1 + benefits.length) % benefits.length) + 1}`)
    }

    touchStartX.current = null
    touchEndX.current = null
    setIsDragging(false)
    setDragOffset(0)

    setTimeout(() => setAutoplayPaused(false), 3000)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    trackBenefitsInteraction("next_button", `slide_${((currentIndex + 1) % benefits.length) + 1}`)
  }, [benefits.length, currentIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + benefits.length) % benefits.length)
    trackBenefitsInteraction("prev_button", `slide_${((currentIndex - 1 + benefits.length) % benefits.length) + 1}`)
  }, [benefits.length, currentIndex])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    trackBenefitsInteraction("indicator_click", `slide_${index + 1}`)
    setAutoplayPaused(true)
    setTimeout(() => setAutoplayPaused(false), 3000)
  }, [])

  return (
    <div className="relative w-full max-w-[90vw] mx-auto">
      <div className="absolute top-1/2 left-0 right-0 -mt-6 flex justify-between z-10 px-1" style={{ touchAction: 'manipulation' }}>
        <Button
          onClick={prevSlide}
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
          aria-label="Previous benefit"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" focusable="false" />
        </Button>
        <Button
          onClick={nextSlide}
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
          aria-label="Next benefit"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" focusable="false" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden rounded-xl hardware-accelerated mobile-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className={`flex ${isDragging ? "" : "transition-transform duration-300 ease-in-out"} hardware-accelerated`}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            willChange: isDragging ? "transform" : "auto",
          }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="w-full shrink-0 px-4">
              <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border">
                <div
                  className={`mb-6 ${benefit.bgColor} rounded-full aspect-square w-16 flex items-center justify-center`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 lowercase">{benefit.title}</h3>
                <p className="text-neutral-600 lowercase">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corrected Indicators */}
      <div className="mt-6 mb-4 flex justify-center gap-2">
        {benefits.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            type="button"
            variant="ghost"
            size="icon-xs"
            className={`h-2 w-2 rounded-full p-0 transition-colors duration-300 ${
              index === currentIndex ? "bg-neutral-800" : "bg-neutral-300"
            }`}
            aria-label={`Go to benefit ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}

export default BenefitsSwiper

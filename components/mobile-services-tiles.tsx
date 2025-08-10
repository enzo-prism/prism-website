"use client"

import type React from "react"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

// Import the tracking function at the top of the file
import { trackServiceCardClick } from "@/utils/analytics"

// Add the import for scroll optimization utilities
import { throttle } from "@/utils/scroll-optimization"

interface ServiceTile {
  emoji: string
  title: string
  description: string
  href: string
}

export default function MobileServicesTiles() {
  const services: ServiceTile[] = [
    {
      emoji: "🖥️",
      title: "websites",
      description: "attract and convert more leads",
      href: "/websites",
    },
    {
      emoji: "📱",
      title: "apps",
      description: "improve customer experience with delightful software",
      href: "/apps",
    },
    {
      emoji: "🎨",
      title: "design",
      description: "not just how it looks…but how it works, how it feels",
      href: "/designs",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchDeltaX = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRotateInterval = 5000 // 5 seconds per slide

  // Auto-rotate slides
  useEffect(() => {
    if (isPaused) return

    // Progress timer (updates every 50ms)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (50 / autoRotateInterval) * 100
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 50)

    // Slide change timer
    const rotationTimer = setTimeout(() => {
      nextSlide()
      setProgress(0)
    }, autoRotateInterval)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(rotationTimer)
    }
  }, [currentIndex, isPaused])

  // Handle touch events for swiping with improved performance
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = e.targetTouches[0].clientX
    touchDeltaX.current = 0
    setIsDragging(true)
  }

  const handleTouchMove = throttle((e: React.TouchEvent) => {
    if (!touchStartX.current) return

    touchEndX.current = e.targetTouches[0].clientX
    touchDeltaX.current = touchStartX.current - touchEndX.current

    // Calculate drag offset as percentage of container width
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const maxDrag = containerWidth * 0.3 // Limit drag to 30% of container width
      const rawOffset = -touchDeltaX.current

      // Apply resistance when dragging beyond first/last slide
      if ((currentIndex === 0 && rawOffset > 0) || (currentIndex === services.length - 1 && rawOffset < 0)) {
        setDragOffset(rawOffset * 0.3) // Add resistance
      } else {
        setDragOffset(Math.max(Math.min(rawOffset, maxDrag), -maxDrag))
      }
    }
  }, 8) // Increased frequency for smoother touch response

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const difference = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // Minimum swipe distance in pixels

    if (difference > minSwipeDistance) {
      // Swiped left, go to next
      nextSlide()
    } else if (difference < -minSwipeDistance) {
      // Swiped right, go to previous
      prevSlide()
    }

    // Reset touch positions
    touchStartX.current = null
    touchEndX.current = null
    touchDeltaX.current = null
    setIsDragging(false)
    setDragOffset(0)

    // Resume auto-rotation after a short delay
    setTimeout(() => setIsPaused(false), 2000)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    setProgress(0)
  }, [services.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length)
    setProgress(0)
  }, [services.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
    setIsPaused(true)
    // Resume auto-rotation after a short delay
    setTimeout(() => setIsPaused(false), 2000)
  }, [])

  return (
    <div className="relative w-full pt-4 pb-8">
      {/* Swipable container */}
      <div
        ref={containerRef}
        className="overflow-hidden hardware-accelerated mobile-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out hardware-accelerated"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            willChange: isDragging ? "transform" : "auto",
          }}
        >
          {services.map((service, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Link
                href={service.href}
                className="block rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
                onClick={() => trackServiceCardClick(service.title, service.href)}
              >
                <div className="mb-4 text-3xl">{service.emoji}</div>
                <h3 className="mb-2 text-xl font-bold lowercase group-hover:underline">{service.title}</h3>
                <p className="text-neutral-600 lowercase">{service.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-4 mb-4 flex justify-center gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-neutral-800 w-4" : "bg-neutral-400"
            }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator (at bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-200 overflow-hidden">
        <div
          className="h-full bg-neutral-800 transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

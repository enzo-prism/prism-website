"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Add the import for scroll optimization utilities
import { throttle } from "@/utils/scroll-optimization"

interface Step {
  number: number
  title: string
  description: string
}

export default function HowItWorksSlides() {
  const steps: Step[] = [
    {
      number: 1,
      title: "consultation",
      description: "we meet for 30 minutes to discuss your goals and challenges.",
    },
    {
      number: 2,
      title: "proposal",
      description: "if we're a good fit, we'll create a custom proposal for your project.",
    },
    {
      number: 3,
      title: "kickoff",
      description: "once approved, we begin work on your website, app, or designs.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const autoRotateInterval = 5000 // 5 seconds per slide
  const slideContainerRef = useRef<HTMLDivElement>(null)

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

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    setIsSwiping(true)
    touchStartX.current = e.targetTouches[0].clientX
  }

  // Update the touch event handlers to be more efficient
  const handleTouchMove = throttle((e: React.TouchEvent) => {
    if (!touchStartX.current || !slideContainerRef.current) return

    touchEndX.current = e.targetTouches[0].clientX
    const difference = touchStartX.current - e.targetTouches[0].clientX

    // Apply a live transform during swipe for better feedback
    const translateX = -currentIndex * 100 - (difference / slideContainerRef.current.offsetWidth) * 100
    slideContainerRef.current.style.transform = `translateX(${translateX}%)`
  }, 16) // ~60fps

  const handleTouchEnd = () => {
    setIsSwiping(false)
    if (!touchStartX.current || !touchEndX.current || !slideContainerRef.current) {
      // Reset transform if we don't have valid touch points
      if (slideContainerRef.current) {
        slideContainerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
      }
      return
    }

    const difference = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // Minimum swipe distance in pixels

    if (difference > minSwipeDistance) {
      // Swiped left, go to next
      nextSlide()
    } else if (difference < -minSwipeDistance) {
      // Swiped right, go to previous
      prevSlide()
    } else {
      // Not enough distance, reset position
      slideContainerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
    }

    // Reset touch positions
    touchStartX.current = null
    touchEndX.current = null

    // Resume auto-rotation after a short delay
    setTimeout(() => setIsPaused(false), 2000)
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length)
    setProgress(0)
  }, [steps.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + steps.length) % steps.length)
    setProgress(0)
  }, [steps.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
    setIsPaused(true)
    // Resume auto-rotation after a short delay
    setTimeout(() => setIsPaused(false), 2000)
  }, [])

  return (
    <div className="relative w-full pt-4 pb-12">
      {/* Navigation buttons */}
      <div className="flex justify-between mb-4">
        <Button
          onClick={prevSlide}
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm transition-shadow hover:shadow-md active:scale-95"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={nextSlide}
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm transition-shadow hover:shadow-md active:scale-95"
          aria-label="Next step"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Swipable container */}
      <div
        className="overflow-hidden hardware-accelerated rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={slideContainerRef}
          className={`flex ${isSwiping ? "" : "transition-transform duration-300 ease-in-out"} pause-on-scroll`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {steps.map((step, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div
                className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm ${
                  index === currentIndex ? "ring-2 ring-neutral-200" : ""
                }`}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 transform hover:scale-110">
                  <span className="text-3xl">{step.number}</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold lowercase">{step.title}</h3>
                <p className="text-neutral-600 lowercase">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-6 mb-4 flex justify-center gap-2">
        {steps.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            type="button"
            variant="ghost"
            size="icon-xs"
            className={`h-2 w-2 rounded-full p-0 transition-all duration-300 ${
              index === currentIndex ? "bg-neutral-800" : "bg-neutral-300"
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-200 overflow-hidden rounded-full">
        <div
          className="h-full bg-neutral-800 transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Swipe hint text */}
      <p className="text-center text-xs text-neutral-500 mt-4">swipe to navigate</p>
    </div>
  )
}

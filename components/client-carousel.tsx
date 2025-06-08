"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
// Import isTouchDevice from scroll optimization utilities
import { throttle, isTouchDevice } from "@/utils/scroll-optimization"

interface Slide {
  id: number
  title: string
  description: string
  image: string
}

export default function ClientCarousel() {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Town Centre Dental",
      description: "Increased customer conversions with a custom website and local optimization.",
      image: "/town-centre-dental.png",
    },
    {
      id: 2,
      title: "Olympic Bootworks",
      description: "Complete e-commerce solution for selling products online.",
      image: "/olympic-bootworks.png",
    },
    {
      id: 3,
      title: "Christopher B. Wong, DDS",
      description: "Enhanced with a new website, social media, and reputation management.",
      image: "/christopher-wong-dds.png",
    },
    {
      id: 4,
      title: "Belize Kids",
      description: "Modern platform with scheduling and donation features via Stripe.",
      image: "/belize-kids.png",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  // State to store if the device is a touch device, determined on client-side mount
  const [isClientTouchDevice, setIsClientTouchDevice] = useState(false)

  useEffect(() => {
    // Determine if it's a touch device once the component has mounted on the client
    setIsClientTouchDevice(isTouchDevice())
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Auto-advance slides
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    // The throttle function for starting auto-play
    const startAutoPlayThrottled = throttle(() => {
      // Check isAutoPlaying and is-scrolling inside the throttled function
      // to use their current values when the throttled function executes.
      if (isAutoPlaying && typeof document !== "undefined" && !document.body.classList.contains("is-scrolling")) {
        interval = setInterval(() => {
          nextSlide()
        }, 5000) // Change slide every 5 seconds
      }
    }, 200) // Throttle calls to 200ms

    if (isAutoPlaying) {
      startAutoPlayThrottled()
    }

    // Clean up: clear interval when component unmounts or dependencies change
    return () => {
      if (interval) clearInterval(interval)
      // Note: Standard throttle implementations may not have a .cancel() method.
      // The check `if (isAutoPlaying)` inside startAutoPlayThrottled helps prevent
      // starting new intervals if isAutoPlaying became false before throttle executed.
    }
  }, [isAutoPlaying, nextSlide]) // Dependencies for the auto-play effect

  // Pause auto-play on hover, but only for non-touch devices
  const handleMouseEnter = () => {
    if (!isClientTouchDevice) {
      setIsAutoPlaying(false)
    }
  }

  // Resume auto-play on mouse leave, but only for non-touch devices
  const handleMouseLeave = () => {
    if (!isClientTouchDevice) {
      setIsAutoPlaying(true)
    }
  }

  // Get the previous, current, and next slide indices
  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + slides.length) % slides.length
  }

  return (
    <div
      className="relative w-full py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Adding touch-action: pan-y can sometimes help prevent conflicts on mobile,
      // though the primary fix is disabling mouseenter/leave for touch.
      style={{ touchAction: "pan-y" }}
    >
      {/* Carousel container */}
      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center">
          {/* Previous slide (left) */}
          <div className="relative mx-2 transition-all duration-500 ease-in-out opacity-50 scale-75">
            <div className="w-full max-w-[180px] rounded-lg overflow-hidden shadow-sm border">
              <div className="relative" style={{ paddingBottom: "177.78%" }}>
                {" "}
                {/* Aspect ratio container */}
                <Image
                  src={slides[getSlideIndex(-1)].image || "/placeholder.svg?width=180&height=320&text=Previous+Client"}
                  alt={slides[getSlideIndex(-1)].title}
                  width={180}
                  height={320}
                  className="object-cover absolute inset-0 w-full h-full hardware-accelerated"
                  loading="lazy" // Lazy load off-screen images
                />
              </div>
              <div className="bg-white p-3">
                <h3 className="text-sm font-medium truncate">{slides[getSlideIndex(-1)].title}</h3>
              </div>
            </div>
          </div>

          {/* Current slide (center) */}
          <div className="relative mx-2 transition-all duration-500 ease-in-out z-10 scale-100">
            <div className="w-full max-w-[220px] rounded-lg overflow-hidden shadow-md border">
              <div className="relative" style={{ paddingBottom: "177.78%" }}>
                {" "}
                {/* Aspect ratio container */}
                <Image
                  src={slides[currentIndex].image || "/placeholder.svg?width=220&height=391&text=Current+Client"}
                  alt={slides[currentIndex].title}
                  width={220}
                  height={391}
                  className="object-cover absolute inset-0 w-full h-full hardware-accelerated"
                  priority // Prioritize loading the current, visible slide
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="text-base font-bold mb-1">{slides[currentIndex].title}</h3>
                <p className="text-sm text-neutral-600 line-clamp-2">{slides[currentIndex].description}</p>
              </div>
            </div>
          </div>

          {/* Next slide (right) */}
          <div className="relative mx-2 transition-all duration-500 ease-in-out opacity-50 scale-75">
            <div className="w-full max-w-[180px] rounded-lg overflow-hidden shadow-sm border">
              <div className="relative" style={{ paddingBottom: "177.78%" }}>
                {" "}
                {/* Aspect ratio container */}
                <Image
                  src={slides[getSlideIndex(1)].image || "/placeholder.svg?width=180&height=320&text=Next+Client"}
                  alt={slides[getSlideIndex(1)].title}
                  width={180}
                  height={320}
                  className="object-cover absolute inset-0 w-full h-full hardware-accelerated"
                  loading="lazy" // Lazy load off-screen images
                />
              </div>
              <div className="bg-white p-3">
                <h3 className="text-sm font-medium truncate">{slides[getSlideIndex(1)].title}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.preventDefault() // Prevent any default browser action
            prevSlide()
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault() // Prevent any default browser action
            nextSlide()
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex ? "bg-neutral-800 w-4" : "bg-neutral-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

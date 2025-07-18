"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "@/components/image"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"
import { Button } from "@/components/ui/button"

interface WebsiteItem {
  id: string
  title: string
  image: string
  url: string
  category: string
  description: string
  highlight: string
  color: string
  showVisitButton?: boolean // Added optional property
}

interface MobileFirstWebsiteGalleryProps {
  items: WebsiteItem[]
}

export default function MobileFirstWebsiteGallery({ items }: MobileFirstWebsiteGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const activeItem = items[activeIndex]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length)
      }, 4000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, items.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setActiveIndex(index)
  }

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Default to true if showVisitButton is not explicitly set
  const shouldShowVisitButton = activeItem.showVisitButton !== false

  return (
    <div className="w-full">
      {/* Main Image Display - Clean and minimal */}
      <div
        className="relative w-full bg-white overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Mobile Screenshot - Clean presentation */}
            <div className="flex justify-center lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={activeItem.image || "/placeholder.svg"}
                  alt={`${activeItem.title} mobile website`}
                  width={360}
                  height={720}
                  className="object-cover w-full h-full"
                  priority
                  showLoadingIndicator
                  trackingId={`gallery-main-${activeItem.id}`}
                />
              </div>
            </div>

            {/* Website Info - Minimal */}
            <div className="space-y-8 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold lowercase leading-tight text-neutral-900">{activeItem.title}</h2>
                <p className="text-xl text-neutral-600 lowercase leading-relaxed">{activeItem.description}</p>
              </div>

              {/* CTA Button - Conditional Rendering */}
              {shouldShowVisitButton && (
                <div>
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("visit website", activeItem.title)}
                  >
                    <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8 py-4 lowercase">
                      visit site <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows - Minimal design */}
        <div className="hidden lg:block">
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-neutral-900 text-white rounded-full p-4 shadow-lg hover:bg-neutral-800 transition-all"
            aria-label="Previous website"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-neutral-900 text-white rounded-full p-4 shadow-lg hover:bg-neutral-800 transition-all"
            aria-label="Next website"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Controls - Minimal */}
      <div className="bg-white px-4 py-8">
        <div className="container mx-auto">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-3 mb-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-500"
                }`}
                aria-label={`Go to website ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile navigation buttons */}
          <div className="flex items-center justify-center space-x-4 lg:hidden">
            <Button variant="outline" size="sm" onClick={prevSlide} className="rounded-full px-6 py-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              prev
            </Button>

            <Button variant="outline" size="sm" onClick={nextSlide} className="rounded-full px-6 py-2">
              next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

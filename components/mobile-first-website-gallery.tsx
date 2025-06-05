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
  const intervalRef = useRef<NodeJS.Timeout>()

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
      {/* Main Image Display - Full Width on Mobile */}
      <div
        className="relative w-full bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Mobile Screenshot - Larger and more prominent */}
            <div className="flex justify-center lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={activeItem.image || "/placeholder.svg"}
                  alt={`${activeItem.title} mobile website`}
                  width={320}
                  height={640}
                  className="object-cover w-full h-full"
                  priority
                  showLoadingIndicator
                  trackingId={`gallery-main-${activeItem.id}`}
                />
              </div>
            </div>

            {/* Website Info - Streamlined for mobile */}
            <div className="space-y-6 lg:order-1">
              <div className="space-y-3">
                <div
                  className={`inline-block px-4 py-2 ${activeItem.color} rounded-full text-sm font-medium lowercase`}
                >
                  {activeItem.category}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold lowercase leading-tight">{activeItem.title}</h2>
                <p className="text-lg text-neutral-600 lowercase leading-relaxed">{activeItem.description}</p>
              </div>

              {/* Highlight box */}
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-neutral-200">
                <p className="text-neutral-700 lowercase text-sm leading-relaxed">{activeItem.highlight}</p>
              </div>

              {/* CTA Button - Conditional Rendering */}
              {shouldShowVisitButton && (
                <div className="pt-2">
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTAClick("visit website", activeItem.title)}
                  >
                    <Button size="lg" className="rounded-full px-6 py-3 lowercase w-full sm:w-auto">
                      visit website <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all"
            aria-label="Previous website"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all"
            aria-label="Next website"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Controls */}
      <div className="bg-white px-4 py-6">
        <div className="container mx-auto">
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-black" : "bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to website ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile navigation buttons */}
          <div className="flex items-center justify-between md:hidden">
            <Button variant="outline" size="sm" onClick={prevSlide} className="rounded-full px-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              prev
            </Button>

            <span className="text-sm text-neutral-500 lowercase">
              {activeIndex + 1} of {items.length}
            </span>

            <Button variant="outline" size="sm" onClick={nextSlide} className="rounded-full px-4">
              next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Swipe instruction for mobile */}
          <div className="text-center mt-4 md:hidden">
            <p className="text-xs text-neutral-400 lowercase">swipe left or right to browse websites</p>
          </div>
        </div>
      </div>

      {/* Thumbnail Grid - Compact for mobile */}
      <div className="bg-neutral-50 px-4 py-8">
        <div className="container mx-auto">
          <h3 className="text-lg font-semibold lowercase mb-6 text-center">all websites</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                  index === activeIndex
                    ? "ring-2 ring-black ring-offset-2 scale-105"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
              >
                <div className="aspect-[9/16] bg-white p-1 rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.title} thumbnail`}
                    width={80}
                    height={160}
                    className="object-cover w-full h-full rounded"
                    trackingId={`gallery-thumb-${item.id}`}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs font-medium lowercase truncate">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

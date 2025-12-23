"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CoreImage from "@/components/core-image" // Using CoreImage for consistency and optimization

interface Benefit {
  title: string
  description: string
  image: string
  altText: string // Added for better accessibility
}

interface BenefitsSlideshowProps {
  benefits: Benefit[]
}

const BenefitsSlideshow: React.FC<BenefitsSlideshowProps> = ({ benefits }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!benefits || benefits.length === 0) return

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(intervalId)
  }, [benefits])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? benefits.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!benefits || benefits.length === 0) {
    return <div className="text-center py-10 text-neutral-500">Benefits information is currently unavailable.</div>
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg shadow-lg border border-neutral-100">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="w-full flex-shrink-0 bg-white">
              <div className="md:flex md:min-h-[320px]">
                {" "}
                {/* Ensure consistent height */}
                <div className="md:w-1/2 relative">
                  <CoreImage
                    src={benefit.image}
                    alt={benefit.altText || benefit.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-64 md:h-full" // Ensure image fills its container
                    fallbackSrc="/placeholder.svg?height=320&width=400"
                    trackingId={`benefit_slide_image_${index}`}
                  />
                </div>
                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-3 text-neutral-800 lowercase">{benefit.title}</h3>
                  <p className="text-neutral-600 lowercase text-base leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-0 w-full flex justify-center space-x-2.5">
        {benefits.map((_, index) => (
          <Button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
            variant="ghost"
            size="icon-xs"
            className={`h-2.5 w-2.5 rounded-full p-0 transition-all duration-300 ${
              index === currentIndex ? "bg-neutral-700 scale-125" : "bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>

      <Button
        onClick={goToPrevious}
        aria-label="Previous Slide"
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/70 text-neutral-700 shadow-md transition-opacity hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-neutral-500 md:left-4"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        onClick={goToNext}
        aria-label="Next Slide"
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/70 text-neutral-700 shadow-md transition-opacity hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-neutral-500 md:right-4"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default BenefitsSlideshow

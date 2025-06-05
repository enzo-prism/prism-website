"use client"

import { useState } from "react"
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
}

interface MobileWebsiteGalleryProps {
  items: WebsiteItem[]
}

export default function MobileWebsiteGallery({ items }: MobileWebsiteGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const activeItem = items[activeIndex]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">our client websites</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-neutral-600 lowercase">
          mobile-optimized designs that deliver exceptional user experiences
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Mobile Screenshot Display */}
        <div className="flex justify-center">
          <div className="relative w-[300px] max-w-full">
            <Image
              src={activeItem.image || "/placeholder.svg"}
              alt={`${activeItem.title} mobile website screenshot`}
              width={300}
              height={600}
              className="object-contain w-full"
              priority
              showLoadingIndicator
              trackingId={`gallery-main-${activeItem.id}`}
            />
          </div>
        </div>

        {/* Website Info */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-sm lowercase">
            {activeItem.category}
          </div>
          <h3 className="text-3xl font-bold lowercase">{activeItem.title}</h3>
          <p className="text-xl text-neutral-600 lowercase">{activeItem.description}</p>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-medium mb-2 lowercase">highlight</h4>
            <p className="text-neutral-600 lowercase">{activeItem.highlight}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={activeItem.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("visit website", activeItem.title)}
            >
              <Button className="rounded-full lowercase">
                visit website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={prevSlide}
                aria-label="Previous website"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={nextSlide}
                aria-label="Next website"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-sm text-neutral-500 lowercase">
              {activeIndex + 1} of {items.length}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden transition-all rounded ${
              index === activeIndex ? "ring-2 ring-black ring-offset-2" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={`${item.title} thumbnail`}
              width={90}
              height={160}
              className="object-cover w-full h-full"
              trackingId={`gallery-thumb-${item.id}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useCallback, useRef, useState } from "react"
import CoreImage from "@/components/core-image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

type Slide = {
  platform: "instagram" | "youtube" | "tiktok"
  image: string
  caption: string
  alt: string
}

const slides: Slide[] = [
  {
    platform: "instagram",
    image: "/growth/instagram-nvidia-stanford.png",
    caption: "Instagram reel insights — @nvidia @stanford",
    alt: "Instagram reel insights showing reach and interactions",
  },
  {
    platform: "instagram",
    image: "/growth/instagram-hormozi.png",
    caption: "Instagram reel insights — @hormozi",
    alt: "Instagram reel insights for @hormozi showing reach and saves",
  },
  {
    platform: "tiktok",
    image: "/growth/tiktok-video-analysis.png",
    caption: "TikTok video analysis — key metrics",
    alt: "TikTok analytics screenshot showing video analysis metrics",
  },
  {
    platform: "youtube",
    image: "/growth/youtube-analytics.png",
    caption: "YouTube analytics — subscribers and views",
    alt: "YouTube analytics screenshot showing subscribers and views",
  },
]

export default function GrowthResultsSlider() {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [])

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const threshold = 50
    if (distance > threshold) next()
    if (distance < -threshold) prev()
  }

  const current = slides[index]

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">growth results</h2>
        </div>

        {/* Slider */}
        <div className="mx-auto max-w-[420px] sm:max-w-[500px]">
          <div
            className="relative select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* iOS-style device frame */}
            <div className="relative mx-auto w-full aspect-[9/19.5] bg-black rounded-[2rem] border-8 border-black shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />

              {/* Slide image */}
              <CoreImage
                src={current.image}
                alt={current.alt}
                width={1000}
                height={2000}
                className="absolute inset-0 w-full h-full object-cover"
                sizes="(max-width: 640px) 90vw, 500px"
                fallbackSrc={`/placeholder.svg?height=1600&width=900&text=${encodeURIComponent(current.platform)}`}
                quality={90}
              />
            </div>

            {/* Controls */}
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Caption */}
          <p className="mt-4 text-center text-sm text-neutral-600 lowercase">{current.caption}</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link href="/prism-flywheel">
            <Button
              className="rounded-full px-6 py-5 lowercase"
              onClick={() => trackCTAClick("learn more about growth", "growth results section")}
            >
              learn more about growth
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
    platform: "tiktok",
    image: "/growth/tiktok-stats-2.png",
    caption: "TikTok stats — campaign performance snapshot",
    alt: "TikTok analytics view highlighting performance metrics for a campaign",
  },
  {
    platform: "youtube",
    image: "/growth/youtube-analytics.png",
    caption: "YouTube analytics — subscribers and views",
    alt: "YouTube analytics screenshot showing subscribers and views",
  },
]

export default function GrowthResultsSlider() {
  const railRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const { scrollLeft, scrollWidth, clientWidth } = rail
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  useEffect(() => {
    updateScrollState()
  }, [updateScrollState])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    updateScrollState()

    const handleScroll = () => updateScrollState()
    const handleResize = () => updateScrollState()

    rail.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      rail.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [updateScrollState])

  const scrollByAmount = (direction: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return
    if (typeof window === "undefined") return
    const firstCard = rail.firstElementChild as HTMLElement | null
    let amount = Math.max(rail.clientWidth * 0.85, 320)

    if (firstCard) {
      const styles = window.getComputedStyle(rail)
      const gapRaw = styles.columnGap || styles.gap || "0"
      const gap = Number.parseFloat(gapRaw) || 0
      amount = firstCard.getBoundingClientRect().width + gap
    }

    rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  const maskStyle = useMemo(() => {
    if (!canScrollLeft && !canScrollRight) return undefined
    const leftStop = canScrollLeft ? "0%" : "6%"
    const rightStop = canScrollRight ? "100%" : "94%"
    const leftColor = canScrollLeft ? "transparent" : "rgba(0,0,0,1)"
    const rightColor = canScrollRight ? "transparent" : "rgba(0,0,0,1)"

    return {
      maskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 12%, black 88%, ${rightColor} ${rightStop})`,
      WebkitMaskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 12%, black 88%, ${rightColor} ${rightStop})`,
    } as const
  }, [canScrollLeft, canScrollRight])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">growth results</h2>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="relative">
            <div
              ref={railRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-1 scroll-smooth"
              role="list"
              aria-label="growth results"
              style={maskStyle}
            >
              {slides.map((slide, index) => (
                <div
                  key={`${slide.platform}-${slide.image}`}
                  className="w-[82vw] shrink-0 snap-start sm:w-[58vw] md:w-[320px] first:ml-1 md:first:ml-0 last:mr-1 md:last:mr-0"
                  role="listitem"
                >
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[9/19.5] overflow-hidden rounded-[2rem] border-8 border-black bg-black shadow-2xl">
                      <div aria-hidden className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
                      <div className="absolute inset-0">
                        <CoreImage
                          src={slide.image}
                          alt={slide.alt}
                          width={900}
                          height={1600}
                          className="h-full w-full object-cover"
                          sizes="(max-width: 640px) 85vw, 320px"
                          fallbackSrc={`/placeholder.svg?height=1600&width=900&text=${encodeURIComponent(slide.platform)}`}
                          quality={90}
                          priority={index < 2}
                        />
                      </div>
                    </div>
                    <p className="text-center text-sm text-neutral-600 lowercase">{slide.caption}</p>
                  </div>
                </div>
              ))}
              <span className="sr-only">Swipe horizontally to explore more growth results</span>
            </div>

            {canScrollLeft ? (
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"
                aria-hidden="true"
              />
            ) : null}
            {canScrollRight ? (
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"
                aria-hidden="true"
              />
            ) : null}

            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 translate-x-1 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 -translate-x-1 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
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

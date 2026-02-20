"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import PixelishIcon from "@/components/pixelish/PixelishIcon"

type SearchConsoleSlide = {
  src: string
  alt: string
  width: number
  height: number
}

type SearchConsoleSnapshotsRailProps = {
  slides: SearchConsoleSlide[]
  iconSrc: string
}

const SCROLL_TOLERANCE = 8

export default function SearchConsoleSnapshotsRail({
  slides,
  iconSrc,
}: SearchConsoleSnapshotsRailProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateScrollState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return

    const { scrollLeft, scrollWidth, clientWidth } = rail
    setCanScrollLeft(scrollLeft > SCROLL_TOLERANCE)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - SCROLL_TOLERANCE)

    const firstCard = rail.firstElementChild as HTMLElement | null
    if (!firstCard) return

    const styles = window.getComputedStyle(rail)
    const gapRaw = styles.columnGap || styles.gap || "0"
    const gap = Number.parseFloat(gapRaw) || 0
    const step = firstCard.getBoundingClientRect().width + gap
    if (!step) return

    const nextIndex = Math.round(scrollLeft / step)
    const clampedIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1)
    setActiveIndex(clampedIndex)
  }, [slides.length])

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

  const scrollByAmount = useCallback((direction: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return

    const firstCard = rail.firstElementChild as HTMLElement | null
    let amount = Math.max(rail.clientWidth * 0.85, 320)

    if (firstCard) {
      const styles = window.getComputedStyle(rail)
      const gapRaw = styles.columnGap || styles.gap || "0"
      const gap = Number.parseFloat(gapRaw) || 0
      amount = firstCard.getBoundingClientRect().width + gap
    }

    rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }, [])

  return (
    <div className="relative">
      <div className="rounded-3xl border border-border/60 shadow-sm p-4 sm:p-5 bg-card/90">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 bg-background text-xs font-semibold text-foreground">
            search console growth snapshots
          </span>
          <span className="text-xs font-medium text-muted-foreground">scroll to explore</span>
        </div>
        <div className="relative mt-4">
          <div
            ref={railRef}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth overscroll-x-contain scrollbar-hide gap-3 px-1 pb-2 scroll-px-4 sm:gap-4"
            role="list"
            aria-label="Search Console growth snapshots"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                className="w-[88vw] shrink-0 snap-start snap-always sm:w-[420px] lg:w-[460px]"
                role="listitem"
              >
                <div className="space-y-3">
                  <div
                    className="relative w-full overflow-hidden rounded-2xl border border-border/60 shadow-sm bg-white"
                    style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 520px, (min-width: 640px) 460px, 92vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <PixelishIcon src={iconSrc} alt="Search icon" size={18} className="h-4 w-4" />
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      we make Google love your business with SEO (Search Engine Optimization)
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <span className="sr-only">Swipe horizontally to view more growth snapshots</span>
          </div>
          {canScrollLeft ? (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-card/95 to-transparent"
              aria-hidden="true"
            />
          ) : null}
          {canScrollRight ? (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card/95 to-transparent"
              aria-hidden="true"
            />
          ) : null}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount("left")}
            disabled={!canScrollLeft}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm transition hover:bg-card/80 disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount("right")}
            disabled={!canScrollRight}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background shadow-sm transition hover:bg-card/80 disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            {slides.map((slide, index) => (
              <span
                key={slide.src}
                className={
                  activeIndex === index
                    ? "h-1.5 w-8 rounded-full bg-foreground/30"
                    : "h-1.5 w-6 rounded-full bg-muted-foreground/20"
                }
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Search Console growth snapshots
          </span>
        </div>
      </div>
    </div>
  )
}

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
      <div className="rounded-3xl border border-black/8 bg-[#fcfcfb] p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-[#ffffff] px-3 py-1 text-xs font-semibold text-[rgba(15,23,42,0.7)]">
            search console growth snapshots
          </span>
          <span className="text-xs font-medium text-[rgba(15,23,42,0.48)]">
            scroll to explore
          </span>
        </div>
        <div className="relative mt-4">
          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth scrollbar-hide px-1 pb-2 scroll-px-4 sm:gap-4"
            role="list"
            aria-label="Search Console growth snapshots"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                className="w-[88vw] shrink-0 snap-start snap-always sm:w-[420px] lg:w-[460px]"
                role="listitem"
              >
                <div className="space-y-3">
                  <div
                    className="relative w-full overflow-hidden rounded-2xl border border-black/8 bg-[#ffffff] shadow-[0_10px_32px_rgba(15,23,42,0.06)]"
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
                    <span className="text-xs text-[rgba(15,23,42,0.66)] sm:text-sm">
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
              className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#fcfcfb] to-transparent"
              aria-hidden="true"
            />
          ) : null}
          {canScrollRight ? (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#fcfcfb] to-transparent"
              aria-hidden="true"
            />
          ) : null}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount("left")}
            disabled={!canScrollLeft}
            className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-[#ffffff] shadow-sm transition hover:bg-[#f6f4ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount("right")}
            disabled={!canScrollRight}
            className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-[#ffffff] shadow-sm transition hover:bg-[#f6f4ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 sm:flex"
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
                    ? "h-1.5 w-8 rounded-full bg-[rgba(15,23,42,0.34)]"
                    : "h-1.5 w-6 rounded-full bg-[rgba(15,23,42,0.14)]"
                }
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[rgba(15,23,42,0.48)]">
            Search Console growth snapshots
          </span>
        </div>
      </div>
    </div>
  )
}

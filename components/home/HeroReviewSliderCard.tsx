"use client"

import Link from "next/link"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { getHomepageHeroReviewPool, renderFormattedText, type Quote } from "@/content/wall-of-love-data"
import { trackNavigation } from "@/utils/analytics"
import { sanitizeReviewText } from "@/lib/schema-helpers"

const DEFAULT_REVIEW_RATING = {
  "@type": "Rating",
  ratingValue: "5",
  bestRating: "5",
  worstRating: "1",
}

type HeroReviewSliderCardProps = {
  className?: string
}

export default function HeroReviewSliderCard({ className }: HeroReviewSliderCardProps) {
  const reviews = useMemo(() => getHomepageHeroReviewPool(), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const pauseRef = useRef(false)
  const intervalRef = useRef<number | null>(null)
  const activeRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const touchEndRef = useRef<{ x: number; y: number } | null>(null)
  const resumeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const updatePreference = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || reviews.length <= 1) return
    const tick = () => {
      if (pauseRef.current) return
      const next = (activeRef.current + 1) % reviews.length
      setPrevIndex(activeRef.current)
      activeRef.current = next
      setActiveIndex(next)
    }
    intervalRef.current = window.setInterval(tick, 5200)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [prefersReducedMotion, reviews.length])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [])

  const goToIndex = (nextIndex: number) => {
    if (reviews.length === 0) return
    const normalized = (nextIndex + reviews.length) % reviews.length
    setPrevIndex(activeRef.current)
    activeRef.current = normalized
    setActiveIndex(normalized)
  }

  const goNext = () => goToIndex(activeRef.current + 1)
  const goPrev = () => goToIndex(activeRef.current - 1)

  const handleTouchStart = (event: React.TouchEvent) => {
    if (reviews.length <= 1) return
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    touchEndRef.current = { x: touch.clientX, y: touch.clientY }
    pauseRef.current = true
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current)
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = event.touches[0]
    touchEndRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = () => {
    const start = touchStartRef.current
    const end = touchEndRef.current
    touchStartRef.current = null
    touchEndRef.current = null

    if (!start || !end || reviews.length <= 1) {
      resumeTimeoutRef.current = window.setTimeout(() => {
        pauseRef.current = false
      }, 2000)
      return
    }

    const dx = end.x - start.x
    const dy = end.y - start.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    const minSwipeDistance = 40

    if (absDx > minSwipeDistance && absDx > absDy * 1.2) {
      if (dx < 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      pauseRef.current = false
    }, 3000)
  }

  const currentReview = reviews[activeIndex] ?? null
  const heroReviewForSchema = useMemo(() => {
    if (reviews.length === 0) return null
    return reviews.find((quote) => quote.heroSpotlight) ?? reviews[0]
  }, [reviews])

  const slideIndices = useMemo(() => {
    const items = [activeIndex]
    if (prevIndex !== null && prevIndex !== activeIndex) items.push(prevIndex)
    return items
  }, [activeIndex, prevIndex])

  const heroReviewSchema = useMemo(() => {
    if (!heroReviewForSchema) return null
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",
      name: `Review from ${heroReviewForSchema.client}`,
      author: { "@type": "Person", name: heroReviewForSchema.client },
      reviewBody: sanitizeReviewText(heroReviewForSchema.text),
      reviewRating: DEFAULT_REVIEW_RATING,
      itemReviewed: {
        "@type": "Organization",
        "@id": "https://www.design-prism.com/#organization",
        name: "Prism",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.design-prism.com/#organization",
        name: "Prism",
      },
    })
  }, [heroReviewForSchema])

  return (
    <div
      className={cn(
        "w-full max-w-sm sm:max-w-md text-center space-y-3 sm:space-y-4 select-none",
        className
      )}
      onMouseEnter={() => (pauseRef.current = true)}
      onMouseLeave={() => (pauseRef.current = false)}
      onFocusCapture={() => (pauseRef.current = true)}
      onBlurCapture={() => (pauseRef.current = false)}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        <span className="text-sm" aria-hidden>
          ❤️
        </span>
        <span className="tracking-tight">founders love prism</span>
      </div>

      <div className="relative px-1">
        <div
          className="relative mx-auto flex min-h-[190px] max-w-xl items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          {currentReview ? (
            slideIndices.map((idx) => {
              const review = reviews[idx]
              if (!review) return null
              const isActive = idx === activeIndex
              return (
                <div
                  key={review.id}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center space-y-3 px-3 text-center transition duration-300 ease-out",
                    isActive
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-3 z-0 pointer-events-none"
                  )}
                  style={{ willChange: "transform, opacity" }}
                  aria-hidden={!isActive}
                >
                  <p className="text-lg leading-relaxed text-neutral-900 sm:text-xl dark:text-white">
                    &ldquo;{renderFormattedText(review.text)}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{review.client}</p>
                </div>
              )
            })
          ) : (
            <div className="flex w-full items-center justify-center rounded-xl bg-neutral-50 py-10 text-sm text-neutral-400">
              loading…
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href="/wall-of-love"
          onClick={() => trackNavigation("hero_review_card_cta", "/wall-of-love")}
          className="text-xs font-semibold text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
        >
          250+ more
        </Link>
      </div>

      {heroReviewSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: heroReviewSchema }} />}
    </div>
  )
}

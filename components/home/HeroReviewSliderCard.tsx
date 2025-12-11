"use client"

import Link from "next/link"
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const pauseRef = useRef(false)
  const intervalRef = useRef<number | null>(null)
  const activeRef = useRef(0)

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
      activeRef.current = (activeRef.current + 1) % reviews.length
      setActiveIndex(activeRef.current)
    }
    intervalRef.current = window.setInterval(tick, 5200)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [prefersReducedMotion, reviews.length])

  const currentReview = reviews[activeIndex] ?? null
  const heroReviewForSchema = useMemo(() => {
    if (reviews.length === 0) return null
    return reviews.find((quote) => quote.heroSpotlight) ?? reviews[0]
  }, [reviews])

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

  if (!currentReview) {
    return <div className={cn("w-full max-w-sm", className)} />
  }

  const nextIndex = (activeIndex + 1) % reviews.length
  const nextReview = reviews[nextIndex]

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
        <div className="relative mx-auto flex min-h-[170px] max-w-xl items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-3 px-3 text-center transition duration-300 ease-in-out"
            style={{
              opacity: 1,
              transform: "translateY(0)",
              willChange: "transform, opacity",
            }}
            key={currentReview.id}
          >
            <p className="text-lg leading-relaxed text-neutral-900 sm:text-xl dark:text-white">
              &ldquo;{renderFormattedText(currentReview.text)}&rdquo;
            </p>
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{currentReview.client}</p>
          </div>

          {!prefersReducedMotion && nextReview ? (
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center space-y-3 px-3 text-center opacity-0 transition duration-300 ease-in-out"
              style={{
                willChange: "transform, opacity",
                transform: "translateY(12px)",
              }}
              aria-hidden
            >
              <p className="text-lg leading-relaxed text-neutral-900 sm:text-xl dark:text-white">
                &ldquo;{renderFormattedText(nextReview.text)}&rdquo;
              </p>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{nextReview.client}</p>
            </div>
          ) : null}
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

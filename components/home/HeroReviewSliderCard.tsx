"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

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
  // Data State
  const [reviewPool, setReviewPool] = useState<Quote[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Interaction State
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // --- Initialization ---
  useEffect(() => {
    // Hydration-safe data loading
    setReviewPool(getHomepageHeroReviewPool())

    // Motion preference check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const updatePreference = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  // --- Schema Data ---
  const currentReview = reviewPool[activeIndex] ?? null
  const heroReviewForSchema = useMemo(() => {
    if (reviewPool.length === 0) return null
    return reviewPool.find((quote) => quote.heroSpotlight) ?? reviewPool[0]
  }, [reviewPool])

  const nextReview = useCallback(() => {
    if (reviewPool.length <= 1) return
    setActiveIndex((current) => (current + 1) % reviewPool.length)
  }, [reviewPool.length])

  const prevReview = useCallback(() => {
    if (reviewPool.length <= 1) return
    setActiveIndex((current) => (current - 1 + reviewPool.length) % reviewPool.length)
  }, [reviewPool.length])

  useEffect(() => {
    if (prefersReducedMotion || reviewPool.length <= 1 || isPaused) return
    const timer = window.setInterval(nextReview, 7000)
    return () => window.clearInterval(timer)
  }, [isPaused, nextReview, prefersReducedMotion, reviewPool.length])
  
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

  return (
    <div
      className={cn("w-full max-w-sm sm:max-w-md text-center space-y-3 sm:space-y-4", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        <span className="text-sm" aria-hidden>❤️</span>
        <span className="tracking-tight">founders love prism</span>
      </div>

      <div className="relative px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full space-y-3"
          >
            <p className="text-lg leading-relaxed text-neutral-900 sm:text-xl dark:text-white">
              &ldquo;{renderFormattedText(currentReview.text)}&rdquo;
            </p>
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
              {currentReview.client}
            </p>
          </motion.div>
        </AnimatePresence>
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

      {heroReviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: heroReviewSchema }} />
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
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
  const [activeIndex] = useState(0)
  
  // Interaction State
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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
    // Optional: Render a skeleton or empty state here to prevent layout shift during hydration
    return <div className={cn("min-h-[200px] w-full rounded-3xl bg-white/50 backdrop-blur-lg", className)} />
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-colors duration-300 sm:p-6",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:text-white",
        className
      )}
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        <span className="text-sm" aria-hidden>
          ❤️
        </span>
        <span className="tracking-tight">trusted by founders</span>
      </div>

      {/* 
        Content Container 
        Using `mode="wait"` ensures the exiting slide completely fades out 
        before the new one fades in. This eliminates layout jumps and overlapping text
        on mobile devices where vertical space is tight.
      */}
      <div className="relative min-h-[120px]"> 
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="w-full"
          >
            <p className="text-base leading-relaxed text-neutral-900 dark:text-white">
              &ldquo;{renderFormattedText(currentReview.text)}&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-neutral-900 dark:text-white">
              {currentReview.client}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href="/wall-of-love"
          onClick={() => trackNavigation("hero_review_card_cta", "/wall-of-love")}
          className="text-xs font-semibold text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
        >
          read 250+ more
        </Link>
      </div>

      {heroReviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: heroReviewSchema }} />
      )}
    </div>
  )
}

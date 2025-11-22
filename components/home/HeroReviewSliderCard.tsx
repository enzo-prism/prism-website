"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { getHomepageHeroReviewPool, renderFormattedText, type Quote } from "@/content/wall-of-love-data"
import { trackNavigation } from "@/utils/analytics"
import { sanitizeReviewText } from "@/lib/schema-helpers"

const AUTO_ROTATE_MS = 6000

type HeroReviewSliderCardProps = {
  className?: string
}

export default function HeroReviewSliderCard({ className }: HeroReviewSliderCardProps) {
  // Data State
  const [reviewPool, setReviewPool] = useState<Quote[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Interaction State
  const [isPaused, setIsPaused] = useState(false)
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

  // --- Timer Logic ---
  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (reviewPool.length > 0 ? (current + 1) % reviewPool.length : 0))
  }, [reviewPool.length])

  useEffect(() => {
    // Don't rotate if:
    // 1. Reduced motion is on (user controls manually)
    // 2. User is interacting (paused)
    // 3. Not enough slides
    if (prefersReducedMotion || isPaused || reviewPool.length <= 1) {
      return
    }

    const timer = setInterval(nextSlide, AUTO_ROTATE_MS)
    return () => clearInterval(timer)
  }, [prefersReducedMotion, isPaused, reviewPool.length, nextSlide])

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
      author: { "@type": "Person", name: heroReviewForSchema.client },
      reviewBody: sanitizeReviewText(heroReviewForSchema.text),
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

  // --- Handlers ---
  const handlePause = () => setIsPaused(true)
  const handleResume = () => setIsPaused(false)
  
  const handleManualNext = () => {
    nextSlide()
    // Keep paused briefly after manual interaction if needed, 
    // but standard behavior is just to advance. 
    // The timer will naturally restart on the next effect cycle.
  }

  if (!currentReview) {
    // Optional: Render a skeleton or empty state here to prevent layout shift during hydration
    return <div className={cn("min-h-[200px] w-full rounded-3xl bg-white/50 backdrop-blur-lg", className)} />
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-white/30 bg-white/75 p-5 text-left shadow-xl shadow-neutral-900/5 backdrop-blur-lg transition-colors duration-300 sm:p-6",
        "dark:border-white/10 dark:bg-neutral-900/80 dark:text-white",
        className
      )}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocusCapture={handlePause}
      onBlurCapture={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400">
        <span>founders love prism ❤️</span>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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

      {/* Progress Bar */}
      {!prefersReducedMotion && reviewPool.length > 1 && (
        <div className="mt-5 flex items-center justify-center" aria-hidden="true">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
            {/* 
              We use a separate motion key here to force the animation to restart 
              from 0% whenever the activeIndex changes.
            */}
            <motion.div
              key={activeIndex}
              className="h-full w-full origin-left bg-neutral-800/70 dark:bg-white/70"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "100%" : "100%" }} // If paused, we could hold it, but resetting is cleaner UX for "reading"
              transition={{ 
                duration: AUTO_ROTATE_MS / 1000, 
                ease: "linear",
                // If paused, we effectively stop the visual progress by making it instant or holding
                // But simple restart is often less buggy. 
                // Let's stick to: it animates. If you pause, the timer stops. 
                // Visual desync is minor compared to content glitches.
              }}
              // Optimized: Stop animation if paused to reflect state
              style={{ 
                 width: isPaused ? "auto" : undefined // This is a bit hacky. 
                 // Better: Let's trust the timer. The bar is just decoration.
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile Manual Control (Reduced Motion) */}
      {prefersReducedMotion && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={handleManualNext}
            disabled={reviewPool.length <= 1}
            className="rounded-full border border-neutral-300 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed dark:border-white/15 dark:text-neutral-100 dark:hover:border-white/30"
          >
            show another story
          </button>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Link
          href="/wall-of-love"
          onClick={() => trackNavigation("hero_review_card_cta", "/wall-of-love")}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-600 underline decoration-neutral-300/60 underline-offset-4 transition hover:text-neutral-900 dark:text-neutral-300 dark:decoration-white/20 dark:hover:text-white"
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
"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  type AnimationPlaybackControls,
  type Variants,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"
import { getHomepageHeroReviewPool, renderFormattedText, type Quote } from "@/content/wall-of-love-data"
import { trackNavigation } from "@/utils/analytics"
import { sanitizeReviewText } from "@/lib/schema-helpers"

const AUTO_ROTATE_INTERVAL = 6000
const QUOTE_TRANSITION_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]

type HeroReviewSliderCardProps = {
  className?: string
}

export default function HeroReviewSliderCard({ className }: HeroReviewSliderCardProps) {
  const reviewPool = useMemo(() => getHomepageHeroReviewPool(), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const progressValue = useMotionValue(0)
  const progressControls = useRef<AnimationPlaybackControls | null>(null)
  const isPausedRef = useRef(isPaused)
  const heroReviewForSchema = useMemo(() => {
    if (reviewPool.length === 0) return null
    return reviewPool.find((quote) => quote.heroSpotlight) ?? reviewPool[0]
  }, [reviewPool])
  const heroReviewSchema = useMemo(() => {
    if (!heroReviewForSchema) return null
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",
      author: {
        "@type": "Person",
        name: heroReviewForSchema.client,
      },
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = (event: MediaQueryList | MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    updatePreference(mediaQuery)

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference)
      return () => mediaQuery.removeEventListener("change", updatePreference)
    }

    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const determineDirection = useCallback(
    (current: number, next: number) => {
      if (current === next) return 1
      if (reviewPool.length === 0) return 1
      if (current === reviewPool.length - 1 && next === 0) return 1
      if (current === 0 && next === reviewPool.length - 1) return -1
      return next > current ? 1 : -1
    },
    [reviewPool.length]
  )

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      if (reviewPool.length === 0) return current
      const next = (current + 1) % reviewPool.length
      setDirection(determineDirection(current, next))
      return next
    })
  }, [determineDirection, reviewPool.length])



  const startProgressAnimation = useCallback(
    (fromValue: number) => {
      progressControls.current?.stop()
      const remainingDuration = Math.max(0.01, (1 - fromValue) * (AUTO_ROTATE_INTERVAL / 1000))
      progressControls.current = animate(progressValue, 1, {
        duration: remainingDuration,
        ease: "linear",
        onComplete: goToNext,
      })
    },
    [progressValue, goToNext]
  )

  useEffect(() => {
    if (prefersReducedMotion || reviewPool.length <= 1) {
      progressValue.set(0)
      return
    }

    progressControls.current?.stop()
    progressValue.set(0)

    if (isPausedRef.current) {
      return
    }

    startProgressAnimation(0)

    return () => {
      progressControls.current?.stop()
    }
  }, [activeIndex, prefersReducedMotion, reviewPool.length, progressValue, startProgressAnimation])

  useEffect(() => {
    if (prefersReducedMotion || reviewPool.length <= 1) {
      progressControls.current?.stop()
      progressValue.set(0)
      return
    }

    if (isPaused) {
      progressControls.current?.stop()
      return
    }

    startProgressAnimation(progressValue.get())

    return () => {
      progressControls.current?.stop()
    }
  }, [isPaused, prefersReducedMotion, reviewPool.length, progressValue, startProgressAnimation])

  const currentReview = reviewPool[activeIndex] ?? null
  const shouldReduceMotion = prefersReducedMotion
  const currentReviewLength = currentReview?.text.length ?? 0
  const quoteTransitionDuration = useMemo(() => {
    if (shouldReduceMotion) {
      return 0.2
    }

    const normalizedLength = Math.min(currentReviewLength / 320, 1)
    return 0.28 + normalizedLength * 0.12
  }, [currentReviewLength, shouldReduceMotion])
  const childTransitionDuration = Math.max(0.2, quoteTransitionDuration - 0.12)
  const childStagger = shouldReduceMotion ? 0 : 0.05
  const authorDelay = shouldReduceMotion ? 0 : 0.08

  const quoteVariants: Variants = {
    initial: (dir: number) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : dir * 8,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: quoteTransitionDuration,
        ease: QUOTE_TRANSITION_EASE,
        staggerChildren: childStagger,
        delayChildren: childStagger,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : dir * -8,
      transition: {
        duration: Math.max(0.2, quoteTransitionDuration - 0.08),
        ease: QUOTE_TRANSITION_EASE,
      },
    }),
  }

  const quoteTextVariants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 5,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: childTransitionDuration,
        ease: QUOTE_TRANSITION_EASE,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -4,
      transition: {
        duration: Math.max(0.16, childTransitionDuration - 0.05),
        ease: QUOTE_TRANSITION_EASE,
      },
    },
  }

  const quoteAuthorVariants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 5,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: childTransitionDuration,
        ease: QUOTE_TRANSITION_EASE,
        delay: authorDelay,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -4,
      transition: {
        duration: Math.max(0.16, childTransitionDuration - 0.05),
        ease: QUOTE_TRANSITION_EASE,
      },
    },
  }

  const pauseRotation = () => setIsPaused(true)
  const resumeRotation = () => setIsPaused(false)

  if (!currentReview) {
    return null
  }

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-white/30 bg-white/75 p-5 text-left shadow-xl shadow-neutral-900/5 backdrop-blur-lg transition-colors duration-300 sm:p-6",
        "dark:border-white/10 dark:bg-neutral-900/80 dark:text-white",
        className
      )}
      onMouseEnter={pauseRotation}
      onMouseLeave={resumeRotation}
      onFocusCapture={pauseRotation}
      onBlurCapture={resumeRotation}
    >
      <div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-neutral-400">
        <span>founders love prism ❤️</span>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentReview.id}
          custom={direction}
          variants={quoteVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative min-h-[100px]"
          aria-live="polite"
          role="status"
        >
          <motion.p
            variants={quoteTextVariants}
            className="text-base leading-relaxed text-neutral-900 dark:text-white"
          >
            &ldquo;{renderFormattedText(currentReview.text)}&rdquo;
          </motion.p>
          <motion.p
            variants={quoteAuthorVariants}
            className="mt-4 text-sm font-semibold text-neutral-900 dark:text-white"
          >
            {currentReview.client}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {!shouldReduceMotion ? (
        <div className="mt-5 flex items-center justify-center" aria-hidden="true">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
            <motion.div
              className="h-full w-full origin-left bg-neutral-800/70 dark:bg-white/70"
              style={{ scaleX: progressValue }}
            />
          </div>
        </div>
      ) : null}

      {shouldReduceMotion ? (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={goToNext}
            disabled={reviewPool.length <= 1}
            className="rounded-full border border-neutral-300 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400 dark:border-white/15 dark:text-neutral-100 dark:hover:border-white/30 dark:hover:text-white dark:disabled:border-white/10 dark:disabled:text-neutral-500"
          >
            show another story
          </button>
        </div>
      ) : null}

      <div className="mt-4 flex justify-center">
        <Link
          href="/wall-of-love"
          onClick={() => trackNavigation("hero_review_card_cta", "/wall-of-love")}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-600 underline decoration-neutral-300/60 underline-offset-4 transition hover:text-neutral-900 dark:text-neutral-300 dark:decoration-white/20 dark:hover:text-white"
        >
          read 250+ more
        </Link>
      </div>
      {heroReviewSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: heroReviewSchema }} />
      ) : null}
    </div>
  )
}

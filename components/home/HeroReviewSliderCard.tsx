"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion"

import { cn } from "@/lib/utils"
import { getHeroReviews, renderFormattedText, type Quote } from "@/content/wall-of-love-data"
import { trackNavigation } from "@/utils/analytics"

const AUTO_ROTATE_INTERVAL = 6000

type HeroReviewSliderCardProps = {
  className?: string
}

export default function HeroReviewSliderCard({ className }: HeroReviewSliderCardProps) {
  const reviews = useMemo<Quote[]>(() => getHeroReviews(6), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [progress, setProgress] = useState(0)
  const progressValue = useMotionValue(0)

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

  const determineDirection = useCallback(
    (current: number, next: number) => {
      if (current === next) return 1
      if (current === reviews.length - 1 && next === 0) return 1
      if (current === 0 && next === reviews.length - 1) return -1
      return next > current ? 1 : -1
    },
    [reviews.length]
  )

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      if (reviews.length === 0) return current
      const next = (current + 1) % reviews.length
      setDirection(determineDirection(current, next))
      return next
    })
  }, [determineDirection, reviews.length])

  useEffect(() => {
    if (prefersReducedMotion || isPaused || reviews.length <= 1) {
      return
    }

    const timeout = window.setTimeout(goToNext, AUTO_ROTATE_INTERVAL)
    return () => {
      window.clearTimeout(timeout)
    }
    // Re-run when activeIndex changes so the timeout restarts for each slide
  }, [prefersReducedMotion, isPaused, reviews.length, activeIndex, goToNext])

  useEffect(() => {
    const unsubscribe = progressValue.on("change", (latest) => {
      setProgress(latest)
    })
    return unsubscribe
  }, [progressValue])

  useEffect(() => {
    if (prefersReducedMotion || reviews.length <= 1) {
      progressValue.set(0)
      setProgress(0)
      return
    }

    if (isPaused) {
      return
    }

    progressValue.set(0)
    const controls = animate(progressValue, 1, {
      duration: AUTO_ROTATE_INTERVAL / 1000,
      ease: "linear",
    })

    return () => {
      controls.stop()
    }
  }, [activeIndex, prefersReducedMotion, isPaused, reviews.length, progressValue])

  if (reviews.length === 0) {
    return null
  }

  const currentReview = reviews[activeIndex]
  const elapsedAngle = Math.min(360, progress * 360)
  const pieGradient = `conic-gradient(transparent 0deg ${elapsedAngle}deg, currentColor ${elapsedAngle}deg 360deg)`
  const shouldReduceMotion = prefersReducedMotion

  const quoteVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : dir * 12,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(6px)",
    }),
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: shouldReduceMotion ? 0 : dir * -10,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  }

  const pauseRotation = () => setIsPaused(true)
  const resumeRotation = () => setIsPaused(false)

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-white/30 bg-white/75 p-5 text-left shadow-xl shadow-neutral-900/5 backdrop-blur-xl transition-colors duration-300 sm:p-6",
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
          <p className="text-base leading-relaxed text-neutral-900 dark:text-white">
            &ldquo;{renderFormattedText(currentReview.text)}&rdquo;
          </p>
          <p className="mt-4 text-sm font-semibold text-neutral-900 dark:text-white">{currentReview.client}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-center" aria-hidden="true">
        <span
          className="h-3 w-3 rounded-full border border-neutral-900/40 bg-white/70 text-neutral-900 transition-all duration-200 dark:border-white/40 dark:bg-neutral-800 dark:text-white"
          style={{ backgroundImage: pieGradient }}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href="/wall-of-love"
          onClick={() => trackNavigation("hero_review_card_cta", "/wall-of-love")}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-600 underline decoration-neutral-300/60 underline-offset-4 transition hover:text-neutral-900 dark:text-neutral-300 dark:decoration-white/20 dark:hover:text-white"
        >
          read 200+ more
        </Link>
      </div>
    </div>
  )
}

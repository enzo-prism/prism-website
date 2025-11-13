"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Eye, TrendingUp, Users2 } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const ROTATION_INTERVAL = 3200
const ROTATING_ITEMS = [
  { label: "websites", emoji: "📱" },
  { label: "map listings", emoji: "📍" },
  { label: "ads", emoji: "📣" },
]

export default function GrowthHeadline() {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [pillWidth, setPillWidth] = useState<number | null>(null)
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveIndex(0)
      return
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % ROTATING_ITEMS.length)
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [shouldReduceMotion])

  useLayoutEffect(() => {
    if (!measureRef.current) return

    const elements = Array.from(measureRef.current.querySelectorAll<HTMLDivElement>("[data-pill-measure]") || [])
    const maxWidth = elements.reduce((max, el) => Math.max(max, el.getBoundingClientRect().width), 0)

    if (maxWidth > 0) {
      setPillWidth(Math.ceil(maxWidth))
    }
  }, [measureRef])

  const activeItem = ROTATING_ITEMS[activeIndex] ?? ROTATING_ITEMS[0]

  return (
    <section className="bg-white py-16 text-center dark:bg-neutral-950 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-[clamp(2.75rem,4vw,3.5rem)] dark:text-neutral-50">
          <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span
              className="relative flex items-center justify-center overflow-hidden"
              style={{
                width: pillWidth ? `${pillWidth}px` : undefined,
                minWidth: pillWidth ? `${pillWidth}px` : undefined,
                maxWidth: pillWidth ? `${pillWidth}px` : undefined,
                minHeight: "2.85rem",
                height: "2.85rem",
              }}
              aria-live="polite"
              aria-atomic="true"
              role="status"
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={activeItem.label}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-1.5 text-base font-medium text-neutral-900 shadow-sm transition-transform duration-300 dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    {activeItem.emoji}
                  </span>
                  <span className="whitespace-nowrap">{activeItem.label}</span>
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-neutral-500 dark:text-neutral-300">that grow your business.</span>
          </span>
        </h2>

        <p className="max-w-2xl text-balance text-base text-neutral-500 lowercase md:text-lg dark:text-neutral-300">
          design and engineering that boosts impressions, conversions, and referrals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 text-neutral-400">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
            <Eye className="h-4 w-4" aria-hidden />
            impressions
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
            <TrendingUp className="h-4 w-4" aria-hidden />
            conversions
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
            <Users2 className="h-4 w-4" aria-hidden />
            referrals
          </span>
        </div>
      </div>

      <div ref={measureRef} className="fixed -top-[9999px] left-0 flex gap-4">
        {ROTATING_ITEMS.map((item) => (
          <div
            key={item.label}
            data-pill-measure
            className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-1.5 text-base font-medium text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-900"
          >
            <span className="text-lg leading-none">{item.emoji}</span>
            <span className="whitespace-nowrap">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

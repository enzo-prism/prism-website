"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const ROTATION_INTERVAL = 3200
const ROTATING_ITEMS = [
  { label: "websites", emoji: "📱" },
  { label: "map listings", emoji: "📍" },
  { label: "ads", emoji: "📣" },
]

export default function GrowthHeadline() {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

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

  const activeItem = ROTATING_ITEMS[activeIndex] ?? ROTATING_ITEMS[0]
  const pillWidth = useMemo(() => {
    const longestLabel = ROTATING_ITEMS.reduce((longest, item) =>
      item.label.length > longest.length ? item.label : longest,
    ROTATING_ITEMS[0].label)

    // Roughly map character count to `ch` width with extra space for emoji + padding
    const chWidth = longestLabel.length + 4
    return `${chWidth}ch`
  }, [])

  return (
    <section className="bg-white py-16 text-center dark:bg-neutral-950 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-[clamp(2.75rem,4vw,3.5rem)] dark:text-neutral-50">
          <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span
              className="relative inline-flex items-center justify-center overflow-hidden"
              style={{
                minWidth: pillWidth,
                width: pillWidth,
                maxWidth: pillWidth,
                minHeight: "2.75rem",
                height: "2.75rem",
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
                  className="absolute inset-0 flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-1.5 text-base font-medium text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-900"
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
          every channel we touch is engineered to capture attention, build trust, and convert curious visitors into loyal customers.
        </p>
      </div>
    </section>
  )
}


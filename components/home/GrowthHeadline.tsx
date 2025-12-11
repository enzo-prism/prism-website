"use client"

import { Eye, Users2, Wallet } from "lucide-react"

const PILL_ITEMS = [
  { label: "websites", emoji: "📱" },
  { label: "automated systems", emoji: "⚙️" },
  { label: "ads", emoji: "📣" },
]

export default function GrowthHeadline() {
  return (
    <section className="bg-white py-16 text-center dark:bg-neutral-950 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-[clamp(2.75rem,4vw,3.5rem)] dark:text-neutral-50">
          <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="flex flex-wrap items-center justify-center gap-2">
              {PILL_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-base font-medium text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  <span aria-hidden="true" className="text-lg leading-none">
                    {item.emoji}
                  </span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>
              ))}
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
            <Wallet className="h-4 w-4" aria-hidden />
            conversions
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
            <Users2 className="h-4 w-4" aria-hidden />
            referrals
          </span>
        </div>
      </div>
    </section>
  )
}

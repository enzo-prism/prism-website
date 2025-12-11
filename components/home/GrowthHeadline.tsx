"use client"

const PILL_ITEMS = [
  { label: "websites", emoji: "📱" },
  { label: "content systems", emoji: "⚙️" },
  { label: "ads", emoji: "📣" },
]

export default function GrowthHeadline() {
  return (
    <section className="bg-white py-16 text-center dark:bg-neutral-950 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 sm:gap-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PILL_ITEMS.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-semibold text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-900"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {item.emoji}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </span>
          ))}
        </div>

        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 lowercase sm:text-4xl md:text-[clamp(2.5rem,4vw,3.5rem)] dark:text-neutral-50">
          websites, content systems, and ads that grow your business.
        </h2>

        <p className="max-w-2xl text-balance text-base text-neutral-500 lowercase md:text-lg dark:text-neutral-300">
          design and engineering that boosts impressions, conversions, and referrals.
        </p>

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
          impressions · conversions · referrals
        </p>
      </div>
    </section>
  )
}

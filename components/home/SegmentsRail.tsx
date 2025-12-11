"use client"

import Link from "next/link"

const SEGMENTS = [
  {
    emoji: "📱",
    title: "online community founders",
    href: "/why-online-community-founders-love-prism",
  },
  {
    emoji: "💼",
    title: "consulting companies",
    href: "/why-consulting-companies-love-prism",
  },
  {
    emoji: "🦷",
    title: "dental practices",
    href: "/why-dental-practices-love-prism",
  },
  {
    emoji: "🤍",
    title: "local shop owners",
    href: "/why-local-shop-owners-love-prism",
  },
  {
    emoji: "🕊️",
    title: "nonprofits",
    href: "/why-nonprofits-love-prism",
  },
]

export default function SegmentsRail() {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
            segments we support
          </h2>
        </div>

        <div className="mt-10">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 sm:px-3 md:px-4 py-2 scroll-smooth"
            role="list"
            aria-label="Segments we support"
          >
            {SEGMENTS.map((segment) => (
              <article
                key={segment.title}
                className="shrink-0 snap-start w-[88vw] sm:w-[64vw] md:w-[380px]"
                role="listitem"
              >
                <Link
                  href={segment.href}
                  className="group block h-full rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-3xl" aria-hidden>
                      {segment.emoji}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold lowercase text-neutral-900">
                        {segment.title}
                      </h3>
                      <span className="mt-2 inline-flex items-center text-sm font-semibold text-primary transition group-hover:gap-2">
                        how we help →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
            <span className="sr-only">Swipe or scroll horizontally to view more segments</span>
          </div>
        </div>
      </div>
    </section>
  )
}

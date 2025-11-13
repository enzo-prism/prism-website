import type { Metadata } from "next"
import Link from "next/link"

import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { seoOnPageContent } from "@/content/seo"

export const metadata: Metadata = {
  title: "on-page seo services | prism",
  description:
    "see how prism structures content, technical seo, and engagement signals so every page feels like the perfect answer for local searches.",
  openGraph: {
    title: "on-page seo services | prism",
    description:
      "content, technical structure, ux, and local proof — all built into every prism website so you rank and convert.",
    url: "https://www.design-prism.com/seo/on-page",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "prism on-page seo",
      },
    ],
  },
}

export default function SeoOnPagePage() {
  const { hero, intro, pillars, closing, closingBullets } = seoOnPageContent

  return (
    <>
      <SeoHero {...hero} />

      <SeoSection
        eyebrow="intro"
        title="build the best answer"
        description={intro}
      >
        <p className="text-sm text-neutral-600">
          it’s not about keyword stuffing. it’s about the right pages, the right structure, and the right information delivered in a way that loads fast and feels effortless to use.
        </p>
      </SeoSection>

      {pillars.map((pillar) => (
        <SeoSection key={pillar.title} title={pillar.title} description={pillar.description}>
          <ul className="space-y-3 text-sm text-neutral-700">
            {pillar.bullets?.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </SeoSection>
      ))}

      <SeoSection
        eyebrow="closing"
        title="on-page seo is the spine"
        description={closing}
      >
        <ul className="space-y-3 text-sm text-neutral-700">
          {closingBullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 pt-6">
          <Link
            href="/seo/off-page"
            className="inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-neutral-900"
          >
            explore off-page seo
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-white"
          >
            talk with prism
          </Link>
        </div>
      </SeoSection>
    </>
  )
}

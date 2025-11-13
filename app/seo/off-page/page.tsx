import type { Metadata } from "next"
import Link from "next/link"

import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { seoOffPageContent } from "@/content/seo"

export const metadata: Metadata = {
  title: "off-page seo systems | prism",
  description:
    "prism tightens listings, review flows, backlinks, and real-world engagement so search engines trust your brand and keep surfacing it.",
  openGraph: {
    title: "off-page seo systems | prism",
    description:
      "quality backlinks, dialed-in listings, steady reviews, and branded signals — see how prism builds the trust graph around your business.",
    url: "https://www.design-prism.com/seo/off-page",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "prism off-page seo",
      },
    ],
  },
}

export default function SeoOffPagePage() {
  const { hero, intro, levers, closing } = seoOffPageContent

  return (
    <>
      <SeoHero {...hero} />

      <SeoSection eyebrow="intro" title="build the proof" description={intro}>
        <p className="text-sm text-neutral-600">
          you can’t fake these signals, but you can design systems that make them show up consistently — so engines see a steady stream of trust.
        </p>
      </SeoSection>

      {levers.map((lever) => (
        <SeoSection key={lever.title} title={lever.title} description={lever.description}>
          <ul className="space-y-3 text-sm text-neutral-700">
            {lever.bullets?.map((bullet) => (
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
        title="tighten the entire ecosystem"
        description={closing}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/seo/on-page"
            className="inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-neutral-900"
          >
            review on-page seo
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

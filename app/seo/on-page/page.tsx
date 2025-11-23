import type { Metadata } from "next"
import Link from "next/link"

import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import VideoPlayer from "@/components/video-player"
import { seoOnPageContent } from "@/content/seo"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"

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
  const videoSectionId = "on-page-seo-video"
  const videoSrc = "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763420060/on-page_seo_zvif3p.mp4"
  const videoPoster = "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763420060/on-page_seo_zvif3p.jpg"
  const videoDescription =
    "Enzo breaks down why Prism's on-page work starts with intent-mapped content, technical clarity, and schema so the site becomes the best possible answer."

  return (
    <>
      <SeoHero {...hero} />

      <SeoSection
        id={videoSectionId}
        eyebrow="watch"
        title="enzo explains our on-page approach"
        description="hear directly from enzo on why we obsess over information architecture, content clarity, and technical polish before layering any off-page proof."
      >
        <VideoPlayer
          src={videoSrc}
          poster={videoPoster}
          title="Enzo on building perfect on-page answers"
          caption="How Prism thinks through content structure, schema, and UX so every visit feels like an obvious next step."
          className="w-full"
          schema={{
            id: `https://design-prism.com/#${videoSectionId}`,
            name: "Enzo explains Prism's on-page SEO approach",
            description: videoDescription,
            thumbnailUrl: videoPoster,
            uploadDate: "2025-05-24T00:00:00Z",
            contentUrl: videoSrc,
            embedUrl: `https://www.design-prism.com/seo/on-page#${videoSectionId}`,
            creatorName: "Enzo Perez",
          }}
        />
      </SeoSection>

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
            href="/seo"
            className="inline-flex items-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold lowercase text-neutral-700"
          >
            back to seo overview
          </Link>
          <Link
            href="/seo/off-page"
            className="inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-neutral-900"
          >
            explore off-page seo
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-white"
          >
            talk with prism
          </Link>
        </div>
      </SeoSection>

      <ServiceSchema
        serviceId="seo-on-page"
        name="On-page SEO"
        description={hero.subtitle}
        serviceType="SEO services"
        areaServed="United States"
      />
      <HowToSchema
        name="On-page SEO implementation"
        description={intro}
        steps={pillars.map((pillar) => ({
          name: pillar.title,
          text: pillar.bullets?.join(" ") || pillar.description || "",
        }))}
      />
    </>
  )
}

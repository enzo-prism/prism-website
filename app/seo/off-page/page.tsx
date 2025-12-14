import type { Metadata } from "next"
import Link from "next/link"

import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import VideoPlayer from "@/components/video-player"
import { type SeoVideoContent, seoOffPageContent } from "@/content/seo"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "off-page seo systems | prism",
  description:
    "prism tightens listings, review flows, backlinks, and real-world engagement so search engines trust your brand and keep surfacing it.",
  alternates: {
    canonical: "https://www.design-prism.com/seo/off-page",
  },
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
  const video: SeoVideoContent = seoOffPageContent.video
  const videoAnchor = `https://www.design-prism.com/seo/off-page#${video.id}`

  return (
    <>
      <SeoHero {...hero} />

      <SeoSection
        id={video.id}
        eyebrow={video.eyebrow}
        title={video.title}
        description={video.description}
      >
        <VideoPlayer
          src={video.src}
          poster={video.poster}
          title={video.playerTitle}
          caption={video.caption}
          className="w-full"
          schema={{
            id: videoAnchor,
            name: video.schema.name,
            description: video.schema.description,
            thumbnailUrl: video.poster,
            uploadDate: video.schema.uploadDate,
            duration: video.schema.duration,
            contentUrl: video.src,
            embedUrl: videoAnchor,
            creatorName: video.schema.creatorName,
          }}
        />
      </SeoSection>

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
            href="/seo"
            className="inline-flex items-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold lowercase text-neutral-700"
          >
            back to seo overview
          </Link>
          <Link
            href="/seo/on-page"
            className="inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-neutral-900"
          >
            review on-page seo
          </Link>
          <Link
            href="/dental-practice-seo-expert"
            className="inline-flex items-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold lowercase text-neutral-700"
          >
            dental seo
          </Link>
          <Link
            href="/blog/dental-practice-rank-higher-google-search"
            className="inline-flex items-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold lowercase text-neutral-700"
          >
            rank higher in google
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
        serviceId="seo-off-page"
        name="Off-page SEO"
        description={hero.subtitle}
        serviceType="SEO services"
        areaServed="United States"
      />
      <HowToSchema
        name="Off-page SEO systems"
        description={intro}
        steps={levers.map((lever) => ({
          name: lever.title,
          text: lever.bullets?.join(" ") || lever.description || "",
        }))}
      />
    </>
  )
}

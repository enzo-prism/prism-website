import type { Metadata } from "next"
import { Link2, MapPinned, Megaphone, MousePointerClick, Newspaper, Star } from "lucide-react"

import { BulletList } from "@/components/landing/seo/bullet-list"
import { LinkPills } from "@/components/landing/seo/link-pills"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import VideoPlayer from "@/components/video-player"
import { type SeoVideoContent, seoOffPageContent } from "@/content/seo"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Off-page SEO systems',
  description: 'Prism tightens listings, review flows, backlinks, and real-world engagement so search engines and customers can verify your business.',
  path: "/seo/off-page",
  ogImage: "/prism-opengraph.png",
})

const LEVER_ICONS = [Link2, MapPinned, Star, MousePointerClick, Megaphone, Newspaper] as const

const RELATED_LINKS = [
  { label: "Back to the SEO overview", href: "/seo" },
  { label: "Review on-page SEO", href: "/seo/on-page" },
  { label: "SEO audit service", href: "/seo/audit" },
  { label: "Dentist SEO", href: "/dental-practice-seo-expert" },
  { label: "AEO (AI search)", href: "/aeo" },
  { label: "How dental practices rank higher in Google", href: "/blog/dental-practice-rank-higher-google-search" },
] as const

export default function SeoOffPagePage() {
  const { hero, intro, levers, closing } = seoOffPageContent
  const video: SeoVideoContent = seoOffPageContent.video
  const videoAnchor = `https://www.design-prism.com/seo/off-page#${video.id}`

  return (
    <>
      <SeoHero
        eyebrow="Off-page SEO"
        title="make your reputation easier to find."
        subtitle={hero.subtitle}
        location="seo off-page hero"
        secondaryCta={{ label: "Review on-page SEO", href: "/seo/on-page" }}
        glow="violet"
      />

      <SeoSection
        id={video.id}
        eyebrow={video.eyebrow}
        title="Enzo on your reputation beyond your website."
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

      <Section aria-labelledby="off-page-intro-title">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeader
              id="off-page-intro-title"
              eyebrow="intro"
              title="build the proof."
              titleClassName="max-w-[12ch]"
            />
            <div className="space-y-5 self-end">
              <p className="text-lead text-pretty text-foreground/90">{intro}</p>
              <p className="text-pretty text-[15px] leading-7 text-muted-foreground">
                You can’t fake these signals, but you can build systems that make them show up consistently, so search engines see a steady record of trust.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="off-page-levers-title">
        <Reveal>
          <SectionHeader
            id="off-page-levers-title"
            eyebrow="the levers"
            title="six signals beyond your site."
            description="Each one tells search engines and customers the same thing: this business is real, active, and trusted."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {levers.map((lever, index) => {
            const Icon = LEVER_ICONS[index % LEVER_ICONS.length]
            return (
              <Reveal key={lever.title} delay={(index % 3) * 70}>
                <SpotlightCard beam={index === 0} className="h-full p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon aria-hidden="true" className="size-[18px] text-foreground" />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                  </div>
                  <h3 className="text-heading mt-6 text-foreground">{lever.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{lever.description}</p>
                  {lever.bullets ? <BulletList items={lever.bullets} marker="dot" className="mt-6" /> : null}
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <SeoSection eyebrow="closing" title="tighten the entire ecosystem." description={closing}>
        <div>
          <p className="text-eyebrow text-subtle">keep exploring</p>
          <LinkPills links={RELATED_LINKS} label="Related SEO pages" className="mt-4" />
        </div>
      </SeoSection>

      <FinalCta
        location="seo off-page final cta"
        title="proof everywhere they look."
        secondary={{ label: "See the SEO audit", href: "/seo/audit" }}
      />

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

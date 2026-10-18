import type { Metadata } from "next"
import { FileText, LayoutTemplate, MapPin, MousePointerClick } from "lucide-react"

import { BulletList } from "@/components/landing/seo/bullet-list"
import { LinkPills } from "@/components/landing/seo/link-pills"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { Card } from "@/components/ui/card"
import VideoPlayer from "@/components/video-player"
import { seoOnPageContent } from "@/content/seo"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'On-page SEO services',
  description: 'Prism structures content, technical SEO, and engagement signals so every page reads like a clear answer for the local searches that matter.',
  path: "/seo/on-page",
  ogImage: "/prism-opengraph.png",
})

const PILLAR_ICONS = [FileText, LayoutTemplate, MousePointerClick, MapPin] as const

const RELATED_LINKS = [
  { label: "Back to the SEO overview", href: "/seo" },
  { label: "Explore off-page SEO", href: "/seo/off-page" },
  { label: "SEO audit service", href: "/seo/audit" },
  { label: "SEO for dentists", href: "/dental-practice-seo-expert" },
  { label: "AEO (AI search)", href: "/aeo" },
  { label: "How dental practices rank higher in Google", href: "/blog/dental-practice-rank-higher-google-search" },
] as const

export default function SeoOnPagePage() {
  const { hero, intro, pillars, closing, closingBullets } = seoOnPageContent
  const videoSectionId = "on-page-seo-video"
  const videoSrc = "https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763420060/on-page_seo_zvif3p.mp4"
  const videoPoster = "https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763420060/on-page_seo_zvif3p.jpg"
  const videoDescription =
    "Enzo breaks down why Prism's on-page work starts with intent-mapped content, technical clarity, and schema so the site becomes the best possible answer."

  return (
    <>
      <SeoHero
        eyebrow="On-page SEO"
        title="make every page useful."
        subtitle="Everything you control on your own site, designed to match what people are actually searching for."
        location="seo on-page hero"
        secondaryCta={{ label: "See off-page SEO", href: "/seo/off-page" }}
      />

      <SeoSection
        id={videoSectionId}
        eyebrow="watch"
        title="Enzo explains our on-page approach."
        description="Hear from Enzo on why we focus on information architecture, content clarity, and technical polish before layering on off-page proof."
      >
        <VideoPlayer
          src={videoSrc}
          poster={videoPoster}
          title="Enzo on building clear on-page answers"
          caption="How Prism thinks through content structure, schema, and UX so every visit feels like an obvious next step."
          className="w-full"
          schema={{
            id: `https://www.design-prism.com/seo/on-page#${videoSectionId}`,
            name: "Enzo explains Prism's on-page SEO approach",
            description: videoDescription,
            thumbnailUrl: videoPoster,
            uploadDate: "2025-05-24T00:00:00Z",
            contentUrl: videoSrc,
            embedUrl: `https://www.design-prism.com/seo/on-page#${videoSectionId}`,
            creatorName: "Enzo Sison",
          }}
        />
      </SeoSection>

      <Section aria-labelledby="on-page-intro-title">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
          <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeader
              id="on-page-intro-title"
              eyebrow="intro"
              title="build the best answer."
              titleClassName="max-w-[12ch]"
            />
            <div className="space-y-5 self-end">
              <p className="text-lead text-pretty text-foreground/90">{intro}</p>
              <p className="text-pretty text-[15px] leading-7 text-muted-foreground">
                It’s not about keyword stuffing. It’s about the right pages, the right structure, and the right information, delivered in a way that loads fast and is easy to use.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="on-page-pillars-title">
        <Reveal>
          <SectionHeader
            id="on-page-pillars-title"
            eyebrow="the pillars"
            title="what every page gets."
            description="Four layers, built together, so each page answers the search and gives people a clear next step."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length]
            return (
              <Reveal key={pillar.title} delay={(index % 2) * 80}>
                <SpotlightCard beam={index === 0} className="h-full p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon aria-hidden="true" className="size-[18px] text-foreground" />
                    </span>
                    <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                  </div>
                  <h3 className="text-heading mt-6 text-foreground">{pillar.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{pillar.description}</p>
                  {pillar.bullets ? <BulletList items={pillar.bullets} marker="dot" className="mt-6" /> : null}
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <SeoSection eyebrow="closing" title="on-page seo is the spine." description={closing}>
        <Card className="p-6 sm:p-8">
          <BulletList items={closingBullets} />
        </Card>
        <div>
          <p className="text-eyebrow text-subtle">keep exploring</p>
          <LinkPills links={RELATED_LINKS} label="Related SEO pages" className="mt-4" />
        </div>
      </SeoSection>

      <FinalCta
        location="seo on-page final cta"
        title="every page, a clear answer."
        secondary={{ label: "See the SEO audit", href: "/seo/audit" }}
      />

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

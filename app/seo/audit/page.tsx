import type { Metadata } from "next"
import Link from "next/link"
import {
  Ban,
  BookOpenCheck,
  Gauge,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import FAQSection from "@/components/faq-section"
import { BulletList } from "@/components/landing/seo/bullet-list"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { Card } from "@/components/ui/card"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA } from "@/lib/waitlist"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'SEO audit',
  description: 'Find the technical, on-page, and trust issues holding back your rankings, then get a clear plan to fix them.',
  path: "/seo/audit",
  ogImage: "/prism-opengraph.png",
})

const auditCoverage = [
  {
    title: "technical + indexation",
    bullets: [
      "Crawlability, robots, and sitemap coverage",
      "Canonical hygiene and duplicate suppression",
      "Redirects, status codes, and chain cleanup",
    ],
  },
  {
    title: "on-page + intent match",
    bullets: [
      "Titles, headings, and meta descriptions that match intent",
      "People-first content depth for core pages",
      "Clear next steps and conversion paths",
    ],
  },
  {
    title: "site architecture",
    bullets: [
      "Internal linking and topic clusters",
      "Orphan pages and weak hubs",
      "Navigation clarity for users and crawlers",
    ],
  },
  {
    title: "structured data + SERP appearance",
    bullets: [
      "Schema accuracy aligned to visible content",
      "FAQ, service, and article eligibility checks",
      "Snippet readiness and rich-result risks",
    ],
  },
  {
    title: "page experience",
    bullets: [
      "Core Web Vitals and mobile performance",
      "Image sizing and asset weight",
      "Render-blocking issues and layout stability",
    ],
  },
  {
    title: "trust + corroboration",
    bullets: [
      "Off-site signals and listings consistency",
      "Review velocity and reputation cues",
      "Brand and entity signals that corroborate claims",
    ],
  },
]

const deliverables = [
  {
    title: "prioritized audit summary",
    description: "Plain-English findings ranked by impact on rankings and conversions.",
  },
  {
    title: "issue backlog + quick wins",
    description: "A sequenced list of fixes, in the order to ship them.",
  },
  {
    title: "baseline metrics snapshot",
    description: "Search Console, analytics, and key query benchmarks to measure change against.",
  },
  {
    title: "implementation options",
    description: "Choose between a consult-only roadmap or consultant-led shipping.",
  },
]

const processSteps = [
  {
    step: "Baseline",
    description: "Collect access (Search Console, GA4, CMS) and set baseline metrics.",
  },
  {
    step: "Crawl",
    description: "Map technical issues, indexation gaps, and architecture risks.",
  },
  {
    step: "Diagnose",
    description: "Evaluate intent match, content clarity, and SERP readiness.",
  },
  {
    step: "Prioritize",
    description: "Rank issues by impact and effort so the most useful fixes ship first.",
  },
  {
    step: "Plan",
    description: "Deliver the roadmap and agree on who ships each fix.",
  },
]

const faqItems = [
  {
    question: "What is an SEO audit service?",
    answer:
      "An SEO audit service is a full review of your site and visibility signals to find what blocks rankings, then deliver a prioritized plan tied to leads and conversions.",
  },
  {
    question: "What does your SEO audit service include?",
    answer:
      "We cover technical SEO, indexation, on-page intent, internal linking, structured data, performance, and off-site trust signals, then translate it into a clear implementation backlog.",
  },
  {
    question: "How long does an SEO audit take?",
    answer:
      "Most audits take 1-2 weeks depending on site size, access, and the depth of issues. Quick wins are often identified in the first few days.",
  },
  {
    question: "Do you implement fixes after the audit?",
    answer:
      "Yes. You can hire Prism for consultant-led implementation or take the roadmap to your team. We support both models.",
  },
  {
    question: "What access do you need?",
    answer:
      "At minimum: Google Search Console, Google Analytics (or GA4), and basic CMS access so we can verify technical findings.",
  },
  {
    question: "How do I start an SEO audit?",
    answer:
      "Join the waitlist. Prism reviews applications for each monthly intake. The SEO audit service itself is a deep crawl, intent review, and prioritized plan you can execute immediately.",
  },
]

const COVERAGE_ICONS = [ScanSearch, BookOpenCheck, Network, Sparkles, Gauge, ShieldCheck] as const

export default function SeoAuditServicePage() {
  return (
    <>
      <SeoHero
        eyebrow="SEO audit service"
        title="seo audit service that finds what blocks rankings."
        titleClassName="max-w-[18ch]"
        subtitle="Prism audits technical health, on-page intent, internal links, schema, and trust signals so you know what to fix first, and why."
        location="seo audit hero"
        secondaryCta={{ label: "See the SEO overview", href: "/seo" }}
        glow="green"
      />

      <Section aria-labelledby="audit-coverage-title">
        <Reveal>
          <SectionHeader
            id="audit-coverage-title"
            eyebrow="coverage"
            title="what an seo audit service checks."
            description="We map the technical and content signals Google uses to decide who ranks, then translate them into actions."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {auditCoverage.map((item, index) => {
            const Icon = COVERAGE_ICONS[index % COVERAGE_ICONS.length]
            return (
              <Reveal key={item.title} delay={(index % 3) * 70}>
                <SpotlightCard beam={index === 0} className="h-full p-6 sm:p-7">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon aria-hidden="true" className="size-[18px] text-foreground" />
                  </span>
                  <h3 className="text-heading mt-6 text-foreground">{item.title}</h3>
                  <BulletList items={item.bullets} marker="dot" className="mt-5" />
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <SeoSection
        eyebrow="deliverables"
        title="what you get."
        description="An audit is only useful if it turns into fixes. This is what we ship."
      >
        <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
          {deliverables.map((item, index) => (
            <li key={item.title} className="flex gap-5 p-6">
              <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Prism is fully booked right now.{" "}
          <Link
            href={WAITLIST_CTA.href}
            className="font-medium text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white/70"
          >
            {WAITLIST_CTA.label}
          </Link>{" "}
          and get first pick of new spots as they open.
        </p>
      </SeoSection>

      <Section aria-labelledby="audit-process-title">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
          <Reveal>
            <SectionHeader
              id="audit-process-title"
              eyebrow="process"
              title="how the seo audit service works."
              description="A fast baseline, a deep diagnosis, and a roadmap you can act on right away."
            />
          </Reveal>
          <ol className="relative mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((item, index) => (
              <li key={item.step} className="flex flex-col gap-3 bg-card p-6">
                <span className="font-mono text-xs tabular-nums text-subtle">step 0{index + 1}</span>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.step.toLowerCase()}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <SeoSection
        eyebrow="integrity"
        title="what we will not do."
        description="We follow Google Search Essentials and avoid spam patterns that create short-term risk."
      >
        <Card className="p-6 sm:p-8">
          <ul className="space-y-4">
            {[
              "Doorway pages or thin city pages",
              "Keyword stuffing or hidden text",
              "Link schemes, fake reviews, or paid spam citations",
              "Schema that does not match visible content",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                <Ban aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </SeoSection>

      <FAQSection
        title="seo audit service questions."
        subtitle="What teams ask before an audit."
        items={faqItems}
      />

      <FinalCta
        location="seo audit final cta"
        title="know what to fix first."
        secondary={{ label: "See the SEO overview", href: "/seo" }}
      />

      <ServiceSchema
        serviceId="seo-audit-service"
        name="SEO audit service"
        description="SEO audit service that reviews technical health, on-page intent, internal linking, structured data, and trust signals, then delivers a prioritized plan."
        serviceType="SEO audit service"
        areaServed="United States"
      />

      <HowToSchema
        name="SEO audit service process"
        description="Baseline, crawl, diagnose, prioritize, and plan."
        steps={processSteps.map((step) => ({
          name: step.step,
          text: step.description,
        }))}
      />
    </>
  )
}

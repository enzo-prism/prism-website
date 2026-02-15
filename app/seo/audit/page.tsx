import type { Metadata } from "next"
import Link from "next/link"

import FAQSection from "@/components/faq-section"
import { SeoHero } from "@/components/seo/seo-hero"
import { SeoSection } from "@/components/seo/seo-section"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "seo audit service | prism",
  description: "seo audit service that finds the technical, on-page, and trust issues blocking rankings, then delivers a prioritized plan tied to leads.",
  path: "/seo/audit",
  ogImage: "/prism-opengraph.png",
})

const auditCoverage = [
  {
    title: "technical + indexation",
    bullets: [
      "crawlability, robots, and sitemap coverage",
      "canonical hygiene and duplicate suppression",
      "redirects, status codes, and chain cleanup",
    ],
  },
  {
    title: "on-page + intent match",
    bullets: [
      "titles, headings, and meta descriptions that match intent",
      "people-first content depth for core pages",
      "clear next steps and conversion paths",
    ],
  },
  {
    title: "site architecture",
    bullets: [
      "internal linking and topic clusters",
      "orphan pages and weak hubs",
      "navigation clarity for users and crawlers",
    ],
  },
  {
    title: "structured data + SERP appearance",
    bullets: [
      "schema accuracy aligned to visible content",
      "FAQ/service/article eligibility checks",
      "snippet readiness and rich result risks",
    ],
  },
  {
    title: "page experience",
    bullets: [
      "core web vitals and mobile performance",
      "image sizing and asset weight",
      "render-blocking issues and layout stability",
    ],
  },
  {
    title: "trust + corroboration",
    bullets: [
      "off-site signals and listings consistency",
      "review velocity and reputation cues",
      "brand/entity signals that corroborate claims",
    ],
  },
]

const deliverables = [
  {
    title: "prioritized audit summary",
    description: "plain-english findings ranked by impact on rankings and conversions.",
  },
  {
    title: "issue backlog + quick wins",
    description: "a sequenced list of fixes and the order that compounds.",
  },
  {
    title: "baseline metrics snapshot",
    description: "search console, analytics, and key query benchmarks to measure lift.",
  },
  {
    title: "implementation options",
    description: "choose between a consult-only roadmap or consultant-led shipping.",
  },
]

const processSteps = [
  {
    step: "Baseline",
    description: "collect access (GSC, GA4, CMS) and set baseline metrics.",
  },
  {
    step: "Crawl",
    description: "map technical issues, indexation gaps, and architecture risks.",
  },
  {
    step: "Diagnose",
    description: "evaluate intent match, content clarity, and SERP readiness.",
  },
  {
    step: "Prioritize",
    description: "rank issues by impact and effort so fixes compound fast.",
  },
  {
    step: "Plan",
    description: "deliver the roadmap and align on who ships each fix.",
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
    question: "Is this different from a free analysis?",
    answer:
      "Yes. The free analysis is a quick snapshot. The SEO audit service is a deep crawl, intent review, and prioritized plan you can execute immediately.",
  },
]

const hero = {
  eyebrow: "seo audit service",
  title: "seo audit service that finds what blocks rankings",
  subtitle:
    "prism audits technical health, on-page intent, internal links, schema, and trust signals so you know exactly what to fix first and what will compound.",
  primaryCta: { label: "talk to prism", href: "/contact" },
  secondaryCta: { label: "get a free analysis", href: "/free-analysis" },
}

export default function SeoAuditServicePage() {
  return (
    <>
      <SeoHero {...hero} />

      <SeoSection
        eyebrow="coverage"
        title="what an seo audit service checks"
        description="we map the technical and content signals that google uses to decide who ranks, then translate them into actions."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {auditCoverage.map((item) => (
            <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="deliverables"
        title="what you get"
        description="an audit is only useful if it turns into fixes. this is what we ship."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {deliverables.map((item) => (
            <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
          want a fast snapshot first? start with the{" "}
          <Link href="/free-analysis" className="font-semibold text-neutral-900 underline underline-offset-4">
            free analysis
          </Link>
          .
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="process"
        title="how the seo audit service works"
        description="fast baseline, deep diagnosis, and a roadmap you can execute immediately."
      >
        <div className="grid gap-6 md:grid-cols-5">
          {processSteps.map((item) => (
            <div key={item.step} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{item.step}</p>
              <h3 className="mt-3 text-base font-semibold lowercase text-neutral-900">{item.step.toLowerCase()}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold lowercase text-white"
          >
            talk to prism
          </Link>
          <Link
            href="/seo"
            className="inline-flex items-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold lowercase text-neutral-700"
          >
            seo overview
          </Link>
        </div>
      </SeoSection>

      <SeoSection
        eyebrow="integrity"
        title="what we will not do"
        description="we follow google search essentials and avoid spam patterns that create short-term risk."
      >
        <ul className="space-y-3 text-sm text-neutral-700">
          {[
            "doorway pages or thin city pages",
            "keyword stuffing or hidden text",
            "link schemes, fake reviews, or paid spam citations",
            "schema that does not match visible content",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SeoSection>

      <FAQSection
        title="seo audit service questions"
        subtitle="what most teams ask before booking an audit."
        items={faqItems}
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

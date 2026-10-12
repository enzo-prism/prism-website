import type { Metadata } from "next"
import Link from "next/link"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import { BulletList } from "@/components/landing/seo/bullet-list"
import { TextLink } from "@/components/landing/seo/text-link"
import Navbar from "@/components/navbar"
import { BrowserFrame } from "@/components/prism/browser-frame"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { SpotlightCard } from "@/components/prism/spotlight-card"
import ScrollToTop from "@/components/scroll-to-top"
import { SeoSection } from "@/components/seo/seo-section"
import SeoTextSection from "@/components/seo-text-section"
import { Card } from "@/components/ui/card"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { ArrowUpRight, Ban, ClipboardList, Stethoscope, Wrench } from "lucide-react"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA } from "@/lib/waitlist"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Local SEO agency',
  description: 'Improve Google Maps and local search visibility with listings, reviews, local pages, and clear reporting.',
  path: "/local-seo-agency",
  ogImage: "/prism-opengraph.png",
})

const agencyPillars = [
  {
    title: "clear priorities",
    description: "you always know what we’re doing this month and why it matters for rankings and revenue.",
  },
  {
    title: "hands-on execution",
    description: "we don’t just send audits. we ship fixes: listings, pages, reviews, schema, and tracking.",
  },
  {
    title: "proof and reporting",
    description: "we track calls, forms, bookings, direction requests, and the queries that drive them.",
  },
  {
    title: "ownership and transparency",
    description: "you keep admin access to your profiles and data. everything is transferable.",
  },
]

const rankingModel = [
  {
    title: "relevance",
    description: "matching the exact intent behind searches like “local seo agency” and the services you actually provide.",
  },
  {
    title: "distance (proximity)",
    description: "accurate location and service-area signals so you’re eligible when buyers search nearby.",
  },
  {
    title: "prominence",
    description: "the trust graph: reviews, citations, mentions, links, and engagement that compounds over time.",
  },
]

const processSteps = [
  {
    step: "baseline + plan",
    description: "we benchmark where you show up today, map competitors, and pick the fastest path to wins without spam tactics.",
  },
  {
    step: "fix the ecosystem",
    description: "we clean listings and citations, tighten categories and services, and remove confusion signals like duplicates.",
  },
  {
    step: "ship local pages",
    description: "we build the service and location pages that answer what people search, with schema and internal links that make sense.",
  },
  {
    step: "build the flywheel",
    description: "we run review and content systems that keep activity steady month to month.",
  },
]

const whatWeWontDo = [
  "keyword-stuff your business name in google business profile",
  "create dozens of thin, near-duplicate city pages (doorway patterns)",
  "buy fake reviews, links, or citations",
  "hide what we’re doing behind vague reports",
]

const faqItems = [
  {
    question: "What makes Prism different from other local SEO agencies?",
    answer:
      "We combine strategy and execution in one sprint team. That means we actually ship the pages, schema, listing updates, review systems, and tracking, not just audits or recommendations. You also keep full ownership of accounts and data.",
  },
  {
    question: "Do you focus on Google Maps or organic search?",
    answer:
      "Both. Most local growth requires a combined approach: strong listings and reviews for map-pack visibility plus clear on-page service/location structure for organic rankings and AI answers.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Fixes that improve relevance and engagement can show movement quickly. Prominence signals (reviews, citations, mentions) compound over weeks and months, especially in competitive markets.",
  },
  {
    question: "Can you help if our listing has duplicates or is suspended?",
    answer:
      "Yes. We handle duplicate cleanup, reinstatement workflows, and ongoing monitoring so your visibility doesn’t get knocked out unexpectedly.",
  },
  {
    question: "What’s included when we hire you as a local SEO agency?",
    answer:
      "It depends on your locations and goals, but typically includes Google Business Profile optimization, listings/citations, review systems, local service/location pages with schema, technical hygiene, and reporting tied to calls and leads. For a detailed breakdown, see our local SEO services page.",
  },
]

const inlineLink =
  "font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70"

export default function LocalSeoAgencyPage() {
  const relatedCaseStudies = [
    {
      title: "Wine Country Root Canal",
      href: "/case-studies/wine-country-root-canal",
      summary: "Specialty practice visibility with clear local intent.",
      image: "/case-studies/wine-country-root-canal-home-desktop.jpg",
    },
    {
      title: "Town Centre Dental",
      href: "/case-studies/town-centre-dental",
      summary: "Local search + conversions with modern reporting.",
      image: "/case-studies/town-centre-dental-home-desktop.jpg",
    },
    {
      title: "Olympic Bootworks",
      href: "/case-studies/olympic-bootworks",
      summary: "Retail visibility with multi-site SEO and analytics.",
      image: "/case-studies/olympic-bootworks-home-desktop.jpg",
    },
  ]
  const relatedPosts = [
    {
      title: "Local SEO agency guide",
      href: "/blog/how-to-choose-local-seo-agency",
    },
    {
      title: "Google Maps visibility playbook",
      href: "/blog/google-maps-visibility-playbook-2025",
    },
    {
      title: "Modern reviews strategy",
      href: "/blog/modern-reviews-strategy-2025",
    },
  ]
  const pathways = [
    {
      icon: ClipboardList,
      lead: "Want a deliverables checklist? See",
      label: "local seo services",
      href: "/local-seo-services",
    },
    {
      icon: Stethoscope,
      lead: "Dental practice? Start with",
      label: "seo for dentists",
      href: "/dental-practice-seo-expert",
    },
    {
      icon: Wrench,
      lead: "Need a baseline first? Start with our",
      label: "seo audit service",
      href: "/seo/audit",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="local seo agency"
          title="a local seo agency partner for small businesses."
          titleClassName="max-w-[17ch]"
          description="Prism helps local businesses show up in Google Maps and local search with a system that’s simple: clean listings, steady reviews, helpful local pages, and reporting tied to real customer actions."
          location="local seo agency hero"
          ctaHref={WAITLIST_CTA.href}
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: "See how we work", href: "#process" }}
        >
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3">
            {pathways.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group/path flex h-full items-start gap-3 rounded-2xl border border-white/[0.08] bg-card/80 p-4 text-left backdrop-blur-sm transition-colors hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon aria-hidden="true" className="size-4 text-foreground" />
                    </span>
                    <span className="min-w-0 text-sm leading-6 text-muted-foreground">
                      {item.lead}{" "}
                      <span className="font-medium text-foreground underline decoration-white/25 underline-offset-4 group-hover/path:decoration-white/70">
                        {item.label}
                      </span>
                      .
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </LandingHero>

        <Section aria-labelledby="agency-partner-title">
          <Reveal>
            <SectionHeader
              id="agency-partner-title"
              eyebrow="working together"
              title="what it’s like to work with prism."
              description="the difference between a vendor and an agency partner is consistency, clarity, and execution."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2">
            {agencyPillars.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 80}>
                <SpotlightCard beam={index === 0} className="h-full p-6 sm:p-8">
                  <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                  <h3 className="text-heading mt-5 text-foreground">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[15px] leading-7 text-muted-foreground">
            Want the full SEO picture (on-page + off-page)? Start at{" "}
            <Link href="/seo" className={inlineLink}>
              seo
            </Link>
            .
          </p>
        </Section>

        <Section aria-labelledby="agency-rankings-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
            <Reveal>
              <SectionHeader
                id="agency-rankings-title"
                eyebrow="the model"
                title="how local rankings work."
                description="local visibility is a scoring system: match intent, be eligible locally, and prove you’re trusted."
              />
            </Reveal>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {rankingModel.map((item, index) => (
                <li key={item.title} className="flex flex-col gap-3 bg-card p-6 sm:p-7">
                  <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                  <h3 className="text-heading text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[15px] leading-7 text-muted-foreground">
              For a maps-first checklist, read{" "}
              <Link href="/blog/google-maps-visibility-playbook-2025" className={inlineLink}>
                google maps visibility checklist
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section id="process" aria-labelledby="agency-process-title">
          <Reveal>
            <SectionHeader
              id="agency-process-title"
              eyebrow="process"
              title="our process."
              description="a simple, repeatable system, so improvements keep compounding without chaos."
            />
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <Reveal as="li" key={item.step} delay={index * 70} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-card font-mono text-xs tabular-nums text-foreground">
                    {index + 1}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                </div>
                <h3 className="text-heading mt-5 text-foreground">{item.step}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Card className="p-6 sm:p-8">
              <h3 className="text-heading text-foreground">what we run</h3>
              <BulletList
                className="mt-5"
                items={[
                  "google business profile optimization",
                  "local listings and citations (NAP consistency)",
                  "review capture and response systems",
                  "service and location pages with schema",
                  "tracking and reporting tied to calls and leads",
                ]}
              />
              <p className="mt-6 text-[15px] leading-7 text-muted-foreground">
                Need the subsystem for maps and directories? See{" "}
                <Link href="/local-listings" className={inlineLink}>
                  local listings
                </Link>
                .
              </p>
            </Card>
            <Card className="flex flex-col p-6 sm:p-8">
              <h3 className="text-heading text-foreground">proof you can verify</h3>
              <ul className="mt-5 flex-1 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {[
                  { label: "case studies", href: "/case-studies" },
                  { label: "wall of love", href: "/wall-of-love" },
                  { label: "local shop playbook", href: "/why-local-shop-owners-love-prism" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group/proof flex min-h-12 items-center justify-between gap-4 rounded-sm text-[15px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-subtle transition-[color,transform] duration-200 group-hover/proof:-translate-y-0.5 group-hover/proof:translate-x-0.5 group-hover/proof:text-foreground"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-7 text-muted-foreground">
                If you’re comparing agencies, use our checklist:{" "}
                <Link href="/blog/how-to-choose-local-seo-agency" className={inlineLink}>
                  how to choose a local seo agency
                </Link>
                .
              </p>
            </Card>
          </div>
        </Section>

        <SeoSection
          eyebrow="integrity"
          title="what we won’t do."
          description="local seo is not a trick. we avoid tactics that create short-term spikes and long-term risk."
        >
          <Card className="p-6 sm:p-8">
            <ul className="space-y-4">
              {whatWeWontDo.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
                  <Ban aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </SeoSection>

        <Section aria-labelledby="agency-results-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Reveal>
                <SectionHeader id="agency-results-title" eyebrow="case studies" title="local seo results." />
              </Reveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {relatedCaseStudies.map((study, index) => (
                  <Reveal key={study.href} delay={index * 70}>
                    <Link
                      href={study.href}
                      className="group/case block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <Card className="flex h-full flex-col p-2.5 transition-[border-color,transform] duration-300 group-hover/case:-translate-y-0.5 group-hover/case:border-white/[0.16]">
                        <BrowserFrame
                          src={study.image}
                          alt={`${study.title} website homepage`}
                          sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 90vw"
                        />
                        <div className="flex flex-1 flex-col p-2.5 pt-4">
                          <p className="text-base font-semibold tracking-[-0.02em] text-foreground">{study.title}</p>
                          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{study.summary}</p>
                        </div>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={120}>
              <p className="text-eyebrow text-subtle">from the blog</p>
              <h2 className="text-heading mt-4 text-foreground">agency selection guides</h2>
              <ul className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {relatedPosts.map((post) => (
                  <li key={post.href}>
                    <Link
                      href={post.href}
                      className="group/post flex min-h-14 items-center justify-between gap-4 rounded-sm text-[15px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {post.title}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/post:-translate-y-0.5 group-hover/post:translate-x-0.5 group-hover/post:text-foreground"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <TextLink href="/blog" className="mt-4">
                browse all posts
              </TextLink>
            </Reveal>
          </div>
        </Section>

        <FAQSection
          title="local seo agency faq."
          subtitle="answers about scope, expectations, and how we work."
          items={[
            ...faqItems,
            {
              question: "Do you offer local seo services without a retainer?",
              answer:
                "Sometimes. If you need a one-time cleanup (e.g., listings, duplicates, foundational pages), we can scope a project. Many teams choose ongoing support so reviews, content, and reporting keep compounding.",
            },
          ]}
        />

        <SeoTextSection title="what “local seo agency” should mean in practice">
          <p>
            when someone searches “local seo agency”, they’re usually not looking for theory. they’re looking for a partner who can
            improve visibility and connect it to calls, bookings, and customers. that requires both on-page clarity and off-page proof:
            accurate listings, steady reviews, useful local pages, and clean technical signals that make crawling and indexing easy.
          </p>
          <p>
            if you want the scoped deliverables view, start at{" "}
            <Link href="/local-seo-services">local seo services</Link>
            . if you’re maps-first, explore{" "}
            <Link href="/local-listings">local listing optimization</Link>
            .
          </p>
        </SeoTextSection>

        <FinalCta
          location="local seo agency final cta"
          title="become the obvious local choice."
          secondary={{ label: "See case studies", href: "/case-studies" }}
        />
      </main>

      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="local-seo-agency"
        name="Local SEO agency"
        description="a local seo agency partner for small businesses: listings, reviews, local pages, and reporting tied to real customer actions."
        serviceType="Local SEO agency"
        areaServed="United States"
      />
      <HowToSchema
        name="Local SEO agency process"
        description="A step-by-step local SEO system: baseline, ecosystem fixes, local pages, and the flywheel."
        steps={processSteps.map((step) => ({
          name: step.step,
          text: step.description,
        }))}
      />
    </div>
  )
}

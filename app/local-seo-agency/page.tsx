import type { Metadata } from "next"
import Link from "next/link"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import SeoTextSection from "@/components/seo-text-section"
import { Button } from "@/components/ui/button"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { ArrowRight, Check } from "lucide-react"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Local SEO Agency for Small Businesses | Prism",
  description: "Prism is a local SEO agency for small businesses, improving Google Maps and local search with listings, reviews, local pages, and reporting tied to calls.",
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
    description: "we run review and content systems that keep activity steady and increase prominence month to month.",
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
      "We combine strategy and execution in one sprint team. That means we actually ship the pages, schema, listing updates, review systems, and tracking — not just audits or recommendations. You also keep full ownership of accounts and data.",
  },
  {
    question: "Do you focus on Google Maps or organic search?",
    answer:
      "Both. Most local growth requires a combined approach: strong listings and reviews for map-pack visibility plus clear on-page service/location structure for organic rankings and AI answers.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Fixes that improve relevance and engagement can show movement quickly. Prominence signals (reviews, citations, mentions) compound over weeks and months — especially in competitive markets.",
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

export default function LocalSeoAgencyPage() {
  const aggregateRating = {
    "@type": "AggregateRating" as const,
    ratingValue: "4.9",
    reviewCount: "200",
    bestRating: "5",
    worstRating: "1",
  }
  const relatedCaseStudies = [
    {
      title: "Wine Country Root Canal",
      href: "/case-studies/wine-country-root-canal",
      summary: "Specialty practice visibility with clear local intent.",
    },
    {
      title: "Town Centre Dental",
      href: "/case-studies/town-centre-dental",
      summary: "Local search + conversions with modern reporting.",
    },
    {
      title: "Olympic Bootworks",
      href: "/case-studies/olympic-bootworks",
      summary: "Retail visibility with multi-site SEO and analytics.",
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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              local seo agency
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              A local SEO agency partner for small businesses
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              Prism helps local businesses show up in Google Maps and local search with a system that’s simple: clean listings, steady reviews, helpful local pages, and reporting tied to real customer actions.
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              Want a deliverables checklist? See{" "}
              <Link href="/local-seo-services" className="font-semibold text-neutral-900 underline underline-offset-4">
                local seo services
              </Link>
              .
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Dental practice? Start with{" "}
              <Link
                href="/dental-practice-seo-expert"
                className="font-semibold text-neutral-900 underline underline-offset-4"
              >
                seo for dentists
              </Link>
              .
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Need a baseline first? Start with our{" "}
              <Link href="/seo/audit" className="font-semibold text-neutral-900 underline underline-offset-4">
                seo audit service
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/free-analysis">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="#process">See how we work</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">what it’s like to work with prism</h2>
            <p className="mt-3 text-neutral-600">
              the difference between a vendor and an agency partner is consistency, clarity, and execution.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {agencyPillars.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
            Want the full SEO picture (on-page + off-page)? Start at{" "}
            <Link href="/seo" className="font-semibold text-neutral-900 underline underline-offset-4">
              seo
            </Link>
            .
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">how local rankings work</h2>
            <p className="mt-3 text-neutral-600">
              local visibility is a scoring system: match intent, be eligible locally, and prove you’re trusted.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {rankingModel.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
            For a maps-first checklist, read{" "}
            <Link href="/blog/google-maps-visibility-playbook-2025" className="font-semibold text-neutral-900 underline underline-offset-4">
              google maps visibility checklist
            </Link>
            .
          </div>
        </section>

        <section id="process" className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">our process</h2>
            <p className="mt-3 text-neutral-600">
              a simple, repeatable system — so improvements keep compounding without chaos.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {processSteps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">step</p>
                <h3 className="mt-2 text-xl font-semibold lowercase text-neutral-900">{item.step}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold lowercase text-neutral-900">what we run</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                {[
                  "google business profile optimization",
                  "local listings and citations (NAP consistency)",
                  "review capture and response systems",
                  "service and location pages with schema",
                  "tracking and reporting tied to calls and leads",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-neutral-600">
                Need the subsystem for maps and directories? See{" "}
                <Link href="/local-listings" className="font-semibold text-neutral-900 underline underline-offset-4">
                  local listings
                </Link>
                .
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold lowercase text-neutral-900">proof you can verify</h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                {[
                  { label: "case studies", href: "/case-studies" },
                  { label: "wall of love", href: "/wall-of-love" },
                  { label: "local shop playbook", href: "/why-local-shop-owners-love-prism" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-semibold text-neutral-900 underline underline-offset-4">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                If you’re comparing agencies, use our checklist:{" "}
                <Link href="/blog/how-to-choose-local-seo-agency" className="font-semibold text-neutral-900 underline underline-offset-4">
                  how to choose a local seo agency
                </Link>
                .
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">what we won’t do</h2>
            <p className="mt-3 text-neutral-600">
              local seo is not a trick. we avoid tactics that create short-term spikes and long-term risk.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {whatWeWontDo.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <div className="mt-1 rounded-full bg-neutral-900/10 p-1">
                  <Check className="h-4 w-4 text-neutral-900" />
                </div>
                <p className="text-sm text-neutral-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">case studies</p>
                <h2 className="mt-3 text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                  local seo results
                </h2>
                <div className="mt-6 space-y-4">
                  {relatedCaseStudies.map((study) => (
                    <Link
                      key={study.href}
                      href={study.href}
                      className="block rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="text-base font-semibold text-neutral-900">{study.title}</p>
                      <p className="mt-2 text-sm text-neutral-600">{study.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">from the blog</p>
                <h2 className="mt-3 text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                  agency selection guides
                </h2>
                <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                  {relatedPosts.map((post) => (
                    <li key={post.href}>
                      <Link
                        href={post.href}
                        className="font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/blog" className="text-sm font-semibold text-neutral-900 underline underline-offset-4">
                    browse all posts →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection
          title="local seo agency faq"
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

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Ready to become the obvious local choice?
            </h2>
            <p className="mt-4 text-neutral-600 sm:text-lg">
              We’ll map a focused plan, fix what’s holding you back, and build the system that keeps compounding.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/free-analysis">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/contact">Talk to a strategist</Link>
              </Button>
            </div>
          </div>
        </section>

        <SeoTextSection title="what “local seo agency” should mean in practice">
          <p>
            when someone searches “local seo agency”, they’re usually not looking for theory — they’re looking for a partner who can
            increase visibility and turn it into calls, bookings, and customers. that requires both on-page clarity and off-page proof:
            accurate listings, steady reviews, useful local pages, and clean technical signals that make crawling and indexing easy.
          </p>
          <p>
            if you want the scoped deliverables view, start at{" "}
            <Link href="/local-seo-services" className="font-semibold text-neutral-900 underline underline-offset-4">
              local seo services
            </Link>
            . if you’re maps-first, explore{" "}
            <Link href="/local-listings" className="font-semibold text-neutral-900 underline underline-offset-4">
              local listing optimization
            </Link>
            .
          </p>
        </SeoTextSection>
      </main>

      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="local-seo-agency"
        name="Local SEO agency"
        description="a local seo agency partner for small businesses: listings, reviews, local pages, and reporting tied to real customer actions."
        serviceType="Local SEO agency"
        areaServed="United States"
        aggregateRating={aggregateRating}
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

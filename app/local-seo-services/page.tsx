import type { Metadata } from "next"
import Link from "next/link"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { LandingHero } from "@/components/landing/landing-hero"
import { BulletList } from "@/components/landing/seo/bullet-list"
import { LinkPills } from "@/components/landing/seo/link-pills"
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
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  FileText,
  ListChecks,
  MapPin,
  Navigation,
  Star,
  Target,
  Trophy,
} from "lucide-react"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA } from "@/lib/waitlist"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Local SEO services',
  description: 'Show up in Google Maps and organic search with accurate listings, strong reviews, clear pages, and useful reporting.',
  path: "/local-seo-services",
  ogImage: "/prism-opengraph.png",
})

const whatYouGet = [
  {
    title: "google business profile + map-pack lift",
    description: "categories, services, photos, posts, and signals that improve relevance and drive clicks, calls, and directions.",
  },
  {
    title: "local listings + citations",
    description: "consistent name, address, phone, and business details across Apple, Yelp, Bing, and key directories.",
  },
  {
    title: "reviews + reputation engine",
    description: "review capture flows, response playbooks, and reporting on volume, recency, and sentiment.",
  },
  {
    title: "local landing pages that convert",
    description: "service and location pages built like clear answers, with schema, internal links, and conversion-ready layouts.",
  },
  {
    title: "technical + on-page seo cleanup",
    description: "indexing hygiene, canonical consistency, structured data, and page experience improvements that keep the foundation clean.",
  },
  {
    title: "reporting that ties to revenue",
    description: "track the actions that matter: calls, form fills, bookings, direction requests, and top queries.",
  },
]

const rankingModel = [
  {
    title: "relevance",
    description: "how well your site and profiles match what someone is searching for (services, categories, and language that mirrors intent).",
  },
  {
    title: "distance (proximity)",
    description: "how close you are to the searcher or the implied location in the query, supported by accurate addresses and service-area setup.",
  },
  {
    title: "prominence",
    description: "how trusted you are: reviews, citations, local mentions, links, and engagement over time.",
  },
]

const processSteps = [
  {
    step: "audit + quick wins",
    description: "we benchmark your current visibility, map competitors, and fix the highest-impact listing and site issues first.",
  },
  {
    step: "tighten listings + reviews",
    description: "we normalize NAP and categories, clean duplicates, and build a review flywheel you can run forever.",
  },
  {
    step: "build local pages",
    description: "we ship the service + location pages that match real searches and make it obvious what you do and where you do it.",
  },
  {
    step: "measure + iterate",
    description: "we monitor rankings, calls, direction requests, and conversions, then expand what’s working month to month.",
  },
]

const faqItems = [
  {
    question: "What’s included in local seo services?",
    answer:
      "Prism’s local SEO services typically include Google Business Profile optimization, listings/citations, review strategy, on-page service and location content, technical SEO hygiene, and reporting tied to calls and leads. Scope depends on your business model and locations.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Some improvements (fixing listings, categories, and on-page clarity) can lift engagement quickly. Competitive map-pack movement and stronger prominence signals usually compound over weeks and months as reviews, citations, and content build up.",
  },
  {
    question: "Do you work with multi-location businesses?",
    answer:
      "Yes. We standardize data across locations, create location-specific pages and reporting, and build review systems that scale without sacrificing local nuance.",
  },
  {
    question: "Do I need a new website for local seo to work?",
    answer:
      "Not always. If your site is technically healthy and clear, we can improve structure and content in place. If the platform is slow or hard to update, rebuilding on a faster stack can accelerate results and improve conversion rate.",
  },
  {
    question: "Will you create dozens of thin city pages?",
    answer:
      "No. We avoid doorway patterns and focus on pages that are genuinely useful: service pages, real locations you operate from, and content that answers buyer questions with proof and clarity.",
  },
]

const inlineLink =
  "font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70"

const WHAT_YOU_GET_ICONS = [MapPin, ListChecks, Star, FileText, Code2, BarChart3] as const
const RANKING_ICONS = [Target, Navigation, Trophy] as const

export default function LocalSeoServicesPage() {
  const relatedCaseStudies = [
    {
      title: "Wine Country Root Canal",
      href: "/case-studies/wine-country-root-canal",
      summary: "Local visibility and service clarity for a specialty practice.",
      image: "/case-studies/wine-country-root-canal-home-desktop.jpg",
    },
    {
      title: "Town Centre Dental",
      href: "/case-studies/town-centre-dental",
      summary: "Modern website + analytics with map pack momentum.",
      image: "/case-studies/town-centre-dental-home-desktop.jpg",
    },
    {
      title: "Dr. Christopher B. Wong",
      href: "/case-studies/dr-christopher-wong",
      summary: "Transition visibility with listings, SEO, and trust signals.",
      image: "/case-studies/dr-christopher-wong-home-desktop.jpg",
    },
  ]
  const relatedPosts = [
    {
      title: "Google Maps visibility playbook (2025)",
      href: "/blog/google-maps-visibility-playbook-2025",
    },
    {
      title: "Local SEO agency guide",
      href: "/blog/how-to-choose-local-seo-agency",
    },
    {
      title: "Modern reviews strategy",
      href: "/blog/modern-reviews-strategy-2025",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="local seo services"
          title="local seo services that turn searches into customers."
          titleClassName="max-w-[17ch]"
          description="Prism helps local businesses show up in Google Maps and organic search with listings, reviews, local content, and clean technical foundations. No keyword stuffing, just a clear system that compounds."
          location="local seo services hero"
          ctaHref={WAITLIST_CTA.href}
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: "See our process", href: "#process" }}
          glow="warm"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-5 flex flex-col items-center gap-2 text-center">
              <h2 className="text-eyebrow text-subtle">how local rankings work</h2>
              <p className="max-w-[60ch] text-sm leading-6 text-muted-foreground">
                Local visibility is not magic. It’s a scoring system built on matching intent and proving you’re real.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.08] text-left md:grid-cols-3">
              {rankingModel.map((item, index) => {
                const Icon = RANKING_ICONS[index % RANKING_ICONS.length]
                return (
                  <div key={item.title} className="flex flex-col gap-3 bg-card/90 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon aria-hidden="true" className="size-4 text-foreground" />
                      </span>
                      <span className="font-mono text-xs tabular-nums text-subtle">signal 0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">{item.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                )
              })}
            </div>
            <p className="mt-5 text-center text-sm leading-6 text-muted-foreground">
              If you’re optimizing maps specifically, start with our{" "}
              <Link href="/blog/google-maps-visibility-playbook-2025" className={inlineLink}>
                Google Maps visibility checklist
              </Link>
              .
            </p>
            <LinkPills
              label="Related local SEO pages"
              className="mt-6 justify-center"
              links={[
                { label: "seo approach", href: "/seo" },
                { label: "local listings management", href: "/local-listings" },
                { label: "local seo agency", href: "/local-seo-agency" },
                { label: "dentist seo", href: "/dental-practice-seo-expert" },
                { label: "seo audit service", href: "/seo/audit" },
              ]}
            />
          </div>
        </LandingHero>

        <Section aria-labelledby="services-what-you-get-title">
          <Reveal>
            <SectionHeader
              id="services-what-you-get-title"
              eyebrow="what you get"
              title="understood, trusted, and chosen."
              description="Everything required to be understood, trusted, and chosen across maps, search, and AI answers."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {whatYouGet.map((item, index) => {
              const Icon = WHAT_YOU_GET_ICONS[index % WHAT_YOU_GET_ICONS.length]
              return (
                <Reveal key={item.title} delay={(index % 3) * 70}>
                  <SpotlightCard beam={index === 0} className="h-full p-6 sm:p-7">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon aria-hidden="true" className="size-[18px] text-foreground" />
                    </span>
                    <h3 className="text-heading mt-6 text-foreground">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section id="process" aria-labelledby="services-process-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
            <Reveal>
              <SectionHeader
                id="services-process-title"
                eyebrow="process"
                title="our process."
                description="A simple, repeatable system, so improvements keep shipping without chaos."
              />
            </Reveal>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((item, index) => (
                <li key={item.step} className="flex flex-col gap-3 bg-card p-6">
                  <span className="font-mono text-xs tabular-nums text-subtle">step 0{index + 1}</span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">{item.step}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <SeoSection
          eyebrow="what we track"
          title="what we work toward."
          description="The signals we track, in rankings and in real customer actions."
        >
          <Card className="p-6 sm:p-8">
            <BulletList
              itemClassName="text-base"
              items={[
                "Visibility for high-intent local searches, tracked in Search Console.",
                "Calls, directions, and lead forms from Maps and search, reported month to month.",
                "Cleaner brand trust signals across directories and reviews.",
                "A content foundation you can expand as you add services and locations.",
              ]}
            />
          </Card>
        </SeoSection>

        <Section aria-labelledby="services-results-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Reveal>
                <SectionHeader id="services-results-title" eyebrow="case studies" title="local seo in action." />
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
              <h2 className="text-heading mt-4 text-foreground">local visibility guides</h2>
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
          title="local seo services faq."
          subtitle="Quick answers about scope, timelines, and what we actually do."
          items={faqItems}
        />

        <SeoTextSection title="local seo services: what we optimize and why">
          <p>
            local seo services exist to help customers find you at the exact moment they’re ready to buy, when they search
            “near me”, when they compare options in google maps, and when they ask questions that imply location intent.
            prism focuses on the fundamentals: clear service and location structure on your site, accurate business data across
            the web, steady review signals, and technical hygiene that keeps crawling and indexing clean.
          </p>
          <p>
            if you want a deeper overview of on-page and off-page systems, start with{" "}
            <Link href="/seo">seo</Link>
            . if your immediate priority is map-pack presence, see{" "}
            <Link href="/local-listings">local listing optimization</Link>
            .
          </p>
        </SeoTextSection>

        <FinalCta
          location="local seo services final cta"
          title="show up when customers search."
          secondary={{ label: "See case studies", href: "/case-studies" }}
        />
      </main>

      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="local-seo-services"
        name="Local SEO services"
        description="local seo services for small businesses: google business profile, listings, reviews, local pages, and reporting that compounds."
        serviceType="Local SEO services"
        areaServed="United States"
      />
      <HowToSchema
        name="Local SEO service process"
        description="A step-by-step local SEO system: audit, listings + reviews, local pages, and iteration."
        steps={processSteps.map((step) => ({
          name: step.step,
          text: step.description,
        }))}
      />
    </div>
  )
}

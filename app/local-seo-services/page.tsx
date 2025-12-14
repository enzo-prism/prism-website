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

export const metadata: Metadata = {
  title: {
    absolute: "Local SEO Services for Small Businesses | Prism",
  },
  description:
    "Local SEO services that help you show up in Google Maps and organic search: listings, reviews, on-page structure, and reporting that turns visibility into calls and customers.",
  alternates: {
    canonical: "https://www.design-prism.com/local-seo-services",
  },
  openGraph: {
    title: "Local SEO Services for Small Businesses | Prism",
    description:
      "Show up when customers search nearby. Prism runs listings, reviews, on-page local structure, and reporting that compounds over time.",
    url: "https://www.design-prism.com/local-seo-services",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism local SEO services",
      },
    ],
  },
}

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

export default function LocalSeoServicesPage() {
  const aggregateRating = {
    "@type": "AggregateRating" as const,
    ratingValue: "4.9",
    reviewCount: "200",
    bestRating: "5",
    worstRating: "1",
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              local seo services
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Local SEO services that turn searches into customers
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              Prism helps local businesses show up in Google Maps and organic search with listings, reviews, local content, and clean technical foundations. No keyword stuffing — just a clear system that compounds.
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              Want the bigger picture? See our{" "}
              <Link href="/seo" className="font-semibold text-neutral-900 underline underline-offset-4">
                seo approach
              </Link>{" "}
              and our{" "}
              <Link href="/local-listings" className="font-semibold text-neutral-900 underline underline-offset-4">
                local listings management
              </Link>
              .
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Prefer an agency partner? Work with Prism as your{" "}
              <Link href="/local-seo-agency" className="font-semibold text-neutral-900 underline underline-offset-4">
                local seo agency
              </Link>
              .
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              Dental practice? Start with{" "}
              <Link
                href="/dental-practice-seo-expert"
                className="font-semibold text-neutral-900 underline underline-offset-4"
              >
                dental local seo
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
                <Link href="#process">See our process</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">what you get</h2>
            <p className="mt-3 text-neutral-600">
              Everything required to be understood, trusted, and chosen — across maps, search, and AI answers.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {whatYouGet.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              how local rankings work
            </h2>
            <p className="mt-3 text-neutral-600">
              Local visibility is not magic. It’s a scoring system built on matching intent and proving you’re real.
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
            If you’re optimizing maps specifically, start with our{" "}
            <Link href="/blog/google-maps-visibility-playbook-2025" className="font-semibold text-neutral-900 underline underline-offset-4">
              Google Maps visibility checklist
            </Link>
            .
          </div>
        </section>

        <section id="process" className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">our process</h2>
            <p className="mt-3 text-neutral-600">
              A simple, repeatable system — so improvements keep shipping without chaos.
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
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              outcomes you can expect
            </h2>
            <p className="mt-3 text-neutral-600">
              Results that show up in rankings and in real customer actions.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              "Higher visibility for high-intent local searches.",
              "More calls, directions, and lead forms from maps and search.",
              "Cleaner brand trust signals across directories and reviews.",
              "A content foundation you can expand as you add services and locations.",
            ].map((outcome) => (
              <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <div className="mt-1 rounded-full bg-neutral-900/10 p-1">
                  <Check className="h-4 w-4 text-neutral-900" />
                </div>
                <p className="text-sm text-neutral-700">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQSection
          title="local seo services faq"
          subtitle="Quick answers about scope, timelines, and what we actually do."
          items={faqItems}
        />

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Ready to show up when customers search?
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

        <SeoTextSection title="local seo services: what we optimize and why">
          <p>
            local seo services exist to help customers find you at the exact moment they’re ready to buy — when they search
            “near me”, when they compare options in google maps, and when they ask questions that imply location intent.
            prism focuses on the fundamentals: clear service and location structure on your site, accurate business data across
            the web, steady review signals, and technical hygiene that keeps crawling and indexing clean.
          </p>
          <p>
            if you want a deeper overview of on-page and off-page systems, start with{" "}
            <Link href="/seo" className="font-semibold text-neutral-900 underline underline-offset-4">
              seo
            </Link>
            . if your immediate priority is map-pack presence, see{" "}
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
        serviceId="local-seo-services"
        name="Local SEO services"
        description="local seo services for small businesses: google business profile, listings, reviews, local pages, and reporting that compounds."
        serviceType="Local SEO services"
        areaServed="United States"
        aggregateRating={aggregateRating}
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

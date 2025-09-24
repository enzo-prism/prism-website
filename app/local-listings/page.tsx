import Footer from "@/components/footer"
import FAQSection from "@/components/faq-section"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Local Listing Optimization Services | Prism",
  description:
    "Prism keeps your Google, Apple, Yelp, Bing, Facebook, and Nextdoor listings accurate, conversion-ready, and ranking for the searches that matter.",
  openGraph: {
    title: "Local Listing Optimization Services | Prism",
    description:
      "Prism keeps your Google, Apple, Yelp, Bing, Facebook, and Nextdoor listings accurate, conversion-ready, and ranking for the searches that matter.",
    url: "https://design-prism.com/local-listings",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Local Listing Optimization",
      },
    ],
  },
  alternates: {
    canonical: "https://design-prism.com/local-listings",
  },
}

const whatYouGet = [
  {
    title: "Accurate, consistent info everywhere",
    description: "Name, address, phone, website, hours, service area, and categories aligned across platforms.",
  },
  {
    title: "Conversion-ready profiles",
    description: "Offers, services, photos, FAQs, and action buttons built to drive calls, directions, and bookings.",
  },
  {
    title: "Ranking boosts that last",
    description: "Category tuning, service lists, attributes, and content that improve local relevance.",
  },
  {
    title: "Reviews that build trust",
    description: "Simple review collection and fast, professional responses.",
  },
  {
    title: "Spam cleanup and duplicate removal",
    description: "We fix messy listings and protect your brand.",
  },
  {
    title: "Transparent results",
    description: "Track calls, messages, directions, and website clicks in plain English.",
  },
]

const platforms = [
  {
    name: "Google Business Profile",
    why: "Map Pack visibility when buyers are searching now.",
  },
  {
    name: "Apple Business Connect",
    why: "Native iPhone Maps presence and Showcases for timely promos.",
  },
  {
    name: "Yelp",
    why: "High-intent local shoppers comparing options.",
  },
  {
    name: "Bing Places",
    why: "Extra reach on Windows and Edge users.",
  },
  {
    name: "Facebook and Instagram",
    why: "Social discovery plus accurate business details.",
  },
  {
    name: "Nextdoor and Waze",
    why: "Neighborhood credibility and drive-time visibility.",
  },
]

const rankingLevers = [
  {
    title: "Relevance",
    description: "Correct categories, services, and keywords so you match the right searches.",
  },
  {
    title: "Prominence",
    description: "Reviews, photos, and consistent data that build authority over time.",
  },
  {
    title: "Proximity (done right)",
    description: "Clean service-area and radius settings plus smart geo-targeted content.",
  },
  {
    title: "Engagement",
    description: "Posts, Q&A, and offers that drive clicks, calls, and bookings.",
  },
]

const processSteps = [
  {
    step: "Audit and Plan",
    description: "Review every listing, find gaps, and set clear goals.",
  },
  {
    step: "Fix and Claim",
    description: "Claim pages, remove duplicates, and correct bad data.",
  },
  {
    step: "Build to Convert",
    description: "Categories, services, photos, FAQs, offers, and CTAs that turn views into action.",
  },
  {
    step: "Review Engine",
    description: "Easy ways for happy customers to leave reviews plus responsive follow-up.",
  },
  {
    step: "Maintain and Improve",
    description: "Weekly checks, fresh content, seasonal hours, and ongoing optimizations.",
  },
]

const handledForYou = [
  "Claiming and verification",
  "NAP consistency",
  "Categories and services",
  "Attributes and amenities",
  "Hours and holiday hours",
  "Service-area setup",
  "Photos and short videos",
  "Google Posts, Apple Showcases, Yelp updates",
  "Q&A and messaging setup",
  "Review collection and responses",
  "Duplicate suppression",
  "Suspension support",
  "Tracking with UTM and GA4",
  "Monthly reporting",
]

const outcomes = [
  "Stronger Map Pack presence on the searches that matter.",
  "Higher conversion rate from profile views to calls, directions, and bookings.",
  "More and better reviews that build trust and drive ranking.",
  "Clean, consistent listings across every major platform.",
]

const faqItems = [
  {
    question: "Do I need this if I already run ads?",
    answer: "Yes. Optimized listings improve ad performance and capture organic demand you would otherwise miss.",
  },
  {
    question: "How fast will I see results?",
    answer: "Fixes like accuracy, photos, and categories can lift engagement quickly. Reviews and consistency compound over weeks and months.",
  },
  {
    question: "Can you help if my Google listing is suspended or has duplicates?",
    answer: "Absolutely. We handle reinstatement requests, cleanup, and ongoing monitoring.",
  },
  {
    question: "What if I have multiple locations?",
    answer: "We standardize data, tailor content per location, and roll out updates at scale.",
  },
  {
    question: "Do I keep access to my listings?",
    answer: "Yes. You retain ownership and admin access to every profile.",
  },
]

export default function LocalListingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Prism - Local Listing Optimization" />
      <Navbar />

      <main className="flex-1">
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              local listing optimization
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Be the obvious choice in your neighborhood
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              We optimize and maintain your listings across Google, Apple, Yelp, Bing, Facebook, Instagram, Nextdoor, Waze, and more so you show up higher, look better, and win more nearby customers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/get-started">
                  Apply to get started
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
              Everything you need to stay accurate everywhere and convert views into action.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {whatYouGet.map(item => (
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
              platforms we manage (and why)
            </h2>
            <p className="mt-3 text-neutral-600">
              Coverage across every profile that influences local search, maps, and discovery.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {platforms.map(platform => (
              <div key={platform.name} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">platform</span>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">{platform.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{platform.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              how we lift rankings and conversions
            </h2>
            <p className="mt-3 text-neutral-600">
              Practical levers that move you up the Map Pack and turn views into results.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {rankingLevers.map(item => (
              <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">our simple process</h2>
            <p className="mt-3 text-neutral-600">
              Built to clean up fast, improve continuously, and stay ahead of the competition.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {processSteps.map((stage, index) => (
              <div key={stage.step} className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-6 shadow-sm sm:flex-row sm:items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{stage.step}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-900 px-4 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase sm:text-4xl">what we handle for you</h2>
            <p className="mt-3 text-neutral-300">
              Full-service listing management so your team can focus on running the business.
            </p>
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {handledForYou.map(item => (
              <span key={item} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-neutral-100">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              outcomes you can expect
            </h2>
            <p className="mt-3 text-neutral-600">
              Results that show up in your local rankings and your bottom line.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {outcomes.map(outcome => (
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
          title="local listings faq"
          subtitle="Quick answers so you know exactly how we manage and grow every profile."
          items={faqItems}
        />

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Ready to become the local favorite?
            </h2>
            <p className="mt-4 text-neutral-600 sm:text-lg">
              We will map a simple plan, clean up your listings, and turn profile views into real customers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/get-started">
                  Apply to get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/contact">Talk to a strategist</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

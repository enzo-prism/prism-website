import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

export const metadata: Metadata = {
  title: "paid ads management for small businesses | prism",
  description:
    "prism plans, builds, and optimizes google, meta, tiktok, and yelp ads so small businesses capture ready-to-buy local customers without wasted spend.",
  openGraph: {
    title: "paid ads management for small businesses | prism",
    description:
      "prism plans, builds, and optimizes google, meta, tiktok, and yelp ads so small businesses capture ready-to-buy local customers without wasted spend.",
    url: "https://design-prism.com/ads",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Ads Services",
      },
    ],
  },
  alternates: {
    canonical: "https://design-prism.com/ads",
  },
}

const whatYouGet = [
  {
    title: "strategy that fits your goals",
    description: "clear targets, ideal customer profiles, and the fastest path to roi.",
  },
  {
    title: "high-performing creative",
    description: "thumb-stopping visuals and plain-english copy that turns interest into action.",
  },
  {
    title: "landing page alignment",
    description: "every click points to a tuned offer, so conversions stay high.",
  },
  {
    title: "full-funnel setup",
    description: "search, social, remarketing, and local intent working together.",
  },
  {
    title: "daily / weekly optimization",
    description: "shift budget to winners, pause what isn't working, and test new ideas.",
  },
  {
    title: "transparent reporting",
    description: "calls, form fills, booked appointments, and cpl, all in plain english.",
  },
]

const budgetGuards = [
  {
    title: "no wasted clicks",
    description: "block bad searches, irrelevant audiences, and spam leads before they burn budget.",
  },
  {
    title: "show up when buyers are ready",
    description: "bids, schedules, and pacing tuned to peak-intent windows.",
  },
  {
    title: "right radius, right people",
    description: "smart geo-targeting and exclusions keep spend local and high quality.",
  },
  {
    title: "relentless a/b testing",
    description: "headlines, images, offers, and forms refined nonstop to lower cost per lead.",
  },
]

const platforms = [
  {
    name: "Google Ads",
    why: "High-intent searches when people need you now.",
  },
  {
    name: "Facebook & Instagram",
    why: "Precise audiences plus creative that builds demand and trust.",
  },
  {
    name: "TikTok",
    why: "Native, fast-moving creative that grabs attention and converts.",
  },
  {
    name: "Yelp Ads",
    why: "Bottom-of-funnel local buyers comparing options.",
  },
]

const processSteps = [
  {
    step: "Discover",
    description: "goals, budget, ideal customers, and local market reality.",
  },
  {
    step: "Build",
    description: "tracking, audiences, creative, and landing page improvements.",
  },
  {
    step: "Launch",
    description: "start lean and gather signal quickly without wasting spend.",
  },
  {
    step: "Optimize",
    description: "shift spend to winners and cut losers fast.",
  },
  {
    step: "Report",
    description: "clear results and next steps with no jargon and no fluff.",
  },
]

const outcomes = [
  "Lower cost per lead through testing and tighter targeting.",
  "Higher conversion rates with better offers and landing pages.",
  "Cleaner pipeline by filtering out low-quality clicks and calls.",
  "Full visibility into what's working so you can scale confidently.",
]

const handledForYou = [
  "Ad account setup",
  "Conversion tracking",
  "Pixels & tags",
  "Creative & copy",
  "Offer testing",
  "Negative keywords & exclusions",
  "Geo-targeting",
  "Remarketing",
  "Call tracking",
  "Weekly optimizations",
  "Monthly summaries",
]

const faqItems = [
  {
    question: "How fast will I see results?",
    answer:
      "Search and Yelp tend to produce leads quickly. Paid social ramps as creative tests find winners. Most clients see meaningful signal in weeks, not months.",
  },
  {
    question: "What budgets work best?",
    answer:
      "We recommend a starting budget by channel and market size. Spend scales only when performance proves it can sustain.",
  },
  {
    question: "Can you use my existing accounts?",
    answer:
      "Yes. We can audit, clean up, and improve your current setup, or build fresh if you need a new start.",
  },
  {
    question: "What if I already run ads?",
    answer:
      "Great. We'll keep what works, fix the waste, and test higher-converting variations so nothing good is lost.",
  },
]

const audienceSegments = [
  {
    name: "Dental & medical teams",
    description: "fill chair time with compliant campaigns, call tracking, and landing pages tuned for patients.",
    href: "/why-dental-practices-love-prism",
  },
  {
    name: "Local shop owners",
    description: "hyper-local offers on google, meta, and yelp that turn scrollers into foot traffic and orders.",
    href: "/why-local-shop-owners-love-prism",
  },
  {
    name: "Consulting & professional services",
    description: "lead-gen funnels that surface expertise, nurture prospects, and protect premium positioning.",
    href: "/why-consulting-companies-love-prism",
  },
  {
    name: "Online community founders",
    description: "acquisition loops that combine paid social and retargeting to expand engaged membership.",
    href: "/why-online-community-founders-love-prism",
  },
  {
    name: "Nonprofits & education",
    description: "mission-forward messaging, donor retargeting, and grant-friendly tracking that proves impact.",
    href: "/why-nonprofits-love-prism",
  },
]

export default function AdsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Prism - Paid Ads Services" />
      <Navbar />

      <main className="flex-1">
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              paid acquisition
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Ads that bring the right customers - not just clicks
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              We plan, create, and optimize ads across Google, Meta, TikTok, and Yelp so you reach the people most likely to buy without overspending.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/free-analysis">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="#budget-protection">See how we optimize budgets</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              what you get
            </h2>
            <p className="mt-3 text-neutral-600">
              Everything built to drive qualified demand and prove ROI with no black box reporting.
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

        <section id="budget-protection" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                how we protect your budget
              </h2>
              <p className="mt-3 text-neutral-600">
                Guardrails that keep every dollar focused on qualified buyers.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {budgetGuards.map(item => (
                <div key={item.title} className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              platforms we run (and why)
            </h2>
            <p className="mt-3 text-neutral-600">
              Each channel supports a different stage of your buyer journey.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {platforms.map(platform => (
              <div key={platform.name} className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">channel</span>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900">{platform.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{platform.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              who we help scale with ads
            </h2>
            <p className="mt-3 text-neutral-600">
              We partner with ambitious local teams that need predictable demand without wasting budget.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {audienceSegments.map(segment => (
              <Link
                key={segment.name}
                href={segment.href}
                className="group block rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">segment</span>
                <div className="mt-2">
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-neutral-800">{segment.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600 group-hover:text-neutral-700">{segment.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-neutral-900/70 group-hover:text-neutral-900">
                  See how we support them
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-neutral-200 bg-white p-8 text-left shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">referral program</span>
              <h3 className="mt-3 text-2xl font-semibold lowercase text-neutral-900">know a team who needs better ads?</h3>
              <p className="mt-3 text-sm text-neutral-600">
                Point them to Prism’s referral program. We’ll audit their accounts, share the plan, and pay you when they launch.
              </p>
            </div>
            <Button asChild size="lg" className="mt-6 rounded-full px-8 sm:mt-0">
              <Link href="/refer">refer a business</Link>
            </Button>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              our simple process
            </h2>
            <p className="mt-3 text-neutral-600">
              Fast to launch, ruthless about signal, clear about next steps.
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
            <h2 className="text-3xl font-semibold lowercase sm:text-4xl">outcomes you can expect</h2>
            <p className="mt-3 text-neutral-300">
              Performance you can see in your calendar, pipeline, and revenue.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {outcomes.map(outcome => (
              <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <div className="mt-1 rounded-full bg-white/10 p-1">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-sm text-neutral-100">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
              what we handle for you
            </h2>
            <p className="mt-3 text-neutral-600">
              Full-service coverage so you can stay focused on running the business.
            </p>
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {handledForYou.map(item => (
              <span key={item} className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700">
                {item}
              </span>
            ))}
          </div>
        </section>

        <FAQSection
          title="ads faq"
          subtitle="Straight answers so you know exactly what happens once we launch."
          items={faqItems}
        />

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Ready to reach better customers?
            </h2>
            <p className="mt-4 text-neutral-600 sm:text-lg">
              We'll map a simple plan to hit your goals, protect your budget, and grow what works.
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
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

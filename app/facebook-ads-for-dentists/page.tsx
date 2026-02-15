import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ClipboardList, LineChart, ShieldCheck, Target, Video } from "lucide-react"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { ServiceSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Facebook Ads for Dentists | Prism",
  description: "Prism runs Facebook & Instagram ads for dentists with patient-ready creative, landing pages, and reporting tied to calls and booked consults.",
  path: "/facebook-ads-for-dentists",
  ogImage: "/prism-opengraph.png",
})

const primaryCta = {
  label: "Get a free analysis",
  href: "/free-analysis",
} as const

const secondaryCta = {
  label: "Talk to Prism",
  href: "/contact",
} as const

const whatConverts = [
  {
    title: "one offer per campaign",
    description:
      "pick one consult-worthy offer (implants consult, invisalign, emergency, whitening) so results are measurable, learnings are fast, and scaling is clean.",
  },
  {
    title: "proof-first creative",
    description:
      "patients don’t want stock ads. they want to see the team, the office, the process, and the calm reassurance that you’re the right fit.",
  },
  {
    title: "a fast path to booking",
    description:
      "every click leads to one next step: call, short form, or online booking — no confusion, no dead ends, no five-page detours.",
  },
]

const whatYouGet = [
  {
    title: "dentist-specific strategy + targeting",
    description:
      "campaign structure by service line + service area, with exclusions and guardrails that protect budget and keep targeting aligned with modern privacy expectations.",
    icon: Target,
  },
  {
    title: "patient-ready creative",
    description:
      "ads that feel like calm education and real clinic proof — designed to reduce fear and make the next step obvious.",
    icon: Video,
  },
  {
    title: "lead capture that converts",
    description:
      "the right mix of lead forms, landing pages, and booking flows so you capture demand without flooding your front desk with junk.",
    icon: CheckCircle2,
  },
  {
    title: "tracking tied to calls + consults",
    description:
      "we connect form fills and calls to campaigns so you can scale what’s working and cut waste fast.",
    icon: LineChart,
  },
  {
    title: "privacy-aware implementation",
    description:
      "clean measurement and intake that avoids collecting sensitive info you don’t need — with clear ownership of your ad accounts.",
    icon: ShieldCheck,
  },
  {
    title: "weekly optimization + reporting",
    description:
      "creative testing, budget shifts, and plain-english reports focused on outcomes — not vanity metrics.",
    icon: ClipboardList,
  },
]

const captureOptions = [
  {
    title: "meta lead forms",
    description:
      "best when you need speed and mobile completion. we qualify leads with the right questions and connect submissions to your follow-up system.",
    bestFor: "emergency, specials, fast response teams",
  },
  {
    title: "landing pages",
    description:
      "best when trust and education matter. we use a single offer, clear objections, and an obvious next step so clicks don’t leak.",
    bestFor: "implants, invisalign, cosmetics, high-trust consults",
  },
]

const setupSteps = [
  {
    step: "audit",
    description: "review your current ads (or start from scratch), your website, your offer, and your intake flow.",
  },
  {
    step: "offer + creative plan",
    description: "pick the offer, write angles, and map proof assets so creative tests are purposeful — not random.",
  },
  {
    step: "build + tracking",
    description: "create campaigns, set up tracking for calls/forms, and align landing pages or lead forms to reduce junk.",
  },
  {
    step: "launch lean",
    description: "start with clean targeting and a small creative set so we gather signal quickly without burning budget.",
  },
  {
    step: "optimize weekly",
    description: "shift spend to winners, cut losers, iterate creative, and tighten follow-up so performance compounds.",
  },
]

const faqItems = [
  {
    question: "Do Facebook ads work for dentists?",
    answer:
      "Yes — when the offer is clear, the creative builds trust, and the lead path is simple. The biggest failure mode is vague “general dentistry” ads that don’t give patients a reason to act.",
  },
  {
    question: "How much should a dental practice spend on Facebook ads?",
    answer:
      "It depends on your market and service line. Most practices start with a small, testable budget, then scale only after cost per lead and lead quality prove the numbers work.",
  },
  {
    question: "Should I use lead forms or a landing page?",
    answer:
      "Lead forms are faster and can work well for urgent needs. Landing pages tend to win for high-trust consults (implants, invisalign) because you can educate and handle objections before the form.",
  },
  {
    question: "How fast will we see results?",
    answer:
      "You’ll usually see signal within weeks as creative tests run. Consistent wins come from iteration: tightening the offer, improving follow-up, and rotating proof-based creative over time.",
  },
  {
    question: "Can you run Facebook and Instagram ads together?",
    answer:
      "Yes. We run Meta campaigns across Facebook and Instagram, then optimize placements based on conversion performance — not just cheap clicks.",
  },
  {
    question: "Do you handle creative and landing pages too?",
    answer:
      "Yes. Creative, landing page alignment, and tracking are part of the system — because ads don’t work when the click experience is weak.",
  },
  {
    question: "How do you track calls and booked consults from Meta ads?",
    answer:
      "We track calls and forms, then tie those conversions back to campaigns so you can see what produced real inquiries — not just impressions or traffic.",
  },
  {
    question: "Do you guarantee a specific number of leads?",
    answer:
      "No. We focus on controllable levers: offer clarity, creative quality, landing page conversion, tracking, and continuous optimization.",
  },
]

function getDentalCaseStudies() {
  const prioritySlugs = ["dr-christopher-wong", "mataria-dental-group", "exquisite-dentistry", "wine-country-root-canal"]

  const priority = prioritySlugs
    .map((slug) => CASE_STUDIES.find((study) => study.slug === slug))
    .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))

  const fallback = CASE_STUDIES.filter((study) => study.segments.includes("dental")).slice(0, 4)

  const unique = new Map<string, (typeof CASE_STUDIES)[number]>()
  for (const study of [...priority, ...fallback]) unique.set(study.slug, study)

  return Array.from(unique.values()).slice(0, 4)
}

export default function FacebookAdsForDentistsPage() {
  const caseStudies = getDentalCaseStudies()

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-neutral-100 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">paid social for dental</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              facebook ads for dentists
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              prism helps dental practices turn Facebook &amp; Instagram (Meta) ads into booked demand with offer-first
              strategy, patient-ready creative, conversion-focused lead capture, and reporting tied to calls and consults —
              not vanity metrics.
            </p>
            <p className="mt-6 text-sm text-neutral-500">
              want google-first intent too? pair this with{" "}
              <Link href="/google/dental-ads" className="font-medium text-neutral-900 underline underline-offset-4">
                google ads for dentists
              </Link>
              . want short-form scroll intent? see{" "}
              <Link href="/tiktok-ads-for-dentists" className="font-medium text-neutral-900 underline underline-offset-4">
                tiktok ads for dentists
              </Link>
              . want the step-by-step plan? read{" "}
              <Link
                href="/blog/facebook-ads-for-dentists-playbook"
                className="font-medium text-neutral-900 underline underline-offset-4"
              >
                facebook ads for dentists: the 30-day playbook
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-neutral-500">meta strategy + creative + tracking — shipped by prism.</p>
          </div>
        </section>

        <section id="playbook" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what converts on facebook for dental practices
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                dentistry is high-trust. the winners don’t look like ads — they look like calm, credible education with a
                clear next step.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {whatConverts.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">what you get</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                everything needed to run facebook ads for dentists without wasting spend: creative direction, conversion
                alignment, and clear reporting.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {whatYouGet.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 text-sm text-neutral-600 shadow-sm">
              want a broader overview of our multi-channel ads system? see{" "}
              <Link href="/ads" className="font-semibold text-neutral-900 underline underline-offset-4">
                paid ads management
              </Link>
              .
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                lead forms vs landing pages
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                most wasted spend happens after the click. we choose the lead path based on your service line, your front
                desk bandwidth, and how much trust patients need before they book.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {captureOptions.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">option</p>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                  <p className="mt-4 text-sm text-neutral-600">
                    <span className="font-semibold text-neutral-900">best for:</span> {item.bestFor}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-neutral-600">
              want your landing pages to convert better (even before ads)? start with{" "}
              <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                modern dental websites
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                how we set up meta campaigns (without guesswork)
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                start lean, learn fast, and scale only when lead quality and cost prove it.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {setupSteps.map((item, index) => (
                <div key={item.step} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">step {index + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {caseStudies.length > 0 ? (
          <section className="border-t border-neutral-100 bg-white px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">proof</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  dental case studies
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  real dental teams. real systems. websites, content, and marketing that compound.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {caseStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="block rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{study.category}</p>
                    <h3 className="mt-2 text-lg font-semibold lowercase text-neutral-900">{study.client}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{study.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-neutral-100 bg-neutral-950 px-4 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              want booked consults from facebook this quarter?
            </h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              get a free analysis and a clear plan for offer, creative, lead capture, and tracking.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-white px-8 text-neutral-900 hover:bg-neutral-200">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/70">
              prefer search-first demand? start here:{" "}
              <Link href="/google/dental-ads" className="font-medium text-white underline underline-offset-4">
                google ads for dentists
              </Link>
            </p>
          </div>
        </section>

        <FAQSection
          title="facebook ads questions"
          subtitle="what most dentists ask before running facebook and instagram ads."
          items={faqItems}
        />

        <ScrollToTop />
      </main>

      <Footer />

      <ServiceSchema
        serviceId="facebook-ads-for-dentists"
        name="Facebook ads for dentists"
        description="Facebook & Instagram (Meta) ads strategy, creative, landing pages, and reporting for dental practices."
        serviceType="Dental Facebook ads management"
        areaServed="United States"
      />
    </div>
  )
}

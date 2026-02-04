import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ClipboardList, LineChart, ShieldCheck, Video } from "lucide-react"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { ServiceSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { CASE_STUDIES } from "@/lib/case-study-data"

export const metadata: Metadata = {
  title: {
    absolute: "TikTok Ads for Dentists | Prism",
  },
  description:
    "Prism runs TikTok ads for dentists with creative, landing pages, and tracking that turn attention into booked consults—without spam.",
  alternates: {
    canonical: "https://www.design-prism.com/tiktok-ads-for-dentists",
  },
  openGraph: {
    title: "TikTok Ads for Dentists | Prism",
    description:
      "Prism runs TikTok ads for dentists with creative, landing pages, and tracking that turn attention into booked consults—without spam.",
    url: "https://www.design-prism.com/tiktok-ads-for-dentists",
    siteName: "prism",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism TikTok ads for dentists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Ads for Dentists | Prism",
    description:
      "Prism runs TikTok ads for dentists with creative, landing pages, and tracking that turn attention into booked consults—without spam.",
    images: ["/prism-opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const primaryCta = {
  label: "Get a free analysis",
  href: "/free-analysis",
} as const

const secondaryCta = {
  label: "Talk to Prism",
  href: "/contact",
} as const

const whatYouGet = [
  {
    title: "dentist-specific offer + angle",
    description:
      "we choose one offer per campaign (implants consult, invisalign, emergency, whitening) and write the angle patients actually respond to.",
    icon: ClipboardList,
  },
  {
    title: "native creative that earns trust",
    description:
      "short-form video that looks like real clinic content: team, operatories, patient education, and proof—built for tiktok’s feed.",
    icon: Video,
  },
  {
    title: "landing pages that convert",
    description:
      "fast pages with clear next steps (call, form, online booking), plus calm explanations that reduce anxiety and confusion.",
    icon: CheckCircle2,
  },
  {
    title: "tracking tied to booked demand",
    description:
      "we track calls + forms and connect performance to real outcomes so you can scale what works and cut what doesn’t.",
    icon: LineChart,
  },
  {
    title: "privacy-aware implementation",
    description:
      "we build clean tracking and forms that avoid collecting sensitive info you don’t need, and keep measurement aligned with modern privacy expectations.",
    icon: ShieldCheck,
  },
]

const creativeFrameworks = [
  {
    title: "the 15-second reassurance",
    description:
      "a doctor or team member explains one fear (“i hate shots”) and the calming solution (sedation options, numbing approach, what to expect).",
  },
  {
    title: "the ‘what it costs’ context clip",
    description:
      "transparent ranges with the factors that change price (case complexity, materials, imaging, insurance/financing).",
  },
  {
    title: "the before/after story (no hype)",
    description:
      "patient-ready outcomes with clear context: who it’s for, timeline, and what the consult covers.",
  },
  {
    title: "the ‘dentist reacts’ education loop",
    description:
      "quick reactions to common myths and viral dental takes—then a simple call to action: book a consult.",
  },
]

const setupSteps = [
  {
    step: "audit",
    description: "we review your current ads, website, and intake flow so we know what’s blocking conversions.",
  },
  {
    step: "build",
    description:
      "we set up the campaign structure, creative plan, landing page alignment, and reporting so signal is clean from day one.",
  },
  {
    step: "launch + learn",
    description:
      "we start lean, test multiple hooks fast, and keep spend focused on winners (not vanity metrics).",
  },
  {
    step: "optimize",
    description:
      "weekly refinements: creative iteration, offer testing, targeting adjustments, and conversion-rate improvements.",
  },
]

const faqItems = [
  {
    question: "do tiktok ads work for dentists?",
    answer:
      "they can, especially for practices that pair credible short-form video with a fast landing page and a clear next step. tiktok is rarely “set it and forget it”—creative iteration is the lever.",
  },
  {
    question: "what should a dentist advertise on tiktok?",
    answer:
      "start with one clear offer: invisalign consults, implants consults, emergency dentistry availability, whitening, or new patient exams (if your unit economics support it). we recommend one offer per campaign so results are measurable.",
  },
  {
    question: "should we send clicks to a lead form or our website?",
    answer:
      "both can work. lead forms often generate volume quickly, while website traffic can improve lead quality when the page builds trust and answers questions. we test both paths and scale the one that produces booked appointments at the right cost.",
  },
  {
    question: "how do you track results for tiktok ads?",
    answer:
      "we track calls and form submissions, and we work backward from booked consults where possible. the goal is simple reporting that ties spend to outcomes—so you know what to scale.",
  },
  {
    question: "how fast can we get campaigns live?",
    answer:
      "most practices can launch within 1–2 weeks once access and the offer are confirmed. faster launches are possible if you already have approved creative and a conversion-ready landing page.",
  },
]

function getDentalCaseStudies() {
  const prioritySlugs = [
    "dr-christopher-wong",
    "mataria-dental-group",
    "exquisite-dentistry",
    "wine-country-root-canal",
  ]

  const priority = prioritySlugs
    .map((slug) => CASE_STUDIES.find((study) => study.slug === slug))
    .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))

  const fallback = CASE_STUDIES.filter((study) => study.segments.includes("dental")).slice(0, 4)

  const unique = new Map<string, (typeof CASE_STUDIES)[number]>()
  for (const study of [...priority, ...fallback]) unique.set(study.slug, study)

  return Array.from(unique.values()).slice(0, 4)
}

export default function TikTokAdsForDentistsPage() {
  const caseStudies = getDentalCaseStudies()

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-neutral-100 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">paid social for dental</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              tiktok ads for dentists
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              prism helps dental practices turn short-form video into booked demand with patient-ready creative, fast
              landing pages, and reporting tied to calls and consults — not vanity metrics.
            </p>
            <p className="mt-6 text-sm text-neutral-500">
              already running search? pair this with{" "}
              <Link href="/google/dental-ads" className="font-medium text-neutral-900 underline underline-offset-4">
                google ads for dentists
              </Link>{" "}
              so you capture both scroll-intent and high-intent searches. prefer meta feed-first demand? see{" "}
              <Link href="/facebook-ads-for-dentists" className="font-medium text-neutral-900 underline underline-offset-4">
                facebook ads for dentists
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="#playbook">see the playbook</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-neutral-500">
              dentist-first creative + landing pages + tracking — shipped by prism.
            </p>
          </div>
        </section>

        <section id="playbook" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what converts on tiktok for dental practices
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                dentistry is high-trust. the winners don’t look like ads — they look like calm, credible education with a
                clear next step.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "proof-first creative",
                  description:
                    "show the office, the team, and the real experience patients are buying — not stock footage.",
                },
                {
                  title: "one offer per campaign",
                  description:
                    "avoid “general dentistry” ads. pick one consult-worthy offer so results are measurable and scalable.",
                },
                {
                  title: "fast path to booking",
                  description:
                    "every click should lead to a single next step: call, short form, or online booking — no confusion.",
                },
              ].map((item) => (
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
                everything needed to run tiktok ads without wasting spend: creative direction, landing page alignment, and
                clear reporting.
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
                how we set up tiktok ads (without guesswork)
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                start lean, learn fast, and scale only when the numbers prove it.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {setupSteps.map((item, index) => (
                <div key={item.step} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
                    step {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                creative frameworks dentists can use
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                four repeatable patterns that work because they reduce fear and make the next step obvious.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {creativeFrameworks.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-neutral-600">
              need better on-site trust signals for these videos to convert? start with{" "}
              <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                modern dental websites
              </Link>
              .
            </p>
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
              want booked consults from tiktok this quarter?
            </h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              get a free analysis and a clear plan for creative, landing pages, and tracking.
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
              prefer google-first demand? start here:{" "}
              <Link href="/google/dental-ads" className="font-medium text-white underline underline-offset-4">
                google ads for dentists
              </Link>
              . prefer meta? start here:{" "}
              <Link href="/facebook-ads-for-dentists" className="font-medium text-white underline underline-offset-4">
                facebook ads for dentists
              </Link>
            </p>
          </div>
        </section>

        <FAQSection
          title="tiktok ads questions"
          subtitle="what most dentists ask before running tiktok ads."
          items={faqItems}
        />

        <ScrollToTop />
      </main>

      <Footer />

      <ServiceSchema
        serviceId="tiktok-ads-for-dentists"
        name="TikTok ads for dentists"
        description="TikTok ads strategy, creative, landing pages, and reporting for dental practices."
        serviceType="Dental TikTok ads management"
        areaServed="United States"
      />
    </div>
  )
}

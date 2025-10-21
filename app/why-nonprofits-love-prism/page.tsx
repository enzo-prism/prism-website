import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"

const coreOutcomes = [
  {
    icon: "💡",
    title: "More awareness",
    description: "Reach more people through better design, storytelling, and search visibility."
  },
  {
    icon: "💖",
    title: "More engagement",
    description: "Turn visitors into donors, volunteers, or advocates with thoughtful journeys."
  },
  {
    icon: "⚙️",
    title: "Less overhead",
    description: "Automations and smart integrations reduce manual work for your team."
  }
]

const nonprofitThemes = [
  {
    heading: "Tell Your Story Beautifully",
    bullets: [
      "Custom website design that evokes trust and emotion",
      "Clear storytelling frameworks that connect hearts and minds",
      "Dedicated pages for projects, impact stories, and news updates"
    ]
  },
  {
    heading: "Reach and Inspire Supporters",
    bullets: [
      "SEO + AEO optimization to appear in Google and AI search",
      "Integration with donation platforms like Donorbox, Stripe, or PayPal",
      "Social and ad campaign support to grow awareness"
    ]
  },
  {
    heading: "Simplify Operations",
    bullets: [
      "Automations for newsletters, donor thank-yous, and updates",
      "Centralized analytics to see what’s working",
      "Continuous improvement — your site gets smarter each month"
    ]
  }
]

const transitionSteps = [
  "We handle all communication with your old provider.",
  "We migrate domains, files, and donation systems with zero downtime.",
  "We ensure every piece of data transfers securely and correctly."
]

const improvementHighlights = [
  "Regular updates and AEO improvements keep your organization visible.",
  "Accessibility and mobile optimization ensure everyone can experience your message.",
  "Monthly insights help your team make data-driven decisions with ease."
]

const nonprofitCaseStudies = CASE_STUDIES.filter((study) => study.segments.includes("nonprofit"))

const stayingReasons = [
  { icon: "💼", text: "You own 100% of your website and data." },
  { icon: "🔓", text: "Pause or cancel anytime — no long contracts." },
  { icon: "🧠", text: "Continuous updates and optimizations at no extra cost." },
  { icon: "🧾", text: "Clear, jargon-free reports showing what’s working." },
  { icon: "💬", text: "Direct line to the founder for ongoing support." }
]

export const metadata: Metadata = {
  title: "Why Nonprofits Partner with Prism",
  description:
    "Prism helps nonprofits tell their story beautifully, attract donors and supporters, and manage technology effortlessly so they can focus on mission-driven work.",
  alternates: {
    canonical: "https://www.design-prism.com/why-nonprofits-love-prism"
  },
  openGraph: {
    title: "Why Nonprofits Partner with Prism",
    description:
      "Share your mission, reach more people, and simplify your tech stack. Prism gives nonprofits modern tools, empathetic design, and effortless support.",
    url: "https://www.design-prism.com/why-nonprofits-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Nonprofits Partner with Prism",
    description:
      "Prism amplifies nonprofit impact with beautiful storytelling, donor journeys, and technology that runs quietly in the background.",
    creator: "@designprism"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function NonprofitsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
                nonprofit growth playbook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Share your mission. Reach more people. Simplify your tech.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism helps nonprofits tell their story beautifully, attract donors and supporters, and manage technology effortlessly — so their teams can stay focused on the work that matters most.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    talk to prism
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    {FREE_AUDIT_CTA_TEXT}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Core Results */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We help nonprofits amplify impact through clarity, credibility, and connection.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism gives mission-driven teams modern tools, simple systems, and stunning design — built for scale, not stress.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreOutcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-slate-50 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden>{outcome.icon}</span>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{outcome.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What Prism Handles */}
        <section className="border-t border-neutral-100 bg-slate-50/80">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We make it easy to share your story and measure your impact.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {nonprofitThemes.map((theme) => (
                <div
                  key={theme.heading}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-neutral-900">{theme.heading}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    {theme.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Seamless Transitions */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We make switching to Prism effortless and worry-free.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Many nonprofits inherit outdated websites or systems built by volunteers or legacy vendors. Prism makes it easy to modernize — without losing content or history.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                {transitionSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">Transition support includes:</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>Audit of your current systems and content</li>
                <li>Secure credential handoff and documentation</li>
                <li>Donation and CRM integration testing</li>
                <li>Content preservation for archives and impact stories</li>
                <li>Launch roadmap shared across your team</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Communication */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                You’ll always know what’s happening — and who’s handling it.
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                You’ll have direct access to Prism’s founder, Enzo — by call, text, or email anytime. We value communication, transparency, and trust above all else — because mission-driven work deserves partners who care just as much as you do.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Continuous Improvement */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We don’t just build your website. We help it grow with you.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                The world of search, AI, and digital storytelling changes fast — and Prism keeps you ahead of it.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                {improvementHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">Momentum you can count on</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>Accessibility reviews and fixes scheduled quarterly</li>
                <li>Storytelling templates for program and impact updates</li>
                <li>Donor journey audits to maximize conversions</li>
                <li>Experimentation with new channels, formats, and partnerships</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Nonprofits Supported */}
        <section className="border-t border-neutral-100 bg-slate-50/80">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trusted by organizations making a global difference.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                From cancer research to child empowerment, Prism supports nonprofits turning purpose into measurable impact.
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                Both organizations share a common story — their missions are too important to be slowed down by tech or communication challenges.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {nonprofitCaseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                    {study.industry}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-900">{study.client}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{study.location}</p>
                  <p className="mt-3 text-sm font-medium text-neutral-700">{study.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                    read case study
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Why Nonprofits Stay */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Transparent. Reliable. Mission-aligned.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism stays aligned with your mission — keeping your website, campaigns, and donor systems responsive to what your community needs.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <ul className="space-y-4 text-sm text-neutral-600">
                {stayingReasons.map((reason) => (
                  <li key={reason.text} className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden>{reason.icon}</span>
                    <span>{reason.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Closing CTA */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to expand your impact online?
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                Prism helps nonprofits raise awareness, attract support, and simplify technology — all with modern tools and a human touch.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    talk to prism
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    {FREE_AUDIT_CTA_TEXT}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Gift, Handshake, PhoneCall } from "lucide-react"
import { CASE_STUDIES } from "@/lib/case-study-data"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { pixelishForEmoji } from "@/lib/pixelish-emoji"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const TYPEFORM_URL = "https://fxuqp40sseh.typeform.com/to/ln0VzAjB"

const processSteps = [
  {
    title: "share who needs support",
    description:
      "tell us who’s ready for better marketing — their name, email, and why they need help with a website, local listings, or ads."
  },
  {
    title: "we reach out with a free analysis",
    description:
      "our team contacts them directly, offering a complimentary teardown of their current experience and quick wins."
  },
  {
    title: "they get a custom report",
    description:
      "we audit their site, listings, and ad presence, then deliver a report packed with insights they can act on immediately."
  },
  {
    title: "strategize together",
    description:
      "if they want more help, we schedule a focused 30-minute zoom session to plan the roadmap and compile a tailored proposal."
  },
  {
    title: "you get rewarded",
    description:
      "when they sign with prism, you receive up to $1,000 as a thank-you for making the connection."
  }
]

const segmentHighlights = [
  {
    emoji: "🦷",
    title: "dentists",
    description:
      "seamless transitions from outdated providers, more reviews, and steady new patient flow.",
    href: "/why-dental-practices-love-prism",
    caseStudies: ["dr-christopher-wong", "family-first-smile-care", "wine-country-root-canal"]
  },
  {
    emoji: "🏪",
    title: "local shop owners",
    description:
      "listings, ads, and automations that keep foot traffic and repeat visits coming.",
    href: "/why-local-shop-owners-love-prism",
    caseStudies: ["olympic-bootworks", "laguna-beach-dental-arts", "canary-cove"]
  },
  {
    emoji: "📊",
    title: "consulting companies",
    description:
      "a trusted presence, streamlined lead flows, and insights that help firms scale.",
    href: "/why-consulting-companies-love-prism",
    caseStudies: ["sr4-partners", "practice-transitions-institute"]
  },
  {
    emoji: "📱",
    title: "online community founders",
    description:
      "design, technology, and data that keep communities growing without burning out the team.",
    href: "/why-online-community-founders-love-prism",
    caseStudies: ["rebellious-aging", "we-are-saplings"]
  },
  {
    emoji: "🤍",
    title: "nonprofits",
    description:
      "beautiful storytelling, donation flows, and automation that free teams to focus on impact.",
    href: "/why-nonprofits-love-prism",
    caseStudies: ["canary-foundation", "belize-kids-foundation"]
  }
]

const referralBenefits = [
  {
    icon: Gift,
    title: "earn up to $1,000",
    description: "collect a direct payment when your referral becomes a prism client."
  },
  {
    icon: Handshake,
    title: "look out for your network",
    description: "introduce them to a partner that handles the heavy lifting with zero stress."
  },
  {
    icon: PhoneCall,
    title: "personal support",
    description: "you’ll always have a human point of contact — reach us any time for updates."
  }
]

const PAGE_TITLE = "refer a business to prism & earn"
const PAGE_DESCRIPTION =
  "know someone who needs a better website, listings, or ad strategy? refer them to prism for a free analysis and earn up to $1,000 when they become a client."
const CANONICAL_URL = "https://www.design-prism.com/refer"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/refer",
  ogImage: "/prism-opengraph.png",
})

export default function ReferPage() {
  const caseStudyMap = new Map(CASE_STUDIES.map((study) => [study.slug, study]))

  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-white to-white" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
                refer &amp; earn
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Know a business that could use our help?
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Help them modernize their website, local listings, or online ads — and earn up to{" "}
                <span className="font-semibold text-neutral-900">$1,000</span> when they become a Prism client.
                Your intro starts with a quick Typeform and a free analysis for your friend.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Button asChild size="lg" className="rounded-full px-8 py-3 text-base">
                    <Link href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer">
                      refer a business <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-sm text-neutral-500 md:text-base">
                    <span className="inline-flex items-center gap-2">
                      <PixelishIcon src="/pixelish/arrow-refresh.svg" alt="" size={14} invert={false} aria-hidden="true" />
                      <span>takes 2 min</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="how-it-works" className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                How the Prism referral program works
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                You introduce a business. We deliver a premium experience — from the first outreach to the final
                proposal. When they sign, you get paid.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {processSteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="relative flex flex-col rounded-3xl border border-neutral-200 bg-neutral-50/80 p-8 shadow-sm"
                >
                  <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md">
                    {idx + 1}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-4 text-sm text-neutral-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Why refer a business to Prism?
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                We give every referral a concierge experience. You get the satisfaction of helping them grow — and a
                direct payout when they do.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {referralBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <benefit.icon className="h-10 w-10 text-white" />
                  <h3 className="mt-6 text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-4 text-sm text-neutral-200">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Segments */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Need help explaining the benefits?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Share these quick talking points with your friend — or send them the detailed playbook for their
                industry.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {segmentHighlights.map((segment) => {
                const studies = (segment.caseStudies ?? [])
                  .map((slug) => caseStudyMap.get(slug))
                  .filter((study): study is NonNullable<typeof study> => Boolean(study))

                return (
                <article
                  key={segment.title}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-neutral-50/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white" aria-hidden="true">
                        <PixelishIcon
                          src={pixelishForEmoji(segment.emoji).src}
                          alt=""
                          size={26}
                          invert={false}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-lg font-semibold lowercase text-neutral-900">{segment.title}</h3>
                    </div>
                    <p className="mt-4 text-sm text-neutral-600">{segment.description}</p>
                    {studies.length > 0 ? (
                      <div className="mt-6 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                          proof to share
                        </p>
                        <ul className="space-y-2">
                          {studies.map((study) => (
                            <li key={study.slug}>
                              <Link
                                href={`/case-studies/${study.slug}`}
                                className="inline-flex items-center text-sm font-medium text-primary"
                              >
                                {study.client}
                                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <Link
                    href={segment.href}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-primary"
                  >
                    see why <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="border-t border-neutral-100 bg-slate-50/80">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto grid gap-12 md:grid-cols-[1.05fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  What we need from you
                </h2>
                <p className="mt-4 text-base text-neutral-600">
                  The Typeform takes less than two minutes. Hop in, share the basics, and we’ll handle the rest.
                </p>
                <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                  {[
                    "Your referral’s first name",
                    "Their email address",
                    "Why you thought of them or what they need help with",
                    "Your email address (so we can keep you updated)",
                    "Your first and last name"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900">Our promise to your referral</h3>
                <p className="mt-4 text-sm text-neutral-600">
                  We treat every introduction with care. No aggressive sales tactics — just a modern, methodical look
                  at how we can help them grow. If it isn’t the right fit, they walk away with a free analysis they can
                  implement on their own.
                </p>
                <div className="mt-6">
                  <Button asChild className="w-full rounded-full">
                    <Link href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer">
                      submit a referral
                    </Link>
                  </Button>
                  <p className="mt-4 text-xs text-neutral-400">
                    Questions? Email{" "}
                    <a
                      href="mailto:support@design-prism.com"
                      className="font-medium text-primary underline-offset-2 hover:underline"
                    >
                      support@design-prism.com
                    </a>{" "}
                    and we’ll get back fast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to introduce us?
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                Submit the referral Typeform, and we’ll take it from there. When they win, you win.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8 py-3 text-base">
                  <Link href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer">
                    refer a business
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-3 text-base">
                  <Link href="/contact">
                    talk to prism
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}

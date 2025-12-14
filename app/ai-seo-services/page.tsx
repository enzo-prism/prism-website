import type { Metadata } from "next"
import Link from "next/link"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import SeoTextSection from "@/components/seo-text-section"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: {
    absolute: "AI SEO Services | Prism",
  },
  description:
    "AI SEO services that help your brand get cited in Google AI Overviews, ChatGPT, Gemini, and Perplexity—built on clear pages, corroborated proof, and measurable iteration.",
  alternates: {
    canonical: "https://www.design-prism.com/ai-seo-services",
  },
  openGraph: {
    title: "AI SEO Services | Prism",
    description:
      "AI SEO services that help your brand get cited and chosen across modern search: Google AI Overviews, ChatGPT, Gemini, and Perplexity.",
    url: "https://www.design-prism.com/ai-seo-services",
    siteName: "prism",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism AI SEO services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SEO Services | Prism",
    description:
      "AI SEO services that help your brand get cited and chosen across AI Overviews and chat-based search.",
    images: ["/prism-opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const primaryCta = {
  label: FREE_AUDIT_CTA_TEXT,
  href: "/free-analysis",
} as const

const secondaryCta = {
  label: "Talk to Prism",
  href: "/contact",
} as const

const whatYouGet = [
  {
    title: "ai visibility audit + baseline",
    description:
      "we map how your brand shows up today across ai overviews and assistants, then align goals to measurable outcomes (calls, forms, pipeline).",
  },
  {
    title: "answer-ready page upgrades",
    description:
      "we rewrite and restructure key pages so they’re quotable: clear headings, direct answers, proof, and an obvious next step.",
  },
  {
    title: "entity + corroboration signals",
    description:
      "we tighten the off-site footprint (profiles, citations, mentions, and consistency) so ai systems can corroborate who you are and what you do.",
  },
  {
    title: "measurement + iteration loop",
    description:
      "we use search console + conversion tracking to pick what to ship next, then compound improvements month to month.",
  },
]

const components = [
  {
    title: "technical + indexation hygiene",
    bullets: [
      "canonicals and duplicate cleanup",
      "internal linking that clarifies topic clusters",
      "structured data that matches visible content",
      "performance and mobile experience upgrades",
    ],
  },
  {
    title: "content designed to be cited",
    bullets: [
      "short question → best answer blocks near the top",
      "scannable sections and definitions that reduce ambiguity",
      "real examples, constraints, and what-to-do-next steps",
      "faq coverage for high-intent objections",
    ],
  },
  {
    title: "proof systems that corroborate claims",
    bullets: [
      "consistent business/entity data across the web",
      "credible mentions and references (not spam links)",
      "reviews and social proof where relevant",
      "case study and portfolio pages that back the narrative",
    ],
  },
]

const processSteps = [
  {
    step: "Baseline",
    description: "benchmark current visibility, citations, and conversion paths so impact is provable.",
  },
  {
    step: "Map",
    description: "define the topics you should own and the pages that should answer them (no doorway pages).",
  },
  {
    step: "Ship",
    description: "upgrade 1–2 high-leverage pages at a time: clarity, proof, internal links, and schema.",
  },
  {
    step: "Corroborate",
    description: "tighten listings, mentions, and consistency so engines can verify your business and expertise.",
  },
  {
    step: "Iterate",
    description: "use search console + conversions to decide what to improve next and keep compounding.",
  },
]

const whatWeWontDo = [
  "publish dozens of thin pages to manipulate rankings (doorway patterns)",
  "stuff keywords or hide text",
  "buy fake links, citations, or reviews",
  "claim results we can’t support with proof",
  "ship ai-generated filler that isn’t genuinely useful",
]

const faqItems = [
  {
    question: "What are AI SEO services?",
    answer:
      "AI SEO services help your brand earn visibility and citations in AI-powered search surfaces (like Google AI Overviews and chat assistants) by improving page clarity, corroborated proof, and technical SEO fundamentals so engines can understand and trust you.",
  },
  {
    question: "Do AI SEO services replace traditional SEO?",
    answer:
      "No. The best AI SEO work strengthens traditional SEO: clean indexation, clear pages, strong internal linking, and trustworthy off-site signals. The difference is emphasis—being quotable, unambiguous, and easily corroborated.",
  },
  {
    question: "How do you measure AI SEO?",
    answer:
      "We track classic signals (impressions, clicks, rankings) plus outcomes (calls, forms, bookings). AI citation tracking is still evolving, so we focus on measurable demand capture and on-page clarity that makes citations more likely.",
  },
  {
    question: "How long do AI SEO services take?",
    answer:
      "You can ship clarity and technical wins quickly, but durable visibility compounds over weeks and months as proof signals and content depth build. We prefer steady shipping over sudden bursts of low-quality pages.",
  },
  {
    question: "Will you create doorway pages for AI SEO?",
    answer:
      "No. We avoid doorway patterns and focus on pages that are genuinely useful: one topic per page, clear answers, real proof, and a clean internal linking structure.",
  },
]

export default function AiSeoServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-neutral-100 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">ai seo services</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              ai seo services that help you get cited and chosen
            </h1>
            <p className="mt-6 text-base text-neutral-600 sm:text-lg">
              prism helps your brand earn visibility in google ai overviews and chat-based search (chatgpt, gemini, perplexity) by building clear,
              proof-backed pages and a measurable shipping loop. no spam. no keyword stuffing. just a system that compounds.
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              want the offer?{" "}
              <Link href="/offers/ai-seo-boost" className="font-semibold text-neutral-900 underline underline-offset-4">
                ai seo boost™
              </Link>
              . want the fundamentals too?{" "}
              <Link href="/seo" className="font-semibold text-neutral-900 underline underline-offset-4">
                seo overview
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
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">what’s included</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                ai seo services are not a plugin. they’re a combination of technical cleanliness, answer-ready content, and corroborated proof so engines
                can confidently recommend you.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {whatYouGet.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">the components</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what ai systems actually need to trust you
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                engines don’t just match keywords. they try to understand who you are, what you do, and whether the web corroborates it.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {components.map((component) => (
                <div key={component.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold lowercase text-neutral-900">{component.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                    {component.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">the process</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                a 90-day ai seo services plan
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                we ship improvements in a steady cadence: baseline first, then page upgrades, then corroboration, then iteration.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {processSteps.map((item) => (
                <div key={item.step} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{item.step}</p>
                  <h3 className="mt-3 text-base font-semibold lowercase text-neutral-900">{item.step.toLowerCase()}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/offers/ai-seo-boost">see ai seo boost™</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">guardrails</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what we won’t do
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                sustainable visibility comes from clarity and proof — not spam tactics that create risk.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <ul className="space-y-2 text-sm text-neutral-700">
                {whatWeWontDo.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-900" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FAQSection
          title="ai seo services faq"
          subtitle="quick answers to the questions teams ask before hiring ai seo services."
          items={faqItems}
        />

        <SeoTextSection title="ai seo services: the practical playbooks">
          <p>
            if you want the deeper strategy and step-by-step frameworks, start with these:
          </p>
          <ul>
            <li>
              <Link href="/blog/new-rules-of-visibility-ai-seo" className="font-semibold underline underline-offset-4">
                the new rules of visibility (ai seo)
              </Link>
            </li>
            <li>
              <Link href="/blog/winning-ai-search-game" className="font-semibold underline underline-offset-4">
                winning the ai search game
              </Link>
            </li>
            <li>
              <Link href="/blog/future-of-seo-ai-search" className="font-semibold underline underline-offset-4">
                actionable checklist for ai search
              </Link>
            </li>
            <li>
              <Link
                href="/blog/turning-your-website-into-an-ai-powered-seo-flywheel"
                className="font-semibold underline underline-offset-4"
              >
                turning your website into an ai-powered seo flywheel
              </Link>
            </li>
          </ul>
        </SeoTextSection>

        <ScrollToTop />
      </main>

      <Footer />

      <ServiceSchema
        serviceId="ai-seo-services"
        name="AI SEO services"
        description="AI SEO services that help brands earn visibility and citations in AI-powered search by improving content clarity, technical fundamentals, and corroborated proof."
        serviceType="SEO services"
        areaServed="United States"
      />
      <HowToSchema
        name="AI SEO services process"
        description="A repeatable AI SEO services system: baseline, map, ship, corroborate, and iterate."
        steps={processSteps.map((step) => ({
          name: step.step,
          text: step.description,
        }))}
      />
    </div>
  )
}


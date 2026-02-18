import type { Metadata } from "next"
import Link from "next/link"

import AeoAssessmentForm from "@/components/forms/AeoAssessmentForm"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import RevealOnScroll from "@/components/reveal-on-scroll"
import ScrollToTop from "@/components/scroll-to-top"
import { FAQSchema, HowToSchema, ServiceSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "AEO Assessment | Prism",
  description:
    "Get a free AEO assessment to see how your website performs in answer-based discovery across Google AI Overviews, ChatGPT, Gemini, and Perplexity.",
  path: "/aeo",
  ogImage: "/prism-opengraph.png",
})

const frameworkPillars = [
  {
    title: "Content",
    points: [
      "Clear answer-first sections with explicit intent mapping.",
      "Structured claims with proof before asking for a click.",
      "Canonical topic hierarchy and no doorway-style repetition.",
    ],
  },
  {
    title: "Technical",
    points: [
      "Robust crawlability and indexing checks before rewriting content.",
      "Schema quality review aligned to what pages actually claim.",
      "Performance and UX barriers that reduce answer trust.",
    ],
  },
  {
    title: "Authority",
    points: [
      "Entity consistency across website and references.",
      "Review, testimonial, and profile signals where they are relevant.",
      "Citation-ready claims and clean backlink risk hygiene.",
    ],
  },
  {
    title: "Measurement",
    points: [
      "Baseline event tracking and conversion points.",
      "AI search + traditional SEO metrics that indicate progress.",
      "Monthly review cadence to prove which edits actually compound.",
    ],
  },
]

const evidenceMetrics = [
  {
    value: "4",
    label: "AEO dimensions",
    description: "Every assessment maps content, technical, authority, and measurement signals so recommendations are balanced.",
  },
  {
    value: "1",
    label: "Simple next step",
    description: "You only submit your email and website to get an actionable assessment brief.",
  },
  {
    value: "3",
    label: "Core pages reviewed",
    description: "Homepage + service/capture pages + listing profile paths are prioritized first.",
  },
  {
    value: "30",
    label: "Minutes expected",
    description: "Typical turnaround target for the first pass on high-confidence recommendations.",
  },
]

const proofItems = [
  {
    title: "Proof in structure",
    points: [
      "Schema, navigation, and internal links are audited together.",
      "Claims are checked for consistency before recommendations go out.",
      "We include a concise ranking-and-conversion rationale in every note.",
    ],
  },
  {
    title: "Proof in delivery",
    points: [
      "You get specific page-level actions, not generic SEO advice.",
      "Priorities are ranked by impact so you can ship fast.",
      "The brief includes what to do this week and what compounds next.",
    ],
  },
]

const howToSteps = [
  { name: "Submit", text: "Share your email and site URL." },
  { name: "Analyze", text: "Map AEO readiness across content, technical, authority, and measurement." },
  { name: "Diagnose", text: "Prioritize high-confidence opportunities by impact and confidence." },
  { name: "Ship", text: "Return a concise action plan with first-week and first-month priorities." },
]

const faqItems = [
  {
    question: "What is AEO?",
    answer:
      "AEO is how your site is understood by AI-powered assistants and answer surfaces. It combines content clarity, technical trust, and corroboration so your business can be confidently surfaced as an answer.",
  },
  {
    question: "Is this a full strategy or a quick check?",
    answer:
      "This is a fast, practical intake. You get a baseline assessment and priority list that can guide either a quick sprint or a larger optimization plan.",
  },
  {
    question: "What do I need to include?",
    answer:
      "Just your email and website URL. You can always add context in follow-up calls if you want deeper recommendations.",
  },
  {
    question: "How quickly will we hear back?",
    answer:
      "We typically send the assessment brief in short order and follow up with practical next steps based on your goal and funnel stage.",
  },
]

export default function AeoLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-background px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">ai answer engine optimization</p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
              Be cited, not ignored, in AI-powered discovery.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              AEO is no longer optional for brands that want to show up where people ask questions first. We audit your website and AI
              discovery signals so you get clear recommendations, fast.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-muted-foreground">
              If your goal is more qualified visibility and less guesswork, start with a 2-minute AEO assessment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="#aeo-assessment">
                  get your free aeo assessment
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/ai-seo-services">ai seo services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <RevealOnScroll>
              <div className="space-y-6 rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
                <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">why this matters</p>
                <h2 className="text-3xl font-semibold">AEO helps AI systems recommend your offer with confidence.</h2>
                <p className="text-sm text-muted-foreground">
                  Every AI answer system needs confidence before surfacing a business. If your pages are unclear, inconsistent, or hard
                  to verify, visibility gets fragmented. Our assessment gives you a compact set of fixes to improve answer readiness.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>✓ answer-focused content structure audit</li>
                  <li>✓ technical trust and indexability checks</li>
                  <li>✓ citation and corroboration gap review</li>
                  <li>✓ conversion-path alignment for real business outcomes</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Once you have the baseline, we turn recommendations into a practical plan for measurable wins.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div id="aeo-assessment" className="scroll-mt-24">
                <AeoAssessmentForm />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section className="border-t border-border/60 bg-muted/40 px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">our framework</p>
              <h2 className="mt-4 text-3xl font-semibold">AEO framework: content, technical, authority, measurement.</h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm text-muted-foreground">
                We keep everything in one diagnosis so the team can move quickly from confusion to execution.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {frameworkPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-border/60 bg-card p-6">
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">trust + evidence</p>
                <h2 className="text-3xl font-semibold">What the assessment report includes</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {evidenceMetrics.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-border/60 bg-card p-5">
                      <p className="text-3xl font-semibold">{item.value}</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.15em] text-muted-foreground">{item.label}</p>
                      <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <p className="font-semibold text-sm uppercase tracking-[0.15em] text-muted-foreground">evidence blocks</p>
                {proofItems.map((proof) => (
                  <div key={proof.title} className="rounded-3xl border border-border/60 bg-card p-6">
                    <h3 className="text-lg font-semibold">{proof.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {proof.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground">
                  Learn how this connects to broader visibility work in{" "}
                  <Link href="/seo" className="font-semibold text-foreground underline underline-offset-4">
                    SEO
                  </Link>
                  {" "}
                  and{" "}
                  <Link href="/ai-seo-services" className="font-semibold text-foreground underline underline-offset-4">
                    AI SEO services
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <FAQSection
          title="AEO assessment FAQ"
          subtitle="Concise answers so you know exactly what to expect."
          items={faqItems}
        />

        <section className="border-y border-border/60 bg-muted/40 px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">next step</p>
            <h2 className="mt-4 text-3xl font-semibold">Prefer a guided path instead of self-serve?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              If you are ready for a full buildout plan, review our AI SEO systems or start with a dedicated strategy call.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  contact our team
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/ai-seo-services">view ai seo services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />

      <ServiceSchema
        serviceId="aeo-assessment"
        name="AI answer engine optimization (AEO) assessment"
        description="AEO assessment service that maps content, technical, authority, and measurement signals for clearer AI search visibility."
        serviceType="AI SEO"
        areaServed="United States"
        offerDetails={{
          name: "Free AEO assessment",
          description: "Free baseline visibility review and recommendation plan.",
          price: "0",
          priceCurrency: "USD",
          businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
        }}
      />
      <HowToSchema
        name="AEO assessment workflow"
        description="A practical workflow for a high-signal AEO assessment, from intake to prioritized implementation plan."
        steps={howToSteps}
      />
      <FAQSchema questions={faqItems} />
    </div>
  )
}

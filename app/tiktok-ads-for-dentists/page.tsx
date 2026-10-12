import type { Metadata } from "next"
import { CheckCircle2, Clapperboard, ClipboardList, LineChart, ShieldCheck, Video } from "lucide-react"

import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import {
  ArrowLink,
  DentalCaseStudyGrid,
  StepRail,
  TextLink,
} from "@/components/landing/dental/primitives"
import { LandingHero } from "@/components/landing/landing-hero"
import Navbar from "@/components/navbar"
import { FinalCta } from "@/components/prism/final-cta"
import { Reveal } from "@/components/prism/reveal"
import { Section, SectionHeader } from "@/components/prism/section"
import { ServiceSchema } from "@/components/schema-markup"
import ScrollToTop from "@/components/scroll-to-top"
import { Card } from "@/components/ui/card"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA, WAITLIST_FOCUS_HREFS } from "@/lib/waitlist"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'TikTok ads for dentists',
  description: 'TikTok ads for dentists with focused creative, landing pages, and tracking built to drive booked consultations.',
  path: "/tiktok-ads-for-dentists",
  ogImage: "/prism-opengraph.png",
})

const primaryCta = {
  label: WAITLIST_CTA.label,
  href: WAITLIST_FOCUS_HREFS.ads,
} as const

const secondaryCta = {
  label: "See case studies",
  href: "/case-studies",
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
      "short-form video that looks like real clinic content: team, operatories, patient education, and proof, built for tiktok’s feed.",
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
      "quick reactions to common myths and viral dental takes, then a simple call to action: book a consult.",
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
      "they can, especially for practices that pair credible short-form video with a fast landing page and a clear next step. tiktok is rarely “set it and forget it”. creative iteration is the lever.",
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
      "we track calls and form submissions, and we work backward from booked consults where possible. the goal is simple reporting that ties spend to outcomes, so you know what to scale.",
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

const whatConverts = [
  {
    title: "proof-first creative",
    description:
      "show the office, the team, and the real experience patients are buying, not stock footage.",
  },
  {
    title: "one offer per campaign",
    description:
      "avoid “general dentistry” ads. pick one consult-worthy offer so results are measurable and scalable.",
  },
  {
    title: "fast path to booking",
    description:
      "every click should lead to a single next step: call, short form, or online booking. No confusion.",
  },
]

export default function TikTokAdsForDentistsPage() {
  const caseStudies = getDentalCaseStudies()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Paid social for dental"
          title="tiktok ads for dentists."
          description="prism helps dental practices turn short-form video into booked demand with patient-ready creative, fast landing pages, and reporting tied to calls and consults, not vanity metrics."
          location="tiktok ads for dentists hero"
          ctaHref={primaryCta.href}
          ctaLabel={primaryCta.label}
          secondary={{ label: "See the playbook", href: "#playbook" }}
          glow="warm"
          titleClassName="max-w-[13ch]"
        >
          <Card className="mx-auto max-w-3xl p-6 text-left sm:p-8">
            <p className="text-eyebrow text-subtle">dentist-first creative + landing pages + tracking, shipped by prism.</p>
            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
              already running search? pair this with{" "}
              <TextLink href="/google/dental-ads">google ads for dentists</TextLink> so you capture both scroll-intent and
              high-intent searches. prefer meta feed-first demand? see{" "}
              <TextLink href="/facebook-ads-for-dentists">facebook ads for dentists</TextLink>.
            </p>
          </Card>
        </LandingHero>

        <Section id="playbook" aria-labelledby="tt-converts-title" className="scroll-mt-20">
          <Reveal>
            <SectionHeader
              id="tt-converts-title"
              eyebrow="The playbook"
              title="what converts on tiktok for dental practices."
              description="dentistry is high-trust. the winners don’t look like ads. They look like calm, credible education with a clear next step."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ol className="grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card md:grid-cols-3">
              {whatConverts.map((item, index) => (
                <li
                  key={item.title}
                  className="-mb-px -mr-px flex flex-col gap-4 border-b border-r border-white/[0.07] p-6 sm:p-8"
                >
                  <span className="text-[clamp(2.25rem,1.8rem+1.5vw,3rem)] font-semibold leading-none tracking-[-0.05em] text-foreground/25 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-heading text-foreground">{item.title}</h3>
                  <p className="text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        <Section aria-labelledby="tt-get-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="tt-get-title"
                eyebrow="What you get"
                title="what you get."
                description="everything needed to run tiktok ads without wasting spend: creative direction, landing page alignment, and clear reporting."
              />
              <p className="text-[15px] leading-7 text-muted-foreground">
                want a broader overview of our multi-channel ads system? see{" "}
                <TextLink href="/ads">paid ads management</TextLink>.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
                {whatYouGet.map((item) => (
                  <li key={item.title} className="flex items-start gap-5 p-5 sm:p-7">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <item.icon className="size-[18px] text-foreground" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="tt-setup-title">
          <Reveal>
            <SectionHeader
              id="tt-setup-title"
              eyebrow="Setup"
              title="how we set up tiktok ads, without guesswork."
              description="start lean, learn fast, and scale only when the numbers prove it."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <StepRail columns={4} steps={setupSteps.map((item) => ({ title: item.step, description: item.description }))} />
          </Reveal>
        </Section>

        <Section aria-labelledby="tt-frameworks-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-dots mask-fade-y absolute inset-0 -z-10 opacity-40" />
            <SectionHeader
              id="tt-frameworks-title"
              eyebrow="Creative frameworks"
              title="creative frameworks dentists can use."
              description="four repeatable patterns that work because they reduce fear and make the next step obvious."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {creativeFrameworks.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/[0.08] bg-background/60 p-5 sm:p-6"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Clapperboard className="size-[18px] text-foreground" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-subtle">
                      FORMAT {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[15px] text-muted-foreground">
              need better on-site trust signals for these videos to convert? start with{" "}
              <TextLink href="/dental-website">modern dental websites</TextLink>.
            </p>
          </div>
        </Section>

        {caseStudies.length > 0 ? (
          <Section aria-labelledby="tt-proof-title">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                id="tt-proof-title"
                eyebrow="Proof"
                title="dental case studies."
                description="real dental teams. real systems. websites, content, and marketing that compound."
              />
              <ArrowLink href={secondaryCta.href} className="shrink-0">
                {secondaryCta.label}
              </ArrowLink>
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <DentalCaseStudyGrid studies={caseStudies} />
            </Reveal>
          </Section>
        ) : null}

        <FAQSection
          title="tiktok ads questions."
          subtitle="what most dentists ask before running tiktok ads."
          items={faqItems}
        />

        <FinalCta
          location="tiktok ads for dentists final cta"
          href={primaryCta.href}
          secondary={{ label: "Prefer Meta? Facebook ads for dentists", href: "/facebook-ads-for-dentists" }}
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

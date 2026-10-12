import type { Metadata } from "next"
import { CheckCircle2, ClipboardList, LineChart, ShieldCheck, Target, Video } from "lucide-react"

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
import { SpotlightCard } from "@/components/prism/spotlight-card"
import { ServiceSchema } from "@/components/schema-markup"
import ScrollToTop from "@/components/scroll-to-top"
import { Card } from "@/components/ui/card"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { WAITLIST_CTA, WAITLIST_FOCUS_HREFS } from "@/lib/waitlist"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Facebook ads for dentists',
  description: 'Facebook and Instagram ads for dentists with clear creative, focused landing pages, and call tracking.',
  path: "/facebook-ads-for-dentists",
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

const whatConverts = [
  {
    title: "one offer per campaign",
    description:
      "pick one consult-worthy offer (implants consult, invisalign, emergency, whitening) so results are measurable, learnings are fast, and scaling is clean.",
  },
  {
    title: "proof-first creative",
    description:
      "patients don’t want stock ads. They want to see the team, the office, the process, and the calm reassurance that you’re the right fit.",
  },
  {
    title: "a fast path to booking",
    description:
      "every click leads to one next step: call, short form, or online booking. No confusion, no dead ends, no five-page detours.",
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
      "ads that feel like calm education and real clinic proof, designed to reduce fear and make the next step obvious.",
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
      "clean measurement and intake that avoids collecting sensitive info you don’t need, with clear ownership of your ad accounts.",
    icon: ShieldCheck,
  },
  {
    title: "weekly optimization + reporting",
    description:
      "creative testing, budget shifts, and plain-english reports focused on outcomes, not vanity metrics.",
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
    description: "pick the offer, write angles, and map proof assets so creative tests are purposeful, not random.",
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
      "Yes, when the offer is clear, the creative builds trust, and the lead path is simple. The biggest failure mode is vague “general dentistry” ads that don’t give patients a reason to act.",
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
      "Yes. We run Meta campaigns across Facebook and Instagram, then optimize placements based on conversion performance, not just cheap clicks.",
  },
  {
    question: "Do you handle creative and landing pages too?",
    answer:
      "Yes. Creative, landing page alignment, and tracking are part of the system, because ads don’t work when the click experience is weak.",
  },
  {
    question: "How do you track calls and booked consults from Meta ads?",
    answer:
      "We track calls and forms, then tie those conversions back to campaigns so you can see what produced real inquiries, not just impressions or traffic.",
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Paid social for dental"
          title="facebook ads for dentists."
          description={
            <>
              prism helps dental practices turn Facebook &amp; Instagram (Meta) ads into booked demand with offer-first
              strategy, patient-ready creative, conversion-focused lead capture, and reporting tied to calls and consults,
              not vanity metrics.
            </>
          }
          location="facebook ads for dentists hero"
          ctaHref={primaryCta.href}
          ctaLabel={primaryCta.label}
          secondary={{ label: secondaryCta.label, href: secondaryCta.href }}
          glow="violet"
          titleClassName="max-w-[13ch]"
          descriptionClassName="max-w-[62ch]"
        >
          <Card className="mx-auto max-w-3xl p-6 text-left sm:p-8">
            <p className="text-eyebrow text-subtle">meta strategy + creative + tracking, shipped by prism.</p>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-6 text-muted-foreground">
              <li>
                want google-first intent too? pair this with{" "}
                <TextLink href="/google/dental-ads">google ads for dentists</TextLink>.
              </li>
              <li>
                want short-form scroll intent? see <TextLink href="/tiktok-ads-for-dentists">tiktok ads for dentists</TextLink>.
              </li>
              <li>
                want the step-by-step plan? read{" "}
                <TextLink href="/blog/facebook-ads-for-dentists-playbook">
                  facebook ads for dentists: the 30-day playbook
                </TextLink>
                .
              </li>
            </ul>
          </Card>
        </LandingHero>

        <Section id="playbook" aria-labelledby="fb-converts-title" className="scroll-mt-20">
          <Reveal>
            <SectionHeader
              id="fb-converts-title"
              eyebrow="The playbook"
              title="what converts on facebook for dental practices."
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

        <Section aria-labelledby="fb-get-title">
          <Reveal>
            <SectionHeader
              id="fb-get-title"
              eyebrow="What you get"
              title="what you get."
              description="everything needed to run facebook ads for dentists without wasting spend: creative direction, conversion alignment, and clear reporting."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatYouGet.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 70}>
                <Card className="flex h-full flex-col p-6 transition-colors hover:border-white/[0.16]">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <item.icon className="size-5 text-foreground" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-muted-foreground">
            want a broader overview of our multi-channel ads system? see{" "}
            <TextLink href="/ads">paid ads management</TextLink>.
          </p>
        </Section>

        <Section aria-labelledby="fb-capture-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal className="flex flex-col gap-6">
              <SectionHeader
                id="fb-capture-title"
                eyebrow="After the click"
                title="lead forms vs landing pages."
                description="most wasted spend happens after the click. we choose the lead path based on your service line, your front desk bandwidth, and how much trust patients need before they book."
              />
              <p className="text-[15px] leading-7 text-muted-foreground">
                want your landing pages to convert better (even before ads)? start with{" "}
                <TextLink href="/dental-website">modern dental websites</TextLink>.
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {captureOptions.map((item, index) => {
                const Shell = index === 1 ? SpotlightCard : Card
                return (
                  <Reveal key={item.title} delay={index * 100}>
                    <Shell beam={index === 1 ? true : undefined} className="flex h-full flex-col p-6 sm:p-7">
                      <p className="text-eyebrow text-subtle">option {index + 1}</p>
                      <h3 className="text-heading mt-4 text-foreground">{item.title}</h3>
                      <p className="mt-3 flex-1 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                      <div className="mt-6 border-t border-white/[0.07] pt-4">
                        <p className="text-eyebrow text-subtle">best for</p>
                        <p className="mt-2 text-[14px] leading-6 text-foreground/90">{item.bestFor}</p>
                      </div>
                    </Shell>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Section>

        <Section aria-labelledby="fb-setup-title">
          <Reveal>
            <SectionHeader
              id="fb-setup-title"
              eyebrow="Setup"
              title="how we set up meta campaigns, without guesswork."
              description="start lean, learn fast, and scale only when lead quality and cost prove it."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <StepRail columns={5} steps={setupSteps.map((item) => ({ title: item.step, description: item.description }))} />
          </Reveal>
        </Section>

        {caseStudies.length > 0 ? (
          <Section aria-labelledby="fb-proof-title">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                id="fb-proof-title"
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
          title="facebook ads questions."
          subtitle="what most dentists ask before running facebook and instagram ads."
          items={faqItems}
        />

        <FinalCta
          location="facebook ads for dentists final cta"
          href={primaryCta.href}
          secondary={{ label: "Prefer search? Google Ads for dentists", href: "/google/dental-ads" }}
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

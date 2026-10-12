import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowRight,
  BotMessageSquare,
  Briefcase,
  ChartLine,
  Check,
  Figma,
  LayoutDashboard,
  MapPin,
  SearchCheck,
} from 'lucide-react'
import { notFound } from 'next/navigation'

import CaseStudyMoreWork from '@/components/case-studies/CaseStudyMoreWork'
import CaseStudySnapshotStats from '@/components/case-studies/CaseStudySnapshotStats'
import CaseStudyVisualHero from '@/components/case-studies/CaseStudyVisualHero'
import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { BrowserFrame } from '@/components/prism/browser-frame'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { CaseStudySchema } from '@/components/schema-markup'
import { Card } from '@/components/ui/card'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const SLUG = 'roseville-dental-academy'
const CANONICAL_URL = `https://www.design-prism.com/case-studies/${SLUG}`

const WEBSITE_SCREENSHOTS = {
  homeDesktop: '/case-studies/roseville-dental-academy-home-desktop.jpg',
  homeMobile: '/case-studies/roseville-dental-academy-home-mobile.jpg',
  programDesktop: '/case-studies/roseville-dental-academy-program-desktop.jpg',
  og: '/case-studies/roseville-dental-academy-og.jpg',
} as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Roseville Dental Academy case study',
  description:
    'How Prism moved Roseville Dental Academy from a stock GoDaddy site to a Vercel-hosted admissions system with GA4, Search Console, and AI built in.',
  path: `/case-studies/${SLUG}`,
  ogImage: WEBSITE_SCREENSHOTS.og,
})

// Delivered-work facts for the stats band. No invented numbers.
const facts = [
  {
    label: 'Platform move',
    value: 'GoDaddy to Vercel',
    detail: 'From stock-site constraints to a production web stack.',
  },
  {
    label: 'Measurement',
    value: 'GA4, Search Console, Hotjar',
    detail: 'Search, behavior, and custom conversion visibility.',
  },
  {
    label: 'Admissions',
    value: 'Clear program paths',
    detail: 'Program information and student inquiry forms in one place.',
  },
  {
    label: 'Student support',
    value: 'AI assistant',
    detail: 'ElevenLabs support built into the admissions experience.',
  },
]

const rebuildCards: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: 'A real admissions website',
    description:
      'The site moved from a limited stock template into a Vercel-hosted React/Next implementation that can be updated, tested, and improved like software.',
    icon: LayoutDashboard,
  },
  {
    title: 'Deep conversion instrumentation',
    description:
      'GA4, custom events, Vercel analytics, Hotjar, and Search Console create a clearer view of which pages, forms, and student actions are doing the work.',
    icon: ChartLine,
  },
  {
    title: 'Lead capture that does not leak',
    description:
      'Formspree-backed forms give admissions a cleaner path for program interest, class questions, and follow-up without a brittle page-builder workflow.',
    icon: Activity,
  },
  {
    title: 'AI support for prospective students',
    description:
      'The ElevenLabs assistant helps answer common questions, reduce hesitation, and qualify interest before a human admissions follow-up.',
    icon: BotMessageSquare,
  },
  {
    title: 'Search and paid-social readiness',
    description:
      'Google Search Console and Meta Pixel attribution were treated as launch infrastructure, not afterthoughts, so enrollment campaigns have a stronger signal base.',
    icon: SearchCheck,
  },
  {
    title: 'Figma plus Codex build loop',
    description:
      'Design direction, implementation, QA, and iteration were compressed through Figma and Codex with a high-reasoning AI workflow.',
    icon: Figma,
  },
]

const programSignals = [
  'Dental Assisting Program',
  'BLS/CPR',
  'Infection Control',
  'Radiation Safety',
  'Coronal Polish',
  'Pit and Fissure Sealants',
  'N95 Fit Test',
]

const beforeAfter = [
  {
    before: 'Stock-site presentation',
    after:
      'Purpose-built program paths for dental assisting and certification courses.',
  },
  {
    before: 'Basic analytics',
    after:
      'GA4 custom events, behavior analytics, and search visibility monitoring.',
  },
  {
    before: 'Generic contact flow',
    after:
      'Program-specific inquiry flow with Formspree routing and AI support.',
  },
]

export default function RosevilleDentalAcademyCaseStudyPage() {
  const caseStudy = CASE_STUDIES.find((item) => item.slug === SLUG)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <CaseStudyVisualHero
          title="Roseville Dental Academy"
          description="Prism moved the academy from a stock GoDaddy presence to a measurable admissions system: a Vercel-hosted website, deeper analytics, cleaner forms, Search Console, Hotjar, Meta attribution, and an ElevenLabs AI assistant for prospective students."
          eyebrow="Dental education case study"
          badges={[
            { label: 'Dental Education', icon: <Briefcase aria-hidden="true" /> },
            { label: 'Roseville, CA', icon: <MapPin aria-hidden="true" /> },
          ]}
          websiteUrl="https://www.rosevilledentalacademy.com/"
          websiteHost="rosevilledentalacademy.com"
          trackedLocation="Roseville Dental Academy case study hero"
          homeDesktopSrc={WEBSITE_SCREENSHOTS.homeDesktop}
          homeDesktopAlt="Roseville Dental Academy homepage after Prism rebuilt the admissions website"
          homeMobileSrc={WEBSITE_SCREENSHOTS.homeMobile}
          homeMobileAlt="Mobile Roseville Dental Academy homepage with signup path"
        />

        <CaseStudySnapshotStats facts={facts} />

        <Section aria-labelledby="roseville-shift-title" className="pt-16 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                id="roseville-shift-title"
                eyebrow="The shift"
                title="from brochure site to admissions system."
                description="The academy does not just need a pretty homepage. Students need to find the right course, trust the instructors, ask questions, and send a clear inquiry. The rebuild made that journey measurable."
              />
            </Reveal>
            <ol className="flex flex-col gap-3 lg:col-span-7">
              {beforeAfter.map((item, index) => (
                <Reveal as="li" key={item.before} delay={index * 90}>
                  <Card className="grid gap-4 p-5 sm:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.2fr)] sm:items-center sm:gap-6 sm:p-6">
                    <div>
                      <p className="text-eyebrow text-subtle">Before</p>
                      <p className="mt-2 text-[15px] font-medium text-muted-foreground line-through decoration-white/25">
                        {item.before}
                      </p>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden size-4 text-subtle sm:block"
                    />
                    <div>
                      <p className="text-eyebrow text-subtle">After</p>
                      <p className="mt-2 text-[15px] leading-6 text-foreground">
                        {item.after}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        <Section aria-labelledby="roseville-rebuilt-title" className="py-12 sm:py-16">
          <Reveal>
            <SectionHeader
              id="roseville-rebuilt-title"
              eyebrow="What Prism rebuilt"
              title="a student pipeline with the right signals underneath."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rebuildCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Reveal as="li" key={card.title} delay={(index % 3) * 90} className="min-w-0">
                  <SpotlightCard className="flex h-full flex-col gap-5 p-6 sm:p-7">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                      <Icon aria-hidden="true" className="size-[18px]" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </ul>
        </Section>

        <Section aria-labelledby="roseville-live-title" className="py-12 sm:py-16">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-10 lg:p-14">
              <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
              <div
                aria-hidden="true"
                className="absolute -right-24 bottom-0 -z-10 h-80 w-[36rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/18%),transparent)] blur-2xl"
              />
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
                <div className="lg:col-span-5">
                  <SectionHeader
                    id="roseville-live-title"
                    eyebrow="Live surface"
                    title="clear enrollment paths."
                    description="The live site presents the academy as an accredited hands-on training institution and routes students to the right next step: a quick sign-up form, contact details, course pages, and the AI assistant."
                  />
                  <ul className="mt-8 flex flex-wrap gap-2" aria-label="Programs on the site">
                    {programSignals.map((program) => (
                      <li
                        key={program}
                        className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-[13px] font-medium text-foreground"
                      >
                        <Check aria-hidden="true" className="size-3.5 text-muted-foreground" />
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-7">
                  <BrowserFrame
                    src={WEBSITE_SCREENSHOTS.programDesktop}
                    alt="Roseville Dental Academy dental assisting program page with upcoming class dates"
                    url="rosevilledentalacademy.com"
                    sizes="(min-width: 1024px) 640px, 90vw"
                    width={1440}
                    height={960}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <CaseStudyWorkHighlights caseStudySlug={SLUG} />

        <CaseStudyMoreWork
          slug={SLUG}
          trackedLocation="Roseville Dental Academy case study more work"
        />

        <FinalCta
          location="Roseville Dental Academy case study final cta"
          title="your business, next."
          secondary={{ label: 'Read what clients say', href: '/wall-of-love' }}
        />
      </main>

      <Footer />

      <CaseStudySchema
        title="Roseville Dental Academy case study"
        description="How Prism moved Roseville Dental Academy from a stock GoDaddy site into a Vercel-hosted admissions platform with analytics, forms, Search Console, Hotjar, Meta attribution, and ElevenLabs AI."
        url={CANONICAL_URL}
        imageUrl="https://www.design-prism.com/case-studies/roseville-dental-academy-og.jpg"
        datePublished={caseStudy.structured?.datePublished}
        dateModified={caseStudy.structured?.dateModified}
        clientName="Roseville Dental Academy"
        outcome="Roseville Dental Academy gained a measurable admissions system with clearer student inquiry paths, modern analytics, AI support, and search visibility foundations."
        breadcrumbs={[
          { name: 'Home', url: 'https://www.design-prism.com' },
          {
            name: 'Case Studies',
            url: 'https://www.design-prism.com/case-studies',
          },
          { name: 'Roseville Dental Academy', url: CANONICAL_URL },
        ]}
      />
    </div>
  )
}

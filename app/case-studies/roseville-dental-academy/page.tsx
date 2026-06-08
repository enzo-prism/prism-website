import type { Metadata } from 'next'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowRight,
  BotMessageSquare,
  ChartLine,
  CheckCircle2,
  ExternalLink,
  Figma,
  GraduationCap,
  LayoutDashboard,
  SearchCheck,
  Sparkles,
} from 'lucide-react'
import { notFound } from 'next/navigation'

import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { CaseStudySchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

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

const statCards = [
  {
    label: 'Platform move',
    value: 'GoDaddy -> Vercel',
    detail: 'From stock-site constraints to a production web stack.',
  },
  {
    label: 'Measurement',
    value: 'GA4 + GSC + Hotjar',
    detail: 'Search, behavior, and custom conversion visibility.',
  },
  {
    label: 'Lead system',
    value: 'Formspree + AI',
    detail: 'Cleaner inquiry routing plus an ElevenLabs assistant.',
  },
  {
    label: 'Trust signal',
    value: '77 Google reviews',
    detail: 'A 5.0-star reputation made easier to surface.',
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

function CaseStudyPanel({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/70 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background">
          <Icon className="size-4 text-foreground" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
      {children}
    </p>
  )
}

function BrowserScreenshotFrame({
  src,
  alt,
  label,
  priority = false,
  className,
  imageClassName,
  sizes = '(min-width: 1024px) 46vw, 100vw',
}: {
  src: string
  alt: string
  label: string
  priority?: boolean
  className?: string
  imageClassName?: string
  sizes?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border/70 bg-black shadow-[0_30px_80px_-48px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span
          className="size-2.5 rounded-full bg-red-400/70"
          aria-hidden="true"
        />
        <span
          className="size-2.5 rounded-full bg-amber-300/70"
          aria-hidden="true"
        />
        <span
          className="size-2.5 rounded-full bg-emerald-300/70"
          aria-hidden="true"
        />
        <span className="ml-2 truncate rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('object-cover object-top', imageClassName)}
        />
      </div>
    </div>
  )
}

function MobileScreenshotFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-black p-2 shadow-[0_26px_70px_-42px_rgba(0,0,0,0.95)]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.25rem] bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 15vw, 45vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}

export default function RosevilleDentalAcademyCaseStudyPage() {
  const caseStudy = CASE_STUDIES.find((item) => item.slug === SLUG)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 px-4 py-12 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6">
            <div className="space-y-7">
              <Badge
                variant="secondary"
                className="w-fit rounded-full px-4 py-2 text-[10px] tracking-[0.22em]"
              >
                dental education case study
              </Badge>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
                  Roseville, CA / Dental education
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  Roseville Dental Academy
                </h1>
                <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                  Prism helped move the academy from a stock GoDaddy presence
                  into a measurable admissions system: a Vercel-hosted website,
                  deeper analytics, cleaner forms, Search Console, Hotjar, Meta
                  attribution, and an ElevenLabs AI assistant for prospective
                  students.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-5">
                  <TrackedLink
                    href="https://www.rosevilledentalacademy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    label="Open Roseville Dental Academy website"
                    location="Roseville Dental Academy case study hero"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span>Open live site</span>
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </span>
                  </TrackedLink>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-full px-5"
                >
                  <TrackedLink
                    href="/get-started"
                    label="Start a free growth audit from Roseville case study"
                    location="Roseville Dental Academy case study hero"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span>Free Practice Audit</span>
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </TrackedLink>
                </Button>
              </div>
            </div>

            <div className="relative pb-8">
              <BrowserScreenshotFrame
                src={WEBSITE_SCREENSHOTS.homeDesktop}
                alt="Roseville Dental Academy homepage after Prism rebuilt the admissions website"
                label="rosevilledentalacademy.com"
                priority
              />
              <div className="ml-auto mt-4 w-36 sm:absolute sm:-bottom-3 sm:-left-4 sm:ml-0 sm:mt-0 sm:w-40 md:-left-6 lg:w-44">
                <MobileScreenshotFrame
                  src={WEBSITE_SCREENSHOTS.homeMobile}
                  alt="Mobile Roseville Dental Academy homepage with signup path"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 px-4 py-10">
          <div className="container mx-auto grid max-w-6xl gap-3 px-4 sm:grid-cols-2 md:grid-cols-4 md:px-6">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border/60 bg-muted/30 p-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border/60 px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
              <div className="space-y-4">
                <SectionEyebrow>the shift</SectionEyebrow>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  From brochure site to admissions infrastructure.
                </h2>
                <p className="text-base leading-7 text-muted-foreground">
                  Roseville Dental Academy does not just need a pretty homepage.
                  It needs students to understand the right course, trust the
                  instructors, ask questions, and submit a clear inquiry. The
                  rebuild made that journey measurable.
                </p>
              </div>

              <div className="grid gap-3">
                {beforeAfter.map((item) => (
                  <div
                    key={item.before}
                    className="grid gap-3 rounded-lg border border-border/60 bg-card/60 p-4 sm:grid-cols-[0.8fr_1fr]"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        before
                      </p>
                      <p className="mt-2 text-sm font-medium">{item.before}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        after
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.after}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-8 max-w-3xl space-y-4">
              <SectionEyebrow>what prism rebuilt</SectionEyebrow>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                A student acquisition system with the right signals underneath.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rebuildCards.map((card) => (
                <CaseStudyPanel key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 px-4 py-14 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_0.9fr] md:px-6">
            <div className="space-y-5">
              <SectionEyebrow>live surface</SectionEyebrow>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                The website now has clearer enrollment paths for real dental
                training demand.
              </h2>
              <p className="text-base leading-7 text-muted-foreground">
                The live site presents the academy as an accredited hands-on
                training institution and routes students toward the right next
                step with a Quick Sign Up Form, contact information, course
                pages, and the AI assistant layer.
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {programSignals.map((program) => (
                  <div
                    key={program}
                    className="flex min-h-11 items-center gap-3 rounded-lg border border-border/60 bg-muted/25 px-3 py-2"
                  >
                    <CheckCircle2
                      className="size-4 shrink-0 text-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">{program}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border/60 bg-card/70">
              <BrowserScreenshotFrame
                src={WEBSITE_SCREENSHOTS.programDesktop}
                alt="Roseville Dental Academy dental assisting program page with upcoming class dates"
                label="program page"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="rounded-none border-0 border-b border-border/60 shadow-none"
                imageClassName="object-top"
              />

              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      Dental education, not generic local service copy
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      The page structure supports programs, certifications,
                      prerequisites, student trust, and admissions follow-up.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-border/60 pt-6">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight">5.0</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Google review average surfaced from 77 public reviews.
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold tracking-tight">
                      916-888-9821
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Contact path stays visible alongside form and AI-assisted
                      qualification.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      1271 Pleasant Grove Boulevard, Ste. 100
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Roseville, California 95747
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CaseStudyWorkHighlights caseStudySlug={SLUG} />

        <section className="px-4 py-14 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <div className="mx-auto mb-4 inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-muted/30">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              The lesson for dental organizations is simple.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              A modern dental website is not only a design asset. It is a
              visibility, trust, inquiry, analytics, and follow-up system. That
              is what Prism built for Roseville Dental Academy.
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild className="rounded-full px-5">
                <TrackedLink
                  href="/get-started"
                  label="Start a free growth audit from Roseville case study footer"
                  location="Roseville Dental Academy case study footer"
                >
                  <span className="inline-flex items-center gap-2">
                    <span>Build my growth system</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </TrackedLink>
              </Button>
            </div>
          </div>
        </section>
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

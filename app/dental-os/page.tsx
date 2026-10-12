import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Hammer,
  TrendingUp,
} from 'lucide-react'

import DentalBundleBento, {
  type DentalBundleItem,
} from '@/components/dental-os/DentalBundleBento'
import DentalHeroShowcase from '@/components/dental-os/DentalHeroShowcase'
import Footer from '@/components/footer'
import HomeCountUp from '@/components/home/HomeCountUp'
import Navbar from '@/components/navbar'
import { OfferIconTile } from '@/components/pricing/offer-kit'
import BrowserFrame from '@/components/prism/browser-frame'
import { FaqList } from '@/components/prism/faq-list'
import FinalCta from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import {
  CANONICAL_PRICING_OFFERS,
  DENTAL_OS_PRICE_LABEL,
} from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA } from '@/lib/waitlist'

const CANONICAL_URL = 'https://www.design-prism.com/dental-os'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental OS',
  description:
    'Website, search, Google Maps, review support, and ads for dental practices, with a clear path from patient research to an inquiry.',
  path: '/dental-os',
  ogImage: '/prism-opengraph.png',
})

// Dental OS is built as a reusable vertical template: a future "Clinic OS" can
// clone this file and swap the data constants below without touching layout.

// The bundle, framed as patient outcomes rather than deliverables.
const BUNDLE: readonly DentalBundleItem[] = [
  {
    key: 'website',
    name: 'Website',
    title: 'website',
    outcome:
      'Clear treatment pages, team photos, and easy contact options that help patients decide whether your practice is right for them.',
  },
  {
    key: 'search',
    name: 'SEO & AI search',
    title: 'SEO and AI search',
    outcome:
      'Useful treatment and location pages, with accurate business information that search engines and AI assistants can understand.',
  },
  {
    key: 'maps',
    name: 'Google Maps & local',
    title: 'Google Maps and local',
    outcome:
      'Accurate practice details, services, photos, and hours across your Google Business Profile and local pages.',
  },
  {
    key: 'reviews',
    name: 'Reviews',
    title: 'reviews',
    outcome:
      'Review-request workflows and response support that help your team collect and respond to patient feedback.',
  },
  {
    key: 'ads',
    name: 'Ads',
    title: 'ads',
    outcome:
      'Google and Meta campaigns with tracking for calls and inquiries, plus booking outcomes where your practice can provide them.',
  },
] as const

const BUNDLE_NAMES = BUNDLE.map((item) => item.name)

// What makes dental growth its own discipline.
const DENTAL_DIFFERENCE = [
  {
    title: 'Patients vet before they call',
    body: 'People research a dentist long before they pick up the phone. The site, photos, and reviews have to earn trust in seconds.',
  },
  {
    title: 'Local details matter',
    body: 'Patients use Maps to compare nearby offices, check hours, and get directions. Accurate listings make those decisions easier.',
  },
  {
    title: 'Reviews answer real concerns',
    body: 'Patient feedback helps people understand the experience at your office. A clear request and response process makes it easier for your team to keep up.',
  },
  {
    title: 'Keep practice information clear',
    body: 'Whether someone uses search or an AI assistant, your services, location, and contact details should be clear and consistent.',
  },
] as const

// Real, source-attributed dental result from lib/case-study-data.ts, verified
// against Google Search Console. Do not edit without the source.
const wongImpressions = getCaseStudyMetric('dr-christopher-wong')

// Current dental clients only (former clients live in lib/former-clients.ts
// and must never appear here). Slugs link to /case-studies/<slug>; every one
// has a real homepage capture in public/case-studies.
const DENTAL_CLIENTS = [
  {
    name: 'Exquisite Dentistry',
    location: 'Los Angeles, CA',
    focus: 'Luxury cosmetic practice, evidence-first rebuild',
    slug: 'exquisite-dentistry',
    host: 'exquisitedentistryla.com',
  },
  {
    name: 'Family First Smile Care',
    location: 'Los Gatos, CA',
    focus: 'Family-first clarity and clear conversion paths',
    slug: 'family-first-smile-care',
    host: 'famfirstsmile.com',
  },
  {
    name: 'Town Centre Dental',
    location: 'Brentwood, CA',
    focus: 'Family dentistry growth system',
    slug: 'town-centre-dental',
    host: 'towncentredental.net',
  },
  {
    name: 'Grace Dental Santa Rosa',
    location: 'Santa Rosa, CA',
    focus: 'Post-M&A relaunch built to scale',
    slug: 'grace-dental-santa-rosa',
    host: 'tingjenjidds.com',
  },
  {
    name: 'Wine Country Root Canal',
    location: 'Santa Rosa, CA',
    focus: 'Endodontic specialty, calm patient journey',
    slug: 'wine-country-root-canal',
    host: 'winecountryrootcanal.com',
  },
  {
    name: 'Coast Periodontics',
    location: 'San Luis Obispo, CA',
    focus: 'Periodontics for patients and referring dentists',
    slug: 'coast-periodontics-and-laser-surgery',
    host: 'coastperiodontics.com',
  },
  {
    name: 'Mataria Dental Group',
    location: 'Torrance, CA',
    focus: 'Patient-first, multi-provider presence',
    slug: 'mataria-dental-group',
    host: 'matariadentalgroup.com',
  },
] as const

// Consultative because Dental OS is scoped per practice, not productized.
const PROCESS = [
  {
    label: 'Scope',
    icon: ClipboardList,
    body: 'Join the waitlist. When your intake opens we reach out, map the practice, market, and goals, then scope the system around what will actually move calls and bookings. No fixed package.',
  },
  {
    label: 'Build',
    icon: Hammer,
    body: 'We ship the website, listings, reviews, search, and tracking as one connected system, with a clean migration if you are leaving another provider.',
  },
  {
    label: 'Grow',
    icon: TrendingUp,
    body: 'We review search activity, ad spend, and inquiries with your team. Where booking data is available, we use it to understand which inquiries became appointments.',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'What’s included in Dental OS?',
    answer:
      'Website, SEO and AI search, Google Maps and local listings, reviews, and ads, built and run as one connected system tuned to how patients find, trust, and choose a dentist.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Dental OS is scoped to each practice (your locations, services, and goals), so there is no fixed package price. Prism is fully booked right now, so join the waitlist; when we reach out we scope it with you and price around what will move calls and bookings.',
  },
  {
    question: 'How long until it is live?',
    answer:
      'We agree on the schedule after reviewing your current website, access, content, and required features. You review a preview before launch, and we coordinate the transition with your existing provider when needed.',
  },
  {
    question: 'Do we own our website and accounts?',
    answer:
      'Yes. You own your domain, website, analytics, and ad accounts. Dental OS is built so your practice is never locked in.',
  },
  {
    question: 'Can you handle multiple locations?',
    answer:
      'Yes. We can organize pages, listings, reviews, and reporting by location so patients get the right details for each office.',
  },
]

const rise = (delay: number) =>
  ({ '--rise-delay': `${delay}ms` }) as CSSProperties

export default function DentalOsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section
          aria-labelledby="dental-os-hero-heading"
          className="relative isolate overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12"
        >
          <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[44rem] opacity-60" />
          <div
            aria-hidden="true"
            className="absolute right-[-12rem] top-[-8rem] -z-10 h-[40rem] w-[min(60rem,140vw)] bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/18%),transparent),radial-gradient(40%_45%_at_25%_70%,oklch(0.63_0.19_295/10%),transparent)] blur-2xl"
          />
          <div aria-hidden="true" className="bg-noise mask-fade-b absolute inset-0 -z-10 opacity-[0.05]" />

          <div className="prism-container grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <div className="flex min-w-0 flex-col items-start">
              <div className="prism-rise" style={rise(0)}>
                <WaitlistStatus />
              </div>
              <h1
                id="dental-os-hero-heading"
                className="text-gradient prism-rise mt-6 pb-2 text-[clamp(2.4rem,1.2rem+3.9vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.055em]"
                style={rise(80)}
              >
                <span className="block">
                  be the <span className="text-refract">easy yes</span>{' '}
                </span>
                <span className="block">for new patients.</span>
              </h1>
              <p
                className="text-lead prism-rise mt-5 max-w-[46ch] text-pretty text-muted-foreground"
                style={rise(160)}
              >
                <span className="text-foreground">Dental OS</span> puts your
                website, search presence, Google Maps, reviews, and ads under one
                plan, so patients can find your practice, understand your care,
                and contact your team.
              </p>
              <div
                className="prism-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
                style={rise(240)}
              >
                <WaitlistButton
                  location="dental-os hero"
                  size="xl"
                  className="w-full sm:w-auto"
                />
                <Button asChild variant="outline" size="xl" className="group/proof w-full sm:w-auto">
                  <TrackedLink href="#proof" label="see dental results" location="dental-os hero">
                    See dental results
                    <ArrowDown
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/proof:translate-y-0.5"
                    />
                  </TrackedLink>
                </Button>
              </div>
              <ul
                aria-label="Included in Dental OS"
                className="prism-rise mt-8 flex w-full flex-wrap items-center gap-2 border-t border-white/[0.08] pt-6"
                style={rise(320)}
              >
                {BUNDLE_NAMES.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-muted-foreground"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="prism-rise min-w-0" style={rise(200)}>
              <DentalHeroShowcase />
            </div>
          </div>
        </section>

        {/* The bundle */}
        <Section aria-labelledby="dental-os-bundle-heading" className="pt-6 sm:pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeader
                id="dental-os-bundle-heading"
                eyebrow="What's inside"
                title="one plan for your online presence."
                titleClassName="max-w-[15ch]"
              />
            </Reveal>
            <p className="max-w-[44ch] text-pretty text-[15px] leading-7 text-muted-foreground lg:pb-2">
              Choose the work your practice needs across five areas. We
              coordinate the pages, listings, messages, and tracking so patients
              get consistent information.
            </p>
          </div>
          <div className="mt-12">
            <DentalBundleBento items={BUNDLE} />
          </div>
        </Section>

        {/* Proof */}
        <Section
          id="proof"
          aria-labelledby="dental-os-proof-heading"
          className="scroll-mt-20 pt-0 sm:pt-0"
        >
          <Reveal>
            <SectionHeader
              id="dental-os-proof-heading"
              eyebrow="Proof"
              title="dental is our deepest proof."
              description="Prism builds for dental practices across California. One measured result first, then the sites themselves."
              align="center"
              titleClassName="max-w-[16ch]"
            />
          </Reveal>

          <Reveal className="mt-14">
            <div className="spectrum-rule relative isolate grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="flex flex-col p-6 py-10 sm:p-10 lg:p-14">
                <p className="text-eyebrow text-subtle">
                  Dr. Christopher B. Wong · Palo Alto, CA
                </p>
                <p className="mt-6 text-[clamp(4rem,2.6rem+5vw,7rem)] font-semibold leading-none tracking-[-0.06em] text-foreground">
                  <HomeCountUp value={wongImpressions.value} />
                </p>
                <p className="mt-4 max-w-[34ch] text-pretty text-lg leading-7 text-foreground/90">
                  {wongImpressions.label}
                </p>
                <p className="mt-4 max-w-[46ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                  An M&amp;A handoff told clearly: a new website, aligned
                  listings and reviews, and Google campaigns reporting into one
                  rhythm.
                </p>
                <p className="mt-6 font-mono text-[11px] leading-5 text-subtle">
                  Source: {wongImpressions.sourceName} · {wongImpressions.dateRange}
                </p>
                <TrackedLink
                  href="/case-studies/dr-christopher-wong"
                  label="dr. wong case study"
                  location="dental-os proof"
                  className="group/case mt-8 inline-flex min-h-10 w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  Read Dr. Wong&apos;s case study
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
                  />
                </TrackedLink>
              </div>
              <div className="relative min-h-[22rem] border-t border-white/[0.08] lg:border-l lg:border-t-0">
                <Image
                  src="/dr-chris-wong.png"
                  alt="Dr. Christopher Wong smiling in his Palo Alto dental practice"
                  fill
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-cover object-[50%_25%]"
                />
              </div>
            </div>
          </Reveal>

          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {DENTAL_CLIENTS.map((client, index) => (
              <li key={client.slug} className="min-w-0">
                <Reveal delay={(index % 4) * 70} className="h-full">
                  <TrackedLink
                    href={`/case-studies/${client.slug}`}
                    label={`${client.name} case study`}
                    location="dental-os client roster"
                    className="group/client flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <div className="mask-fade-b h-24 overflow-hidden px-3 pt-3 sm:h-36 sm:px-4 sm:pt-4">
                      <BrowserFrame
                        src={`/case-studies/${client.slug}-home-desktop.jpg`}
                        alt={`${client.name} website home page built by Prism`}
                        url={client.host}
                        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
                        className="transition-transform duration-500 group-hover/client:-translate-y-1"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 pt-2 sm:p-5 sm:pt-3">
                      <p className="flex items-start justify-between gap-3 text-[15px] font-semibold tracking-[-0.015em] text-foreground">
                        {client.name}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-subtle transition-[transform,color] duration-200 group-hover/client:-translate-y-0.5 group-hover/client:translate-x-0.5 group-hover/client:text-foreground"
                        />
                      </p>
                      <p className="mt-1.5 hidden text-pretty text-[13px] leading-5 text-muted-foreground sm:block">
                        {client.focus}
                      </p>
                      <p className="mt-auto pt-4 font-mono text-[11px] text-subtle">
                        {client.location}
                      </p>
                    </div>
                  </TrackedLink>
                </Reveal>
              </li>
            ))}
            <li className="min-w-0">
              <Reveal delay={210} className="h-full">
                <TrackedLink
                  href="/case-studies"
                  label="browse case studies"
                  location="dental-os client roster"
                  className="group/all flex h-full min-h-40 flex-col justify-between rounded-2xl border border-dashed border-white/[0.14] bg-white/[0.015] p-4 sm:min-h-48 sm:p-6 transition-colors hover:border-white/25 hover:bg-white/[0.03] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <span className="text-eyebrow text-subtle">All work</span>
                  <span className="flex items-end justify-between gap-3">
                    <span className="text-[1.05rem] font-semibold leading-snug tracking-[-0.025em] text-foreground sm:text-[1.2rem]">
                      Browse every case study
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mb-1 size-5 shrink-0 text-subtle transition-[transform,color] duration-200 group-hover/all:translate-x-0.5 group-hover/all:text-foreground"
                    />
                  </span>
                </TrackedLink>
              </Reveal>
            </li>
          </ul>
        </Section>

        {/* Why dental is different */}
        <Section aria-labelledby="dental-os-difference-heading" className="pt-0 sm:pt-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="dental-os-difference-heading"
                eyebrow="Why dental is different"
                title="dental growth has its own rules."
                description="Patients want to understand your care, meet your team, and know what to expect before calling. Your online presence should help them do that."
                titleClassName="max-w-[16ch]"
              />
            </Reveal>
            <ol className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {DENTAL_DIFFERENCE.map((tile, index) => (
                <li key={tile.title}>
                  <Reveal
                    delay={index * 70}
                    className="grid gap-3 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="font-mono text-xs leading-8 text-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-heading text-foreground">
                        {tile.title.toLowerCase()}
                      </h3>
                      <p className="mt-3 max-w-[54ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                        {tile.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* How it works */}
        <Section aria-labelledby="dental-os-process-heading" className="pt-0 sm:pt-0">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div aria-hidden="true" className="bg-dots mask-fade-b absolute inset-0 -z-10 opacity-[0.16]" />
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                id="dental-os-process-heading"
                eyebrow="How it works"
                title="scope, build, grow."
                titleClassName="max-w-[14ch]"
              />
              <p className="max-w-[40ch] text-pretty text-[15px] leading-7 text-muted-foreground lg:pb-2">
                Dental OS is scoped to your practice, so it starts with a
                conversation, not a checkout. Pricing:{' '}
                {DENTAL_OS_PRICE_LABEL.toLowerCase()}.
              </p>
            </div>
            <ol className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              <span
                aria-hidden="true"
                className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5 md:block"
              />
              {PROCESS.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.label} className="relative min-w-0">
                    <Reveal delay={index * 100}>
                      <OfferIconTile className="relative bg-card">
                        <Icon aria-hidden="true" className="size-[18px]" />
                      </OfferIconTile>
                      <p className="mt-6 font-mono text-xs text-subtle">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-heading mt-2 text-foreground">
                        {step.label.toLowerCase()}
                      </h3>
                      <p className="mt-3 max-w-[40ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                        {step.body}
                      </p>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          </div>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="dental-os-faq-heading" className="pt-0 sm:pt-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="dental-os-faq-heading"
                eyebrow="FAQ"
                title="before you join the waitlist."
                titleClassName="max-w-[13ch]"
              />
            </div>
            <FaqList items={FAQ_ITEMS} name="dental-os-faq" defaultOpen={0} />
          </div>
        </Section>

        <FinalCta
          location="dental-os final cta"
          href={WAITLIST_CTA.href}
          headingId="dental-os-final-cta-heading"
          title={
            <>
              get your practice on the list for <WaitlistIntakeMonth />.
            </>
          }
          secondary={{ label: 'Browse case studies', href: '/case-studies' }}
        />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="dental-os"
        name={CANONICAL_PRICING_OFFERS.dental_os.name}
        description={CANONICAL_PRICING_OFFERS.dental_os.description}
        serviceType="Dental practice growth system"
        areaServed="United States"
        offerDetails={{
          name: CANONICAL_PRICING_OFFERS.dental_os.name,
          description: CANONICAL_PRICING_OFFERS.dental_os.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}

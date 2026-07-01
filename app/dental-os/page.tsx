import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import {
  CANONICAL_PRICING_OFFERS,
  DENTAL_OS_PRICE_LABEL,
} from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

const CANONICAL_URL = 'https://www.design-prism.com/dental-os'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Dental OS: the growth system for dental practices',
  description:
    'Dental OS is the Prism growth system for dental practices: website, SEO, AI search, Google Maps, reviews, and ads — tuned to how patients choose a dentist.',
  path: '/dental-os',
  ogImage: '/prism-opengraph.png',
})

// Dental OS is built as a reusable vertical template: a future "Clinic OS" can
// clone this file and swap the data constants below without touching layout.

// The bundle, framed as patient outcomes rather than deliverables.
const BUNDLE = [
  {
    name: 'Website',
    outcome:
      'A fast, mobile-first site that earns trust quickly and turns patient visits into booked appointments.',
  },
  {
    name: 'SEO & AI search',
    outcome:
      'Pages structured so Google and AI assistants understand, surface, and recommend the practice.',
  },
  {
    name: 'Google Maps & local',
    outcome:
      'A dialed-in Business Profile and local pages that win the map pack for searches near the practice.',
  },
  {
    name: 'Reviews',
    outcome:
      'A steady review engine that compounds patient trust and local ranking month over month.',
  },
  {
    name: 'Ads',
    outcome:
      'High-intent Google and Meta campaigns measured against booked treatment, not clicks.',
  },
] as const

// What makes dental growth its own discipline.
const DENTAL_DIFFERENCE = [
  {
    title: 'Patients vet before they call',
    body: 'People research a dentist long before they pick up the phone. The site, photos, and reviews have to earn trust in seconds.',
  },
  {
    title: 'The map pack decides',
    body: 'Most new patients choose from Google’s local map results. The Business Profile, reviews, and local pages decide who shows up.',
  },
  {
    title: 'Reviews are the currency',
    body: 'Recent, steady reviews drive both patient confidence and local ranking. Velocity matters as much as the average score.',
  },
  {
    title: 'AI is the new front desk',
    body: 'Patients now ask ChatGPT and Google’s AI for the best dentist nearby. The practice has to be easy to find, cite, and corroborate.',
  },
] as const

// Real, source-attributed dental results from lib/case-study-data.ts. Every
// value is verified against Google Search Console — do not edit without the
// source. Gold proof treatment is sanctioned for this band only.
const PROOF_METRICS = [
  {
    client: 'Dr. Christopher Wong',
    value: '+142%',
    label: 'Google Search impressions, year over year',
    source: 'Google Search Console · Mar–May 2025 vs 2026',
    href: '/case-studies/dr-christopher-wong',
  },
  {
    client: 'Dr. Christopher Wong',
    value: '~3×',
    label: 'monthly search visibility growth after the rebuild',
    source: 'Google Search Console · Feb 2025 → Apr–May 2026',
    href: '/case-studies/dr-christopher-wong',
  },
  {
    client: 'Roseville Dental Academy',
    value: '593',
    label: 'Google clicks in the first full month after launch',
    source: 'Google Search Console · May 2026 · 14.2k impressions',
    href: '/case-studies/roseville-dental-academy',
  },
] as const

// Broader dental roster for proof of depth. Slugs link to /case-studies/<slug>.
const DENTAL_CLIENTS = [
  {
    name: 'Exquisite Dentistry',
    location: 'Beverly Hills, CA',
    focus: 'Luxury cosmetic practice, evidence-first rebuild',
    slug: 'exquisite-dentistry',
  },
  {
    name: 'Laguna Beach Dental Arts',
    location: 'Laguna Beach, CA',
    focus: 'Post-M&A relaunch with end-to-end tracking',
    slug: 'laguna-beach-dental-arts',
  },
  {
    name: 'Family First Smile Care',
    location: 'Los Gatos, CA',
    focus: 'Family-first clarity and clear conversion paths',
    slug: 'family-first-smile-care',
  },
  {
    name: 'Town Centre Dental',
    location: 'Brentwood, CA',
    focus: 'Family dentistry growth system',
    slug: 'town-centre-dental',
  },
  {
    name: 'Grace Dental Santa Rosa',
    location: 'Santa Rosa, CA',
    focus: 'Post-M&A relaunch built to scale',
    slug: 'grace-dental-santa-rosa',
  },
  {
    name: 'Wine Country Root Canal',
    location: 'Santa Rosa, CA',
    focus: 'Endodontic specialty, calm patient journey',
    slug: 'wine-country-root-canal',
  },
  {
    name: 'Coast Periodontics & Laser Surgery',
    location: 'San Luis Obispo, CA',
    focus: 'Periodontics for patients and referring dentists',
    slug: 'coast-periodontics-and-laser-surgery',
  },
  {
    name: 'Mataria Dental Group',
    location: 'Torrance, CA',
    focus: 'Patient-first, multi-provider presence',
    slug: 'mataria-dental-group',
  },
] as const

// Consultative because Dental OS is scoped per practice, not productized.
const PROCESS = [
  {
    label: 'Scope',
    body: 'We map the practice, market, and goals on a call, then scope the system around what will actually move calls and bookings — no fixed package.',
  },
  {
    label: 'Build',
    body: 'We ship the website, listings, reviews, search, and tracking as one connected system, with a clean migration if you’re leaving another provider.',
  },
  {
    label: 'Grow',
    body: 'Every month we optimize search, ads, reviews, and conversion, reporting against booked appointments instead of vanity metrics.',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'What’s included in Dental OS?',
    answer:
      'Website, SEO and AI search, Google Maps and local listings, reviews, and ads — built and run as one connected system tuned to how patients find, trust, and choose a dentist.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Dental OS is scoped to each practice — your locations, services, and goals — so there is no fixed package price. We scope it on a call and price around what will move calls and bookings. Book a call to get a number for your practice.',
  },
  {
    question: 'How long until it is live?',
    answer:
      'Most single-location practices launch the core website and listings within a few weeks, then search, reviews, and ads compound from there. Urgent provider transitions can move faster.',
  },
  {
    question: 'Do we own our website and accounts?',
    answer:
      'Yes. You own your domain, website, analytics, and ad accounts. Dental OS is built so your practice is never locked in.',
  },
  {
    question: 'Can you handle multiple locations?',
    answer:
      'Yes. Dental OS scales to multi-location groups with per-location pages, listings, reviews, and reporting so each office is found and chosen in its own market.',
  },
]

export default function DentalOsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="border-b border-white/12 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteHeroFrameClassName,
                'px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20',
              )}
            >
              <div className="max-w-3xl">
                <CoreSectionHeading
                  as="h1"
                  variant="hero"
                  eyebrow="Dental OS"
                  title="The growth system, built for dental."
                  titleClassName="max-w-[18ch]"
                  description="Patients find, trust, and choose a practice across Google, the map pack, reviews, and now AI. Dental OS runs every one of those surfaces as a single system — so your practice becomes the obvious choice."
                />
                <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <CoreActionLink
                    href="/contact?topic=dental-os"
                    variant="heroPrimary"
                    label="book a dental call"
                    location="dental-os hero"
                  >
                    Book a call
                  </CoreActionLink>
                  <CoreActionLink
                    href="#proof"
                    variant="primary"
                    label="see dental results"
                    location="dental-os hero"
                  >
                    See dental results
                  </CoreActionLink>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  {[
                    'Website + SEO + Maps + Reviews + Ads',
                    DENTAL_OS_PRICE_LABEL,
                    'Patient-first by design',
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-9 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#c9c1b6]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              coreRouteSplitLayoutClassName,
            )}
          >
            <CoreSectionHeading
              eyebrow="What's inside"
              title="Five systems. One growth engine."
              description="Dental OS is the full Prism growth stack, packaged for a practice. Each part reinforces the others, so the whole thing compounds instead of competing for budget."
            />
            <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10">
              {BUNDLE.map((item, index) => (
                <li key={item.name} className="bg-black">
                  <div className="flex flex-col gap-2 p-6 sm:flex-row sm:items-baseline sm:gap-6">
                    <div className="flex items-baseline gap-3 sm:w-52 sm:shrink-0">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-medium tracking-[-0.03em] text-[#f5f0e8]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-sm leading-7 text-[#b8afa2]">
                      {item.outcome}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why dental is different */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Why dental is different"
              title="Dental growth has its own rules."
              description="A generic marketing bundle misses how patients actually pick a dentist. Dental OS is tuned to the four things that decide it."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {DENTAL_DIFFERENCE.map((tile) => (
                <article
                  key={tile.title}
                  className="border border-white/10 bg-[#070707] p-6"
                >
                  <h3 className="text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {tile.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {tile.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section
          id="proof"
          className="scroll-mt-24 border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24"
        >
          <div className={coreRouteContainerClassName}>
            <div className={coreRouteContainedSectionClassName}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <CoreSectionHeading
                  eyebrow="Proof"
                  title="Dental is our deepest proof."
                  description="Real, source-attributed results from Prism dental clients. Every number is verified against Google Search Console."
                />
                <CoreActionLink
                  href="/case-studies"
                  variant="primary"
                  label="browse case studies"
                  location="dental-os proof"
                >
                  Browse case studies
                </CoreActionLink>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {PROOF_METRICS.map((metric) => (
                  <Link
                    key={`${metric.client}-${metric.value}`}
                    href={metric.href}
                    className="group flex flex-col border border-white/10 bg-black p-6 transition-colors hover:border-[#d8bc79]/45 hover:bg-[#0b0b0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35"
                  >
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#8f877b]">
                      {metric.client}
                    </span>
                    <span className="mt-5 font-sans text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-[#d8bc79]">
                      {metric.value}
                    </span>
                    <span className="mt-4 text-sm leading-6 text-[#b8afa2]">
                      {metric.label}
                    </span>
                    <span className="mt-5 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#8f877b]">
                      {metric.source}
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-6 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8f877b]">
                Source: Google Search Console
              </p>

              <div className="mt-12 border-t border-white/10 pt-10">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#8f877b]">
                  More dental practices on Prism
                </p>
                <div className="mt-6 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                  {DENTAL_CLIENTS.map((client) => (
                    <Link
                      key={client.slug}
                      href={`/case-studies/${client.slug}`}
                      className="group bg-black p-5 transition-colors hover:bg-[#0b0b0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-medium tracking-[-0.03em] text-[#f5f0e8]">
                            {client.name}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#b8afa2]">
                            {client.focus}
                          </p>
                        </div>
                        <ArrowRight
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-[#d8bc79] transition-transform group-hover:translate-x-0.5"
                        />
                      </div>
                      <p className="mt-4 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#8f877b]">
                        {client.location}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="How it works"
              title="Scope, build, grow."
              description="Because Dental OS is scoped to your practice, it starts with a conversation — not a checkout."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {PROCESS.map((step, index) => (
                <li
                  key={step.label}
                  className="border border-white/10 bg-[#070707] p-6"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {step.label}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading eyebrow="FAQ" title="Before you book a call." />
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {item.question}
                    <span className="text-[#d8bc79] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b8afa2]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between',
              )}
            >
              <CoreSectionHeading
                eyebrow="Get started"
                title="Book a dental growth call."
                description="Tell us about your practice and goals. We’ll scope Dental OS around what will move calls and bookings — and give you a real number to decide on."
              />
              <div className="flex shrink-0 flex-col gap-5 sm:flex-row sm:items-center">
                <CoreActionLink
                  href="/contact?topic=dental-os"
                  variant="heroPrimary"
                  label="book a dental call"
                  location="dental-os footer cta"
                >
                  Book a dental growth call
                </CoreActionLink>
                <CoreActionLink
                  href="/case-studies"
                  variant="primary"
                  label="browse dental case studies"
                  location="dental-os footer cta"
                >
                  Browse case studies
                </CoreActionLink>
              </div>
            </div>
          </div>
        </section>
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

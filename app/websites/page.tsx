import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { BOOK_A_CALL_CTA, WEBSITE_START_CTA } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { websiteProjects } from '@/lib/website-projects'
import { cn } from '@/lib/utils'

const PAGE_TITLE = 'Pro websites'
const PAGE_DESCRIPTION =
  'Ultra-premium websites for serious businesses: bespoke design systems, precise engineering, and analytics built to rank on Google and be cited by AI.'
const CANONICAL_URL = 'https://www.design-prism.com/websites'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/websites',
  ogImage: '/prism-opengraph.png',
})

// The three disciplines every PRO build is judged against.
const PILLARS = [
  {
    label: 'Design',
    title: 'A design system, not a template',
    body: 'Every engagement begins with a dedicated design system. Typography, color, spacing, and motion are defined once and applied with intention, so every page signals credibility at first glance.',
    points: [
      'Bespoke design system per brand',
      'Typography, color, and motion standards',
      'Composed pages, never template blocks',
    ],
  },
  {
    label: 'Engineering',
    title: 'Built like software, not a brochure',
    body: 'A modern architecture that treats performance and accessibility as baseline requirements. Fast on every device, resilient under audit, and structured so search engines read each page with precision.',
    points: [
      'Core Web Vitals in the green',
      'Accessible, semantic, hardened markup',
      'Technical SEO foundations built in',
    ],
  },
  {
    label: 'Analytics',
    title: 'Instrumented from day one',
    body: 'Measurement is part of the build itself. Analytics and conversion tracking are configured before launch, so you know precisely what your website delivers from its first day in service.',
    points: [
      'GA4 and conversion tracking configured at launch',
      'Lead and call attribution',
      'Reporting built for decision-making',
    ],
  },
] as const

// Where a PRO website has to win in 2026: classic search AND AI answers.
const SEARCH_SURFACES = [
  'Google Search',
  'Google Maps',
  'AI Overviews',
  'ChatGPT',
  'Gemini',
  'Claude',
  'Perplexity',
] as const

const PROCESS_STEPS = [
  {
    label: 'Book a 30-min call',
    body: 'A focused 30-minute conversation to understand your business, market, and objectives. You leave with a clear plan and a clear price.',
  },
  {
    label: 'Design & build',
    body: 'We develop the design system, compose each page, and engineer the entire build to the Prism standard.',
  },
  {
    label: 'Instrument everything',
    body: 'Analytics, conversion tracking, structured data, and search foundations are in place before launch, never retrofitted after it.',
  },
  {
    label: 'Refine and maintain',
    body: 'We refine until it is exactly right, then keep the entire presence tuned across search, AI visibility, and conversion.',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'What makes a Prism PRO website different?',
    answer:
      'It is conceived as a complete online presence rather than a brochure: a bespoke design system, software-grade engineering, analytics from day one, and search foundations that address both Google and AI assistants such as ChatGPT, Gemini, and Claude.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Every build is scoped to your business on a 30-minute Zoom call. You leave with a clear plan and a clear price. There are no email estimates and no surprises in scope.',
  },
  {
    question: 'How do you make a website rank on AI assistants?',
    answer:
      'Through structured data, entity-clear content, clean semantics, and verifiable proof. The same discipline that earns rankings on Google makes a business straightforward for ChatGPT, Gemini, Claude, and Perplexity to find, trust, and cite.',
  },
  {
    question: 'Do I own the website?',
    answer:
      'Completely. From the moment it ships, the website and everything within it belongs to you. There is no lock-in of any kind.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'That decision is yours. Prism can continue to run the site, covering updates, analytics, search, and AI visibility, or hand it off entirely. Either way, it remains yours.',
  },
] as const

const PROOF_BUILDS = [
  {
    title: 'Exquisite Dentistry',
    type: 'Healthcare',
    image: '/case-studies/exquisite-dentistry-home-desktop.jpg',
    url: 'https://exquisitedentistryla.com/',
  },
  {
    title: 'Olympic Bootworks',
    type: 'Retail',
    image: '/case-studies/olympic-bootworks-home-desktop.jpg',
    url: 'https://www.olympicbootworks.com',
  },
  {
    title: 'Saorsa Growth Partners',
    type: 'Advisory',
    image: '/case-studies/saorsa-growth-partners-home-desktop.jpg',
    url: 'https://www.saorsapartners.com',
  },
] as const

// Real, source-attributed results from lib/case-study-data.ts (Google Search
// Console). Keep in sync with the source; do not invent metrics.
const PROOF_POINTS = [
  {
    value: '5.3×',
    label: 'monthly Google clicks in five months for Saorsa Growth Partners',
    href: '/case-studies/saorsa-growth-partners',
  },
  {
    value: '593',
    label:
      'Google clicks in the first full month after launch for Roseville Dental Academy',
    href: '/case-studies/roseville-dental-academy',
  },
  {
    value: '+142%',
    label: 'Google Search impressions year over year for Dr. Christopher Wong',
    href: '/case-studies/dr-christopher-wong',
  },
] as const

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
      {children}
    </p>
  )
}

export default function WebsitesPage() {
  const featuredProjects = websiteProjects.slice(0, 8)

  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className="border-b border-white/12 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <SectionKicker>The PRO website</SectionKicker>
              <h1 className="mx-auto mt-6 max-w-[16ch] text-balance text-[clamp(2.65rem,7.5vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[#f5f0e8]">
                Your online presence, fully dialed.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-8 text-[#b8afa2] sm:text-[1.18rem]">
                Considered design, precise engineering, and analytics of
                record for serious businesses. Built on a bespoke design
                system, engineered to rank on Google, and structured to be
                found and cited by AI.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CoreActionLink
                  href={WEBSITE_START_CTA.href}
                  variant="heroPrimary"
                  label={WEBSITE_START_CTA.label.toLowerCase()}
                  location="websites hero"
                >
                  {WEBSITE_START_CTA.label}
                </CoreActionLink>
                <CoreActionLink
                  href="#work"
                  variant="heroSecondary"
                  label="see website proof"
                  location="websites hero"
                >
                  See the work
                </CoreActionLink>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  'Design systems',
                  'Engineered to rank',
                  'Analytics wired in',
                  'Google + AI search',
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-10 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#c9c1b6]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {PROOF_BUILDS.map((build) => (
                <Link
                  key={build.title}
                  href={build.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden border border-white/12 bg-[#070707] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#d8bc79]/45 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                    <Image
                      src={build.image}
                      alt={`${build.title} website screenshot`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 32vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      priority={build.title === PROOF_BUILDS[0].title}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#8f877b]">
                        {build.type}
                      </p>
                      <h2 className="mt-2 text-[1.05rem] font-medium tracking-[-0.03em] text-[#f5f0e8]">
                        {build.title}
                      </h2>
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#d8bc79]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="The standard"
              title="Design. Engineering. Analytics."
              description="Three disciplines brought to a single standard. The difference between a website and a serious online presence."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {PILLARS.map((pillar, index) => (
                <article
                  key={pillar.label}
                  className="flex flex-col border border-white/10 bg-[#070707] p-6 sm:p-7"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    {String(index + 1).padStart(2, '0')} · {pillar.label}
                  </p>
                  <h2 className="mt-5 text-[1.35rem] font-medium leading-tight tracking-[-0.04em] text-[#f5f0e8]">
                    {pillar.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {pillar.body}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[0.82rem] leading-6 text-[#c9c1b6]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#d8bc79]"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24">
          <div
            className={cn(
              coreRouteContainerClassName,
              'grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start',
            )}
          >
            <div className="space-y-7">
              <CoreSectionHeading
                eyebrow="Visibility"
                title="Rank on Google. Get cited by AI."
                description="Your next customer asks a search engine, or asks an AI assistant. A PRO website is structured to win both: technical and local SEO foundations for Google, with entity-clear content and structured data that allow AI systems to find, trust, and recommend you."
              />
              <div className="flex flex-wrap gap-2">
                {SEARCH_SURFACES.map((surface) => (
                  <span
                    key={surface}
                    className="inline-flex min-h-9 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#c9c1b6]"
                  >
                    {surface}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm leading-7 text-[#b8afa2]">
                The same system, with results measured at the source:
              </p>
              <ul className="mt-5 grid gap-px overflow-hidden border border-white/10 bg-white/10">
                {PROOF_POINTS.map((proof) => (
                  <li key={proof.label} className="bg-black">
                    <Link
                      href={proof.href}
                      className="group flex items-baseline gap-4 p-4 transition-colors hover:bg-[#0b0b0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35"
                    >
                      <span className="shrink-0 font-sans text-[1.6rem] font-medium leading-none tracking-[-0.04em] text-[#f5f0e8]">
                        {proof.value}
                      </span>
                      <span className="text-[0.82rem] leading-6 text-[#b8afa2] group-hover:text-[#c9c1b6]">
                        {proof.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#8f877b]">
                Source: Google Search Console
              </p>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="scroll-mt-24 border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24"
        >
          <div className={coreRouteContainerClassName}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <CoreSectionHeading
                eyebrow="The work"
                title="Selected work."
                description="Every build is produced by the same Prism system, with design, engineering, and analytics held to a single standard."
              />
              <CoreActionLink
                href="/case-studies"
                variant="secondary"
                label="view case studies"
                location="websites proof"
              >
                Case studies
              </CoreActionLink>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-black p-5 transition-colors hover:bg-[#0b0b0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    {String(index + 1).padStart(2, '0')} / {project.category}
                  </p>
                  <h2 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#b8afa2]">
                    {project.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                    Open site
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="How it works"
              title="It starts with one call."
              description="Every engagement is scoped on a 30-minute Zoom call. You leave with a clear plan and a clear price."
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-4">
              {PROCESS_STEPS.map((step, index) => (
                <li
                  key={step.label}
                  className="border border-white/10 bg-[#070707] p-5"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {step.label}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="FAQ"
              title="Before the call."
            />
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {item.question}
                    <span className="text-[#d8bc79] transition-transform group-open:rotate-45 motion-reduce:transition-none">
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

        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
            )}
          >
            <CoreSectionHeading
              title="Get your presence fully dialed."
              description="Four short questions, then we scope the build. Prefer a call? Book a 30-minute Zoom and we will map the work live."
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CoreActionLink
                href={WEBSITE_START_CTA.href}
                variant="heroPrimary"
                label={WEBSITE_START_CTA.label.toLowerCase()}
                location="websites final"
              >
                {WEBSITE_START_CTA.label}
              </CoreActionLink>
              <CoreActionLink
                href={BOOK_A_CALL_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="heroSecondary"
                label="book a free demo"
                location="websites final"
              >
                {BOOK_A_CALL_CTA.label}
              </CoreActionLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ServiceSchema
        serviceId="pro-website"
        name="Prism PRO website"
        description="Ultra-premium website builds for serious businesses: a bespoke design system, software-grade engineering, and analytics configured from day one, structured to rank on Google and be cited by AI assistants. Scoped on a 30-minute call."
        serviceType="Website design and development"
        areaServed="United States"
        offerDetails={{
          name: 'Prism PRO website',
          description:
            'An ultra-premium website build covering the design system, engineering, analytics, and Google and AI search foundations. Scoped to your business on a 30-minute call.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}

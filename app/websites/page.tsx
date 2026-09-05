import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ServiceSiblings } from '@/components/services/ServiceSiblings'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { getCaseStudyMetric } from '@/lib/case-study-data'
import { BOOK_A_CALL_CTA, WEBSITE_START_CTA } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { websiteProjects } from '@/lib/website-projects'
import { cn } from '@/lib/utils'

const PAGE_TITLE = 'Pro websites'
const PAGE_DESCRIPTION =
  'Ultra-premium websites for serious businesses: bespoke design systems, precise engineering, analytics, and foundations that support Google and AI discovery.'
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
    title: 'Design that feels like your business',
    body: 'We define your typography, color, spacing, and motion, then carry them through every page. The result is a consistent website that makes your business easier to recognize and understand.',
    points: [
      'Bespoke design system per brand',
      'Typography, color, and motion standards',
      'Composed pages, never template blocks',
    ],
  },
  {
    label: 'Engineering',
    title: 'Fast, accessible, easy to navigate',
    body: 'We build for speed, accessibility, and everyday use across devices. Clear page structure helps visitors find what they need and search engines understand what you offer.',
    points: [
      'Core Web Vitals optimization',
      'Accessible, semantic page structure',
      'Technical SEO foundations built in',
    ],
  },
  {
    label: 'Analytics',
    title: 'Know what brings people in',
    body: 'Analytics and conversion tracking are part of the build. See how people find your site, which pages they visit, and where they take the next step.',
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
    label: 'Set up measurement',
    body: 'Analytics, conversion tracking, structured data, and search foundations are in place before launch, never retrofitted after it.',
  },
  {
    label: 'Refine and maintain',
    body: 'We review the site with you before launch, then plan any ongoing updates to content, search visibility, and conversion paths.',
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
    question: 'How do you support visibility in AI assistants?',
    answer:
      'Through structured data, entity-clear content, clean semantics, and verifiable proof. These foundations can make a business easier for search engines and AI assistants to understand, but no agency can guarantee rankings, citations, or recommendations.',
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
const saorsaClicks = getCaseStudyMetric('saorsa-growth-partners')
const rosevilleClicks = getCaseStudyMetric('roseville-dental-academy')
const wongImpressions = getCaseStudyMetric('dr-christopher-wong')

const PROOF_POINTS = [
  {
    value: saorsaClicks.value,
    label: `${saorsaClicks.label} for Saorsa Growth Partners`,
    href: '/case-studies/saorsa-growth-partners',
  },
  {
    value: rosevilleClicks.value,
    label: `${rosevilleClicks.label} for Roseville Dental Academy`,
    href: '/case-studies/roseville-dental-academy',
  },
  {
    value: wongImpressions.value,
    label: `${wongImpressions.label} for Dr. Christopher Wong`,
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
                A better website. A clearer next step.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-8 text-[#b8afa2] sm:text-[1.18rem]">
                Custom design, fast pages, and clear paths from a first visit
                to an inquiry. Built with analytics and search foundations
                that help Google and AI systems understand your business.
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
                  'Search foundations',
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
              description="A clear visual identity, a dependable build, and the tracking to understand what works."
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
                title="Support discovery on Google and in AI."
                description="Your next customer may ask a search engine or an AI assistant. A PRO website provides technical and local SEO foundations, entity-clear content, and structured data that help those systems understand your business. Rankings, citations, and recommendations are never guaranteed."
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
                  target={project.external === false ? undefined : '_blank'}
                  rel={
                    project.external === false
                      ? undefined
                      : 'noopener noreferrer'
                  }
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
                    {project.external === false
                      ? 'View case study'
                      : 'Open site'}
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
            <CoreSectionHeading eyebrow="FAQ" title="Before the call." />
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
              title="Build a website you can grow with."
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
        <ServiceSiblings current="website" />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="pro-website"
        name="Prism PRO website"
        description="Ultra-premium website builds for serious businesses: a bespoke design system, software-grade engineering, analytics configured from day one, and foundations that support Google and AI discovery. Scoped on a 30-minute call; placement is not guaranteed."
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

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import BaseOfferShowcase from '@/components/websites/BaseOfferShowcase'
import WebsiteBuildEstimatorForm from '@/components/forms/WebsiteBuildEstimatorForm'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { websiteProjects } from '@/lib/website-projects'
import { cn } from '@/lib/utils'

const PAGE_TITLE = 'One-time website builds from $300'
const PAGE_DESCRIPTION =
  'Prism builds world-class one-time websites for founders, operators, and small teams, starting at $300 for tiny accepted launches.'
const CANONICAL_URL = 'https://www.design-prism.com/websites'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/websites',
  ogImage: '/prism-opengraph.png',
})

const FIT_SIGNALS = [
  {
    title: 'A clear idea',
    body: 'You know the offer, audience, or launch moment the website needs to support.',
  },
  {
    title: 'Room for taste',
    body: 'You want something sharper than a generic template and are open to Prism direction.',
  },
  {
    title: 'Ready enough',
    body: 'You can provide the essentials or choose add-ons when Prism should shape them.',
  },
  {
    title: 'Mutual excitement',
    body: 'We accept projects the team is genuinely excited to make great.',
  },
] as const

const PROCESS_STEPS = [
  {
    label: 'Estimate',
    body: 'Use the interactive builder to shape the request and see a review range.',
  },
  {
    label: 'Review',
    body: 'Prism checks fit, scope, assets, timing, and whether the team can do standout work.',
  },
  {
    label: 'Payment link',
    body: 'Accepted projects receive next steps and a payment link before production starts.',
  },
  {
    label: 'Build',
    body: 'We design, build, QA, and ship the agreed website with a focused handoff.',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'Is the website really $300?',
    answer:
      'The smallest accepted one-page website starts at $300 when copy and assets are ready. Extra pages, copywriting, SEO basics, CMS work, motion, and rush review increase the estimate.',
  },
  {
    question: 'Can I pay immediately?',
    answer:
      'No. Prism reviews each request first and sends a payment link only when the project is a fit for both sides.',
  },
  {
    question: 'What makes a project a fit?',
    answer:
      'Clear goals, enough source material, room for Prism creative direction, and a website idea the team is excited to build.',
  },
  {
    question: 'What if I need a bigger growth system?',
    answer:
      'The one-time website path is for focused builds. If the request needs deeper strategy, ads, SEO, tracking, or ongoing work, Prism will recommend the Growth Audit path instead.',
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

// Real, source-attributed results from lib/case-study-data.ts. Used as proof at
// the estimate decision point — do not edit these without updating the source.
const ESTIMATE_PROOF_POINTS = [
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
    label:
      'Google Search impressions year over year for Dr. Christopher Wong',
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
              <SectionKicker>One-time website build</SectionKicker>
              <h1 className="mx-auto mt-6 max-w-[12ch] text-balance text-[clamp(2.65rem,7.5vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[#f5f0e8]">
                A world-class website, without the agency maze.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-8 text-[#b8afa2] sm:text-[1.18rem]">
                Prism builds focused, beautiful websites for founders, owners,
                and operators. Tiny accepted launches start at $300. Every
                request is reviewed before any payment link is sent.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CoreActionLink
                  href="#estimate"
                  variant="heroPrimary"
                  label="start website estimate"
                  location="websites hero"
                >
                  Build my estimate
                </CoreActionLink>
                <CoreActionLink
                  href="#proof"
                  variant="heroSecondary"
                  label="see website proof"
                  location="websites hero"
                >
                  See recent builds
                </CoreActionLink>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {['Starts at $300', 'One-time build', 'Accepted selectively'].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-10 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#c9c1b6]"
                    >
                      {item}
                    </span>
                  ),
                )}
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

        <BaseOfferShowcase />

        <section
          id="estimate"
          className="scroll-mt-24 border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24"
        >
          <div
            className={cn(
              coreRouteContainerClassName,
              'grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start',
            )}
          >
            <div className="space-y-7">
              <CoreSectionHeading
                eyebrow="Estimator"
                title="Shape the request."
                description="Pick the scope, see the review range, and send the request to Prism. The estimate helps both sides move faster without turning the page into a checkout."
              />
              <div className="space-y-4 border-t border-white/10 pt-6">
                <p className="font-mono text-[0.82rem] leading-7 text-[#b8afa2]">
                  The review is selective by design. Prism only accepts one-time
                  builds when the project has enough clarity, enough taste
                  upside, and enough room for the team to make something worth
                  showing.
                </p>
                <p className="font-mono text-[0.82rem] leading-7 text-[#8f877b]">
                  No card is collected here. If accepted, you receive the next
                  step and payment link after review.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#d8bc79]">
                  Selective review &middot; no payment until we confirm fit
                </p>
                <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                  The same Prism website system that produced these measured
                  results:
                </p>
                <ul className="mt-5 grid gap-px overflow-hidden border border-white/10 bg-white/10">
                  {ESTIMATE_PROOF_POINTS.map((proof) => (
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
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#6f685d]">
                  Source: Google Search Console
                </p>
              </div>
            </div>

            <WebsiteBuildEstimatorForm />
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              'grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start',
            )}
          >
            <CoreSectionHeading
              eyebrow="Selective by default"
              title="We are looking for good raw material."
              description="Affordable does not mean automatic. The best small website builds have a clear reason to exist and enough trust between both sides to move quickly."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {FIT_SIGNALS.map((signal) => (
                <article
                  key={signal.title}
                  className="border border-white/10 bg-[#070707] p-5"
                >
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {signal.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {signal.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="proof"
          className="scroll-mt-24 border-b border-white/12 px-4 py-20 sm:px-6 sm:py-24"
        >
          <div className={coreRouteContainerClassName}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <CoreSectionHeading
                eyebrow="Recent proof"
                title="The bar is real."
                description="The one-time offer is smaller, but the taste standard comes from the same Prism website system."
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
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#6f685d]">
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
              title="Fast, but not careless."
              description="The flow stays intentionally small so the work can stay sharp."
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
              title="Useful details before you ask."
            />
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
      </main>
      <Footer />
      <ServiceSchema
        serviceId="one-time-website-build"
        name="One-time website build"
        description="Focused one-time website builds for founders, operators, and small teams, starting at $300 for tiny accepted launches."
        serviceType="Website design and development"
        areaServed="United States"
        offerDetails={{
          name: 'One-time website build',
          description:
            'A selective one-time website build reviewed by Prism before payment, starting at $300 for a tiny accepted launch.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: '300',
          priceCurrency: 'USD',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import Footer from '@/components/footer'
import MobileOrderBar from '@/components/websites/MobileOrderBar'
import Navbar from '@/components/navbar'
import BaseOfferShowcase from '@/components/websites/BaseOfferShowcase'
import WebsiteOrderForm from '@/components/forms/WebsiteOrderForm'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { hasPaymentLink, paymentLink } from '@/lib/payment-links'
import { websiteProjects } from '@/lib/website-projects'
import { cn } from '@/lib/utils'

const PAGE_TITLE = '$300 custom websites'
const PAGE_DESCRIPTION =
  'Get a custom website for a flat $300, delivered in seven days with unlimited revisions and full ownership.'
const CANONICAL_URL = 'https://www.design-prism.com/websites'

// Optional post-launch care plan. Opens checkout in a new tab once a real
// Stripe link is wired; until then it falls back to /contact (same tab).
const WEBSITE_CARE_LINK = paymentLink('websiteCare')
const CARE_LINK_IS_EXTERNAL = hasPaymentLink('websiteCare')
const CARE_LINK_TARGET = CARE_LINK_IS_EXTERNAL ? '_blank' : undefined
const CARE_LINK_REL = CARE_LINK_IS_EXTERNAL ? 'noopener noreferrer' : undefined

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/websites',
  ogImage: '/prism-opengraph.png',
})

const OWNERSHIP_POINTS = [
  {
    title: 'It is 100% yours',
    body: 'The moment it ships, the website and everything in it belongs to you. No lock-in, no hostage hosting.',
  },
  {
    title: 'Infinite iterations',
    body: 'We keep refining until you genuinely love it. There is no revision limit and no extra charge to get it right.',
  },
  {
    title: 'Live in about 7 days',
    body: 'The moment you pay, our team starts building to your exact spec. Your site goes live within a week.',
  },
  {
    title: 'Your call after launch',
    body: 'When you are happy, add a $100/month care plan, or host it yourself. Either way, the site stays yours.',
  },
] as const

const PROCESS_STEPS = [
  {
    label: 'Describe it',
    body: 'Tell us exactly what you want, with as much context as you like. Pages, style, inspiration, content — the more, the better.',
  },
  {
    label: 'Pay $300',
    body: 'A flat $300, one-time. Paying kicks off the build — no retainer, no surprise scope, no upsells.',
  },
  {
    label: 'Live in 7 days',
    body: 'Our team designs, builds, QA-checks, and launches your website within about a week.',
  },
  {
    label: 'Until you love it',
    body: 'We do infinite iterations until you are thrilled. The finished site is 100% yours.',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'Is it really a flat $300?',
    answer:
      'Yes. Every website is a flat $300, one-time. You tell us exactly what you want, pay once, and we build and launch it within about 7 days. There is no dynamic pricing and no add-on creep.',
  },
  {
    question: 'How does ordering work?',
    answer:
      'You describe the website you want and submit your request. Then you pay the $300 to kick off the build. The moment you pay, our team starts developing the site to your exact spec.',
  },
  {
    question: 'What if I do not like the first version?',
    answer:
      'You get infinite iterations. We keep refining until you genuinely love it — there is no revision limit and no extra charge to get it right.',
  },
  {
    question: 'Do I own the website?',
    answer:
      'Completely. Once it ships, the website and everything in it is 100% yours. There is no lock-in.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Your call. Add a $100/month care plan for hosting, updates, and ongoing edits handled by Prism, or host the site yourself. Either way, it stays yours.',
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
// Console). Used as proof beside the order form — keep in sync with the source.
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
              <SectionKicker>One-time website build</SectionKicker>
              <h1 className="mx-auto mt-6 max-w-[14ch] text-balance text-[clamp(2.65rem,7.5vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[#f5f0e8]">
                A website you&rsquo;ll love. $300.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.08rem] leading-8 text-[#b8afa2] sm:text-[1.18rem]">
                Tell us exactly what you want, pay a flat $300, and it&rsquo;s
                live within 7 days &mdash; with infinite iterations until you
                love it. The finished site is 100% yours.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CoreActionLink
                  href="#order"
                  variant="heroPrimary"
                  label="start your website"
                  location="websites hero"
                >
                  Start your website
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
                {[
                  '$300 flat',
                  'Live in 7 days',
                  'Infinite iterations',
                  'Yours to keep',
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

        <BaseOfferShowcase />

        <section
          id="start"
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
                eyebrow="Start"
                title="Tell us what to build."
                description="Describe the website you want with as much context as you like. Submit your request, pay the flat $300, and our team starts building to your exact spec."
              />
              <div className="space-y-4 border-t border-white/10 pt-6">
                <p className="font-sans text-[0.92rem] leading-7 text-[#b8afa2]">
                  One website, one price: a flat $300, one-time. No dynamic
                  pricing, no add-on creep. Live within 7 days, with infinite
                  iterations until you love it.
                </p>
                <p className="font-sans text-[0.92rem] leading-7 text-[#8f877b]">
                  The finished site is 100% yours. After launch, add $100/month
                  care or host it yourself &mdash; your call.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#d8bc79]">
                  $300 flat &middot; live in 7 days &middot; infinite iterations
                </p>
                <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                  The same Prism website system behind these measured results:
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

            <WebsiteOrderForm />
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
              eyebrow="What you get"
              title="One flat price. The whole thing, yours."
              description="No tiers, no estimates, no negotiation. You describe it, we build it, and we keep going until you love it."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {OWNERSHIP_POINTS.map((point) => (
                <article
                  key={point.title}
                  className="border border-white/10 bg-[#070707] p-5"
                >
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {point.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#b8afa2]">
                    {point.body}
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
                description="A flat $300 does not mean a flat result. Every build comes from the same Prism website system."
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
              title="Describe it, pay, and we build."
              description="Four steps, no friction. You stay in control the whole way through."
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
            <div className="grid gap-6 rounded-[2rem] border border-white/12 bg-black/35 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
              <CoreSectionHeading
                eyebrow="After launch"
                title="When you love it, it is your call."
                description="Add a $100/month care plan for hosting, updates, and ongoing edits handled by Prism, or host the site yourself. Either way, the website stays 100% yours. Cancel anytime."
              />
              <div className="lg:justify-self-end">
                <CoreActionLink
                  href={WEBSITE_CARE_LINK}
                  variant="heroSecondary"
                  label="add website care"
                  location="websites care"
                  target={CARE_LINK_TARGET}
                  rel={CARE_LINK_REL}
                >
                  Add Website Care &mdash; $100/month
                </CoreActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="FAQ"
              title="Useful details before you start."
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
      </main>
      <Footer />
      <ServiceSchema
        serviceId="one-time-website-build"
        name="One-time website build"
        description="Custom one-time website builds for founders, operators, and small teams: a flat $300, delivered within 7 days with infinite iterations until you love it."
        serviceType="Website design and development"
        areaServed="United States"
        offerDetails={{
          name: 'One-time website build',
          description:
            'A custom one-time website build for a flat $300, delivered within 7 days with infinite iterations until you love it. The finished site is 100% yours.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: '300',
          priceCurrency: 'USD',
          url: CANONICAL_URL,
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
      <MobileOrderBar />
    </div>
  )
}

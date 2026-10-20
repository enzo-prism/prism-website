import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
  type LucideIcon,
} from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { OfferIconTile } from '@/components/pricing/offer-kit'
import BrowserFrame from '@/components/prism/browser-frame'
import { FaqList } from '@/components/prism/faq-list'
import FinalCta from '@/components/prism/final-cta'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import {
  PRISM_SERVICES,
  toServiceCardTitle,
  type PrismServiceId,
} from '@/lib/services'
import { WAITLIST_CTA } from '@/lib/waitlist'

import { SERVICE_VISUALS } from './service-visuals'

const SERVICE_ICONS: Record<PrismServiceId, LucideIcon> = {
  website: LayoutTemplate,
  content: Camera,
  ads: Megaphone,
  aeo: MessageSquareQuote,
}

// Schema.org serviceType for each of the four services.
const SERVICE_SCHEMA_TYPES: Record<PrismServiceId, string> = {
  website: 'Website design',
  content: 'Content and social media marketing',
  ads: 'Paid advertising management',
  aeo: 'Answer engine optimization',
}

// What each core service includes, in plain terms.
const SERVICE_INCLUDES: Record<PrismServiceId, readonly string[]> = {
  website: [
    'Custom design for your brand',
    'Page copy and a mobile-first build',
    'Clear paths to call, book, or inquire',
  ],
  content: [
    'Planning and scripts',
    'Video, photo, and written production',
    'Publishing on your agreed channels',
  ],
  ads: [
    'Campaigns on the channels that fit',
    'Call and inquiry tracking',
    'Ongoing improvements from the data',
  ],
  aeo: [
    'AI visibility audit across the engines',
    'Crawler, schema, and answer-first fixes',
    'Monthly answer checks in plain English',
  ],
}

type CoreService = {
  /** Stable list key (Title Case). */
  name: string
  /** Card title shown on the page (lowercase, sentence style). */
  title: string
  summary: string
  outcomes: string[]
  caseStudies: { label: string; href: string }[]
  learnMoreLinks?: { label: string; href: string }[]
}

// How the supporting work fits around the four services. (The ServiceSchema
// entries below describe the four services themselves.)
const coreServices: CoreService[] = [
  {
    name: 'Website & Experience Design',
    title: 'website and experience design',
    summary:
      'Brand-led design, copy, and development for a site that makes choosing you easy, managed end to end by Prism.',
    learnMoreLinks: [{ label: 'Website design', href: '/website-design' }],
    outcomes: [
      'Custom design, UX, and development',
      'Editable components and content management',
      'Launch support, hosting, and ongoing care',
    ],
    caseStudies: [
      { label: 'Olympic Bootworks', href: '/case-studies/olympic-bootworks' },
      {
        label: 'Family First Smile Care',
        href: '/case-studies/family-first-smile-care',
      },
      { label: 'Infobell IT Solutions', href: '/case-studies/infobell-it' },
    ],
  },
  {
    name: 'Local Presence & Reviews',
    title: 'local presence and reviews',
    summary:
      'Keep your practice or storefront discoverable with accurate listings, review workflows, and local search reporting.',
    learnMoreLinks: [
      { label: 'Local SEO services', href: '/local-seo-services' },
      { label: 'Local SEO agency', href: '/local-seo-agency' },
      { label: 'Dentist SEO', href: '/dental-practice-seo-expert' },
      { label: 'SEO audit service', href: '/seo/audit' },
      { label: 'AEO for AI search', href: '/aeo' },
    ],
    outcomes: [
      'Google, Apple, Yelp, and niche directory management',
      'Review request flows and response playbooks',
      'Local landing pages, schema, and reporting',
    ],
    caseStudies: [
      {
        label: 'Wine Country Root Canal',
        href: '/case-studies/wine-country-root-canal',
      },
      { label: 'Town Centre Dental', href: '/case-studies/town-centre-dental' },
    ],
  },
  {
    name: 'Paid Media & Creative',
    title: 'paid media and creative',
    summary:
      'Strategy, creative, and execution for paid search and paid social campaigns.',
    learnMoreLinks: [
      { label: 'Ads', href: '/ads' },
      { label: 'TikTok ads for dentists', href: '/tiktok-ads-for-dentists' },
    ],
    outcomes: [
      'Campaign setup across Google, Meta, and TikTok',
      'Ad creative, landing pages, and reporting',
      'Ongoing optimization and offer testing',
    ],
    caseStudies: [
      {
        label: 'Dr. Christopher B. Wong',
        href: '/case-studies/dr-christopher-wong',
      },
      {
        label: 'Exquisite Dentistry',
        href: '/case-studies/exquisite-dentistry',
      },
    ],
  },
  {
    name: 'Content & Communications',
    title: 'content and communications',
    summary:
      'Content systems for video, blogs, email, and in-practice storytelling that owners can keep up with.',
    learnMoreLinks: [
      { label: 'Content', href: '/content' },
      {
        label: 'Custom email for dental practices',
        href: '/custom-email-for-dental-practices',
      },
    ],
    outcomes: [
      'Editorial calendars and brand voice guidelines',
      'Short-form video, blog, and email production',
      'Asset library and reusable templates',
    ],
    caseStudies: [
      {
        label: 'Grace Dental Santa Rosa',
        href: '/case-studies/grace-dental-santa-rosa',
      },
      { label: 'Rebellious Aging', href: '/case-studies/rebellious-aging' },
    ],
  },
  {
    name: 'Analytics, Automation & Support',
    title: 'analytics, automation, and support',
    summary:
      'One clear view of GA4, ads, and in-office tools, with automations that save your team time.',
    learnMoreLinks: [{ label: 'App development', href: '/apps' }],
    outcomes: [
      'Dashboards for leads, calls, and bookings',
      'Automations for follow-up, reminders, and hand-offs',
      'Planning and priorities with the Prism team',
    ],
    caseStudies: [
      {
        label: 'Practice Transitions Institute',
        href: '/case-studies/practice-transitions-institute',
      },
      {
        label: 'Roseville Dental Academy',
        href: '/case-studies/roseville-dental-academy',
      },
    ],
  },
]

const workflow = [
  {
    title: 'join the waitlist',
    description:
      'Share your goals and links. For each monthly intake we review applications and reach out to the teams we can take on.',
  },
  {
    title: 'map the system',
    description:
      'We review your site, listings, ads, and analytics so we know where to focus first.',
  },
  {
    title: 'build the core',
    description:
      'Your website, tracking, and local presence come first, giving every other channel a reliable foundation.',
  },
  {
    title: 'improve and report',
    description:
      'Content, ads, AEO, and automation join as the foundation holds. We review the data with you and plan the next improvement.',
  },
] as const

// Current clients only (lib/former-clients.ts lists the ones that must never
// appear here). Every slug has a real homepage capture in public/case-studies.
const WORK_RAIL = [
  { slug: 'olympic-bootworks', host: 'olympicbootworks.com', name: 'Olympic Bootworks' },
  { slug: 'dr-christopher-wong', host: 'chriswongdds.com', name: 'Dr. Christopher B. Wong' },
  { slug: 'belize-kids-foundation', host: 'belizekids.org', name: 'Belize Kids' },
  { slug: 'exquisite-dentistry', host: 'exquisitedentistryla.com', name: 'Exquisite Dentistry' },
  { slug: 'rebellious-aging', host: 'rebelwithsuz.com', name: 'Rebellious Aging' },
  { slug: 'canary-cove', host: 'canarycove.com', name: 'Canary Cove' },
  { slug: 'town-centre-dental', host: 'towncentredental.net', name: 'Town Centre Dental' },
  { slug: 'we-are-saplings', host: 'wearesaplings.com', name: 'We Are Saplings' },
] as const

const proofLinks = [
  { label: 'Olympic Bootworks', href: '/case-studies/olympic-bootworks' },
  {
    label: 'Dr. Christopher B. Wong',
    href: '/case-studies/dr-christopher-wong',
  },
  {
    label: 'Roseville Dental Academy',
    href: '/case-studies/roseville-dental-academy',
  },
] as const

const faqItems = [
  {
    question: 'Do I need every service to work with Prism?',
    answer:
      'No. Most clients start with one foundation, usually website design or local presence, and add content or ads once the core is stable.',
  },
  {
    question: 'How do you decide what to prioritize first?',
    answer:
      'When we reach out from the waitlist, we review your website, listings, ads, and analytics, then agree on where to start based on your market and goals.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'We focus on local and service-based businesses: dental and medical practices, local retail, professional services, nonprofits, and community brands.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We track the calls, forms, and bookings your tools can report, then explain in plain English what is working and why.',
  },
  {
    question: 'Can you collaborate with our internal team?',
    answer:
      'Yes. We work alongside existing marketing, operations, or front-office teams and share the data and plans so execution stays aligned.',
  },
  {
    question: 'What does an engagement look like month to month?',
    answer:
      'It depends on the service. Website Design is one project with optional care after launch. Content and Ads are ongoing. We agree on the rhythm, check-ins, and deliverables before work begins.',
  },
  {
    question: 'How do I start?',
    answer:
      'Join the waitlist. Prism is fully booked, so new work starts in monthly intakes, and waitlist members get first pick.',
  },
] as const

const rise = (delay: number) =>
  ({ '--rise-delay': `${delay}ms` }) as CSSProperties

const inlineLinkClassName =
  'group/link inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Services',
  description:
    'Website design, content, ads, and AEO: the four Prism services that help your business get found, trusted, and chosen, on Google and in AI answers.',
  path: '/services',
  ogImage: '/prism-opengraph.png',
})

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section
          aria-labelledby="services-hero-heading"
          className="relative isolate overflow-hidden pb-20 pt-8 sm:pb-28 sm:pt-12"
        >
          <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 -z-10 h-[44rem] opacity-60" />
          <div
            aria-hidden="true"
            className="absolute left-[-12rem] top-[-8rem] -z-10 h-[38rem] w-[min(56rem,140vw)] bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/18%),transparent),radial-gradient(40%_45%_at_70%_70%,oklch(0.76_0.17_145/8%),transparent)] blur-2xl"
          />
          <div aria-hidden="true" className="bg-noise mask-fade-b absolute inset-0 -z-10 opacity-[0.05]" />

          <div className="prism-container grid items-end gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="flex min-w-0 flex-col items-start">
              <div className="prism-rise" style={rise(0)}>
                <WaitlistStatus />
              </div>
              <h1
                id="services-hero-heading"
                className="text-display text-gradient prism-rise mt-6 max-w-[11ch] pb-2"
                style={rise(80)}
              >
                website design. content. ads. AEO.
              </h1>
              <p
                className="text-lead prism-rise mt-5 max-w-[50ch] text-pretty text-muted-foreground"
                style={rise(160)}
              >
                Prism helps with four things. Website design makes choosing you
                easy. Content keeps you found and trusted. Ads bring the right
                customers. AEO makes you the answer when they ask AI.
                Everything else supports those four.
              </p>
              <div
                className="prism-rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
                style={rise(240)}
              >
                <WaitlistButton location="services hero" size="xl" className="w-full sm:w-auto" />
                <Button asChild variant="outline" size="xl" className="group/compare w-full sm:w-auto">
                  <TrackedLink href="/pricing" label="compare offers" location="services hero">
                    Compare offers
                    <ArrowRight
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/compare:translate-x-0.5"
                    />
                  </TrackedLink>
                </Button>
              </div>
            </div>

            <nav
              aria-label="Prism services"
              className="prism-rise min-w-0"
              style={rise(200)}
            >
              <ol className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card/80 shadow-[0_40px_120px_-40px_oklch(0_0_0/90%),0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-sm">
                {PRISM_SERVICES.map((service, index) => {
                  const Icon = SERVICE_ICONS[service.id]
                  return (
                    <li key={service.id} className="border-b border-white/[0.06] last:border-b-0">
                      <TrackedLink
                        href={service.href}
                        label={service.homeCta.toLowerCase()}
                        location="services hero index"
                        className="group/index flex items-center gap-4 px-5 py-5 transition-colors hover:bg-white/[0.03] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:px-7 sm:py-6"
                      >
                        <span className="font-mono text-xs text-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <OfferIconTile>
                          <Icon aria-hidden="true" className="size-[18px]" />
                        </OfferIconTile>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-[1.15rem] font-semibold tracking-[-0.025em] text-foreground">
                            {service.name}
                          </span>
                          <span className="text-pretty text-sm text-muted-foreground">
                            {service.navDescription}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 shrink-0 text-subtle transition-[transform,color] duration-200 group-hover/index:-translate-y-0.5 group-hover/index:translate-x-0.5 group-hover/index:text-foreground"
                        />
                      </TrackedLink>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>
        </section>

        {/* The four services */}
        <Section aria-labelledby="services-core-heading" className="pt-0 sm:pt-0">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeader
                id="services-core-heading"
                eyebrow="Four services"
                title="one team for the whole path to a customer."
                titleClassName="max-w-[17ch]"
              />
            </Reveal>
            <TrackedLink
              href="/pricing"
              label="compare all four on pricing"
              location="services core"
              className={`${inlineLinkClassName} lg:mb-3`}
            >
              Compare all four on pricing
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </TrackedLink>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {PRISM_SERVICES.map((service, index) => {
              const Icon = SERVICE_ICONS[service.id]
              const Visual = SERVICE_VISUALS[service.id]
              return (
                <li key={service.id} className="min-w-0">
                  <Reveal delay={index * 90} className="h-full">
                    <SpotlightCard className="group/service flex h-full flex-col">
                      <div aria-hidden="true" className="border-b border-white/[0.06]">
                        <Visual />
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <div className="flex items-center gap-3">
                          <OfferIconTile className="size-9 rounded-lg">
                            <Icon aria-hidden="true" className="size-4" />
                          </OfferIconTile>
                          <p className="text-eyebrow text-subtle">{service.name}</p>
                        </div>
                        <h3 className="text-heading mt-5 text-foreground">
                          {toServiceCardTitle(service.homeTitle)}
                        </h3>
                        <p className="mt-3 text-pretty text-[15px] leading-7 text-muted-foreground">
                          {service.description}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {SERVICE_INCLUDES[service.id].map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                              <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-foreground" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
                          <WaitlistButton
                            location={`services core · ${service.name}`}
                            href={service.primaryCta.href}
                            label={service.primaryCta.label}
                            variant="outline"
                            size="default"
                          />
                          <TrackedLink
                            href={service.href}
                            label={service.homeCta.toLowerCase()}
                            location={`services core · ${service.name}`}
                            className={inlineLinkClassName}
                          >
                            {service.homeCta}
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                            />
                          </TrackedLink>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </Section>

        {/* How the pieces fit */}
        <Section aria-labelledby="services-capabilities-heading" className="pt-0 sm:pt-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="services-capabilities-heading"
                eyebrow="What we run for you"
                title="everything else supports those four."
                description="Every engagement starts with the essentials, then adds channels as the foundation holds."
                titleClassName="max-w-[15ch]"
              />
            </Reveal>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {coreServices.map((service, index) => (
                <li key={service.name}>
                  <Reveal delay={index * 60} className="grid gap-5 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-8">
                    <div>
                      <h3 className="text-[1.2rem] font-semibold tracking-[-0.025em] text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-pretty text-[15px] leading-7 text-muted-foreground">
                        {service.summary}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {service.outcomes.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                      {service.learnMoreLinks?.length ? (
                        <div>
                          <p className="text-eyebrow text-subtle">Learn more</p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {service.learnMoreLinks.map((link) => (
                              <li key={link.href}>
                                <TrackedLink
                                  href={link.href}
                                  label={link.label.toLowerCase()}
                                  location="services capabilities"
                                  className="inline-flex min-h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[13px] text-foreground/90 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                >
                                  {link.label}
                                </TrackedLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <div>
                        <p className="text-eyebrow text-subtle">Case studies</p>
                        <ul className="mt-2 flex flex-col">
                          {service.caseStudies.map((caseStudy) => (
                            <li key={caseStudy.href}>
                              <TrackedLink
                                href={caseStudy.href}
                                label={caseStudy.label.toLowerCase()}
                                location="services capabilities case study"
                                className="group/case inline-flex min-h-9 items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                              >
                                {caseStudy.label}
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="size-3.5 transition-transform duration-200 group-hover/case:-translate-y-0.5 group-hover/case:translate-x-0.5"
                                />
                              </TrackedLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* How it works */}
        <Section aria-labelledby="services-process-heading" className="pt-0 sm:pt-0">
          <div className="spectrum-rule relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div aria-hidden="true" className="bg-dots mask-fade-b absolute inset-0 -z-10 opacity-[0.16]" />
            <SectionHeader
              id="services-process-heading"
              eyebrow="How it works"
              title="foundation first, then growth."
              description="We start with the foundation, then bring in more services as your goals expand."
              titleClassName="max-w-[16ch]"
            />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map((step, index) => (
                <li key={step.title} className="min-w-0 bg-card">
                  <Reveal delay={index * 80} className="flex h-full flex-col p-6">
                    <span className="font-mono text-xs text-subtle">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-8 text-[1.2rem] font-semibold tracking-[-0.025em] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-pretty text-[15px] leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Proof rail */}
        <section aria-labelledby="services-proof-heading" className="pb-20 sm:pb-24">
          <div className="prism-container flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeader
                id="services-proof-heading"
                eyebrow="Proof"
                title="proof in the wild."
                description="Recent launches showing how Prism connects design, engineering, and growth for local brands."
                titleClassName="max-w-[12ch]"
              />
            </Reveal>
            <TrackedLink
              href="/case-studies"
              label="see all case studies"
              location="services proof"
              className={`${inlineLinkClassName} lg:mb-3`}
            >
              See all case studies
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </TrackedLink>
          </div>
          <Marquee
            duration={60}
            gap="1.25rem"
            className="mt-12 py-2"
            label="Client websites built by Prism"
          >
            {WORK_RAIL.map((site) => (
              <figure key={site.slug} className="w-[19rem] shrink-0 sm:w-[26rem]">
                <BrowserFrame
                  src={`/case-studies/${site.slug}-home-desktop.jpg`}
                  alt={`${site.name} website home page built by Prism`}
                  url={site.host}
                  sizes="(min-width: 640px) 26rem, 19rem"
                />
                <figcaption className="mt-3 text-sm text-muted-foreground">{site.name}</figcaption>
              </figure>
            ))}
          </Marquee>
          <div className="prism-container mt-8">
            <ul className="flex flex-wrap gap-2">
              {proofLinks.map((link) => (
                <li key={link.href}>
                  <TrackedLink
                    href={link.href}
                    label={link.label.toLowerCase()}
                    location="services proof"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground/90 transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 text-subtle" />
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <Section aria-labelledby="services-faq-heading" className="pt-0 sm:pt-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="services-faq-heading"
                eyebrow="FAQ"
                title="before you pick a service."
                description="Answers about scope, timing, and how to start."
                titleClassName="max-w-[13ch]"
              />
            </div>
            <FaqList items={faqItems} name="services-faq" defaultOpen={0} />
          </div>
        </Section>

        <FinalCta
          location="services final cta"
          title="one team for all of it."
          href={WAITLIST_CTA.href}
          headingId="services-final-cta-heading"
          secondary={{ label: 'See client wins', href: '/case-studies' }}
        />
      </main>
      <Footer />
      {PRISM_SERVICES.map((service) => (
        <ServiceSchema
          key={`service-schema-${service.id}`}
          serviceId={`services-${service.id}`}
          name={service.name}
          description={service.description}
          serviceType={SERVICE_SCHEMA_TYPES[service.id]}
          areaServed="United States"
        />
      ))}
      <FAQSchema questions={faqItems.map((item) => ({ ...item }))} />
    </div>
  )
}

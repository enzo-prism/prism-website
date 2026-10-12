import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

import BrandLogo from '@/components/brand-logo'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import ScrollToTop from '@/components/scroll-to-top'
import { WebPageSchema } from '@/components/schema-markup'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { WAITLIST_CTA } from '@/lib/waitlist'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const GOOGLE_WORKSPACE_LINK =
  'https://c.gle/APy2Ad08G18tc2DVKTvFnIX7ZsIi8C_16CofJocN9aFYsQDXBJRKDAH3FRQb6BfrqNgPv1Buz5DypvRjWF8E2rqpEvohTLTUWmLF6UOh4oCinNkIBx-wbk3wUX2jqxqDYiPNn4cWz4pfBlfNZT7je1YO'
const GOOGLE_MARKETING_PLANS_HREF = WAITLIST_CTA.href
const BLOG_HREF = '/blog'
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@the_design_prism'
const HIPAA_PATIENT_FORMS_GUIDE = '/google/dental-patient-forms'

const servicesHighlights = [
  {
    title: 'Google Workspace setup and optimization',
    description:
      'We help you set up professional email, shared drives, forms, and workflows, all under your own business domain. Get your team collaborating smarter, not harder.',
    ctaLabel: 'Set up Workspace (with discount)',
    href: GOOGLE_WORKSPACE_LINK,
    external: true,
    brandLogos: ['google', 'gmail', 'googleDrive'] as const,
  },
  {
    title: 'Google marketing integration',
    description:
      'We connect and optimize your Google Business Profile, Google Ads, Analytics, and YouTube, so every ad click and search result is measured and working together.',
    ctaLabel: WAITLIST_CTA.label,
    href: GOOGLE_MARKETING_PLANS_HREF,
    external: false,
    brandLogos: ['google', 'googleAnalytics', 'youtube'] as const,
  },
  {
    title: 'Insights and automation',
    description:
      'From automated reporting to conversion tracking, we use Google tools to make your marketing smarter and your operations more efficient.',
    ctaLabel: undefined,
    href: undefined,
    external: false,
    brandLogos: ['googleAnalytics'] as const,
  },
]

const partnershipPoints = [
  'Google Workspace setup and migration support',
  'Deep expertise in Ads, Analytics, and Business Profile optimization',
  'Hands-on setup, support, and automation',
  'Hands-on work with local businesses across industries',
]

const learningLinks = [
  {
    title: 'Our blog',
    description:
      'Guides on Google Ads, Business Profiles, Workspace, and Analytics.',
    href: BLOG_HREF,
    external: false,
  },
  {
    title: 'YouTube channel',
    description: 'Walkthroughs and tutorials for building on Google tools.',
    href: YOUTUBE_CHANNEL_URL,
    external: true,
  },
]

const PAGE_TITLE = 'Google Workspace, Ads & Analytics services'
const PAGE_DESCRIPTION =
  'Prism helps small businesses use Google Workspace, Google Ads, Analytics, and Business Profile as one connected growth system.'
const CANONICAL_URL = 'https://www.design-prism.com/google'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/google',
  ogImage: '/prism-opengraph.png',
})

const HERO_BRANDS = [
  'google',
  'gmail',
  'googleDrive',
  'googleAnalytics',
  'googleMaps',
  'youtube',
] as const

const linkClassName =
  'inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

export default function GooglePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Google systems by Prism"
          title="grow your local business with a connected Google system."
          description="We help small businesses and local practices grow by setting up, integrating, and optimizing Google products, from Workspace to Ads, all under one roof."
          location="google hero"
          secondary={{ label: 'See what we do', href: '#google-services' }}
          glow="warm"
        >
          <ul
            aria-label="Google products we set up"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {HERO_BRANDS.map((brand) => (
              <li
                key={brand}
                className="grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] sm:size-14"
              >
                <BrandLogo brand={brand} className="size-6" />
              </li>
            ))}
          </ul>
        </LandingHero>

        <Section aria-labelledby="google-why-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="google-why-title"
                eyebrow="Why Google matters"
                title="the foundation of modern business runs on Google."
              />
            </Reveal>
            <Reveal
              delay={80}
              className="space-y-5 text-pretty text-lg leading-8 text-muted-foreground lg:pt-12"
            >
              <p>
                Every day, millions of businesses rely on Google products to
                operate, communicate, and grow. From Gmail and Google Drive to
                Google Ads, Analytics, and Business Profiles, Google provides
                the infrastructure for small businesses to look professional,
                stay organized, and attract customers.
              </p>
              <p>
                At Prism, we help you make the most of these tools, integrating
                everything into one connected system built for performance,
                visibility, and growth.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section id="google-services" aria-labelledby="google-services-title">
          <Reveal>
            <SectionHeader
              id="google-services-title"
              eyebrow="What we do"
              title="we don't just use Google. we optimize it for your business."
              description="Our team helps you implement and manage the Google ecosystem in a way that actually drives results. Here's how we do it."
              titleClassName="max-w-[20ch]"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {servicesHighlights.map((service, index) => {
              const isExternal = service.href?.startsWith('http') ?? false
              return (
                <Reveal
                  key={service.title}
                  delay={index * 80}
                  className="h-full"
                >
                  <SpotlightCard
                    beam={index === 1}
                    className="flex h-full flex-col p-6 sm:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {service.brandLogos.map((brand) => (
                        <span
                          key={brand}
                          className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]"
                        >
                          <BrandLogo
                            brand={brand}
                            decorative
                            className="size-[18px]"
                          />
                        </span>
                      ))}
                    </div>
                    <h3 className="text-heading mt-6 text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                      {service.description}
                    </p>
                    {service.href && service.ctaLabel ? (
                      <div className="mt-auto pt-6">
                        {isExternal ? (
                          <a
                            href={service.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group/link ${linkClassName}`}
                          >
                            {service.ctaLabel}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            />
                          </a>
                        ) : (
                          <TrackedLink
                            href={service.href}
                            label={service.ctaLabel}
                            location="google services card"
                            className={`group/link ${linkClassName}`}
                          >
                            {service.ctaLabel}
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
                            />
                          </TrackedLink>
                        )}
                      </div>
                    ) : null}
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section aria-labelledby="google-partner-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="google-partner-title"
                eyebrow="Why partner with Prism"
                title="Google expertise that helps your systems work together."
              />
            </Reveal>
            <Reveal
              delay={80}
              className="space-y-6 text-pretty text-lg leading-8 text-muted-foreground lg:pt-12"
            >
              <p>
                We&apos;re not just another marketing agency. We&apos;re
                builders, operators, and problem solvers who live inside the
                Google ecosystem every day. Our clients use Google products to
                manage their business, communicate with customers, and drive
                revenue, and we help them do it better.
              </p>
              <p>
                When you partner with Prism, you&apos;re not just getting setup
                help. You&apos;re getting a team that knows how to make Google
                work for your business.
              </p>
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08] text-base">
                {partnershipPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 py-4 text-foreground/90"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-foreground"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="google-hipaa-title">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-12">
              <div
                aria-hidden="true"
                className="bg-grid absolute inset-0 -z-0 opacity-40"
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
                <SectionHeader
                  id="google-hipaa-title"
                  eyebrow="HIPAA patient intake"
                  title="configure Google Workspace for safer dental intake."
                  titleClassName="text-[clamp(1.9rem,1.4rem+2vw,3rem)] font-semibold leading-[1] tracking-[-0.045em]"
                />
                <div className="space-y-5 text-pretty text-base leading-7 text-muted-foreground">
                  <p>
                    Dental practices ask us how to collect new patient histories
                    without leaving Workspace. Our implementation-grade guide
                    walks through BAA execution, shared-drive controls,
                    edition-dependent safeguards, and checklist tooling for a
                    HIPAA-aware setup.
                  </p>
                  <p>
                    Eligible new customers can use our referral discount, then
                    confirm that their edition includes each required control.
                  </p>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button asChild size="lg" className="group/cta">
                      <Link href={HIPAA_PATIENT_FORMS_GUIDE}>
                        See the HIPAA setup guide
                        <ArrowRight
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                        />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <a
                        href={GOOGLE_WORKSPACE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Claim the Workspace discount
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section aria-labelledby="google-learn-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="google-learn-title"
                eyebrow="Learn and grow with Google"
                title="free guides to master Google tools."
                description="We regularly publish free guides and videos showing how to use Google tools to grow your business, from running effective ad campaigns to improving your search ranking and online presence."
              />
            </Reveal>
            <ul className="grid gap-4 self-start sm:grid-cols-2 lg:pt-12">
              {learningLinks.map((link, index) => (
                <Reveal as="li" key={link.title} delay={index * 80}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="group/learn block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <Card className="flex h-full flex-col gap-2 p-6 transition-[border-color,transform] duration-300 group-hover/learn:-translate-y-0.5 group-hover/learn:border-white/20">
                      <span className="flex items-center justify-between gap-3 text-lg font-semibold tracking-[-0.02em] text-foreground">
                        {link.title}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 text-subtle transition-[color,transform] duration-200 group-hover/learn:-translate-y-0.5 group-hover/learn:translate-x-0.5 group-hover/learn:text-foreground"
                        />
                      </span>
                      <span className="text-[15px] leading-7 text-muted-foreground">
                        {link.description}
                      </span>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>

        <FinalCta
          location="google final cta"
          title="let's build your business on Google."
          description="Whether you're setting up your first business email or scaling a multi-location brand, we'll help you get the most out of Google's tools and ecosystem."
        />
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}

import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  BarChart3,
  ChartNoAxesColumnIncreasing,
  CircleAlert,
  CircleCheck,
  CircleX,
  Layers,
  PhoneCall,
  Search,
  Settings2,
  ShieldCheck,
  Stethoscope,
  Target,
} from 'lucide-react'

import Footer from '@/components/footer'
import {
  ArrowLink,
  Callout,
  CheckList,
  TextLink,
} from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { BrowserFrame } from '@/components/prism/browser-frame'
import { DisclosurePanel } from '@/components/prism/disclosure-panel'
import DentalAdsWorksheet from '@/components/services/DentalAdsWorksheet'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WebPageSchema } from '@/components/schema-markup'
import ScrollToTop from '@/components/scroll-to-top'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA, WAITLIST_FOCUS_HREFS } from '@/lib/waitlist'

const GET_FREE_AUDIT_HREF = WAITLIST_FOCUS_HREFS.ads
const STRUCTURE_SECTION_ID = 'structure'
const POLICY_SECTION_ID = 'policy'
const LSA_SECTION_ID = 'lsa'
const REPORTS_SECTION_ID = 'reports'

const servicesHighlights = [
  {
    title: 'search campaigns that convert',
    description:
      'we build and manage search campaigns for eligible dental services, from preventive care to cosmetic and implant consultations. ads can appear when nearby patients search for those services.',
    ctaLabel: FREE_AUDIT_CTA_TEXT,
    href: GET_FREE_AUDIT_HREF,
    icon: Target,
    external: false,
  },
  {
    title: 'compliant campaign architecture',
    description:
      'we review campaign structure, landing pages, audiences, and measurement against Google’s current health advertising policies. eligibility and enforcement remain Google’s decision.',
    ctaLabel: 'Learn about policy compliance',
    href: `#${POLICY_SECTION_ID}`,
    icon: ShieldCheck,
    external: false,
  },
  {
    title: 'smart tracking & reporting',
    description:
      'we configure privacy-aware measurement for calls, leads from website forms, and appointment requests where supported, then report attribution limits alongside performance.',
    ctaLabel: 'See sample reports',
    href: `#${REPORTS_SECTION_ID}`,
    icon: BarChart3,
    external: false,
  },
]

const structurePillars = [
  {
    icon: Stethoscope,
    title: 'split by service type',
    description:
      'campaigns are separated by service and landing-page intent. targeting eligibility is reviewed against the page content, account, market, and Google’s current sensitive-interest rules.',
  },
  {
    icon: Search,
    title: 'keyword-driven search',
    description:
      'we target high-intent searches like “dentist near me,” “invisalign dentist san jose,” and “dental implants consultation.”',
  },
  {
    icon: Settings2,
    title: 'no guesswork targeting',
    description:
      'we avoid advertiser-curated audiences for sensitive health campaigns and lean on search intent and appropriate location targeting. Google determines final eligibility.',
  },
  {
    icon: PhoneCall,
    title: 'conversion optimization',
    description:
      'landing pages built for action with clear calls to call, text, or book online, plus matched tracking for every lead source.',
  },
  {
    icon: BarChart3,
    title: 'continuous optimization',
    description:
      'weekly search-term audits, negative keyword updates, and monthly performance reports to keep your spend efficient.',
  },
]

const allowedItems = [
  'Search Ads for all dental services',
  'City or regional location targeting',
  'Responsive search ads with call assets',
  'Conversion tracking (non-PHI)',
  'Eligible predefined Google audiences, after policy review',
]

const restrictedItems = [
  'Remarketing for implants or surgery pages',
  'Customer Match / email uploads',
  'Customer Match, your data, audience expansion, or lookalikes for sensitive services',
  'Ad copy that references medical conditions (“missing teeth,” “can’t chew”)',
]

const caseStudies = [
  {
    name: 'Dr. Christopher Wong (Palo Alto)',
    slug: 'dr-christopher-wong',
    outcomes: [
      'Search and conversion tracking connected to the practice website',
      'Campaign structure aligned with high-intent dental services',
    ],
  },
  {
    name: 'Wine Country Root Canal (Santa Rosa)',
    slug: 'wine-country-root-canal',
    outcomes: [
      'High-intent landing pages built around endodontic services',
      'Measurement tied to calls and appointment requests',
    ],
  },
  {
    name: 'Grace Dental (Santa Rosa)',
    slug: 'grace-dental-santa-rosa',
    outcomes: ['Local dental campaign structure and conversion measurement'],
  },
]

const pricingPlans = [
  {
    plan: 'Starter',
    idealFor: 'Small practices (1 location)',
    fee: 'Scoped',
    includes: ['1 campaign setup', 'Call tracking', 'Reporting'],
  },
  {
    plan: 'Growth',
    idealFor: 'Multi-service practices',
    fee: 'Scoped',
    includes: ['3+ campaigns', 'Keyword tracking', 'Monthly optimization'],
  },
  {
    plan: 'Performance+',
    idealFor: 'Practices scaling paid ads',
    fee: 'Scoped',
    includes: ['Full management', 'LSAs', 'Multi-location dashboards'],
  },
]

const partnershipPoints = [
  'Current Google Ads and health-policy reviews',
  'Conversion measurement with documented limits',
  'Dental-focused campaign and landing-page experience',
  'Search-term, negative-keyword, and budget reviews',
]

const PAGE_TITLE = 'Google Ads for dentists'
const PAGE_DESCRIPTION =
  'Google Ads for implants, Invisalign, and general dentistry with focused landing pages and clear tracking.'
const CANONICAL_URL = 'https://www.design-prism.com/google/dental-ads'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/google/dental-ads',
  ogImage: '/prism-opengraph.png',
})

export default function GoogleDentalAdsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Prism × Google Ads for dentists"
          title="prism + google ads: growing dental practices with precision."
          description="Policy-aware Google Ads, dedicated landing pages, and call tracking for dental practices."
          location="google dental ads hero"
          ctaHref={GET_FREE_AUDIT_HREF}
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: 'See how we run dental ads', href: `#${STRUCTURE_SECTION_ID}` }}
          glow="blue"
          titleClassName="max-w-[18ch]"
        >
          <p className="mx-auto text-center text-sm text-muted-foreground">
            Also:{' '}
            <TextLink href="/tiktok-ads-for-dentists">TikTok ads for dentists</TextLink>
            {' · '}
            <TextLink href="/google/dental-patient-forms">HIPAA-aware patient forms</TextLink>
            {' · '}
            <TextLink href="/dental-practice-seo-expert">dental SEO</TextLink>
            {' · '}
            <TextLink href="/facebook-ads-for-dentists">Facebook ads</TextLink>.
          </p>
        </LandingHero>

        <DentalAdsWorksheet />

        <Section aria-labelledby="gda-cases-title">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              id="gda-cases-title"
              eyebrow="Case studies"
              title="our work with dental clients across California."
              titleClassName="max-w-[16ch]"
            />
            <ArrowLink href="/case-studies" className="shrink-0">
              See full case studies
            </ArrowLink>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Reveal key={study.name} delay={index * 80}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group/case flex h-full flex-col rounded-2xl border border-white/[0.08] bg-card p-3 transition-colors hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <BrowserFrame
                    src={`/case-studies/${study.slug}-home-desktop.jpg`}
                    alt={`${study.name} website built by Prism`}
                    sizes="(min-width: 768px) 360px, 92vw"
                  />
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{study.name}</h3>
                    <ul className="mt-3 space-y-2 text-[14px] leading-6 text-muted-foreground">
                      {study.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2.5">
                          <ChartNoAxesColumnIncreasing className="mt-1 size-3.5 shrink-0 text-subtle" aria-hidden />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section aria-labelledby="gda-landscape-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-10 sm:px-10 sm:py-12">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
              <div className="flex flex-col gap-5">
                <SectionHeader
                  id="gda-landscape-title"
                  eyebrow="The current landscape"
                  title="what’s changed, and how to stay ahead."
                  description="Google’s Health in Personalized Advertising policy restricts condition-based targeting."
                />
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
                    <span>Advertise implants, Invisalign, and whitening via search intent.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CircleAlert className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
                    <span>No health-condition targeting or sensitive remarketing lists.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CircleX className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
                    <span>Google makes all final eligibility and enforcement decisions.</span>
                  </li>
                </ul>
              </div>
              <figure className="overflow-hidden rounded-2xl border border-white/10 bg-background/60 p-3">
                <Image
                  src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761753033/Google_Ads_notification_qzgj35.png"
                  alt="Google Ads health policy notification"
                  width={1200}
                  height={716}
                  className="h-auto w-full rounded-xl object-contain"
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 70vw, 100vw"
                />
              </figure>
            </div>
          </div>
        </Section>

        <Section id={POLICY_SECTION_ID} aria-labelledby="gda-policy-title" className="scroll-mt-20 py-10 sm:py-12">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <Callout tone="good" title="Allowed" icon={<CircleCheck className="size-4" aria-hidden />} className="h-full">
                <CheckList className="mt-1" items={allowedItems} />
              </Callout>
            </Reveal>
            <Reveal delay={100}>
              <Callout
                tone="warn"
                title="Restricted / Not Allowed"
                icon={<CircleX className="size-4" aria-hidden />}
                className="h-full"
              >
                <CheckList marker="dot" className="mt-1" items={restrictedItems} />
              </Callout>
            </Reveal>
          </div>
        </Section>

        <Section id={STRUCTURE_SECTION_ID} aria-labelledby="gda-structure-title" className="scroll-mt-20 py-10 sm:py-12">
          <DisclosurePanel
            id="gda-deep-dive"
            eyebrow="Campaign architecture & scopes"
            title="structure, Local Services Ads (LSA), and example scopes."
            summary="5-pillar campaign setup, Google Verified badge notes, and management tiers."
            openLabel="Read details"
            closeLabel="Hide details"
          >
            <div className="space-y-12">
              <div className="grid gap-4 md:grid-cols-3">
                {servicesHighlights.map((service) => {
                  const Icon = service.icon
                  return (
                    <Card key={service.title} className="flex h-full flex-col p-5">
                      <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon className="size-4 text-foreground" aria-hidden />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-foreground">{service.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{service.description}</p>
                    </Card>
                  )
                })}
              </div>

              <div className="border-t border-white/[0.08] pt-10">
                <h3 id="gda-structure-title" className="text-heading text-foreground">
                  how we structure dental ads.
                </h3>
                <ol className="mt-6 divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60">
                  {structurePillars.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.title} className="flex items-start gap-4 p-5">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Icon className="size-4 text-foreground" aria-hidden />
                        </span>
                        <div>
                          <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <div id={LSA_SECTION_ID} className="border-t border-white/[0.08] pt-10">
                <Eyebrow>Local Services Ads (LSA)</Eyebrow>
                <h3 id="gda-lsa-title" className="text-heading mt-3 text-foreground">
                  show up first with google’s “verified” badge.
                </h3>
                <p className="mt-3 max-w-[64ch] text-sm leading-6 text-muted-foreground">
                  Google Verified is now the single badge for eligible Local Services Ads (replacing the retired Google Guarantee program). We support LSA setup, verification, and lead tracking; Google makes final eligibility decisions.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link
                    href="https://support.google.com/localservices/answer/16498018?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Google&apos;s badge guide
                    <ArrowUpRight aria-hidden />
                  </Link>
                </Button>
              </div>

              <div id={REPORTS_SECTION_ID} className="border-t border-white/[0.08] pt-10">
                <h3 id="gda-scopes-title" className="text-heading text-foreground">
                  example google ads management scopes.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Final scope depends on budget, locations, and tracking. See{' '}
                  <TextLink href="/pricing">Prism pricing</TextLink>.
                </p>
                <div className="mt-6 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60 md:grid-cols-3">
                  {pricingPlans.map((plan) => (
                    <div
                      key={plan.plan}
                      className="-mb-px -mr-px flex flex-col gap-3 border-b border-r border-white/[0.07] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-base font-semibold text-foreground">{plan.plan}</h4>
                        <Badge variant="outline">{plan.fee}</Badge>
                      </div>
                      <p className="text-xs text-subtle">{plan.idealFor}</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {plan.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Layers className="mt-1 size-3.5 shrink-0 text-subtle" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <CheckList className="mt-6" items={partnershipPoints} />
              </div>
            </div>
          </DisclosurePanel>
        </Section>

        <FinalCta
          location="google dental ads final cta"
          href={GET_FREE_AUDIT_HREF}
          title="let’s grow your dental practice with google ads."
          description="Join the waitlist for a campaign and tracking review. Results vary by market and budget."
          secondary={{ label: 'See case studies', href: '/case-studies' }}
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

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
      'we configure privacy-aware measurement for calls, forms, and appointment requests where supported, then report attribution limits alongside performance.',
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
          description="we help dental practices attract more high-value patients with google ads structured around current policy, clear landing paths, and measurable search intent."
          location="google dental ads hero"
          ctaHref={GET_FREE_AUDIT_HREF}
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: 'See how we run dental ads', href: `#${STRUCTURE_SECTION_ID}` }}
          glow="blue"
          titleClassName="max-w-[18ch]"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center text-[15px] text-muted-foreground">
            <p>
              want to add paid social too? see{' '}
              <TextLink href="/tiktok-ads-for-dentists">tiktok ads for dentists</TextLink>.
            </p>
            <p>
              need a HIPAA-aware intake workflow? see our{' '}
              <TextLink href="/google/dental-patient-forms">google workspace patient forms guide</TextLink>.
            </p>
          </div>
        </LandingHero>

        <Section aria-labelledby="gda-why-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="gda-why-title"
                eyebrow="Why Google Ads matter for dentists"
                title="meet patients while they are actively searching on google."
                titleClassName="max-w-[16ch]"
              />
            </Reveal>
            <Reveal delay={100} className="space-y-5 text-lead text-muted-foreground lg:pt-12">
              <p>
                When someone searches “dentist near me” or “dental implants San
                Jose,” Google decides which practices appear first. That top
                spot is where the new patient calls happen.
              </p>
              <p>
                Google Ads puts your practice in front of those patients at the
                exact moment they’re ready to book, driving measurable results,
                not empty clicks.
              </p>
              <p>
                At Prism, we specialize in helping dental teams use Google Ads
                with policy-aware structure, useful measurement, and ongoing
                optimization. results vary by market, budget, and practice.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="mt-12">
            <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-[64ch] text-[15px] leading-7 text-muted-foreground">
                want compounding organic visibility too? work with our{' '}
                <TextLink href="/dental-practice-seo-expert">dental seo</TextLink> playbook to improve maps + organic
                rankings. for facebook &amp; instagram campaigns, see{' '}
                <TextLink href="/facebook-ads-for-dentists">facebook ads for dentists</TextLink>.
              </p>
              <ArrowLink href="/dental-practice-seo-expert" className="shrink-0">
                see dental seo
              </ArrowLink>
            </Card>
          </Reveal>
        </Section>

        <Section aria-labelledby="gda-landscape-title">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
                <SectionHeader
                  id="gda-landscape-title"
                  eyebrow="The current landscape"
                  title="what’s changed, and how to stay ahead."
                  description="Google has tightened its Health in Personalized Advertising policies, affecting how dental practices, especially those advertising implants, oral surgery, and gum disease treatment, can target patients."
                />
              </div>
              <div className="flex flex-col gap-6">
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
                <div>
                  <p className="text-[15px] font-semibold text-foreground">Here’s the short version:</p>
                  <ul className="mt-4 space-y-3 text-[15px] leading-7 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CircleCheck className="mt-1 size-4 shrink-0 text-foreground" aria-hidden />
                      <span>
                        You can advertise dental services, including implants,
                        Invisalign, and whitening.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CircleAlert className="mt-1 size-4 shrink-0 text-foreground" aria-hidden />
                      <span>
                        You can’t target people based on health conditions (like
                        “missing teeth” or “gum problems”).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CircleX className="mt-1 size-4 shrink-0 text-foreground" aria-hidden />
                      <span>
                        Some targeting features, like remarketing or custom
                        audiences, are restricted for health-related campaigns.
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-[15px] leading-7 text-muted-foreground">
                  We build your campaigns with these rules in mind, so you stay
                  compliant while reaching the right patients through search
                  intent, location targeting, and high-performing landing pages.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section aria-labelledby="gda-services-title">
          <Reveal>
            <SectionHeader
              id="gda-services-title"
              eyebrow="What we do"
              title="google ads built for real dental growth."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {servicesHighlights.map((service, index) => {
              const Icon = service.icon
              return (
                <Reveal key={service.title} delay={index * 80}>
                  <Card className="flex h-full flex-col p-6 sm:p-7">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="size-5 text-foreground" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-foreground">{service.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-7 text-muted-foreground">{service.description}</p>
                    <ArrowLink href={service.href} className="mt-6 self-start">
                      {service.ctaLabel}
                    </ArrowLink>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section id={STRUCTURE_SECTION_ID} aria-labelledby="gda-structure-title" className="scroll-mt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="gda-structure-title"
                eyebrow="How we structure dental ads"
                title="a policy-aware structure built for useful measurement."
                titleClassName="max-w-[15ch]"
              />
            </Reveal>
            <Reveal delay={100}>
              <ol className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
                {structurePillars.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex items-start gap-5 p-5 sm:p-7">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon className="size-[18px] text-foreground" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </Reveal>
          </div>
        </Section>

        <Section id={POLICY_SECTION_ID} aria-labelledby="gda-policy-title" className="scroll-mt-20">
          <Reveal>
            <SectionHeader
              id="gda-policy-title"
              eyebrow="What’s allowed vs. restricted"
              title="simple guide: what’s okay, what’s not."
              description="We translate Google’s Health in Personalized Advertising policies into practical guardrails. Google controls approvals, eligibility, and enforcement."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
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

        <Section id={LSA_SECTION_ID} aria-labelledby="gda-lsa-title" className="scroll-mt-20">
          <SpotlightCard className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
            <div className="flex flex-col gap-6">
              <Eyebrow>Local Services Ads (LSA)</Eyebrow>
              <h2 id="gda-lsa-title" className="text-title text-gradient max-w-[14ch] text-balance pb-1">
                show up first with google’s new “verified” badge.
              </h2>
            </div>
            <div className="space-y-5 text-[15px] leading-7 text-muted-foreground">
              <p>
                Google Verified is now the single verification badge for
                eligible Local Services Ads advertisers. Existing eligible
                advertisers were transitioned to the badge, while new
                advertisers must complete Google&apos;s screening and
                verification process. The former Google Guarantee program and
                its money-back guarantee are discontinued.
              </p>
              <p>
                Local Services Ads can appear above traditional search results
                and use a pay-per-lead model. Eligibility, screening
                requirements, and lead pricing vary by category and market.
              </p>
              <p>
                We can support LSA setup, verification steps, and lead tracking;
                Google makes the final eligibility and badge decisions.
              </p>
              <Button asChild size="lg" variant="outline">
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
          </SpotlightCard>
        </Section>

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
          <div className="mt-12 grid gap-5 md:grid-cols-3">
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

        <Section id={REPORTS_SECTION_ID} aria-labelledby="gda-scopes-title" className="scroll-mt-20">
          <Reveal>
            <SectionHeader
              id="gda-scopes-title"
              eyebrow="Management scopes"
              title="example google ads management scopes."
            >
              <p className="max-w-[58ch] text-[15px] leading-7 text-muted-foreground">
                Final scope and pricing depend on budget, locations, services,
                tracking, and account condition. For core offers, see{' '}
                <TextLink href="/pricing">Prism pricing</TextLink>.
              </p>
            </SectionHeader>
          </Reveal>
          <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-card md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.plan}
                className="-mb-px -mr-px flex flex-col gap-4 border-b border-r border-white/[0.07] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-heading text-foreground">{plan.plan}</h3>
                  <Badge variant="outline">{plan.fee}</Badge>
                </div>
                <p className="text-[14px] text-subtle">{plan.idealFor}</p>
                <ul className="space-y-2 text-[15px] text-muted-foreground">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Layers className="mt-1 size-3.5 shrink-0 text-subtle" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section aria-labelledby="gda-partner-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="gda-partner-title"
                eyebrow="Why partner with Prism"
                title="google ads expertise shaped around dental workflows."
                titleClassName="max-w-[15ch]"
              />
            </Reveal>
            <Reveal delay={100} className="flex flex-col gap-6 lg:pt-12">
              <p className="text-lead text-muted-foreground">
                Our team works inside the Google ecosystem every day, building
                campaigns, landing paths, and measurement for dental teams.
              </p>
              <p className="text-[15px] text-muted-foreground">When you partner with Prism, you’re getting:</p>
              <CheckList items={partnershipPoints} />
              <div>
                <WaitlistButton location="google dental ads partner" href={GET_FREE_AUDIT_HREF} label={WAITLIST_CTA.label} />
              </div>
            </Reveal>
          </div>
        </Section>

        <FinalCta
          location="google dental ads final cta"
          href={GET_FREE_AUDIT_HREF}
          title="let’s grow your dental practice with google ads."
          description="If you want a clearer path from search intent to calls and appointment requests, join the waitlist. When we can take on your practice, we’ll audit your existing setup, identify measurement and spend gaps, and recommend the next campaign changes. Results vary by market and budget."
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

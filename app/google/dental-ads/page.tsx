import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  ClipboardList,
  Layers,
  ShieldCheck,
  Target,
  Video,
} from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ScrollToTop from '@/components/scroll-to-top'
import { WebPageSchema } from '@/components/schema-markup'
import { Button } from '@/components/ui/button'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { pixelishForEmoji } from '@/lib/pixelish-emoji'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const GET_FREE_AUDIT_HREF = '/get-started'
const CONTACT_HREF = '/contact'
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
    ctaLabel: 'Learn About Policy Compliance',
    href: `#${POLICY_SECTION_ID}`,
    icon: ShieldCheck,
    external: false,
  },
  {
    title: 'smart tracking & reporting',
    description:
      'we configure privacy-aware measurement for calls, forms, and appointment requests where supported, then report attribution limits alongside performance.',
    ctaLabel: 'See Sample Reports',
    href: `#${REPORTS_SECTION_ID}`,
    icon: BarChart3,
    external: false,
  },
]

const structurePillars = [
  {
    emoji: '🦷',
    title: 'split by service type',
    description:
      'campaigns are separated by service and landing-page intent. targeting eligibility is reviewed against the page content, account, market, and Google’s current sensitive-interest rules.',
  },
  {
    emoji: '🔍',
    title: 'keyword-driven search',
    description:
      'we target high-intent searches like “dentist near me,” “invisalign dentist san jose,” and “dental implants consultation.”',
  },
  {
    emoji: '⚙️',
    title: 'no guesswork targeting',
    description:
      'we avoid advertiser-curated audiences for sensitive health campaigns and lean on search intent and appropriate location targeting. Google determines final eligibility.',
  },
  {
    emoji: '📞',
    title: 'conversion optimization',
    description:
      'landing pages built for action with clear calls to call, text, or book online, plus matched tracking for every lead source.',
  },
  {
    emoji: '📊',
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
    outcomes: [
      'Search and conversion tracking connected to the practice website',
      'Campaign structure aligned with high-intent dental services',
    ],
  },
  {
    name: 'Wine Country Root Canal (Santa Rosa)',
    outcomes: [
      'High-intent landing pages built around endodontic services',
      'Measurement tied to calls and appointment requests',
    ],
  },
  {
    name: 'Grace Dental (Santa Rosa)',
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
    <>
      <Navbar />
      <main className="bg-white text-neutral-900 lowercase">
        <section className="relative overflow-hidden rounded-b-[3rem] bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,0,0,0.88))]"
          />
          <div className="absolute inset-0 opacity-35 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.25),_rgba(30,64,175,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center lowercase md:gap-8 md:px-6 md:py-32">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-white/70">
                prism × google ads for dentists
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                prism + google ads: growing dental practices with precision
              </h1>
              <p className="max-w-3xl text-base text-white/80 sm:text-lg">
                we help dental practices attract more high-value patients with
                google ads structured around current policy, clear landing
                paths, and measurable search intent.
              </p>
              <p className="max-w-3xl text-sm text-white/70">
                want to add paid social too? see{' '}
                <Link
                  href="/tiktok-ads-for-dentists"
                  className="font-semibold text-white underline underline-offset-4"
                >
                  tiktok ads for dentists
                </Link>
                .
              </p>
              <p className="max-w-3xl text-sm text-white/70">
                need a HIPAA-aware intake workflow? see our{' '}
                <Link
                  href="/google/dental-patient-forms"
                  className="font-semibold text-white underline underline-offset-4"
                >
                  google workspace patient forms guide
                </Link>
                .
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href={GET_FREE_AUDIT_HREF} className="lowercase">
                    {FREE_AUDIT_CTA_TEXT}{' '}
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline-inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href={`#${STRUCTURE_SECTION_ID}`} className="lowercase">
                    see how we run dental ads{' '}
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto flex flex-col gap-8 px-4 py-16 md:flex-row md:gap-12 md:px-6 lg:py-24">
            <div className="md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Why Google Ads matter for dentists
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
                Meet patients while they are actively searching on Google.
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-base text-neutral-600 sm:text-lg md:w-1/2">
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
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white px-4 py-12 sm:py-14">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-center shadow-sm">
              <p className="text-sm text-neutral-700">
                want compounding organic visibility too? work with our{' '}
                <Link
                  href="/dental-practice-seo-expert"
                  className="font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                  dental seo
                </Link>{' '}
                playbook to improve maps + organic rankings. for facebook &amp;
                instagram campaigns, see{' '}
                <Link
                  href="/facebook-ads-for-dentists"
                  className="font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                  facebook ads for dentists
                </Link>
                .
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline" className="rounded-full px-8">
                  <Link href="/dental-practice-seo-expert">see dental seo</Link>
                </Button>
                <Button asChild className="rounded-full px-8">
                  <Link href={CONTACT_HREF}>talk to prism</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                The current landscape
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl">
                What’s changed, and how to stay ahead.
              </h2>
            </div>
            <div className="space-y-6 text-base text-white/80 sm:text-lg">
              <p>
                Google has tightened its Health in Personalized Advertising
                policies, affecting how dental practices, especially those
                advertising implants, oral surgery, and gum disease treatment,
                can target patients.
              </p>
              <p className="font-semibold text-white">
                Here’s the short version:
              </p>
              <ul className="space-y-3 text-sm text-white/80 sm:text-base">
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/circle-checkmark.svg"
                    alt=""
                    size={16}
                    aria-hidden="true"
                  />
                  <span>
                    You can advertise dental services, including implants,
                    Invisalign, and whitening.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/circle-exclamation.svg"
                    alt=""
                    size={16}
                    aria-hidden="true"
                  />
                  <span>
                    You can’t target people based on health conditions (like
                    “missing teeth” or “gum problems”).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/close.svg"
                    alt=""
                    size={16}
                    aria-hidden="true"
                  />
                  <span>
                    Some targeting features, like remarketing or custom
                    audiences, are restricted for health-related campaigns.
                  </span>
                </li>
              </ul>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur">
                <Image
                  src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761753033/Google_Ads_notification_qzgj35.png"
                  alt="Google Ads health policy notification"
                  width={1200}
                  height={716}
                  className="h-auto w-full rounded-2xl object-contain"
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 70vw, 100vw"
                />
              </div>
              <p>
                We build your campaigns with these rules in mind, so you stay
                compliant while reaching the right patients through search
                intent, location targeting, and high-performing landing pages.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                What we do
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                Google Ads built for real dental growth.
              </h2>
            </div>
            <div className="grid gap-6 text-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
              {servicesHighlights.map((service) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.title}
                    className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="space-y-4">
                      <Icon className="h-6 w-6 text-neutral-400" aria-hidden />
                      <h3 className="text-xl font-semibold text-neutral-900">
                        {service.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {service.description}
                      </p>
                    </div>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-900 transition-colors hover:text-neutral-700"
                    >
                      {service.ctaLabel}{' '}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id={STRUCTURE_SECTION_ID}
          className="border-t border-neutral-200 bg-neutral-50"
        >
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                How we structure dental ads
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                A policy-aware structure built for useful measurement.
              </h2>
            </div>
            <div className="grid gap-6">
              {structurePillars.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100"
                    aria-hidden="true"
                  >
                    <PixelishIcon
                      src={pixelishForEmoji(item.emoji).src}
                      alt=""
                      size={22}
                      invert={false}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id={POLICY_SECTION_ID}
          className="border-t border-neutral-200 bg-white"
        >
          <div className="container mx-auto flex flex-col gap-8 px-4 py-16 md:flex-row md:gap-12 md:px-6 lg:py-24">
            <div className="md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                What’s allowed vs. restricted
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
                Simple guide: what’s okay, what’s not.
              </h2>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                We translate Google’s Health in Personalized Advertising
                policies into practical guardrails. Google controls approvals,
                eligibility, and enforcement.
              </p>
            </div>
            <div className="grid gap-6 md:w-1/2 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                  />
                  <span>Allowed</span>
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-emerald-900/80">
                  {allowedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-900">
                  <PixelishIcon
                    src="/pixelish/close.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                  />
                  <span>Restricted / Not Allowed</span>
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-red-900/80">
                  {restrictedItems.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-base" aria-hidden>
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id={LSA_SECTION_ID}
          className="border-t border-neutral-200 bg-neutral-900 text-white"
        >
          <div className="container mx-auto flex flex-col gap-8 px-4 py-16 md:flex-row md:gap-12 md:px-6 lg:py-24">
            <div className="md:w-1/2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                Local Services Ads (LSA)
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Show up first with Google’s new “Verified” badge.
              </h2>
            </div>
            <div className="space-y-6 text-base text-white/80 sm:text-lg md:w-1/2">
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
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="h-auto w-full rounded-full px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link
                  href="https://support.google.com/localservices/answer/16498018?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Google&apos;s Badge Guide{' '}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Case studies
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
                Proven results with dental clients across California.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <div
                  key={study.name}
                  className="flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {study.name}
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      {study.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                          <ChartNoAxesColumnIncreasing
                            className="mt-0.5 h-4 w-4 text-neutral-400"
                            aria-hidden
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="mt-10 h-auto rounded-full px-8 py-4 text-base font-semibold text-neutral-900 hover:text-neutral-700"
            >
              <Link href="/case-studies">
                See Full Case Studies{' '}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>

        <section
          id={REPORTS_SECTION_ID}
          className="border-t border-neutral-200 bg-neutral-50"
        >
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Management scopes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
                Example Google Ads management scopes.
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                Final scope and pricing depend on budget, locations, services,
                tracking, and account condition. For core offers, see{' '}
                <Link
                  href="/pricing"
                  className="font-semibold text-neutral-900 underline underline-offset-4"
                >
                  Prism pricing
                </Link>
                .
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.plan}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {plan.plan}
                    </h3>
                    <span className="text-lg font-semibold text-neutral-900">
                      {plan.fee}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">{plan.idealFor}</p>
                  <div className="space-y-2 text-sm text-neutral-600">
                    {plan.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Layers
                          className="mt-0.5 h-4 w-4 text-neutral-400"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-10 h-auto rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white"
            >
              <Link href="/get-started">
                Get started with Prism{' '}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Why partner with Prism
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                Google Ads expertise shaped around dental workflows.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-600 sm:text-lg">
              <p>
                Our team works inside the Google ecosystem every day, building
                campaigns, landing paths, and measurement for dental teams.
              </p>
              <p>When you partner with Prism, you’re getting:</p>
              <ul className="space-y-4">
                {partnershipPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-neutral-700 sm:text-base"
                  >
                    <ClipboardList
                      className="mt-0.5 h-4 w-4 text-neutral-400"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link href={CONTACT_HREF}>
                  Talk to an Expert{' '}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-950">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-white md:px-6 md:py-24">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Let’s grow your dental practice with Google Ads.
            </h2>
            <p className="max-w-2xl text-base text-white/80 sm:text-lg">
              If you want a clearer path from search intent to calls and
              appointment requests, Prism can help. We’ll audit your existing
              setup, identify measurement and spend gaps, and recommend the next
              campaign changes. Results vary by market and budget.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                variant="inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href={GET_FREE_AUDIT_HREF}>
                  {FREE_AUDIT_CTA_TEXT}{' '}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href={CONTACT_HREF}>
                  Book a 30-Minute Zoom Meeting{' '}
                  <Video className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
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
    </>
  )
}

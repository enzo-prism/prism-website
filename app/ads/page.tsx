import { DisclosurePanel } from '@/components/prism/disclosure-panel'
import { OwnerDecision } from '@/components/prism/owner-decision'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  Clock,
  Compass,
  Filter,
  FlaskConical,
  LayoutTemplate,
  MapPin,
  Rocket,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { BrowserFrame } from '@/components/prism/browser-frame'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import {
  FAQSchema,
  ServiceSchema,
  VideoSchema,
} from '@/components/schema-markup'
import { AdsHeroVisual } from '@/components/services/AdsHeroVisual'
import { FounderVideo } from '@/components/services/FounderVideo'
import {
  ServiceBento,
  type ServiceBentoItem,
} from '@/components/services/ServiceBento'
import { ServiceFaq } from '@/components/services/ServiceFaq'
import { ServiceHero } from '@/components/services/ServiceHero'
import { ServiceSiblings } from '@/components/services/ServiceSiblings'
import {
  ServiceSteps,
  type ServiceStep,
} from '@/components/services/ServiceSteps'
import { getClientSites } from '@/components/services/client-sites'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { ADS_WAITLIST_CTA } from '@/lib/pricing-model'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Google, Meta and TikTok ads management',
  description:
    'Google, Meta, TikTok, and Yelp ad campaigns with creative, landing pages, and tracking focused on qualified calls, inquiries, and appointments.',
  path: '/ads',
  ogImage: '/prism-opengraph.png',
})

// The source file is 1920x1080 with Enzo in a rounded window at its center.
// Cloudinary crops to that window (inset past its rounded corners), so the
// player matches the clip instead of letterboxing it. The poster is the same
// crop at 5s, a frame with Enzo smiling, eyes open (frame 0 is mid-blink).
const FOUNDER_VIDEO_BASE = 'https://res.cloudinary.com/dhqpqfw6w/video/upload'
const FOUNDER_VIDEO_CROP = 'c_crop,w_680,h_564,x_620,y_258'
const FOUNDER_VIDEO_PATH = 'v1763165529/Untitled_xmscby'

const FOUNDER_VIDEO = {
  id: 'founder-vsl',
  src: `${FOUNDER_VIDEO_BASE}/${FOUNDER_VIDEO_CROP}/q_auto,vc_auto/${FOUNDER_VIDEO_PATH}.mp4`,
  poster: `${FOUNDER_VIDEO_BASE}/${FOUNDER_VIDEO_CROP}/so_5,q_auto/${FOUNDER_VIDEO_PATH}.jpg`,
  title: 'Founder Enzo Sison on Prism Ads',
  width: 680,
  height: 564,
  duration: '2:48',
}

// A current client's live homepage: the kind of page a Prism campaign sends
// people to. Former clients are filtered out by getClientSites.
const [LANDING_SITE] = getClientSites(['town-centre-dental'])

const AD_ANATOMY_NOTES = [
  { label: 'The offer', body: 'In the words customers search' },
  { label: 'Why you', body: 'One clear reason, one line' },
  { label: 'The next step', body: 'Call, book, or inquire' },
] as const

function AnatomyMarker({ index }: { index: number }) {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/15 bg-background font-mono text-[10px] text-foreground">
      {index}
    </span>
  )
}

/** Illustrative search ad, labeled as an example, annotated part by part. */
function AdAnatomy() {
  return (
    <div className="grid gap-4 border-t border-white/[0.06] px-6 pb-6 pt-5 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] sm:items-center sm:gap-6 sm:px-7 sm:pb-7">
      <div className="rounded-xl border border-white/[0.08] bg-background/70 p-4 shadow-[0_24px_60px_-30px_oklch(0_0_0/90%)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] font-semibold text-foreground">
              Y
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] text-foreground">
                Your business
              </span>
              <span className="block truncate font-mono text-[10px] text-subtle">
                yourbusiness.com
              </span>
            </span>
          </span>
          <span className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground">
            Example ad
          </span>
        </div>
        <div className="mt-4 flex items-start gap-2.5">
          <AnatomyMarker index={1} />
          <p className="text-[16px] font-medium leading-snug tracking-[-0.01em] text-spectrum-blue">
            Same-week appointments near you
          </p>
        </div>
        <div className="mt-2 flex items-start gap-2.5">
          <AnatomyMarker index={2} />
          <p className="text-[13px] leading-5 text-muted-foreground">
            A friendly team, clear answers before you visit, and an easy way to
            book.
          </p>
        </div>
        <div className="mt-3.5 flex items-center gap-2.5">
          <AnatomyMarker index={3} />
          <span className="flex flex-wrap gap-1.5">
            {['Book online', 'Call now', 'Services'].map((link) => (
              <span
                key={link}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] text-foreground/90"
              >
                {link}
              </span>
            ))}
          </span>
        </div>
      </div>
      <ol className="grid gap-2.5 sm:gap-3">
        {AD_ANATOMY_NOTES.map((note, index) => (
          <li key={note.label} className="flex items-start gap-2.5">
            <AnatomyMarker index={index + 1} />
            <span className="leading-tight">
              <span className="block text-[13px] font-medium text-foreground">
                {note.label}
              </span>
              <span className="block text-[12px] text-subtle">{note.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** A real, current-client page in browser chrome: where the click lands. */
function LandingPageShot() {
  if (!LANDING_SITE) return null
  return (
    <div className="px-6 pb-6 sm:px-7 sm:pb-7">
      <div className="mask-fade-b h-40 overflow-hidden">
        <BrowserFrame
          src={LANDING_SITE.desktop}
          alt={`${LANDING_SITE.client} website home page built by Prism`}
          url={LANDING_SITE.host}
          sizes="(min-width: 768px) 24rem, 90vw"
        />
      </div>
      <p className="mt-3 text-[12px] text-subtle">
        A Prism-built page for {LANDING_SITE.client}
      </p>
    </div>
  )
}

function GoalBrief() {
  const rows = [
    ['Audience', 'Who you want to reach'],
    ['Action', 'Call, book, or inquire'],
    ['Budget', 'Enough to learn from'],
  ]
  return (
    <dl className="mx-6 mb-6 divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-background/60 sm:mx-7 sm:mb-7">
      {rows.map(([term, detail]) => (
        <div
          key={term}
          className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-[13px]"
        >
          <dt className="font-mono text-[11px] text-subtle">{term}</dt>
          <dd className="text-right text-muted-foreground">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

/** The conversion events a campaign is judged on, set up before launch. */
function ConversionEvents() {
  return (
    <ul className="flex flex-col gap-1.5 px-6 pb-6 sm:px-7 sm:pb-7">
      {['Call from the ad', 'Form submitted', 'Booking requested'].map(
        (event) => (
          <li
            key={event}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[13px] text-muted-foreground"
          >
            {event}
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle">
              <span className="size-1.5 rounded-full bg-foreground/60" />
              Tracked
            </span>
          </li>
        ),
      )}
    </ul>
  )
}

function ReportChips() {
  return (
    <div className="flex flex-wrap gap-2 px-6 pb-6 sm:px-7 sm:pb-7">
      {['Calls', 'Form fills', 'Booked appointments', 'Cost per lead'].map(
        (chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[13px] text-muted-foreground"
          >
            {chip}
          </span>
        ),
      )}
    </div>
  )
}

const WHAT_YOU_GET: readonly ServiceBentoItem[] = [
  {
    icon: Target,
    title: 'strategy that fits the goal',
    body: 'Audience, target action, and test budget set up front.',
    visual: <GoalBrief />,
  },
  {
    icon: Sparkles,
    title: 'creative that earns the click',
    body: 'Clear offers and sharp visuals built for your buyer.',
    className: 'md:col-span-4',
    visual: <AdAnatomy />,
  },
  {
    icon: LayoutTemplate,
    title: 'a clear page after the click',
    body: 'One obvious path to call, book, or inquire.',
    visual: <LandingPageShot />,
  },
  {
    icon: Compass,
    title: 'setup and tracking',
    body: 'Every call, form, and booking tracked before launch.',
    visual: <ConversionEvents />,
  },
  {
    icon: BarChart3,
    title: 'weekly tuning, plain reports',
    body: 'Cut waste weekly. Report real inquiries.',
    visual: <ReportChips />,
  },
]

type AdPlatform = {
  name: string
  why: string
  role: string
  logoBrands: readonly BrandLogoKey[]
}

const PLATFORMS: readonly AdPlatform[] = [
  {
    name: 'Google Ads',
    role: 'Search intent',
    why: 'Capture buyers actively searching for what you do.',
    logoBrands: ['google'],
  },
  {
    name: 'Facebook & Instagram',
    role: 'Paid social',
    why: 'Creative and targeting that build demand and trust.',
    logoBrands: ['facebook', 'instagram'],
  },
  {
    name: 'TikTok',
    role: 'Short-form video',
    why: 'Native short-form video where attention lives.',
    logoBrands: ['tiktok'],
  },
  {
    name: 'Yelp Ads',
    role: 'Local discovery',
    why: 'Reach local buyers comparing reviews before calling.',
    logoBrands: ['yelp'],
  },
]

const STEPS: readonly ServiceStep[] = [
  {
    icon: Compass,
    title: 'plan and build',
    detail: 'First',
    body: 'Set tracking, creative, and landing pages before launch.',
  },
  {
    icon: Rocket,
    title: 'launch focused',
    detail: 'Launch',
    body: 'Start lean on highest-intent channels.',
  },
  {
    icon: BarChart3,
    title: 'optimize and report',
    detail: 'Weekly',
    body: 'Weekly bid and creative tuning tied to real leads.',
  },
]

const BUDGET_GUARDS: readonly {
  icon: LucideIcon
  title: string
  body: string
}[] = [
  {
    icon: Filter,
    title: 'reduce irrelevant clicks',
    body: 'Tight exclusions block low-intent traffic.',
  },
  {
    icon: Clock,
    title: 'show up when buyers are ready',
    body: 'Pacing matched to when your team answers.',
  },
  {
    icon: MapPin,
    title: 'right radius, right people',
    body: 'Locked to the exact markets you serve.',
  },
  {
    icon: FlaskConical,
    title: 'keep testing the details',
    body: 'Structured creative and offer tests.',
  },
]

const AUDIENCE_SEGMENTS = [
  {
    name: 'dental and medical teams',
    description:
      'High-intent patient campaigns paired with clear landing pages and call tracking.',
    href: '/why-dental-practices-love-prism',
  },
  {
    name: 'local shop owners',
    description:
      'Focused local offers across Google, Meta, and Yelp that drive store visits.',
    href: '/why-local-shop-owners-love-prism',
  },
  {
    name: 'consulting and professional services',
    description:
      'Credible positioning and direct paths to request a consultation.',
    href: '/why-consulting-companies-love-prism',
  },
  {
    name: 'online community founders',
    description:
      'Paid social and retargeting built to grow engaged membership.',
    href: '/why-online-community-founders-love-prism',
  },
  {
    name: 'nonprofits and education',
    description:
      'Program and fundraising campaigns with clean tracking on every key action.',
    href: '/why-nonprofits-love-prism',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'What does Prism’s Ads service include?',
    answer:
      'End-to-end campaign management across Google, Meta, TikTok, and Yelp: strategy, ad creative, targeting, landing pages, and conversion tracking. Scope and starting media budget are confirmed when your waitlist intake opens.',
  },
  {
    question: 'What is the difference between paid ads and SEO?',
    answer:
      'Paid ads buy immediate placement on ad platforms. SEO builds unpaid search visibility through technical foundations, content, and authority. They complement each other, though ad spend does not directly raise organic rankings.',
  },
  {
    question: 'How fast will I see results?',
    answer:
      'Timing depends on your market, offer, and budget. We verify delivery and tracking first, then optimize from live data. A launch date is never a guarantee of leads.',
  },
  {
    question: 'What budgets work best?',
    answer:
      'We recommend a disciplined starting budget matched to your channel and market, and scale only once performance justifies it. Management scope is confirmed when your intake opens.',
  },
  {
    question: 'Can you use my existing accounts?',
    answer:
      'Yes. We can audit, clean up, and improve your current setup, or build fresh when a clean start makes more sense.',
  },
  {
    question: 'What if I already run ads?',
    answer:
      'We audit your account history, tracking, audiences, and creative first. Past data gives us a sharper baseline for the next round of tests.',
  },
  {
    question: 'Do I need a new website first?',
    answer:
      'Not always. We check whether your destination page clearly sells the offer, performs on mobile, and converts smoothly. If it needs fixes, we scope them before sending paid traffic.',
  },
] as const

export default function AdsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <ServiceHero
          title={
            <>
              campaigns built around{' '}
              <span className="text-spectrum [background-position:100%_50%]">
                better leads.
              </span>
            </>
          }
          description={
            <>
              <span className="text-foreground">Prism Ads</span>: creative,
              landing pages, and tracked inquiries across five platforms.
            </>
          }
          ctaHref={ADS_WAITLIST_CTA.href}
          location="ads hero"
          secondary={{
            label: 'See the platforms',
            href: '#platforms',
            trackingLabel: 'see platforms',
          }}
          visual={<AdsHeroVisual />}
          glow="green"
        />

        <ServiceBento
          idPrefix="ads"
          title="from campaign strategy to the next call."
          items={WHAT_YOU_GET}
        />

        <Section
          id="platforms"
          aria-labelledby="ads-platforms-title"
          className="scroll-mt-20"
        >
          <Reveal>
            <SectionHeader
              id="ads-platforms-title"
              eyebrow="Platforms"
              title="where we run, and why."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card sm:mt-16">
              <div className="divide-y divide-white/[0.08]">
                {PLATFORMS.map((platform) => (
                  <article
                    key={platform.name}
                    className="grid gap-4 p-6 transition-colors hover:bg-white/[0.02] sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:px-10 sm:py-8"
                  >
                    <div className="flex items-center gap-2">
                      {platform.logoBrands.map((brand) => (
                        <span
                          key={brand}
                          className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"
                        >
                          <BrandLogo
                            brand={brand}
                            theme="dark"
                            decorative
                            className="size-5"
                          />
                        </span>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-heading text-foreground">
                        {platform.name}
                      </h3>
                      <p className="mt-2 max-w-[56ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                        {platform.why}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted-foreground">
                      {platform.role}
                    </span>
                  </article>
                ))}
                <article className="spectrum-rule relative grid gap-5 bg-white/[0.02] p-6 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:px-10 sm:py-8">
                  <div className="flex items-center gap-2">
                    <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <BrandLogo
                        brand="openai"
                        theme="dark"
                        decorative
                        className="size-5"
                      />
                    </span>
                  </div>
                  <div>
                    <p className="text-eyebrow text-subtle">Invite only</p>
                    <h3 className="text-heading mt-2 text-foreground">
                      ChatGPT Ads
                    </h3>
                    <p className="mt-2 max-w-[56ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                      Show up inside the conversation. Invite-only through
                      Prism&apos;s network.
                    </p>
                  </div>
                  <Button asChild variant="outline" size="lg" className="w-fit">
                    <TrackedLink
                      href="/chatgpt-ads"
                      label="see chatgpt ads"
                      location="ads chatgpt"
                    >
                      See the program
                      <ArrowUpRight aria-hidden="true" />
                    </TrackedLink>
                  </Button>
                </article>
              </div>
            </div>
          </Reveal>
        </Section>

        <ServiceSteps
          idPrefix="ads"
          title="launch, learn, improve."
          steps={STEPS}
        />

        <Section aria-labelledby="ads-budget-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="ads-budget-title"
                eyebrow="Budget"
                title="keep your budget focused."
                titleClassName="max-w-[13ch]"
              />
            </Reveal>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {BUDGET_GUARDS.map((guard, index) => {
                const Icon = guard.icon
                return (
                  <Reveal
                    as="li"
                    key={guard.title}
                    delay={index * 60}
                    className="flex flex-col gap-3 bg-card p-6 sm:p-7"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-foreground"
                      strokeWidth={1.6}
                    />
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {guard.title}
                    </h3>
                    <p className="text-pretty text-[15px] leading-7 text-muted-foreground">
                      {guard.body}
                    </p>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        </Section>

        <Section
          id="ads-founder-vsl"
          aria-labelledby="ads-founder-title"
          className="scroll-mt-20"
        >
          <Reveal>
            <div className="relative isolate grid gap-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card p-6 sm:p-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14 lg:p-12">
              <div
                aria-hidden="true"
                className="bg-grid absolute inset-0 -z-10 opacity-50"
              />
              <div className="flex flex-col gap-5">
                <SectionHeader
                  id="ads-founder-title"
                  eyebrow="Hear from our founder"
                  title="how Prism runs ads."
                  description="Enzo on channel selection, creative, and real lead tracking."
                  titleClassName="max-w-[12ch]"
                />
              </div>
              <figure className="mx-auto w-full max-w-xl lg:max-w-none">
                <FounderVideo
                  src={FOUNDER_VIDEO.src}
                  poster={FOUNDER_VIDEO.poster}
                  title={FOUNDER_VIDEO.title}
                  width={FOUNDER_VIDEO.width}
                  height={FOUNDER_VIDEO.height}
                  label="Watch Enzo"
                  duration={FOUNDER_VIDEO.duration}
                  location="ads founder video"
                />
                <figcaption className="mt-3 text-sm text-subtle">
                  {FOUNDER_VIDEO.title}
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </Section>

        <Section aria-labelledby="ads-fit-title" className="py-10 sm:py-12">
          <h2 id="ads-fit-title" className="sr-only">
            who we build campaigns for.
          </h2>
          <DisclosurePanel
            eyebrow="Fit"
            summary="See the industries we build ad campaigns for"
            meta="5 sectors + dental"
          >
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
              {AUDIENCE_SEGMENTS.map((segment) => (
                <li key={segment.name} className="flex bg-background">
                  <Link
                    href={segment.href}
                    className="group/segment flex w-full flex-col gap-2 p-5 transition-colors hover:bg-card focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-base font-semibold tracking-[-0.02em] text-foreground">
                        {segment.name}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/segment:-translate-y-0.5 group-hover/segment:translate-x-0.5 group-hover/segment:text-foreground"
                      />
                    </span>
                    <span className="text-pretty text-sm leading-6 text-muted-foreground">
                      {segment.description}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="flex flex-col justify-center gap-2 bg-background p-5 text-sm leading-6 text-muted-foreground">
                <span className="text-eyebrow text-subtle">For dentists</span>
                <Link
                  href="/facebook-ads-for-dentists"
                  className="inline-flex w-fit items-center gap-1.5 rounded-sm text-foreground hover:underline"
                >
                  Facebook ads for dentists
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/tiktok-ads-for-dentists"
                  className="inline-flex w-fit items-center gap-1.5 rounded-sm text-foreground hover:underline"
                >
                  TikTok ads for dentists
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            </ul>
          </DisclosurePanel>
        </Section>

        <ServiceFaq
          idPrefix="ads"
          items={FAQ_ITEMS}
          title="before you spend."
        />

        <OwnerDecision
          eyebrow="Diagnostics & tools"
          title="check the funnel before scaling spend."
          links={[
            { label: "Missing inquiries guide", href: "/blog/website-traffic-no-inquiries" },
            { label: "Dental Google Ads worksheet", href: "/google/dental-ads" },
            { label: "Google Ads destination fix", href: "/blog/google-ads-destination-not-working" },
          ]}
        />
        <ServiceSiblings current="ads" />

        <FinalCta
          location="ads final cta"
          title="your next campaign starts here."
          href={ADS_WAITLIST_CTA.href}
          headingId="ads-final-cta-title"
        />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="paid-ads-service"
        name="Prism Ads"
        description="Paid search and social campaigns with ad creative, audience targeting, landing pages, and inquiry tracking across Google, Meta, TikTok, and Yelp."
        serviceType="Digital marketing"
        areaServed="United States"
        offerDetails={{
          name: 'Prism Ads',
          description:
            'Paid ads across Google, Meta, TikTok, and Yelp with creative, targeting, landing paths, and tracking.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/ads',
        }}
      />
      <VideoSchema
        id={FOUNDER_VIDEO.id}
        name={FOUNDER_VIDEO.title}
        description="Enzo Sison explains how Prism plans campaigns, develops creative, and reviews results across Google, Meta, TikTok, and Yelp."
        thumbnailUrl={FOUNDER_VIDEO.poster}
        uploadDate="2025-01-24T00:00:00Z"
        duration="PT2M48S"
        contentUrl={FOUNDER_VIDEO.src}
        embedUrl="https://www.design-prism.com/ads#founder-vsl"
        width={FOUNDER_VIDEO.width}
        height={FOUNDER_VIDEO.height}
        creatorName="Enzo Sison"
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}

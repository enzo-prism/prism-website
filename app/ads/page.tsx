import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
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
  titleStem: 'Ads',
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
    body: 'Define the customers you want to reach, the action you want them to take, and the budget to test it.',
    visual: <GoalBrief />,
  },
  {
    icon: Sparkles,
    title: 'creative that earns the click',
    body: 'Images, video, and clear copy built around your offer and the next step you want customers to take.',
    className: 'md:col-span-4',
    visual: <AdAnatomy />,
  },
  {
    icon: LayoutTemplate,
    title: 'a clear page after the click',
    body: 'Send visitors to a relevant page with a clear offer and a straightforward way to call, book, or inquire.',
    visual: <LandingPageShot />,
  },
  {
    icon: Compass,
    title: 'setup and tracking',
    body: 'We set up the ad accounts, audiences, and conversion events so every campaign can be judged on real inquiries.',
    visual: <ConversionEvents />,
  },
  {
    icon: BarChart3,
    title: 'weekly tuning, plain reports',
    body: 'Shift budget to what works, pause what does not, and review results in plain English.',
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
    why: 'High-intent searches when people need you now.',
    logoBrands: ['google'],
  },
  {
    name: 'Facebook & Instagram',
    role: 'Paid social',
    why: 'Precise audiences plus creative that builds demand and trust.',
    logoBrands: ['facebook', 'instagram'],
  },
  {
    name: 'TikTok',
    role: 'Short-form video',
    why: 'Short videos that introduce your offer in a format people expect in their feed.',
    logoBrands: ['tiktok'],
  },
  {
    name: 'Yelp Ads',
    role: 'Local discovery',
    why: 'Reach people comparing local businesses, services, and reviews.',
    logoBrands: ['yelp'],
  },
]

const STEPS: readonly ServiceStep[] = [
  {
    icon: Compass,
    title: 'plan and build',
    detail: 'First',
    body: 'Goals, budget, ideal customers, and your local market. Then tracking, audiences, creative, and landing page fixes.',
  },
  {
    icon: Rocket,
    title: 'launch focused',
    detail: 'Launch',
    body: 'Start with a focused budget on the right channels and gather real performance data before expanding.',
  },
  {
    icon: BarChart3,
    title: 'optimize and report',
    detail: 'Weekly',
    body: 'Review results, move spend toward what works, test the next idea, and walk through it all in plain English.',
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
    body: 'Search exclusions and audience filters cut irrelevant traffic, and we review lead quality as campaigns run.',
  },
  {
    icon: Clock,
    title: 'show up when buyers are ready',
    body: 'Ad schedules and budget pacing follow when inquiries actually arrive and when you can answer.',
  },
  {
    icon: MapPin,
    title: 'right radius, right people',
    body: 'Ads focus on the areas you serve and exclude locations outside your market.',
  },
  {
    icon: FlaskConical,
    title: 'keep testing the details',
    body: 'Headlines, images, offers, and forms are tested to learn what improves lead quality and cost per lead.',
  },
]

const AUDIENCE_SEGMENTS = [
  {
    name: 'dental and medical teams',
    description:
      'Patient-focused ads, clear landing pages, and inquiry tracking.',
    href: '/why-dental-practices-love-prism',
  },
  {
    name: 'local shop owners',
    description:
      'Hyper-local offers on Google, Meta, and Yelp that turn scrollers into visits.',
    href: '/why-local-shop-owners-love-prism',
  },
  {
    name: 'consulting and professional services',
    description:
      'Show your expertise and give prospects a clear way to request a consultation.',
    href: '/why-consulting-companies-love-prism',
  },
  {
    name: 'online community founders',
    description:
      'Paid social and retargeting loops that grow engaged membership.',
    href: '/why-online-community-founders-love-prism',
  },
  {
    name: 'nonprofits and education',
    description:
      'Programs and fundraising campaigns with tracking for the actions that matter.',
    href: '/why-nonprofits-love-prism',
  },
] as const

const FAQ_ITEMS = [
  {
    question: 'What does Prism’s Ads service include?',
    answer:
      'Prism manages paid campaigns across Google, Meta, TikTok, and Yelp, connecting strategy, ad creative, targeting, landing pages, and conversion tracking. Prism is fully booked, so campaigns start on the waitlist; when we reach out we review the audience, channels, and starting budget with you before scoping the work.',
  },
  {
    question: 'What is the difference between paid ads and SEO?',
    answer:
      'Paid ads buy placements through advertising platforms. SEO improves the visibility of your website in unpaid search results. Ads need a media budget and ongoing testing; SEO builds on useful content, technical foundations, and authority. The two can work together, but buying ads does not improve organic rankings.',
  },
  {
    question: 'How fast will I see results?',
    answer:
      'Timing depends on your market, budget, offer, and the number of people who respond. We check delivery and tracking first, then use the available data to decide what to change. A launch date is not a promise of leads.',
  },
  {
    question: 'What budgets work best?',
    answer:
      'We recommend a starting budget by channel and market size. Spend scales only when performance proves it can sustain. Pricing for the work itself is scoped when we reach out from the waitlist.',
  },
  {
    question: 'Can you use my existing accounts?',
    answer:
      'Yes. We can audit, clean up, and improve your current setup, or build fresh if you need a new start.',
  },
  {
    question: 'What if I already run ads?',
    answer:
      'We review the account history, tracking, audiences, and creative before recommending changes. Existing results give us a starting point for the next tests.',
  },
  {
    question: 'Do I need a new website first?',
    answer:
      'Not necessarily. We check whether the destination page explains the offer, works on mobile, and makes it easy to contact you. If it needs work, we scope those changes before sending paid traffic.',
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
              <span className="text-foreground">Prism Ads</span> runs Google,
              Meta, TikTok, and Yelp campaigns with creative, landing pages, and
              tracking, aimed at the calls, inquiries, and appointments you
              actually want.
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
          description="Creative, targeting, landing pages, and reporting, all pointed at calls, inquiries, and booked appointments."
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
              description="Each channel covers a different moment in the buyer journey, so we pick the mix that fits your customers."
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
                      A new place to show up: inside the conversation. Access is
                      limited to Prism&apos;s network. If you were invited,
                      bring your code.
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
          description="A simple loop from the first brief to weekly optimization, with every decision tied to tracked inquiries."
          steps={STEPS}
        />

        <Section aria-labelledby="ads-budget-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                id="ads-budget-title"
                eyebrow="Budget"
                title="keep your budget focused."
                description="Practical checks that cut waste and keep improving the quality of your leads."
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
                  description="Enzo explains how we choose channels, develop creative, and review the calls and inquiries campaigns bring in."
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

        <Section aria-labelledby="ads-fit-title">
          <Reveal>
            <SectionHeader
              id="ads-fit-title"
              eyebrow="Fit"
              title="who we build campaigns for."
              description="Teams that want more of the right customers and a clear view of what their ad spend delivers."
            />
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_SEGMENTS.map((segment, index) => (
              <Reveal
                as="li"
                key={segment.name}
                delay={(index % 3) * 60}
                className="flex bg-background"
              >
                <Link
                  href={segment.href}
                  className="group/segment flex w-full flex-col gap-2 p-6 transition-colors hover:bg-card focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-7"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {segment.name}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/segment:-translate-y-0.5 group-hover/segment:translate-x-0.5 group-hover/segment:text-foreground"
                    />
                  </span>
                  <span className="text-pretty text-[15px] leading-7 text-muted-foreground">
                    {segment.description}
                  </span>
                </Link>
              </Reveal>
            ))}
            <li className="flex flex-col justify-center gap-2 bg-background p-6 text-[15px] leading-7 text-muted-foreground sm:p-7">
              <span className="text-eyebrow text-subtle">For dentists</span>
              <Link
                href="/facebook-ads-for-dentists"
                className="group/dental inline-flex w-fit items-center gap-1.5 rounded-sm text-foreground hover:underline focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                Facebook ads for dentists
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/tiktok-ads-for-dentists"
                className="group/dental inline-flex w-fit items-center gap-1.5 rounded-sm text-foreground hover:underline focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                TikTok ads for dentists
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          </ul>
        </Section>

        <ServiceFaq
          idPrefix="ads"
          items={FAQ_ITEMS}
          title="before you spend."
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

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainedSectionClassName,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
  coreRouteSectionCompactClassName,
  coreRouteSplitLayoutClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import { ServiceSiblings } from '@/components/services/ServiceSiblings'
import SimpleBlogGrid from '@/components/simple-blog-grid'
import SimpleBlogPostCard from '@/components/simple-blog-post-card'
import VideoPlayer from '@/components/video-player'
import { BOOK_A_CALL_CTA } from '@/lib/pricing-model'
import { getAllPosts } from '@/lib/mdx-data'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

const CANONICAL_URL = 'https://www.design-prism.com/ads'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Ads',
  description:
    'Google, Meta, TikTok, and Yelp ad campaigns with creative, landing pages, and tracking focused on qualified calls, inquiries, and appointments.',
  path: '/ads',
  ogImage: '/prism-opengraph.png',
})

const HERO_CHIPS = [
  'Google',
  'Meta',
  'TikTok',
  'Yelp',
  'ChatGPT Ads',
] as const

const WHAT_YOU_GET = [
  {
    title: 'Strategy that fits the goal',
    body: 'Define the customers you want to reach, the action you want them to take, and the budget to test it.',
  },
  {
    title: 'Creative that earns the click',
    body: 'Images, video, and clear copy built around your offer and the next step you want customers to take.',
  },
  {
    title: 'Landing page alignment',
    body: 'Send visitors to a relevant page with a clear offer and a straightforward way to call, book, or inquire.',
  },
  {
    title: 'Full-funnel setup',
    body: 'Search, social, remarketing, and local intent working as one system.',
  },
  {
    title: 'Weekly optimization',
    body: 'Shift budget to winners, pause what is not working, and test the next idea.',
  },
  {
    title: 'Transparent reporting',
    body: 'Calls, form fills, booked appointments, and cost per lead, in plain English.',
  },
] as const

const BUDGET_GUARDS = [
  {
    title: 'Reduce irrelevant clicks',
    body: 'Use search exclusions and audience filters to reduce irrelevant traffic, then review lead quality as campaigns run.',
  },
  {
    title: 'Show up when buyers are ready',
    body: 'Bids, schedules, and pacing tuned to peak-intent windows.',
  },
  {
    title: 'Right radius, right people',
    body: 'Geo-targeting and exclusions keep spend local and high quality.',
  },
  {
    title: 'Keep testing the details',
    body: 'Test headlines, images, offers, and forms to learn what improves lead quality and cost per lead.',
  },
] as const

type AdPlatform = {
  name: string
  why: string
  logoBrands?: readonly BrandLogoKey[]
}

const PLATFORMS: readonly AdPlatform[] = [
  {
    name: 'Google Ads',
    why: 'High-intent searches when people need you now.',
    logoBrands: ['google'],
  },
  {
    name: 'Facebook & Instagram',
    why: 'Precise audiences plus creative that builds demand and trust.',
    logoBrands: ['facebook', 'instagram'],
  },
  {
    name: 'TikTok',
    why: 'Native, fast-moving creative that grabs attention and converts.',
    logoBrands: ['tiktok'],
  },
  {
    name: 'Yelp Ads',
    why: 'Bottom-of-funnel local buyers comparing options.',
  },
]

const PROCESS_STEPS = [
  {
    step: 'Discover',
    body: 'Goals, budget, ideal customers, and local market reality.',
  },
  {
    step: 'Build',
    body: 'Tracking, audiences, creative, and landing page improvements.',
  },
  {
    step: 'Launch',
    body: 'Start with a focused budget and gather performance data before expanding.',
  },
  {
    step: 'Optimize',
    body: 'Review results, adjust spend, and test the next improvement.',
  },
  {
    step: 'Report',
    body: 'Clear results and next steps. No jargon, no fluff.',
  },
] as const

const OUTCOMES = [
  'Lower cost per lead through testing and tighter targeting.',
  'Higher conversion rates with better offers and landing pages.',
  'A cleaner pipeline by filtering out low-quality clicks and calls.',
  'Full visibility into what is working so you can scale with confidence.',
] as const

const HANDLED_FOR_YOU = [
  'Ad account setup',
  'Conversion tracking',
  'Pixels and tags',
  'Creative and copy',
  'Offer testing',
  'Negative keywords and exclusions',
  'Geo-targeting',
  'Remarketing',
  'Call tracking',
  'Weekly optimizations',
  'Monthly summaries',
] as const

const FAQ_ITEMS = [
  {
    question: 'How fast will I see results?',
    answer:
      'Search and Yelp tend to produce leads quickly. Paid social ramps as creative tests find winners. Most clients see meaningful signal in weeks, not months.',
  },
  {
    question: 'What budgets work best?',
    answer:
      'We recommend a starting budget by channel and market size. Spend scales only when performance proves it can sustain. Pricing for the work itself is scoped on a 30-minute call.',
  },
  {
    question: 'Can you use my existing accounts?',
    answer:
      'Yes. We can audit, clean up, and improve your current setup, or build fresh if you need a new start.',
  },
  {
    question: 'What if I already run ads?',
    answer:
      'Keep what works, fix the waste, and test higher-converting variations so nothing good is lost.',
  },
  {
    question: 'Do I need a new website first?',
    answer:
      'A conversion-ready website makes ads cheaper. If the site is the leak, we start there. See the Website service, then come back to spend.',
  },
] as const

const AUDIENCE_SEGMENTS = [
  {
    name: 'Dental and medical teams',
    description:
      'Fill chair time with compliant campaigns, call tracking, and landing pages tuned for patients.',
    href: '/why-dental-practices-love-prism',
  },
  {
    name: 'Local shop owners',
    description:
      'Hyper-local offers on Google, Meta, and Yelp that turn scrollers into foot traffic and orders.',
    href: '/why-local-shop-owners-love-prism',
  },
  {
    name: 'Consulting and professional services',
    description:
      'Lead-gen funnels that surface expertise, nurture prospects, and protect premium positioning.',
    href: '/why-consulting-companies-love-prism',
  },
  {
    name: 'Online community founders',
    description:
      'Acquisition loops that combine paid social and retargeting to expand engaged membership.',
    href: '/why-online-community-founders-love-prism',
  },
  {
    name: 'Nonprofits and education',
    description:
      'Mission-forward messaging, donor retargeting, and grant-friendly tracking that proves impact.',
    href: '/why-nonprofits-love-prism',
  },
] as const

function HeroChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#c9c1b6]">
      {children}
    </span>
  )
}

export default async function AdsPage() {
  const allPosts = (await getAllPosts()) ?? []
  const adsBlogPosts = allPosts
    .filter((post) => {
      const slug = post.slug.toLowerCase()
      const category = (post.category ?? '').toLowerCase()
      const description = (post.description ?? '').toLowerCase()
      return (
        slug.includes('ads') ||
        slug.includes('ad-') ||
        slug.includes('ppc') ||
        slug.includes('paid') ||
        slug.includes('marketing') ||
        category.includes('ads') ||
        category.includes('ppc') ||
        category.includes('marketing') ||
        description.includes('ads') ||
        description.includes('ppc') ||
        description.includes('marketing') ||
        description.includes('campaign')
      )
    })
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className="border-b border-white/12 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteHeroFrameClassName,
                'px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20',
              )}
            >
              <div className="max-w-3xl">
                <CoreSectionHeading
                  as="h1"
                  variant="hero"
                  eyebrow="Ads"
                  title="Turn attention into qualified inquiries."
                  description="Reach potential customers on Google, Meta, TikTok, and Yelp. We connect ad creative, landing pages, and tracking so you can see which campaigns bring useful leads."
                  titleClassName="max-w-[16ch]"
                />
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CoreActionLink
                    href={BOOK_A_CALL_CTA.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="heroPrimary"
                    label="book a free demo"
                    location="ads hero"
                  >
                    {BOOK_A_CALL_CTA.label}
                  </CoreActionLink>
                  <CoreActionLink
                    href="#platforms"
                    variant="heroSecondary"
                    label="see platforms"
                    location="ads hero"
                  >
                    See the platforms
                  </CoreActionLink>
                </div>
                <div className="mt-9 flex flex-wrap gap-2">
                  {HERO_CHIPS.map((chip) => (
                    <HeroChip key={chip}>{chip}</HeroChip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <div id="ads-founder-vsl" className="mx-auto max-w-3xl">
              <CoreSectionHeading
                eyebrow="Hear from our founder"
                title="How Prism runs paid demand."
                description="Enzo on strategy, creative, offers, and the optimization loop behind Google, Meta, TikTok, and Yelp."
              />
              <div className="mt-8">
                <VideoPlayer
                  src="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763165529/Untitled_xmscby.mp4"
                  poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/Untitled_xmscby.jpg"
                  title="Founder Enzo Sison on Prism Ads"
                  caption="Enzo shares how Prism plans, builds, and optimizes Google, Meta, TikTok, and Yelp campaigns so local businesses get more calls, form fills, and store visits without wasting spend."
                  schema={{
                    id: 'https://www.design-prism.com/ads#founder-vsl',
                    name: 'Founder Enzo Sison on Prism Ads',
                    description:
                      "Enzo Sison explains Prism's paid ads system across Google, Meta, TikTok, and Yelp: strategy, creative, offers, and nonstop optimization to drive more calls, clicks, and loyal customers.",
                    thumbnailUrl:
                      'https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/Untitled_xmscby.jpg',
                    uploadDate: '2025-01-24T00:00:00Z',
                    duration: 'PT60S',
                    contentUrl:
                      'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763165529/Untitled_xmscby.mp4',
                    embedUrl: 'https://www.design-prism.com/ads#founder-vsl',
                    width: 1920,
                    height: 1080,
                    creatorName: 'Enzo Sison',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div
            className={cn(
              coreRouteContainerClassName,
              coreRouteSplitLayoutClassName,
            )}
          >
            <CoreSectionHeading
              eyebrow="What you get"
              title="From campaign strategy to the next call."
              description="Creative, targeting, and reporting focused on calls, inquiries, and booked appointments."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {WHAT_YOU_GET.map((item) => (
                <article
                  key={item.title}
                  className="border border-white/10 bg-[#070707] p-5"
                >
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="budget-protection"
          className={coreRouteSectionClassName}
        >
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Budget"
              title="Keep your budget focused."
              description="Practical checks that help reduce waste and improve the quality of your leads."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {BUDGET_GUARDS.map((item) => (
                <article
                  key={item.title}
                  className="border border-white/10 bg-[#070707] p-6"
                >
                  <h2 className="text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="platforms" className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Platforms"
              title="Where we run, and why."
              description="Each channel covers a different stage of the buyer journey."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {PLATFORMS.map((platform) => (
                <article
                  key={platform.name}
                  className="border border-white/10 bg-[#070707] p-6"
                >
                  <div className="mb-4 flex items-center gap-2">
                    {platform.logoBrands?.length ? (
                      platform.logoBrands.map((brand) => (
                        <span
                          key={brand}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.03]"
                        >
                          <BrandLogo
                            brand={brand}
                            theme="dark"
                            decorative
                            className="h-4 w-4"
                          />
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                        Local
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    Channel
                  </p>
                  <h2 className="mt-2 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {platform.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                    {platform.why}
                  </p>
                </article>
              ))}
            </div>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
              )}
            >
              <div className="max-w-2xl space-y-3">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                  Invite only
                </p>
                <h2 className="text-2xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  ChatGPT Ads
                </h2>
                <p className="text-sm leading-7 text-[#b8afa2]">
                  A new place to show up: inside the conversation. Access is
                  limited to Prism&apos;s network. If you were invited, bring
                  your code.
                </p>
              </div>
              <CoreActionLink
                href="/chatgpt-ads"
                label="see chatgpt ads"
                location="ads chatgpt"
                variant="primary"
              >
                See the program
              </CoreActionLink>
            </div>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Fit"
              title="Who we help scale with ads."
              description="Local teams that want to reach more potential customers and understand what their ad spend delivers."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {AUDIENCE_SEGMENTS.map((segment) => (
                <Link
                  key={segment.name}
                  href={segment.href}
                  className={cn(
                    coreRoutePanelClassName,
                    'block p-6 transition-colors hover:border-white/20',
                  )}
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    Segment
                  </p>
                  <h2 className="mt-3 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {segment.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                    {segment.description}
                  </p>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9c1b6]">
                    See how we support them →
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#b8afa2]">
              Running paid social for a dental practice? Start with{' '}
              <Link
                href="/facebook-ads-for-dentists"
                className="text-[#f5f0e8] underline underline-offset-4"
              >
                Facebook ads for dentists
              </Link>
              . Want short-form demand too? See{' '}
              <Link
                href="/tiktok-ads-for-dentists"
                className="text-[#f5f0e8] underline underline-offset-4"
              >
                TikTok ads for dentists
              </Link>
              .
            </p>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Process"
              title="Launch, learn, and improve."
              description="A simple loop from first brief to weekly optimization."
              titleClassName="max-w-[16ch]"
            />
            <ol className="mt-10 grid gap-4 md:grid-cols-5">
              {PROCESS_STEPS.map((stage, index) => (
                <li
                  key={stage.step}
                  className="border border-white/10 bg-[#070707] p-5"
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[#8f877b]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-5 text-xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {stage.step}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#b8afa2]">
                    {stage.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={coreRouteSectionClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading
              eyebrow="Outcomes"
              title="What we work to improve."
              description="We review lead quality, conversion rates, and cost per lead to guide the next decision."
              titleClassName="max-w-[16ch]"
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <li
                  key={outcome}
                  className="border border-white/10 bg-[#070707] p-6 text-sm leading-7 text-[#c9c1b6]"
                >
                  {outcome}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                What we handle
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {HANDLED_FOR_YOU.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#c9c1b6]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {adsBlogPosts.length > 0 ? (
          <section className={coreRouteSectionClassName}>
            <div className={coreRouteContainerClassName}>
              <CoreSectionHeading
                eyebrow="From the blog"
                title="Ads and growth notes."
                description="Playbooks on offers, targeting, and scaling paid channels without waste."
              />
              <div className="mt-10">
                <SimpleBlogGrid posts={adsBlogPosts}>
                  {adsBlogPosts.map((post) => (
                    <SimpleBlogPostCard
                      key={post.slug}
                      title={post.title}
                      category={post.category}
                      date={post.date}
                      author={post.author}
                      description={post.description}
                      slug={post.slug}
                      image={post.image}
                      gradientClass={post.gradientClass}
                    />
                  ))}
                </SimpleBlogGrid>
              </div>
              <div className="mt-8">
                <CoreActionLink
                  href="/blog"
                  label="browse all articles"
                  location="ads blog"
                  variant="primary"
                >
                  Browse all articles
                </CoreActionLink>
              </div>
            </div>
          </section>
        ) : null}

        <section className={coreRouteSectionCompactClassName}>
          <div className={coreRouteContainerClassName}>
            <CoreSectionHeading eyebrow="FAQ" title="Before you spend." />
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
          <div className={coreRouteContainerClassName}>
            <div
              className={cn(
                coreRouteContainedSectionClassName,
                'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
              )}
            >
              <div className="max-w-xl space-y-3">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8f877b]">
                  Referral program
                </p>
                <h2 className="text-2xl font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  Know a team who needs better ads?
                </h2>
                <p className="text-sm leading-7 text-[#b8afa2]">
                  Point them to Prism&apos;s referral program. We take it from
                  there, and you get $100 when they become a client.
                </p>
              </div>
              <CoreActionLink
                href="/refer"
                label="refer a business"
                location="ads refer"
                variant="primary"
              >
                Refer a business
              </CoreActionLink>
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
              title="Ready to reach better customers?"
              description="We will map your audience, channels, and starting budget, with a clear plan for measuring results."
              titleClassName="max-w-[16ch]"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <CoreActionLink
                href={BOOK_A_CALL_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="heroPrimary"
                label="book a free demo"
                location="ads final"
              >
                {BOOK_A_CALL_CTA.label}
              </CoreActionLink>
              <CoreActionLink
                href="/free-analysis"
                variant="heroSecondary"
                label="get a free growth audit"
                location="ads final"
              >
                Get a free growth audit
              </CoreActionLink>
            </div>
          </div>
        </section>
        <ServiceSiblings current="ads" />
      </main>
      <Footer />
      <ServiceSchema
        serviceId="paid-ads-service"
        name="Prism Ads"
        description="Full-funnel paid search and social campaigns with creative, targeting, landing paths, and tracking across Google, Meta, TikTok, and Yelp."
        serviceType="Digital marketing"
        areaServed="United States"
        offerDetails={{
          name: 'Prism Ads',
          description:
            'Paid ads across Google, Meta, TikTok, and Yelp with creative, targeting, landing paths, and tracking. Scoped on a 30-minute call.',
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/ads',
        }}
      />
      <FAQSchema questions={[...FAQ_ITEMS]} />
    </div>
  )
}

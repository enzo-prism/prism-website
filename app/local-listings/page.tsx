import FAQSection from '@/components/faq-section'
import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import Footer from '@/components/footer'
import { LandingHero } from '@/components/landing/landing-hero'
import { BulletList } from '@/components/landing/seo/bullet-list'
import Navbar from '@/components/navbar'
import { DisclosurePanel } from '@/components/prism/disclosure-panel'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import ScrollToTop from '@/components/scroll-to-top'
import { SeoSection } from '@/components/seo/seo-section'
import SimpleBlogGrid from '@/components/simple-blog-grid'
import SimpleBlogPostCard from '@/components/simple-blog-post-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, ArrowUpRight, MapPin, Store } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'
import { ServiceSchema } from '@/components/schema-markup'
import { getAllPosts } from '@/lib/mdx-data'
import VideoPlayer from '@/components/video-player'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA } from '@/lib/waitlist'

type Platform = {
  name: string
  why: string
  logoBrands?: readonly BrandLogoKey[]
}

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Local listings management and cleanup',
  description:
    'Keep your business accurate across Google, Apple, Yelp, Bing, Facebook, and other local directories.',
  path: '/local-listings',
  ogImage: '/prism-opengraph.png',
})

const whatYouGet = [
  {
    title: 'The right details in the right places',
    description:
      'name, address, phone, website, hours, service area, and categories aligned across platforms.',
  },
  {
    title: 'Make it easy to call or visit',
    description:
      'offers, services, photos, faqs, and action buttons built to drive calls, directions, and bookings.',
  },
  {
    title: 'Services people can understand',
    description:
      'category tuning, service lists, attributes, and content that improve local relevance.',
  },
  {
    title: 'reviews that build trust',
    description: 'a clear process for requesting honest feedback and reviewing responses.',
  },
  {
    title: 'spam cleanup and duplicate removal',
    description: 'we identify duplicates and submit corrections through each platform.',
  },
  {
    title: 'transparent results',
    description:
      'track calls, messages, directions, and website clicks in plain english.',
  },
]

const platforms: readonly Platform[] = [
  {
    name: 'Google Business Profile',
    why: 'Map Pack visibility when buyers are searching now.',
    logoBrands: ['googleMaps', 'google'],
  },
  {
    name: 'Apple Business Connect',
    why: 'Native iPhone Maps presence and Showcases for timely promos.',
    logoBrands: ['apple'],
  },
  {
    name: 'Yelp',
    why: 'High-intent local shoppers comparing options.',
  },
  {
    name: 'Bing Places',
    why: 'Extra reach on Windows and Edge users.',
    logoBrands: ['bing'],
  },
  {
    name: 'Facebook and Instagram',
    why: 'Social discovery plus accurate business details.',
    logoBrands: ['facebook', 'instagram'],
  },
  {
    name: 'Nextdoor and Waze',
    why: 'Neighborhood credibility and drive-time visibility.',
  },
]

const rankingLevers = [
  {
    title: 'relevance',
    description:
      'correct categories, services, and keywords so you match the right searches.',
  },
  {
    title: 'prominence',
    description:
      'reviews, photos, and consistent data that build authority over time.',
  },
  {
    title: 'accurate location details',
    description:
      'real addresses and service areas, so customers know where you work.',
  },
  {
    title: 'engagement',
    description:
      'posts, q&a, and offers that drive clicks, calls, and bookings.',
  },
]

const processSteps = [
  {
    step: 'Audit and Plan',
    description: 'review the listings in your plan, find gaps, and set priorities.',
  },
  {
    step: 'Fix and Claim',
    description: 'claim eligible profiles, request duplicate removal, and submit corrections.',
  },
  {
    step: 'Build to Convert',
    description:
      'categories, services, photos, faqs, offers, and ctas that turn views into action.',
  },
  {
    step: 'Review Engine',
    description:
      'simple requests for honest customer feedback, with responses reviewed before posting.',
  },
  {
    step: 'Maintain and Improve',
    description:
      'checks and updates at the agreed cadence, including seasonal hours and service changes.',
  },
]

const handledForYou = [
  'Claiming and verification',
  'Consistent name, address, and phone',
  'Categories and services',
  'Attributes and amenities',
  'Hours and holiday hours',
  'Service-area setup',
  'Photos and short videos',
  'Google Posts, Apple Showcases, Yelp updates',
  'Q&A and messaging setup',
  'Review collection and responses',
  'Duplicate suppression',
  'Suspension support',
  'Tracking with UTM and GA4',
  'Monthly reporting',
]

const outcomes = [
  'Help nearby customers find accurate business information.',
  'Clear links for calls, directions, and appointment requests.',
  'Genuine reviews that help people make an informed choice.',
  'Fewer conflicting details across the platforms in your plan.',
]

const faqItems = [
  {
    question: 'Do I need this if I already run ads?',
    answer:
      'Listings and ads serve different needs. People may check your address, hours, or reviews after seeing an ad. We review both before recommending what to improve.',
  },
  {
    question: 'How fast will I see results?',
    answer:
      'Some information can be corrected quickly; other changes require platform review. We separate completed updates from changes in visibility and inquiries, which take time to assess.',
  },
  {
    question:
      'Can you help if my Google listing is suspended or has duplicates?',
    answer:
      'We can investigate the issue and help prepare corrections or a reinstatement request. The platform makes the final decision, so approval cannot be guaranteed.',
  },
  {
    question: 'What if I have multiple locations?',
    answer:
      'We standardize data, tailor content per location, and roll out updates at scale.',
  },
  {
    question: 'Do I keep access to my listings?',
    answer: 'Yes. You retain ownership and admin access to every profile.',
  },
]

const audienceSegments = [
  {
    name: 'Dental & medical teams',
    description:
      'clear practice details, treatment information, and appointment links that help patients decide where to seek care.',
    href: '/dental-practice-seo-expert',
  },
  {
    name: 'Local shop owners',
    description:
      'menu, product, and offer updates synced across google, yelp, and apple to turn searches into visits.',
    href: '/why-local-shop-owners-love-prism',
  },
  {
    name: 'Consulting & professional services',
    description:
      'thoughtfully managed profiles that reinforce credibility and capture high-intent calls.',
    href: '/why-consulting-companies-love-prism',
  },
  {
    name: 'Online community founders',
    description:
      'event, meetup, and program listings that keep members engaged and invite new ones in.',
    href: '/why-online-community-founders-love-prism',
  },
  {
    name: 'Nonprofits & education',
    description:
      'accurate info, volunteer spotlights, and donation ctas that grow awareness in every neighborhood.',
    href: '/why-nonprofits-love-prism',
  },
]

export default async function LocalListingsPage() {
  const allPosts = (await getAllPosts()) ?? []
  const localListingsPosts = allPosts
    .filter((post) => {
      const slug = post.slug.toLowerCase()
      const category = (post.category ?? '').toLowerCase()
      const description = (post.description ?? '').toLowerCase()
      return (
        slug.includes('listing') ||
        slug.includes('map') ||
        slug.includes('local') ||
        slug.includes('google-business') ||
        category.includes('local') ||
        category.includes('listing') ||
        category.includes('local seo') ||
        description.includes('listing') ||
        description.includes('map pack') ||
        description.includes('local') ||
        description.includes('google business profile') ||
        description.includes('google maps')
      )
    })
    .slice(0, 3)

  const inlineLink =
    'font-medium text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70'

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="local listing optimization"
          title="be the obvious choice in your neighborhood."
          description="Accurate hours, photos, and reviews across Google, Apple, Yelp, Bing, and Maps."
          location="local listings hero"
          ctaHref={WAITLIST_CTA.href}
          ctaLabel={FREE_AUDIT_CTA_TEXT}
          secondary={{ label: 'See our process', href: '#process' }}
          glow="green"
        >
          <ul
            aria-label="Platforms we manage"
            className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5"
          >
            {platforms.map((platform) => (
              <li
                key={platform.name}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-sm text-muted-foreground backdrop-blur-sm"
              >
                <span className="flex -space-x-1.5">
                  {platform.logoBrands?.length ? (
                    platform.logoBrands.map((brand) => (
                      <span
                        key={brand}
                        className="grid size-7 place-items-center rounded-full border border-white/10 bg-card"
                      >
                        <BrandLogo brand={brand} theme="dark" decorative className="h-3.5 w-3.5" />
                      </span>
                    ))
                  ) : (
                    <span className="grid size-7 place-items-center rounded-full border border-white/10 bg-card">
                      <MapPin aria-hidden="true" className="size-3.5 text-foreground" />
                    </span>
                  )}
                </span>
                {platform.name}
              </li>
            ))}
          </ul>
        </LandingHero>

        <SeoSection
          id="local-listings-founder-vsl"
          eyebrow="hear from our founder"
          title="your listing is the first impression."
          description={
            <>
              Need the full plan beyond listings? Work with Prism as your{' '}
              <Link href="/local-seo-agency" className={inlineLink}>
                local seo agency
              </Link>
              .
            </>
          }
        >
          <VideoPlayer
            src="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763162481/local_listings_di9gy7.mp4"
            poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/local_listings_di9gy7.jpg"
            title="Founder Enzo Sison on owning your local listings"
            caption="Enzo explains why your Google Business Profile is the real first impression, how Prism refreshes every listing (Google, Apple, Yelp, Bing, and more), and why accurate listings matter for visibility, calls, and loyal regulars."
            schema={{
              id: 'https://www.design-prism.com/local-listings#founder-vsl',
              name: 'Founder Enzo Sison on owning your local listings',
              description:
                'Enzo Sison covers why outdated listings kill trust and how Prism rebuilds Google, Apple, Yelp, and Bing profiles (photos, services, descriptions, posts, and reviews) to lift visibility, conversions, and repeat business.',
              thumbnailUrl:
                'https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0,q_auto/local_listings_di9gy7.jpg',
              uploadDate: '2025-01-24T00:00:00Z',
              duration: 'PT60S',
              contentUrl:
                'https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1763162481/local_listings_di9gy7.mp4',
              embedUrl:
                'https://www.design-prism.com/local-listings#founder-vsl',
              width: 1920,
              height: 1080,
              creatorName: 'Enzo Sison',
            }}
          />
        </SeoSection>

        <Section aria-labelledby="listings-platforms-title">
          <Reveal>
            <SectionHeader
              id="listings-platforms-title"
              eyebrow="coverage"
              title="platforms we manage."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform, index) => (
              <Reveal key={platform.name} delay={(index % 3) * 70}>
                <SpotlightCard beam={index === 0} className="h-full p-6">
                  <div className="flex items-center gap-2">
                    {platform.logoBrands?.length ? (
                      platform.logoBrands.map((brand) => (
                        <span
                          key={brand}
                          className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"
                        >
                          <BrandLogo brand={brand} theme="dark" decorative className="h-[18px] w-[18px]" />
                        </span>
                      ))
                    ) : (
                      <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <MapPin className="size-[18px] text-foreground" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-heading mt-5 text-foreground">{platform.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{platform.why}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section aria-labelledby="listings-handled-title" className="py-10 sm:py-12">
          <Reveal>
            <SectionHeader
              id="listings-handled-title"
              eyebrow="full service"
              title="what we handle for you."
              align="center"
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {handledForYou.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section id="process" aria-labelledby="listings-what-you-get-title" className="scroll-mt-20 py-10 sm:py-12">
          <DisclosurePanel
            id="listings-details"
            eyebrow="Full breakdown"
            title="process, ranking signals, industries, and outcomes."
            summary="5-step cleanup, 6 deliverables, ranking levers, and who we help."
            openLabel="View breakdown"
            closeLabel="Hide breakdown"
          >
            <div className="space-y-12">
              <div>
                <h3 id="listings-what-you-get-title" className="text-heading text-foreground">
                  what you get.
                </h3>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
                  {whatYouGet.map((item, index) => (
                    <li key={item.title} className="flex flex-col gap-2 bg-card p-5">
                      <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                      <h4 className="text-base font-semibold tracking-[-0.02em] text-foreground">{item.title}</h4>
                      <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/[0.08] pt-10">
                <h3 id="listings-improve-title" className="text-heading text-foreground">
                  what we improve on your profiles.
                </h3>
                <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
                  {rankingLevers.map((item) => (
                    <div key={item.title} className="bg-background/60 p-5">
                      <dt className="text-base font-semibold tracking-[-0.02em] text-foreground">{item.title}</dt>
                      <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm text-muted-foreground">
                  Dental practice? Read{' '}
                  <Link href="/blog/dental-practice-rank-higher-google-search" className={inlineLink}>
                    dental practice rank higher in google search
                  </Link>
                  .
                </p>
              </div>

              <div className="border-t border-white/[0.08] pt-10">
                <h3 className="text-heading text-foreground">our 5-step process.</h3>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {processSteps.map((stage, index) => (
                    <li key={stage.step} className="rounded-xl border border-white/[0.08] bg-background/60 p-4">
                      <span className="font-mono text-xs tabular-nums text-subtle">0{index + 1}</span>
                      <h4 className="mt-2 text-base font-semibold text-foreground">{stage.step}</h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{stage.description}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-6 border-t border-white/[0.08] pt-10 lg:grid-cols-2">
                <div>
                  <h3 className="text-heading text-foreground">who we lift in the map pack.</h3>
                  <ul className="mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    {audienceSegments.map((segment) => (
                      <li key={segment.name}>
                        <Link
                          href={segment.href}
                          className="group/segment flex items-start justify-between gap-4 py-4"
                        >
                          <span>
                            <span className="block text-base font-semibold text-foreground">{segment.name}</span>
                            <span className="mt-1 block text-sm text-muted-foreground">{segment.description}</span>
                          </span>
                          <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-subtle" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-5">
                  <Card className="p-6">
                    <h3 className="text-heading text-foreground">outcomes you can expect.</h3>
                    <BulletList items={outcomes} className="mt-4" />
                    <p className="mt-5 flex items-start gap-2.5 text-sm text-subtle">
                      <Store aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                      You keep ownership and admin access to every profile.
                    </p>
                  </Card>
                  <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Badge variant="outline">referral program</Badge>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Refer a business struggling with listings and earn $100 when they join.
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="shrink-0">
                      <Link href="/refer">
                        refer a business
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Section>

        {localListingsPosts.length > 0 ? (
          <Section aria-labelledby="listings-blog-title">
            <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                id="listings-blog-title"
                eyebrow="from the blog"
                title="local visibility notes."
                description="Field guides on tightening map-pack signals, cleaning data, and keeping listings conversion-ready."
              />
              <Button asChild variant="outline" size="lg" className="shrink-0">
                <Link href="/blog">
                  browse all articles
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Reveal>
            <div className="mt-12 sm:mt-14">
              <SimpleBlogGrid posts={localListingsPosts}>
                {localListingsPosts.map((post) => (
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
          </Section>
        ) : null}

        <FAQSection
          title="local listings faq."
          subtitle="Quick answers so you know exactly how we manage and grow every profile."
          items={faqItems}
        />

        <FinalCta
          location="local listings final cta"
          title="become the local favorite."
          secondary={{ label: 'See case studies', href: '/case-studies' }}
        />
      </main>

      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="local-listings-service"
        name="Local listing optimization"
        description="listings, review flows, and reporting that keep brick-and-mortar teams visible everywhere patients search."
        serviceType="Local SEO"
        areaServed="United States"
        offerDetails={{
          name: 'Prism local visibility',
          description:
            "Listings, review flows, local visibility, and reporting delivered under Prism's productized offers.",
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          availability: 'https://schema.org/LimitedAvailability',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
    </div>
  )
}

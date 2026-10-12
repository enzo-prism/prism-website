import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Apple, ArrowRight } from 'lucide-react'

import Footer from '@/components/footer'
import { ArrowLink } from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow, Section } from '@/components/prism/section'
import { WebPageSchema } from '@/components/schema-markup'
import ScrollToTop from '@/components/scroll-to-top'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'
import { WAITLIST_FOCUS_HREFS } from '@/lib/waitlist'

import RecentShootsSection from './recent-shoots-section'

const PAGE_TITLE = 'Dental office and team photography'
const PAGE_DESCRIPTION =
  'Capture your dental team, office, and patient experience in one focused photo shoot.'
const CANONICAL_URL =
  'https://www.design-prism.com/dental-photography/office-team'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/dental-photography/office-team',
  ogImage: '/prism-opengraph.png',
})

const recentShoots = [
  {
    practice: 'Christopher B. Wong, DDS',
    location: 'San Francisco, CA',
    date: 'June 2024',
    website: 'https://www.chriswongdds.com',
    summary:
      'Team portraits, operatory vibes, and candid patient journey moments captured in a single afternoon.',
    shots: [
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989227/Post-4_cbdv72.webp',
        alt: 'Christopher B. Wong DDS office',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989227/Polaroids_iep3fj.webp',
        alt: 'Christopher B. Wong DDS polaroids',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-12_uj6ocp.webp',
        alt: 'Christopher B. Wong DDS team',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-13_vdeedx.webp',
        alt: 'Christopher B. Wong DDS candid',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-14_fwupg6.webp',
        alt: 'Christopher B. Wong DDS waiting room',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-6_uhnnyg.webp',
        alt: 'Christopher B. Wong DDS provider',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-11_nohz6f.webp',
        alt: 'Christopher B. Wong DDS operatory',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-10_uwocux.webp',
        alt: 'Christopher B. Wong DDS macro',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-9_njmhxx.webp',
        alt: 'Christopher B. Wong DDS candid two',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-7_d8rmrk.webp',
        alt: 'Christopher B. Wong DDS smile',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-8_jmfidt.webp',
        alt: 'Christopher B. Wong DDS doctor',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post_e0ayi2.webp',
        alt: 'Christopher B. Wong DDS lifestyle',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-3_ozzl2t.webp',
        alt: 'Christopher B. Wong DDS hallway',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-2_hdbi3u.webp',
        alt: 'Christopher B. Wong DDS tech',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-5_dib4rp.webp',
        alt: 'Christopher B. Wong DDS lounge',
      },
      {
        src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989225/Post-1_fvwhxy.webp',
        alt: 'Christopher B. Wong DDS team selfie',
      },
    ],
  },
]

const appleMapsShowcase = {
  src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762536247/Screenshot_2025-11-07_at_9.22.02_AM_ytszq1.webp',
  alt: 'Christopher B. Wong DDS listing on Apple Maps featuring Prism photography',
}

const heroShots = [0, 1, 9, 10, 15].map((index) => recentShoots[0].shots[index])

export default function OfficeTeamPhotographyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Office + team shoots"
          title="one button to book the office shoot patients actually want to see."
          description="give us a date and we’ll capture portraits, lobby vibes, and candid team moments that plug straight into your website, ads, and recruiting funnels."
          location="office team photography hero"
          ctaHref={WAITLIST_FOCUS_HREFS.content}
          secondary={{ label: 'Before + after guide', href: '/dental-photography/before-after' }}
          glow="warm"
          titleClassName="max-w-[19ch]"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
            {heroShots.map((shot, index) => (
              <div
                key={shot.src}
                className={cn(
                  'relative overflow-hidden rounded-2xl border border-white/10 bg-popover',
                  index === 0
                    ? 'col-span-2 aspect-[4/3] sm:row-span-2 sm:aspect-auto'
                    : 'aspect-[4/3]',
                  index > 2 && 'hidden sm:block',
                )}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes={index === 0 ? '(min-width: 640px) 50vw, 92vw' : '(min-width: 640px) 25vw, 46vw'}
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-subtle">
            From the {recentShoots[0].practice} shoot, {recentShoots[0].date}
          </p>
        </LandingHero>

        <RecentShootsSection shoots={recentShoots} />

        <Section aria-labelledby="ot-maps-title">
          <Reveal>
            <Card className="grid overflow-hidden lg:grid-cols-2">
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                <Eyebrow>
                  <span className="inline-flex items-center gap-1.5">
                    <Apple className="size-3.5" aria-hidden />
                    Apple Maps
                  </span>
                </Eyebrow>
                <h2 id="ot-maps-title" className="text-title text-gradient mt-5 max-w-[14ch] text-balance pb-1">
                  how it shows on Apple Maps.
                </h2>
                <p className="mt-5 max-w-[48ch] text-[15px] leading-7 text-muted-foreground">
                  every photo from the shoot feeds straight into your Apple
                  Business Connect listing. the result: a premium, credible first
                  impression when patients search on their iPhone.
                </p>
                <ArrowLink href="/local-listings" className="mt-5">
                  learn more about listings
                </ArrowLink>
              </div>
              <div className="relative h-[360px] overflow-hidden border-t border-white/[0.08] bg-background/60 sm:h-[460px] lg:h-auto lg:min-h-[520px] lg:border-l lg:border-t-0">
                <Image
                  src={appleMapsShowcase.src}
                  alt={appleMapsShowcase.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 92vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent"
                />
              </div>
            </Card>
          </Reveal>

          <Reveal delay={100} className="mt-4">
            <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-eyebrow text-subtle">Gear</p>
                <h2 className="mt-3 text-[19px] font-semibold tracking-[-0.02em] text-foreground">
                  gear for patient before &amp; after photos.
                </h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-7 text-muted-foreground">
                  See the exact lighting, macro, and retractors we pack so your team
                  can capture clinical-grade progress shots between Prism visits.
                </p>
              </div>
              <Button asChild variant="outline" size="lg" className="shrink-0">
                <Link href="/dental-photography/before-after">
                  View the guide
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </Card>
          </Reveal>
        </Section>

        <FinalCta location="office team photography final cta" href={WAITLIST_FOCUS_HREFS.content} />
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

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Camera,
  MapPin,
  Megaphone,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react'

import Footer from '@/components/footer'
import HeroBackgroundLoop from '@/components/HeroBackgroundLoop'
import { ArrowLink, CheckList } from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WebPageSchema } from '@/components/schema-markup'
import ScrollToTop from '@/components/scroll-to-top'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_FOCUS_HREFS } from '@/lib/waitlist'

const proofPoints = [
  {
    title: 'clinical storytelling that converts',
    description:
      'macro shots, operatory scenes, and lifestyle portraits that make premium care tangible for patients comparing options.',
  },
  {
    title: 'before-and-after clarity',
    description:
      'standardized angles and lighting so smile galleries, case studies, and landing pages feel trustworthy.',
  },
  {
    title: 'consistent brand system',
    description:
      'shot lists matched to your color palette, typography, and tone so every touchpoint from website to signage aligns.',
  },
  {
    title: 'assets built for every file format',
    description:
      'horizontal hero loops, square social cuts, and vertical shorts ready for ads, reels, stories, and listing galleries.',
  },
]

const channelCards = [
  {
    title: 'websites that feel alive',
    description:
      'hero videos, provider bios, treatment pages, and smile galleries swap stock for authentic footage that boosts time-on-site.',
    icon: <Sparkles className="size-5" aria-hidden />,
  },
  {
    title: 'ads that stop the scroll',
    description:
      'paid social, youtube, and display ads use cinematic b-roll and patient stories that raise CTR and trust.',
    icon: <Megaphone className="size-5" aria-hidden />,
  },
  {
    title: 'local listings that win the map pack',
    description:
      'google, apple, and yelp profiles stay refreshed with seasonal shots, procedure close-ups, and team portraits.',
    icon: <MapPin className="size-5" aria-hidden />,
  },
  {
    title: 'social feeds with a point of view',
    description:
      'reels, carousels, and behind-the-scenes snippets feed your content calendar for months after the shoot.',
    icon: <Share2 className="size-5" aria-hidden />,
  },
]

const shotTypes = [
  'provider portraits and team camaraderie',
  'patient journey b-roll from intake to post-op',
  'before / after macros with consistent lighting grids',
  'operatory tech, lab gear, and sterilization proof',
  'community involvement and office culture moments',
  'short-form video clips for reels, shorts, and ads',
]

const specialtyTracks = [
  {
    label: 'culture & recruiting (bookable)',
    title: 'office & team photography',
    description:
      'portraits, lobby, and candid team stories shot by prism. perfect for websites, ads, local listings, and hiring kits.',
    href: '/dental-photography/office-team',
    icon: <Users className="size-5" aria-hidden />,
  },
  {
    label: 'case acceptance (diy guide)',
    title: 'before + after photography equipment guide',
    description:
      'a self-serve protocol any practice can run in-house to capture standardized before/after photos and clips for case presentations.',
    href: '/dental-photography/before-after',
    icon: <Award className="size-5" aria-hidden />,
  },
]

const PAGE_TITLE = 'Dental photography'
const PAGE_DESCRIPTION =
  'On-site dental photography and video for your website, paid ads, local listings, and social channels.'
const CANONICAL_URL = 'https://www.design-prism.com/dental-photography'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/dental-photography',
  ogImage: '/prism-opengraph.png',
})

export default function DentalPhotographyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow="Dental photography"
          title="pro photos that make every prism deliverable hit harder."
          description="we shoot cinematic photos inside your practice so websites feel bespoke, ads look premium, local listings stay fresh, and social media never runs out of material."
          location="dental photography hero"
          ctaHref={WAITLIST_FOCUS_HREFS.content}
          secondary={{ label: 'Office + team photos', href: '/dental-photography/office-team' }}
          glow="warm"
          titleClassName="max-w-[18ch]"
        >
          <figure className="mx-auto max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-popover shadow-[0_30px_80px_-30px_oklch(0_0_0/90%)]">
              <HeroBackgroundLoop
                videoSrc="https://res.cloudinary.com/dhqpqfw6w/video/upload/q_auto,vc_auto/v1761852734/models_2_x9gxtj.mp4"
                posterSrc="https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1600/v1761853323/thumbnail_yscklx.webp"
                posterAlt="Behind the scenes of a Prism photo and video shoot"
                videoClassName="pointer-events-none hidden h-full w-full object-cover sm:block"
                posterClassName="absolute inset-0 h-full w-full object-cover"
                posterSizes="(min-width: 1024px) 1024px, 92vw"
                posterUnoptimized
              />
            </div>
            <figcaption className="mt-3 text-center font-mono text-[11px] text-subtle">
              Behind the scenes on a Prism shoot
            </figcaption>
          </figure>
        </LandingHero>

        <Section aria-label="Dental photography services" className="pt-4 sm:pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {specialtyTracks.map((track, index) => {
              const isOfficeTeam = track.href === '/dental-photography/office-team'
              const Shell = index === 0 ? SpotlightCard : Card
              return (
                <Reveal key={track.title} delay={index * 100}>
                  <Shell className="flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                        {track.icon}
                      </span>
                      <div>
                        <p className="text-eyebrow text-subtle">{track.label}</p>
                        <h2 className="text-heading mt-1.5 text-foreground">{track.title}</h2>
                      </div>
                    </div>
                    <p className="mt-5 flex-1 text-[15px] leading-7 text-muted-foreground">{track.description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button asChild variant="outline">
                        <Link href={track.href}>
                          {isOfficeTeam ? 'View results' : 'Open the guide'}
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </Button>
                      {isOfficeTeam ? (
                        <ArrowLink href={WAITLIST_FOCUS_HREFS.content} className="px-2">
                          join the waitlist
                        </ArrowLink>
                      ) : null}
                    </div>
                  </Shell>
                </Reveal>
              )
            })}
          </div>
        </Section>

        <Section aria-labelledby="dp-why-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <Reveal className="flex flex-col gap-8">
              <SectionHeader
                id="dp-why-title"
                eyebrow="Why it matters"
                title="photos that sell dentistry."
                description="patients judge the quality of your work before they ever call. our creative team directs real moments with your dentists, team, and patients so every pixel feels candid, modern, and clinically accurate."
              />
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
                {proofPoints.map((item) => (
                  <li key={item.title} className="bg-card p-5 sm:p-6">
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="lg:pt-28">
              <Card className="p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Camera className="size-5 text-foreground" aria-hidden />
                  </span>
                  <div>
                    <p className="text-eyebrow text-subtle">Shot list staples</p>
                    <h3 className="mt-1.5 text-[19px] font-semibold tracking-[-0.02em] text-foreground">
                      delivered from every shoot
                    </h3>
                  </div>
                </div>
                <CheckList className="mt-6" items={shotTypes} />
                <p className="mt-6 rounded-xl border border-white/[0.07] bg-background/60 px-4 py-3 text-[14px] leading-6 text-muted-foreground">
                  ready-to-publish folders land in your drive plus a highlight
                  reel for quick approvals.
                </p>
              </Card>
            </Reveal>
          </div>
        </Section>

        <Section aria-labelledby="dp-engines-title">
          <Reveal>
            <SectionHeader
              id="dp-engines-title"
              eyebrow="Plugged into Prism"
              title="one shoot, four growth engines."
              description="your photo library syncs straight into prism’s website sprints, ad builds, local listing optimizations, and social calendars so every campaign launches faster and stays on-brand."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channelCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <Card className="flex h-full flex-col p-6 transition-colors hover:border-white/[0.16]">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                    {card.icon}
                  </span>
                  <h3 className="mt-6 text-[17px] font-semibold tracking-[-0.02em] text-foreground">{card.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted-foreground">{card.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <FinalCta
          location="dental photography final cta"
          href={WAITLIST_FOCUS_HREFS.content}
          title="pick the direction, we handle the shoot."
          description="whether you want prism on-site for office + team photography or you’re following the before + after guide yourself, we make sure every asset lands where it needs to go."
          secondary={{ label: 'Open the DIY guide', href: '/dental-photography/before-after' }}
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

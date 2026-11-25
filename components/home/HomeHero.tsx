import { ArrowDown } from 'lucide-react'

import { HomeAppCard } from '@/components/home/HomeAppCallout'
import HomeRefraction from '@/components/home/HomeRefraction'
import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import TrackedAnchor from '@/components/tracked-anchor'
import TrackedLink from '@/components/tracked-link'
import { BandTransition } from '@/components/prism/band-transition'
import {
  PRISM_SERVICE_BANDS,
  PRISM_SERVICES,
  serviceBandTransitionName,
} from '@/lib/services'

/** The four services, each with its own band (lib/services.ts). */
const HERO_SERVICE_BANDS = (['website', 'content', 'ads', 'aeo'] as const).map(
  (id) => {
    const service = PRISM_SERVICES.find((item) => item.id === id)!
    return {
      id,
      label: service.name,
      href: service.href,
      band: PRISM_SERVICE_BANDS[id],
    }
  },
)

export default function HomeHero() {
  return (
    <section
      id="homepage-hero"
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--prism-header-height,64px)+1.25rem)] sm:pt-[calc(var(--prism-header-height,64px)+1.75rem)]"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-x-0 top-0 -z-10 h-[860px] opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12%] -z-10 h-[720px] w-[1100px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(closest-side,oklch(1_0_0/9%),transparent)]"
      />

      <div className="prism-container flex flex-col items-center text-center">
        <WaitlistStatus className="prism-rise [--rise-delay:60ms]" />

        <h1 id="home-hero-title" className="text-hero mt-5 pb-2 sm:mt-5">
          <span className="text-gradient block whitespace-nowrap">
            {HOMEPAGE_HERO.titleLead}
          </span>{' '}
          <span className="prism-glint block whitespace-nowrap">
            {HOMEPAGE_HERO.titleAccent}
          </span>
        </h1>

        <p className="text-lead prism-rise mt-3 max-w-[38rem] text-pretty text-muted-foreground [--rise-delay:240ms] sm:mt-4">
          {HOMEPAGE_HERO.subheading}
        </p>

        {/* One primary action. "See the work" is a quiet text link, so the
            eye never has to choose between two buttons. */}
        <div className="prism-rise mt-7 flex w-full flex-col items-center justify-center gap-2 [--rise-delay:320ms] sm:w-auto sm:flex-row sm:gap-5">
          <WaitlistButton
            label={HOMEPAGE_HERO.primaryCta.label}
            location="homepage hero"
            size="xl"
            className="w-full sm:w-auto"
          />
          <TrackedAnchor
            href={HOMEPAGE_HERO.secondaryCta.href}
            label="see the work"
            location="homepage hero"
            className="group/work inline-flex min-h-12 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium text-muted-foreground transition-colors duration-(--dur-ui) hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {HOMEPAGE_HERO.secondaryCta.label}
            <ArrowDown
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover/work:translate-y-0.5"
            />
          </TrackedAnchor>
        </div>
      </div>

      <div className="relative -mt-6 sm:-mt-12 lg:-mt-16">
        <HomeRefraction labels={HOMEPAGE_HERO.spectrumLabels} />
        <HomeAppCard />
      </div>

      {/* Phones: the band labels ride off the right edge of the scene, so
          the four services land under the prism instead, each in the band
          it came out of (one beam in, a spectrum out). */}
      <nav
        aria-label="Services"
        className="prism-container relative -mt-2 pb-12 md:hidden"
      >
        <ul className="grid grid-cols-2 gap-2">
          {HERO_SERVICE_BANDS.map((service, index) => (
            <li
              key={service.href}
              className="prism-rise"
              style={{ ['--rise-delay' as string]: `${1500 + index * 90}ms` }}
            >
              <TrackedLink
                href={service.href}
                label={service.label}
                location="homepage hero services"
                className="flex min-h-11 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 text-[13px] font-medium text-foreground/90 transition-[background-color,scale] duration-(--dur-press) ease-(--ease-out) hover:bg-white/[0.06] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97]"
              >
                {/* The band grows into the service page's hero. */}
                <BandTransition name={serviceBandTransitionName(service.id)}>
                  <span
                    aria-hidden="true"
                    className="h-4 w-1 shrink-0 rounded-full"
                    style={{ background: service.band }}
                  />
                </BandTransition>
                {service.label}
              </TrackedLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

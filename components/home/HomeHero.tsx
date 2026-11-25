import { ArrowDown } from 'lucide-react'

import { HomeAppCard, HomeAppPill } from '@/components/home/HomeAppCallout'
import HomeRefraction from '@/components/home/HomeRefraction'
import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import TrackedAnchor from '@/components/tracked-anchor'
import { Button } from '@/components/ui/button'

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

        <h1
          id="home-hero-title"
          className="text-hero prism-rise mt-5 pb-2 [--rise-delay:140ms] sm:mt-5"
        >
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

        <div className="prism-rise mt-6 flex w-full flex-col items-center justify-center gap-3 [--rise-delay:320ms] sm:w-auto sm:flex-row">
          <Button
            asChild
            variant="default"
            size="xl"
            className="w-full sm:w-auto"
          >
            <TrackedAnchor
              href={HOMEPAGE_HERO.secondaryCta.href}
              label="see the work"
              location="homepage hero"
            >
              {HOMEPAGE_HERO.secondaryCta.label}
              <ArrowDown aria-hidden="true" />
            </TrackedAnchor>
          </Button>
          <WaitlistButton
            label={HOMEPAGE_HERO.primaryCta.label}
            location="homepage hero"
            variant="outline"
            size="xl"
            className="w-full sm:w-auto"
          />
        </div>

        <HomeAppPill />
      </div>

      <div className="relative -mt-6 sm:-mt-12 lg:-mt-16">
        <HomeRefraction labels={HOMEPAGE_HERO.spectrumLabels} />
        <HomeAppCard />
      </div>
    </section>
  )
}

import { ArrowDown } from 'lucide-react'

import HomeRefraction from '@/components/home/HomeRefraction'
import { HOMEPAGE_HERO } from '@/components/home/homepage-content'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import TrackedAnchor from '@/components/tracked-anchor'
import { Button } from '@/components/ui/button'

/**
 * Homepage hero: live capacity, the promise, one primary action, and the
 * refraction scene that shows what Prism does in one picture (your business
 * goes in as plain light, leaves as every channel at once).
 */
export default function HomeHero() {
  return (
    <section
      id="homepage-hero"
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden pt-[calc(var(--prism-header-height,64px)+3rem)] sm:pt-[calc(var(--prism-header-height,64px)+4.5rem)]"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-x-0 top-0 -z-10 h-[820px] opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12%] -z-10 h-[720px] w-[1100px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(closest-side,oklch(1_0_0/9%),transparent)]"
      />

      <div className="prism-container flex flex-col items-center text-center">
        <WaitlistStatus className="prism-rise [--rise-delay:60ms]" />

        <h1
          id="home-hero-title"
          className="text-display prism-rise mt-7 max-w-[13ch] text-balance pb-2 [--rise-delay:140ms] sm:max-w-[15ch]"
        >
          <span className="text-gradient">{HOMEPAGE_HERO.titleLead}</span>{' '}
          <span className="text-refract">{HOMEPAGE_HERO.titleAccent}</span>
        </h1>

        <p className="text-lead prism-rise mt-5 max-w-[36rem] text-pretty text-muted-foreground [--rise-delay:240ms]">
          {HOMEPAGE_HERO.subheading}
        </p>

        <div className="prism-rise mt-9 flex w-full flex-col items-center justify-center gap-3 [--rise-delay:320ms] sm:w-auto sm:flex-row">
          <WaitlistButton
            location="homepage hero"
            size="xl"
            className="w-full sm:w-auto"
          />
          <Button
            asChild
            variant="outline"
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
        </div>
      </div>

      <HomeRefraction
        labels={HOMEPAGE_HERO.spectrumLabels}
        className="mt-0 sm:-mt-4 lg:-mt-5"
      />

      <div className="prism-container relative -mt-6 pb-4 sm:-mt-16 lg:-mt-24">
        <ul
          aria-label="Prism at a glance"
          className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-white/[0.08]"
        >
          {HOMEPAGE_HERO.proof.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center gap-1 px-4 sm:px-7"
            >
              <span className="text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                {item.value}
              </span>
              <span className="max-w-[12ch] text-[12px] leading-snug text-subtle sm:max-w-none sm:text-[13px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

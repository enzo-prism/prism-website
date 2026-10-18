import type { CSSProperties } from 'react'
import { ArrowDown, Check } from 'lucide-react'

import { WaitlistButton } from '@/components/prism/waitlist-button'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { PRICING_PRIMARY_CTA, PRICING_SECONDARY_CTA } from '@/lib/pricing-model'

const HERO_PROMISES = [
  'Scope and price agreed before work begins',
  'One team for website, content, ads, and AEO',
  'New spots open every month',
] as const

const rise = (delay: number) =>
  ({ '--rise-delay': `${delay}ms` }) as CSSProperties

export default function PricingHero() {
  return (
    <section
      aria-labelledby="pricing-hero-heading"
      className="relative isolate overflow-hidden pb-12 pt-8 sm:pb-14 sm:pt-12"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-x-0 top-0 -z-10 h-[46rem] opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-14rem] -z-10 h-[36rem] w-[min(68rem,140vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/20%),transparent),radial-gradient(40%_50%_at_22%_60%,oklch(0.66_0.21_29/10%),transparent),radial-gradient(40%_50%_at_78%_60%,oklch(0.63_0.19_295/12%),transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="bg-noise mask-fade-b absolute inset-0 -z-10 opacity-[0.05]"
      />

      <div className="prism-container flex flex-col items-center text-center">
        <div className="prism-rise" style={rise(0)}>
          <WaitlistStatus />
        </div>

        <h1
          id="pricing-hero-heading"
          className="text-display text-gradient prism-rise mt-6 max-w-[17ch] text-balance pb-2"
          style={rise(80)}
        >
          a clearer way to invest in growth.
        </h1>

        <p
          className="text-lead prism-rise mt-5 max-w-[58ch] text-pretty text-muted-foreground"
          style={rise(160)}
        >
          A custom website, steady content, ads built around better leads,
          and a place in AI answers. Every plan is scoped to you and starts
          on the waitlist.
        </p>

        <div
          className="prism-rise mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={rise(240)}
        >
          <WaitlistButton
            location="pricing hero"
            href={PRICING_PRIMARY_CTA.href}
            label={PRICING_PRIMARY_CTA.label}
            size="xl"
            className="w-full sm:w-auto"
          />
          <Button
            asChild
            variant="outline"
            size="xl"
            className="group/compare w-full sm:w-auto"
          >
            <TrackedLink
              href={PRICING_SECONDARY_CTA.href}
              label={PRICING_SECONDARY_CTA.label.toLowerCase()}
              location="pricing hero"
            >
              {PRICING_SECONDARY_CTA.label}
              <ArrowDown
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/compare:translate-y-0.5"
              />
            </TrackedLink>
          </Button>
        </div>

        <ul
          className="prism-rise mt-8 flex flex-col items-center gap-x-7 gap-y-2.5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center"
          style={rise(320)}
        >
          {HERO_PROMISES.map((promise) => (
            <li key={promise} className="inline-flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 text-foreground/80" />
              {promise}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

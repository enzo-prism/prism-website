'use client'

import Script from 'next/script'
import { Clock, Sparkles, UserCheck, type LucideIcon } from 'lucide-react'

import { CoreActionLink } from '@/components/core-route/CoreRoutePrimitives'

import { LordIcon } from './LordIcon'

type GrowthProcessStep = {
  stage: string
  label: string
  icon: string
}

type HeroTrustChip = {
  icon: LucideIcon
  label: string
}

// Shared Lordicon palette: white primary with a Prism-green secondary.
const ICON_COLORS = 'primary:#ffffff,secondary:#16c72e'

export const GROWTH_PROCESS_STEPS: GrowthProcessStep[] = [
  {
    stage: '01',
    label: 'Share your business',
    icon: 'https://cdn.lordicon.com/wfjtyzqa.json',
  },
  {
    stage: '02',
    label: 'We audit it',
    icon: 'https://cdn.lordicon.com/raxyqlxo.json',
  },
  {
    stage: '03',
    label: 'Get your next move',
    icon: 'https://cdn.lordicon.com/rusvgrhw.json',
  },
]

const HERO_TRUST_CHIPS: HeroTrustChip[] = [
  { icon: Sparkles, label: 'Free' },
  { icon: Clock, label: '≈ 1 minute' },
  { icon: UserCheck, label: 'Reviewed by a real person' },
]

export default function GrowthProcessSection() {
  return (
    <section className="px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-20">
      <Script
        id="lordicon-loader"
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-[16ch] text-balance font-sans text-[clamp(2.3rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.05em] text-[#F5F5F2]">
          Three steps to your free Growth Audit.
        </h1>

        <p className="mt-5 max-w-[34rem] text-pretty font-sans text-[1.02rem] leading-7 text-[#A0A09A] sm:text-[1.1rem] sm:leading-8">
          Tell us about your business in about a minute. A real person reviews
          it and sends back your clearest next move — free.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {HERO_TRUST_CHIPS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8A8A1]"
            >
              <Icon
                aria-hidden="true"
                size={13}
                strokeWidth={1.8}
                className="shrink-0 text-[#9eff2e]"
              />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-7 w-full sm:w-auto">
          <CoreActionLink
            href="/apply"
            variant="heroPrimary"
            label="create free growth dashboard"
            location="get started hero"
          >
            Start my free growth audit
          </CoreActionLink>
        </div>

        <ol className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-3 sm:mt-16 sm:gap-6">
          {GROWTH_PROCESS_STEPS.map((step) => (
            <li key={step.stage} className="flex flex-col items-center gap-3">
              <div className="h-[clamp(56px,9vw,88px)] w-[clamp(56px,9vw,88px)]">
                <LordIcon src={step.icon} colors={ICON_COLORS} />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[#6E6E68]">
                  {step.stage}
                </span>
                <span className="max-w-[14ch] text-pretty font-sans text-[0.86rem] font-medium leading-5 tracking-[-0.01em] text-[#D6D6CF] sm:text-[0.95rem]">
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

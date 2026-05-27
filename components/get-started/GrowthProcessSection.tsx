'use client'

import Script from 'next/script'

import { CoreActionLink } from '@/components/core-route/CoreRoutePrimitives'

import { LordIcon } from './LordIcon'

type GrowthProcessStep = {
  stage: string
  label: string
  icon: string
}

export const GROWTH_PROCESS_STEPS: GrowthProcessStep[] = [
  {
    stage: '01',
    label: 'Create dashboard',
    icon: 'https://cdn.lordicon.com/gyvwavwk.json',
  },
  {
    stage: '02',
    label: 'Get Light Audit',
    icon: 'https://cdn.lordicon.com/nvsrnluo.json',
  },
  {
    stage: '03',
    label: 'Clear next step',
    icon: 'https://cdn.lordicon.com/sjutzequ.json',
  },
]

export default function GrowthProcessSection() {
  return (
    <section className="px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24">
      <Script
        id="lordicon-loader"
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="max-w-[16ch] text-balance font-sans text-[clamp(2.4rem,6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.05em] text-[#F5F5F2]">
          Three steps to your free Light Audit.
        </h1>

        <ol className="mt-14 grid w-full grid-cols-1 gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {GROWTH_PROCESS_STEPS.map((step) => (
            <li key={step.stage} className="flex flex-col items-center gap-5">
              <div className="h-[clamp(150px,22vw,210px)] w-[clamp(150px,22vw,210px)]">
                <LordIcon src={step.icon} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[0.78rem] uppercase tracking-[0.3em] text-[#6E6E68]">
                  {step.stage}
                </span>
                <span className="font-sans text-[1.05rem] font-medium tracking-[-0.01em] text-[#E8E8E2]">
                  {step.label}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 sm:mt-20">
          <CoreActionLink
            href="/apply"
            variant="heroPrimary"
            label="create free growth dashboard"
            location="get started hero"
          >
            Create Free Growth Dashboard
          </CoreActionLink>
        </div>
      </div>
    </section>
  )
}

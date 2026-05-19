import type { CSSProperties } from 'react'
import { Fragment } from 'react'

import {
  CoreActionLink,
  coreRouteContainerClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import TrackedLink from '@/components/tracked-link'
import { cn } from '@/lib/utils'

import styles from './get-started-page.module.css'

type GrowthProcessStep = {
  accent: string
  accentRgb: string
  body: string
  note?: string
  stage: string
  title: string
  art: string
}

export const GROWTH_PROCESS_STEPS: GrowthProcessStep[] = [
  {
    stage: '01',
    title: 'Submit your practice',
    body: 'Short audit request.',
    accent: '#9EFF2E',
    accentRgb: '158 255 46',
    art: [
      '+----------------------+',
      '| PRACTICE AUDIT       |',
      '| practice ...........  |',
      '| website  ...........  |',
      '| goal     ...........  |',
      '|                      |',
      '|    [ submit ]        |',
      '+----------------------+',
    ].join('\n'),
  },
  {
    stage: '02',
    title: 'Review the patient journey',
    body: 'We inspect the signals patients see first.',
    accent: '#FF2BEA',
    accentRgb: '255 43 234',
    art: [
      '      _____________',
      '     /  []  []   /|',
      '    /  =======  / |',
      '   /  []  []   /  |',
      '  /___________/   |',
      '  |     .--.  |   |',
      "  |   .'_\\/_'.|   |",
      '  |   \\ \\__/ /|  /',
      "  |    '.__.' | /",
      "  '-------||--|/'",
    ].join('\n'),
  },
  {
    stage: '03',
    title: 'Get a clear growth plan',
    body: 'If there is a fit, we map the highest-impact next steps.',
    accent: '#19D7FF',
    accentRgb: '25 215 255',
    art: [
      '+------+ +----------------+',
      '| team | |  /\\     /\\     |',
      '|  []  | | /  \\___/  \\    |',
      '+------+ |/    /   \\   \\   |',
      '+------+ |___ /_____/___\\  |',
      '| plan | |  custom path    |',
      '|  []  | +----------------+',
      '+------+',
    ].join('\n'),
  },
]

function ProcessConnector() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        styles.connector,
        'relative hidden lg:flex lg:items-center',
      )}
    />
  )
}

function ProcessCard({
  step,
  href,
}: {
  step: GrowthProcessStep
  href?: string
}) {
  const cardStyle = {
    '--card-accent-rgb': step.accentRgb,
  } as CSSProperties
  const cardClassName = cn(
    styles.processCard,
    styles.scanlines,
    'group flex min-h-[480px] flex-col border border-[color:rgb(var(--card-accent-rgb)/0.48)] bg-[#080808] px-6 py-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 focus-within:-translate-y-1 sm:min-h-[540px] sm:px-8 sm:py-8',
    href
      ? 'cursor-pointer text-left no-underline focus-visible:-translate-y-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--card-accent-rgb)/0.42)] focus-visible:ring-offset-4 focus-visible:ring-offset-black'
      : '',
  )
  const cardContent = (
    <>
      <span className={styles.corner} data-corner="tl" aria-hidden="true" />
      <span className={styles.corner} data-corner="tr" aria-hidden="true" />
      <span className={styles.corner} data-corner="bl" aria-hidden="true" />
      <span className={styles.corner} data-corner="br" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col">
        <p
          className="font-mono text-[1.45rem] font-medium uppercase tracking-[0.08em]"
          style={{ color: step.accent }}
        >
          {step.stage}
        </p>
        <h2 className="mt-5 max-w-[12ch] font-sans text-[1.9rem] font-medium uppercase tracking-[0.12em] text-[#F5F5F2] sm:text-[2.2rem]">
          {step.title}
        </h2>
        <p className="mt-5 max-w-[17ch] font-mono text-[1rem] leading-8 text-[#C1C1BA]">
          {step.body}
        </p>
        {step.note ? (
          <p className="mt-4 font-mono text-[0.82rem] uppercase tracking-[0.18em] text-[#A0A09A]">
            {step.note}
          </p>
        ) : null}

        <div className="relative mt-auto pt-10">
          <div className={styles.asciiWrap}>
            <pre
              aria-hidden="true"
              className={cn(
                styles.asciiArt,
                'overflow-hidden text-[0.64rem] leading-[1.28] tracking-[0.18em] sm:text-[0.76rem] sm:leading-[1.34]',
              )}
            >
              {step.art}
            </pre>
          </div>
        </div>
      </div>
    </>
  )

  if (href) {
    return (
      <TrackedLink
        href={href}
        label="start free audit from submit practice card"
        location="get started process card"
        aria-label="Start the free practice audit form"
        style={cardStyle}
        className={cardClassName}
      >
        {cardContent}
      </TrackedLink>
    )
  }

  return (
    <article style={cardStyle} className={cardClassName}>
      {cardContent}
    </article>
  )
}

export default function GrowthProcessSection() {
  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
      <div
        className={cn(
          styles.sectionFrame,
          styles.scanlines,
          coreRouteContainerClassName,
          'overflow-hidden border border-white/10 bg-[#040404] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12',
        )}
      >
        <div className={styles.noiseField} aria-hidden="true" />
        <span className={styles.corner} data-corner="tl" aria-hidden="true" />
        <span className={styles.corner} data-corner="tr" aria-hidden="true" />

        <div className="relative z-10">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[0.92rem] font-medium tracking-[0.01em] text-[#C8C8C0]">
              Free practice audit
            </p>
            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <p className="font-sans text-[0.82rem] font-medium uppercase tracking-[0.12em] text-[#767670]">
                3 STEPS
              </p>
              <div className={styles.microCluster} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="grid gap-12 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.72fr)] lg:items-end">
            <div>
              <h1 className="max-w-[12ch] text-balance font-sans text-[clamp(2.55rem,6vw,4.85rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[#F5F5F2]">
                See what is holding your practice back.
              </h1>
            </div>

            <div className="max-w-[26rem] space-y-5 lg:justify-self-end">
              <p className="font-sans text-[1rem] leading-8 text-[#B6B6B0] sm:text-[1.08rem]">
                Submit your practice. We review your website, Google presence,
                reviews, booking path, and tracking. Then we show the clearest
                next steps.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)_72px_minmax(0,1fr)] lg:items-stretch">
            {GROWTH_PROCESS_STEPS.map((step, index) => (
              <Fragment key={step.stage}>
                <ProcessCard
                  step={step}
                  href={index === 0 ? '/apply' : undefined}
                />
                {index < GROWTH_PROCESS_STEPS.length - 1 ? (
                  <>
                    <div className="flex items-center justify-center lg:hidden">
                      <span className="font-mono text-[1.1rem] text-white/56">
                        v
                      </span>
                    </div>
                    <ProcessConnector />
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>

          <div
            className={cn(
              styles.ctaFrame,
              'relative mt-8 flex flex-col gap-5 border border-white/10 bg-[#060606] px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between',
            )}
          >
            <div className="relative z-10 space-y-2">
              <p className="font-sans text-[1.9rem] font-medium tracking-[-0.04em] text-[#F5F5F2]">
                Ready for the audit?
              </p>
              <p className="font-sans text-[0.98rem] leading-7 text-[#A0A09A]">
                Start with one short request.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3 lg:items-end">
              <p className="font-sans text-[0.82rem] font-medium uppercase tracking-[0.12em] text-[#767670]">
                Practice reviewed first. Strategy if it fits.
              </p>
              <CoreActionLink
                href="/apply"
                label="start free audit"
                location="get started process cta"
              >
                Start free audit
              </CoreActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

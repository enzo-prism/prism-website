import type { CSSProperties } from 'react'

import {
  TechStackIcon,
  type TechStackIconSpec,
} from '@/components/tech-stack-icons'
import { cn } from '@/lib/utils'

import styles from './aeo-hero.module.css'

type Vars = CSSProperties & Record<`--${string}`, string | number>

const step = (i: number): Vars => ({ '--i': i })

// Real engines, illustrative answers (the panel carries an "Example" tag).
// No metrics anywhere in the hero (the digits are citation markers): like
// /ads, the AEO page makes zero metric claims above the fold.
const ENGINES: readonly TechStackIconSpec[] = [
  { label: 'ChatGPT', brand: 'openai', theme: 'dark' },
  { label: 'AI Overviews', brand: 'google' },
  { label: 'Gemini', brand: 'gemini' },
  { label: 'Claude', brand: 'claude' },
  { label: 'Perplexity', brand: 'perplexity' },
]

type AnswerState = 'cited' | 'mentioned' | 'missing'

const STATE_LABELS: Record<AnswerState, string> = {
  cited: 'Cited',
  mentioned: 'Mentioned',
  missing: 'Not yet',
}

// One row per customer question, one state per engine (in ENGINES order).
const QUESTION_MAP: readonly {
  question: string
  states: readonly AnswerState[]
}[] = [
  {
    question: 'family dentist for nervous kids',
    states: ['cited', 'cited', 'mentioned', 'missing', 'cited'],
  },
  {
    question: 'dentist open on saturday',
    states: ['mentioned', 'cited', 'cited', 'missing', 'mentioned'],
  },
  {
    question: 'invisalign cost near me',
    states: ['missing', 'mentioned', 'missing', 'missing', 'mentioned'],
  },
  {
    question: 'same-day emergency dentist',
    states: ['cited', 'mentioned', 'missing', 'mentioned', 'cited'],
  },
]

const SOURCES = [
  { index: 1, label: 'yourbusiness.com', own: true },
  { index: 2, label: 'Google reviews', own: false },
  { index: 3, label: 'Yelp', own: false },
] as const

function StateMark({
  state,
  className,
  style,
}: {
  state: AnswerState
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        'relative grid size-3 place-items-center rounded-full',
        state === 'cited' && 'bg-foreground',
        state === 'mentioned' && 'border border-foreground/60',
        state === 'missing' && 'border border-dashed border-white/30',
        className,
      )}
    >
      {state === 'mentioned' ? (
        <span className="size-1 rounded-full bg-foreground/70" />
      ) : null}
    </span>
  )
}

function CitationChip({ index }: { index: number }) {
  return (
    <span className="mx-0.5 inline-grid size-[18px] translate-y-[-1px] place-items-center rounded-md border border-white/15 bg-white/[0.06] align-middle font-mono text-[10px] leading-none text-foreground">
      {index}
    </span>
  )
}

/**
 * /aeo hero: an example "answer check" console. On the left, a customer asks
 * an assistant a question and the answer cites the business; on the right, the
 * question map Prism re-runs every month across the real answer engines.
 */
export function AeoHeroVisual() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-[6%] top-[8%] -z-10 h-[84%] rounded-full bg-[radial-gradient(closest-side,oklch(0.63_0.19_295/20%),oklch(0.66_0.16_258/14%)_55%,transparent)] blur-2xl"
      />
      <div className="prism-beam rounded-[2rem] border border-white/[0.08] bg-card/90 p-2.5 shadow-[0_50px_120px_-40px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/6%)_inset] backdrop-blur-md sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-2 sm:px-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
              <span className="size-2 rounded-full bg-white/15" />
            </span>
            <span className="ml-1 text-sm font-medium text-foreground">
              Answer check
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground">
              Example
            </span>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-muted-foreground sm:inline-flex">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-foreground"
            />
            Re-checked every month
          </span>
        </div>

        <div className="grid gap-2.5 sm:gap-3 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          {/* The answer */}
          <div className="flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-background/60 p-4 text-left sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-eyebrow whitespace-nowrap text-subtle">
                A customer asks
              </p>
              <ul
                aria-label="Answer engines"
                className="hidden items-center gap-1 sm:flex"
              >
                {ENGINES.map((engine, index) => (
                  <li
                    key={engine.label}
                    className={cn(
                      'grid size-7 place-items-center rounded-lg border',
                      index === 0
                        ? 'border-white/20 bg-white/[0.08]'
                        : 'border-transparent opacity-60',
                    )}
                  >
                    <TechStackIcon spec={engine} className="size-3.5" />
                    <span className="sr-only">{engine.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p
              className={cn(
                styles.enter,
                'ml-auto mt-4 w-fit max-w-[30ch] rounded-2xl rounded-br-md border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-[15px] leading-snug text-foreground',
              )}
              style={step(0)}
            >
              Who&apos;s the best family dentist near me for nervous kids?
            </p>

            <div className="mt-5 flex items-start gap-3">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                <TechStackIcon spec={ENGINES[0]} className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    styles.enter,
                    'text-pretty text-[15px] leading-7 text-muted-foreground',
                  )}
                  style={step(1)}
                >
                  <span className="relative whitespace-nowrap font-medium text-foreground">
                    Your business
                    <span
                      aria-hidden="true"
                      className={cn(
                        styles.draw,
                        'absolute inset-x-0 -bottom-0.5 h-px rounded-full bg-spectrum',
                      )}
                      style={step(1)}
                    />
                  </span>{' '}
                  is a strong fit. Parents mention a gentle approach with
                  anxious kids, same-week appointments, and clear prices before
                  any treatment.
                  <CitationChip index={1} />
                  <CitationChip index={2} />
                </p>
                <div aria-hidden="true" className="mt-3 flex flex-col gap-2">
                  <span
                    className={cn(
                      styles.draw,
                      'block h-1.5 w-[92%] rounded-full bg-white/[0.08]',
                    )}
                    style={step(3)}
                  />
                  <span
                    className={cn(
                      styles.draw,
                      'block h-1.5 w-[64%] rounded-full bg-white/[0.08]',
                    )}
                    style={step(4)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <p className="text-eyebrow text-subtle">Sources</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {SOURCES.map((source) => (
                  <li
                    key={source.label}
                    className={cn(
                      styles.enter,
                      'inline-flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-[13px]',
                      source.own
                        ? 'border-white/25 bg-white/[0.07] text-foreground'
                        : 'border-white/10 bg-white/[0.02] text-muted-foreground',
                    )}
                    style={step(source.index + 2)}
                  >
                    <span className="grid size-5 place-items-center rounded-full border border-white/10 bg-background font-mono text-[10px] text-foreground">
                      {source.index}
                    </span>
                    {source.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The question map */}
          <div className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-background/60 p-4 text-left sm:p-5">
            <div
              aria-hidden="true"
              className={cn(
                styles.scan,
                'pointer-events-none absolute inset-0',
              )}
            />
            <p className="text-eyebrow text-subtle">Question map</p>
            <table className="mt-3 w-full table-fixed border-collapse text-left">
              <caption className="sr-only">
                Example: where a business appears for four customer questions
                across five answer engines
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="pb-2.5 font-normal">
                    <span className="sr-only">Question</span>
                  </th>
                  {ENGINES.map((engine) => (
                    <th
                      key={engine.label}
                      scope="col"
                      className="w-7 pb-2.5 sm:w-8"
                    >
                      <span className="mx-auto grid size-6 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
                        <TechStackIcon spec={engine} className="size-3" />
                      </span>
                      <span className="sr-only">{engine.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {QUESTION_MAP.map((row, rowIndex) => (
                  <tr
                    key={row.question}
                    className="border-t border-white/[0.06]"
                  >
                    <th
                      scope="row"
                      className="py-3 pr-2 text-[13px] font-normal leading-snug text-foreground/90 sm:truncate"
                    >
                      {row.question}
                    </th>
                    {row.states.map((state, engineIndex) => (
                      <td key={ENGINES[engineIndex].label} className="py-3">
                        <StateMark
                          state={state}
                          className={cn(styles.cell, 'mx-auto')}
                          style={step(rowIndex * ENGINES.length + engineIndex)}
                        />
                        <span className="sr-only">{STATE_LABELS[state]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <ul
              aria-hidden="true"
              className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[0.06] pt-4 text-[12px] text-subtle"
            >
              {(['cited', 'mentioned', 'missing'] as const).map((state) => (
                <li key={state} className="inline-flex items-center gap-1.5">
                  <StateMark state={state} />
                  {STATE_LABELS[state]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AeoHeroVisual

import type { CSSProperties, ReactNode } from 'react'
import {
  AudioLines,
  BookOpen,
  CalendarDays,
  Check,
  Clapperboard,
  Eye,
  Lock,
  MessagesSquare,
  MousePointerClick,
  Play,
  RotateCcw,
  Route,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import styles from './scenes.module.css'

/*
 * Four illustrations of the private tools Prism built for Mach 1's growth
 * team. They are drawn, not captured: every label, word, and bar below is
 * made up for the drawing, so no real dashboard, customer, or number from
 * those tools appears on the public site.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>

function SceneFrame({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
}) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-card shadow-[0_40px_90px_-40px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/6%)_inset]"
    >
      <div className={styles.glow} />
      <div className="flex h-11 items-center gap-2.5 border-b border-white/[0.06] px-4">
        <span className="flex size-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-muted-foreground">
          <Icon className="size-3.5" strokeWidth={1.75} />
        </span>
        <span className="text-[13px] font-medium tracking-[-0.01em] text-foreground">
          {title}
        </span>
        <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-subtle">
          Illustrative
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 01 content engine                                                    */
/* ------------------------------------------------------------------ */

const CHANNELS = [
  { name: 'LinkedIn', color: 'var(--chart-1)' },
  { name: 'X', color: 'var(--chart-7)' },
  { name: 'YouTube', color: 'var(--chart-6)' },
  { name: 'TikTok', color: 'var(--chart-5)' },
] as const

/** Calendar cell index -> channel indexes of the posts planned that day. */
const PLANNED: Record<number, number[]> = {
  0: [0],
  1: [2, 1],
  3: [0, 3],
  4: [1],
  7: [0],
  8: [3],
  9: [2, 0],
  11: [1, 3],
  12: [0],
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function ContentEngineScene() {
  let order = 0
  return (
    <SceneFrame icon={CalendarDays} title="Content engine">
      <div className="flex gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1 text-[12px]">
        {['Analytics', 'Calendar', 'Library'].map((tab) => (
          <span
            key={tab}
            className={cn(
              'flex-1 rounded-md px-2 py-1 text-center',
              tab === 'Calendar'
                ? 'bg-white/[0.08] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset]'
                : 'text-subtle',
            )}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {DAYS.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="pb-0.5 text-center font-mono text-[10px] text-subtle"
          >
            {day}
          </span>
        ))}
        {Array.from({ length: 14 }, (_, cell) => (
          <div
            key={cell}
            className={cn(
              'flex h-12 flex-col gap-1 rounded-md border border-white/[0.06] bg-white/[0.015] p-1 sm:h-14',
              cell >= 5 && cell <= 6 && 'bg-transparent',
              cell >= 12 && 'bg-transparent',
            )}
          >
            {(PLANNED[cell] ?? []).map((channel) => {
              const i = order++
              return (
                <span
                  key={`${cell}-${channel}`}
                  className={cn(
                    styles.chip,
                    'flex h-3.5 items-center gap-1 rounded-[4px] bg-white/[0.07] px-1',
                  )}
                  style={{ '--i': i } as Vars}
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: CHANNELS[channel].color }}
                  />
                  <span className="h-[3px] flex-1 rounded-full bg-white/20" />
                </span>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {CHANNELS.map((channel) => (
          <span
            key={channel.name}
            className="inline-flex items-center gap-1.5 text-[11px] text-subtle"
          >
            <span
              className="size-1.5 rounded-full"
              style={{ background: channel.color }}
            />
            {channel.name}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.08em] text-subtle">
          <span>VIEWS VS TYPICAL</span>
          <span>ONE POST</span>
        </div>
        <div className="relative mt-2">
          {/* Line under a cover that slides away; the band sits on top. */}
          <svg viewBox="0 0 300 84" className="block h-auto w-full" fill="none">
            <path
              d="M0 56 C 30 54, 48 46, 70 50 S 112 58, 136 49 S 176 42, 196 44 S 232 30, 252 20 S 280 10, 292 9"
              stroke="var(--spectrum-violet)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className={cn(
              styles.sparkCover,
              'absolute inset-y-0 right-0 w-full bg-[color-mix(in_oklab,var(--card),white_2%)]',
            )}
          />
          <svg
            viewBox="0 0 300 84"
            className="absolute inset-0 block h-auto w-full"
            fill="none"
          >
            <rect x="0" y="40" width="300" height="20" rx="4" fill="oklch(1 0 0 / 5%)" />
            <line
              x1="0"
              x2="300"
              y1="50"
              y2="50"
              stroke="oklch(1 0 0 / 18%)"
              strokeDasharray="3 4"
            />
            <circle
              className={styles.endDot}
              cx="292"
              cy="9"
              r="4"
              fill="var(--spectrum-violet)"
              stroke="var(--card)"
              strokeWidth="2"
            />
          </svg>
          <span className="absolute bottom-1 left-1 font-mono text-[9px] tracking-[0.08em] text-subtle">
            TYPICAL
          </span>
          <span
            className={cn(
              styles.aboveLabel,
              'absolute left-[34%] top-0 rounded-full border border-white/10 bg-popover px-2 py-0.5 text-[10px] text-foreground',
            )}
          >
            above typical
          </span>
        </div>
      </div>
    </SceneFrame>
  )
}

/* ------------------------------------------------------------------ */
/* 02 interview vault                                                   */
/* ------------------------------------------------------------------ */

const WAVE = [
  0.25, 0.4, 0.6, 0.35, 0.8, 0.55, 0.9, 0.45, 0.3, 0.65, 1, 0.7, 0.4, 0.55,
  0.85, 0.5, 0.3, 0.2, 0.45, 0.75, 0.95, 0.6, 0.35, 0.5, 0.8, 0.4, 0.25, 0.6,
  0.9, 0.55, 0.3, 0.45, 0.7, 0.5, 0.3, 0.2, 0.4, 0.65, 0.35, 0.2,
]

const WORDS = ['builds', 'the', 'workflow.']

function WordChip({
  children,
  lane,
  i,
  className,
}: {
  children: ReactNode
  lane: number
  i: number
  className?: string
}) {
  return (
    <span
      className={cn(
        styles.word,
        'rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[12px] text-foreground/90',
        className,
      )}
      style={{ '--lane': lane, '--i': i } as Vars}
    >
      {children}
    </span>
  )
}

export function InterviewVaultScene() {
  return (
    <SceneFrame icon={AudioLines} title="Interview vault">
      <div className="flex h-14 items-center justify-between gap-[3px] rounded-lg border border-white/[0.06] bg-white/[0.02] px-3">
        {WAVE.map((h, i) => (
          <span
            key={i}
            className={cn(
              styles.bar,
              'h-full w-[3px] rounded-full',
              i >= 8 && i <= 15 ? 'bg-spectrum-violet/80' : 'bg-white/35',
            )}
            style={{ '--h': h, '--i': i } as Vars}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {['A', 'B', 'C'].map((engine, lane) => (
          <li key={engine} className="flex items-center gap-3">
            <span className="w-4 shrink-0 font-mono text-[10px] tracking-[0.08em] text-subtle sm:w-16">
              <span className="hidden sm:inline">ENGINE </span>
              {engine}
            </span>
            <span className="flex flex-wrap items-center gap-1">
              {lane === 1 ? (
                <span className={cn(styles.disputed, 'inline-grid')}>
                  <WordChip lane={lane} i={0} className="[grid-area:1/1]">
                    <span className={cn(styles.swapNew, 'inline-block')}>Tower</span>
                  </WordChip>
                  <span
                    className={cn(
                      styles.swapOld,
                      'rounded-md border border-spectrum-orange/60 bg-spectrum-orange/10 px-1.5 py-0.5 text-[12px] text-spectrum-orange [grid-area:1/1]',
                    )}
                  >
                    Power
                  </span>
                </span>
              ) : (
                <WordChip lane={lane} i={0}>
                  Tower
                </WordChip>
              )}
              {WORDS.map((word, i) => (
                <WordChip key={word} lane={lane} i={i + 1}>
                  {word}
                </WordChip>
              ))}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          styles.consensus,
          'mt-4 flex items-center gap-2.5 rounded-lg border border-spectrum-violet/30 bg-spectrum-violet/[0.07] px-3 py-2',
        )}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-spectrum-violet/90 text-background">
          <Check className="size-3" strokeWidth={3} />
        </span>
        <span className="text-[13px] text-foreground">Tower builds the workflow.</span>
        <span className="ml-auto shrink-0 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          3 OF 3 AGREE
        </span>
      </div>

      <ul
        className={cn(
          styles.vaultRow,
          'mt-4 divide-y divide-white/[0.06] rounded-lg border border-white/[0.06]',
        )}
      >
        {[
          ['Customer interview', 0.72],
          ['Support team film', 0.56],
        ].map(([title, width]) => (
          <li
            key={title as string}
            className="flex items-center gap-3 px-3 py-2.5"
          >
            <Lock className="size-3.5 shrink-0 text-subtle" strokeWidth={1.75} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] text-foreground/90">
                {title}
              </span>
              <span
                className="mt-1 block h-[3px] rounded-full bg-white/15"
                style={{ width: `${(width as number) * 100}%` }}
              />
            </span>
            <span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground min-[380px]:inline">
              Captioned
            </span>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">
              Approved
            </span>
          </li>
        ))}
      </ul>
    </SceneFrame>
  )
}

/* ------------------------------------------------------------------ */
/* 03 campaign review room                                              */
/* ------------------------------------------------------------------ */

const NOTES = [
  { at: 'a', left: '18%', time: '0:05', text: 'Open on the customer.' },
  { at: 'b', left: '46%', time: '0:13', text: 'Caption sits too low.' },
  { at: 'c', left: '72%', time: '0:21', text: 'Keep this line. It lands.' },
] as const

export function ReviewRoomScene() {
  return (
    <SceneFrame icon={Clapperboard} title="Campaign review">
      <div className="relative aspect-video overflow-hidden rounded-lg border [@media(min-width:1024px)_and_(max-height:880px)]:aspect-[21/9] border-white/[0.08] bg-[radial-gradient(70%_90%_at_70%_30%,oklch(0.63_0.19_295/28%),transparent_70%),radial-gradient(60%_80%_at_15%_90%,oklch(0.66_0.16_258/18%),transparent_70%)] bg-popover">
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          AD 03 · 16:9
        </span>
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          <Play className="ml-0.5 size-4 fill-current text-foreground" />
        </span>
        <span className="absolute bottom-3 left-3 right-1/3 space-y-1.5">
          <span className="block h-2 w-3/4 rounded-full bg-white/30" />
          <span className="block h-2 w-1/2 rounded-full bg-white/15" />
        </span>
      </div>

      <div className="relative mt-9">
        <div className="relative h-1.5 rounded-full bg-white/10">
          <span
            className={cn(styles.fill, 'absolute inset-0 rounded-full bg-white/55')}
          />
          {NOTES.map((note) => (
            <span
              key={note.at}
              className="absolute bottom-full mb-2 -translate-x-1/2"
              style={{ left: note.left }}
            >
              <span
                data-at={note.at}
                className={cn(styles.pin, 'flex flex-col items-center')}
              >
                <span className="flex size-5 items-center justify-center rounded-full border border-spectrum-violet/50 bg-spectrum-violet/20">
                  <span className="size-1.5 rounded-full bg-spectrum-violet" />
                </span>
                <span className="h-1.5 w-px bg-spectrum-violet/50" />
              </span>
            </span>
          ))}
          <span className={cn(styles.playheadRail, 'absolute inset-0')}>
            <span className="absolute left-0 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_0_4px_oklch(1_0_0/10%)]" />
          </span>
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
          <span>0:00</span>
          <span>0:30</span>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5">
        {NOTES.map((note, index) => (
          <li
            key={note.at}
            data-at={note.at}
            className={cn(
              styles.note,
              'flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2',
              index === 2 && '[@media(min-width:1024px)_and_(max-height:880px)]:hidden',
            )}
          >
            <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {note.time}
            </span>
            <span className="truncate text-[12px] text-foreground/90">{note.text}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="font-mono text-[10px] tracking-[0.08em] text-subtle">VERDICT</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground">
          <RotateCcw className="size-3" />
          Revise
        </span>
        <span
          className={cn(
            styles.verdict,
            'inline-flex items-center gap-1 rounded-full border border-spectrum-violet/40 bg-spectrum-violet/15 px-2.5 py-1 text-[11px] text-foreground',
          )}
        >
          <Check className="size-3" strokeWidth={2.5} />
          Approved
        </span>
      </div>
    </SceneFrame>
  )
}

/* ------------------------------------------------------------------ */
/* 04 growth plan                                                       */
/* ------------------------------------------------------------------ */

const STAGES: { label: string; icon: LucideIcon }[] = [
  { label: 'Sees an ad', icon: Eye },
  { label: 'Visits the site', icon: MousePointerClick },
  { label: 'Reads a story', icon: BookOpen },
  { label: 'Talks to the team', icon: MessagesSquare },
  { label: 'First workflow', icon: Workflow },
]

const SOURCES = [
  { label: 'Referrals', w: 0.82 },
  { label: 'LinkedIn', w: 0.64 },
  { label: 'Search and AI', w: 0.5 },
  { label: 'Events', w: 0.34 },
]

export function GrowthPlanScene() {
  return (
    <SceneFrame icon={Route} title="Growth plan">
      <p className="font-mono text-[10px] tracking-[0.08em] text-subtle">THE JOURNEY</p>
      <div className="relative mt-4">
        <span className="absolute left-[10%] right-[10%] top-[18px] h-px bg-gradient-to-r from-white/10 via-white/25 to-spectrum-violet/60" />
        <span className="absolute left-[10%] right-[10%] top-[18px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(styles.traveler, 'absolute inset-x-0 top-0')}
              style={{ '--i': i } as Vars}
            >
              <span className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_10px_2px_oklch(0.63_0.19_295/60%)]" />
            </span>
          ))}
        </span>
        <ol className="relative grid grid-cols-5">
          {STAGES.map(({ label, icon: Icon }, i) => (
            <li key={label} className="flex flex-col items-center text-center">
              <span
                className={cn(
                  'relative flex size-9 items-center justify-center rounded-full border bg-card',
                  i === STAGES.length - 1
                    ? 'border-spectrum-violet/60 text-foreground'
                    : 'border-white/15 text-muted-foreground',
                )}
              >
                <span
                  className={cn(
                    styles.stageRing,
                    'absolute inset-0 rounded-full border border-spectrum-violet/50 opacity-0',
                  )}
                  style={{ '--i': i } as Vars}
                />
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <span className="mt-2 max-w-[9ch] text-balance text-[11px] leading-tight text-muted-foreground">
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="font-mono text-[10px] tracking-[0.08em] text-subtle">AUDIENCES</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {['Support leaders', 'CS leaders', 'Ops leaders', 'Founders'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-foreground/85"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="flex justify-between font-mono text-[10px] tracking-[0.08em] text-subtle">
            <span>LEAD SOURCES</span>
            <span>ESTIMATE</span>
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {SOURCES.map((source, i) => (
              <li key={source.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-2">
                <span className="truncate text-[11px] text-muted-foreground">
                  {source.label}
                </span>
                <span className="h-1.5 rounded-full bg-white/[0.06]">
                  <span
                    className={cn(
                      styles.sourceBar,
                      'block h-full w-full rounded-full bg-gradient-to-r from-white/40 to-spectrum-violet',
                    )}
                    style={{ '--w': source.w, '--i': i } as Vars}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SceneFrame>
  )
}

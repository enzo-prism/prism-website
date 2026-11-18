import type { CSSProperties, ReactNode } from 'react'
import {
  Bell,
  CalendarDays,
  FileText,
  LayoutGrid,
  Mail,
  MessageCircleQuestion,
  MessageSquare,
  Phone,
  Search,
  Settings2,
  Share,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { DEMO_LEADS, DEMO_LEAD_TOTAL } from '@/lib/prism-app'
import { cn } from '@/lib/utils'

import { AppArm } from './AppArm'
import { AppWidgets } from './AppWidgets'
import { LeadDayChart } from './LeadDayChart'
import styles from './app-page.module.css'

/** The demo's own alerts (components/prism-app/AppScreens.tsx, Updates). */
const ALERTS: ReadonlyArray<{
  icon: LucideIcon
  tone: string
  title: string
  time: string
  body: string
}> = [
  {
    icon: Mail,
    tone: 'var(--spectrum-green)',
    title: 'New form submission',
    time: '8:06 AM',
    body: 'bayviewdental.example received a form: Appointment request.',
  },
  {
    icon: TrendingUp,
    tone: 'var(--spectrum-green)',
    title: 'Your site is busy right now',
    time: '6:41 AM',
    body: '64 people are on Bayview Dental, about 3× your usual for this time.',
  },
  {
    icon: Search,
    tone: 'var(--spectrum-orange)',
    title: 'On Google’s first page',
    time: 'Yesterday',
    body: 'Bayview Dental now ranks #7 for “emergency dentist.”',
  },
]

const REPORT_MONTHS = [
  { month: 'September', count: DEMO_LEADS.october.previous, current: false },
  { month: 'October', count: DEMO_LEADS.october.count, current: true },
] as const

const ASK_CHANNELS: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: MessageSquare, label: 'Text' },
  { icon: Phone, label: 'Call' },
  { icon: Mail, label: 'Email' },
]

function TileLabel({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <p className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
      <Icon aria-hidden="true" className="size-4 text-subtle" />
      {children}
    </p>
  )
}

function TileCopy({ title, body }: { title: string; body: ReactNode }) {
  return (
    <>
      <h3 className="mt-4 text-heading text-balance text-foreground">
        {title}
      </h3>
      <p className="mt-2 max-w-[44ch] text-pretty text-[15px] leading-6 text-muted-foreground">
        {body}
      </p>
    </>
  )
}

const TILE = 'h-full rounded-3xl border border-white/[0.08] bg-card p-6 sm:p-8'

/**
 * The month at a glance: five tiles, each built from the demo's numbers.
 * Bars, counts and alerts play once when a tile arrives and then hold.
 */
export function AppBento() {
  return (
    <div className={styles.bento}>
      <Reveal className={styles.bentoReport}>
        <SpotlightCard beam className={cn(TILE, 'flex flex-col')}>
          <TileLabel icon={FileText}>Monthly report</TileLabel>
          <TileCopy
            title="compare leads month to month."
            body="Each report pairs website inquiries with visits, search activity and the work Prism shipped. Bring it to your next team meeting."
          />
          <AppArm count className="mt-auto pt-8">
            <figure aria-label="Bayview Dental demo: 27 website leads in September, 32 in October.">
              <dl className="space-y-4">
                {REPORT_MONTHS.map(({ month, count, current }, index) => (
                  <div
                    key={month}
                    className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-3"
                  >
                    <dt className="text-sm text-muted-foreground">{month}</dt>
                    <dd
                      aria-hidden="true"
                      className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]"
                    >
                      <span
                        className={cn(
                          styles.bentoBar,
                          current
                            ? 'bg-spectrum-green'
                            : 'bg-muted-foreground/60',
                        )}
                        style={
                          {
                            width: `${(count / DEMO_LEADS.october.count) * 100}%`,
                            '--i': index,
                          } as CSSProperties
                        }
                      />
                    </dd>
                    <dd className="text-right font-mono text-lg tabular-nums text-foreground">
                      <span data-count={count}>{count}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-[15px]">
                <span className="text-foreground">
                  {DEMO_LEADS.october.count - DEMO_LEADS.october.previous} more
                  inquiries in October
                </span>
                <span className={cn(styles.bentoChip, 'text-spectrum-green')}>
                  <TrendingUp aria-hidden="true" className="size-3.5" />
                  Up {DEMO_LEADS.october.change}
                </span>
              </figcaption>
              <p className="mt-4 flex flex-wrap gap-2 text-[13px] text-muted-foreground">
                <span className={styles.bentoPill}>
                  <Share aria-hidden="true" className="size-3.5" /> Share as PDF
                </span>
                <span className={styles.bentoPill}>
                  <Share aria-hidden="true" className="size-3.5" /> Share as
                  text
                </span>
              </p>
            </figure>
          </AppArm>
        </SpotlightCard>
      </Reveal>

      <Reveal className={styles.bentoDaily} delay={80}>
        <SpotlightCard className={cn(TILE, 'flex flex-col')}>
          <TileLabel icon={CalendarDays}>Every day</TileLabel>
          <TileCopy
            title="every form, counted."
            body="Each submission to a connected form counts as one lead. Slide across the chart to read a day."
          />
          <AppArm count className="mt-auto pt-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <p className="leading-none">
                <strong className="block text-[4.5rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-foreground">
                  <span data-count={DEMO_LEAD_TOTAL}>{DEMO_LEAD_TOTAL}</span>
                </strong>
                <span className="mt-2 block font-mono text-xs text-muted-foreground">
                  {DEMO_LEADS.period} · demo
                </span>
              </p>
              <dl className="min-w-0 divide-y divide-white/10 text-[14px] sm:max-w-[15rem] sm:flex-1">
                {DEMO_LEADS.byForm.map(({ name, count }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-3 py-2"
                  >
                    <dt className="truncate text-muted-foreground">{name}</dt>
                    <dd className="font-mono tabular-nums text-foreground">
                      {count}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6">
              <LeadDayChart />
            </div>
          </AppArm>
        </SpotlightCard>
      </Reveal>

      <Reveal className={styles.bentoAlerts}>
        <SpotlightCard className={cn(TILE, 'flex flex-col')}>
          <TileLabel icon={Bell}>Notifications</TileLabel>
          <TileCopy
            title="know when an inquiry arrives."
            body="A few a week at most: new leads, wins like a new Google ranking, a Monday summary, and your monthly report. None arrive overnight."
          />
          <AppArm aria-hidden className={cn(styles.bentoAlertStack, 'pt-8')}>
            {ALERTS.map(({ icon: Icon, tone, title, time, body }, index) => (
              <div
                key={title}
                className={styles.bentoAlert}
                style={{ '--tone': tone, '--i': index } as CSSProperties}
              >
                <span className={styles.bentoAlertIcon}>
                  <Icon className="size-4" />
                </span>
                <p className="min-w-0">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[14px] font-semibold text-foreground">
                      {title}
                    </span>
                    <span className="shrink-0 text-[12px] text-subtle">
                      {time}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">
                    {body}
                  </span>
                </p>
              </div>
            ))}
          </AppArm>
          <p className="mt-auto flex items-center gap-2 border-t border-white/[0.08] pt-5 text-[13px] text-muted-foreground max-lg:mt-6">
            <Settings2
              aria-hidden="true"
              className="size-4 shrink-0 text-subtle"
            />
            Choose yours under Account › Notifications.
          </p>
        </SpotlightCard>
      </Reveal>

      <Reveal className={styles.bentoWidgets} delay={80}>
        <SpotlightCard className={cn(TILE, 'flex flex-col gap-8')}>
          <div>
            <TileLabel icon={LayoutGrid}>Widgets</TileLabel>
            <TileCopy
              title="your numbers on the Home Screen."
              body="Pin a website to a Home Screen or Lock Screen widget to see 28 days of visits and Google clicks."
            />
            <p className="mt-4 font-mono text-xs text-subtle">
              Illustration with demo numbers
            </p>
          </div>
          <AppWidgets />
        </SpotlightCard>
      </Reveal>

      <Reveal className={styles.bentoAsk}>
        <SpotlightCard
          className={cn(
            TILE,
            'flex flex-col gap-6 md:flex-row md:items-center md:justify-between',
          )}
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <MessageCircleQuestion
                aria-hidden="true"
                className="size-5 text-spectrum-violet"
              />
            </span>
            <div>
              <h3 className="text-heading text-foreground">ask Prism.</h3>
              <p className="mt-1.5 max-w-[56ch] text-pretty text-[15px] leading-6 text-muted-foreground">
                Tap Ask Prism on your Summary or in a report. It shows the topic
                and website first, and nothing is sent until you choose to text,
                call, or email us.
              </p>
            </div>
          </div>
          <ul className="flex shrink-0 gap-2" aria-label="Ways to reach Prism">
            {ASK_CHANNELS.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.bentoPill}>
                <Icon aria-hidden="true" className="size-3.5" />
                {label}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </Reveal>
    </div>
  )
}

export default AppBento

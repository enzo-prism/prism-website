import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Mail,
  Search,
  Sparkles,
  TrendingUp,
  UserRound,
  UsersRound,
} from 'lucide-react'

import type { PrismAppScreenId } from '@/lib/prism-app'
import { cn } from '@/lib/utils'

import styles from './app-page.module.css'

/**
 * The app's screens, drawn in HTML from the demo-mode captures so they stay
 * sharp and readable at any size. Every number and sentence comes from the
 * app's demo (Bayview Dental, fictional). Sizes are in `--u`, one iOS point
 * on a 390pt-wide screen, so a screen scales with its phone. Decorative to
 * assistive tech: the copy beside each phone carries the content.
 *
 * Do not draw anything the app does not show.
 */

const SITE = 'bayviewdental.example'

/** Forms per day, Oct 12 to Nov 8. Sums to 30. */
const LEADS_DAILY = [
  0, 0, 2, 3, 0, 1, 2, 0, 0, 1, 2, 3, 0, 1, 0, 0, 0, 1, 2, 3, 0, 0, 0, 3, 0, 1,
  2, 3,
]

/** Visits per day, Oct 11 to Nov 7. Sums to 4,660; the peak is Nov 6. */
const VISITS_DAILY = [
  112, 168, 165, 173, 183, 193, 118, 116, 174, 172, 180, 190, 199, 122, 116,
  177, 175, 183, 196, 205, 126, 119, 183, 181, 190, 203, 212, 129,
]

/** Google clicks per day, Oct 9 to Nov 5. Sums to 498. */
const CLICKS_DAILY = [
  16, 11, 12, 19, 19, 19, 20, 13, 13, 20, 18, 18, 20, 22, 14, 14, 19, 18, 19,
  20, 22, 15, 14, 20, 19, 20, 22, 22,
]

const WEEK_VISITS = [64, 70, 74, 78, 82, 50, 46, 66, 76, 80, 84, 90, 54, 48]

type Tone = 'green' | 'blue' | 'orange' | 'violet'

const TONE: Record<Tone, string> = {
  green: 'var(--spectrum-green)',
  blue: 'var(--spectrum-blue)',
  orange: 'var(--spectrum-orange)',
  violet: 'var(--spectrum-violet)',
}

const tone = (value: Tone) => ({ '--tone': TONE[value] }) as CSSProperties

function StatusBar() {
  return (
    <div className={styles.statusBar}>
      <span>9:41</span>
      <span className={styles.statusIcons}>
        <span className={styles.statusSignal}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.statusBattery} />
      </span>
    </div>
  )
}

function Count({ value }: { value: number }) {
  return <span data-count={value}>{value.toLocaleString('en-US')}</span>
}

function Total({
  value,
  unit,
  range,
}: {
  value: number
  unit: string
  range: string
}) {
  return (
    <>
      <p className={styles.totalLabel}>Total</p>
      <p className={styles.totalValue}>
        <Count value={value} />
        <span className={styles.totalUnit}>{unit}</span>
      </p>
      <p className={styles.secondary}>{range}</p>
    </>
  )
}

function Segments() {
  return (
    <div className={styles.segments}>
      <span>W</span>
      <span data-selected="">M</span>
      <span>3M</span>
    </div>
  )
}

function BarChart({
  values,
  ceiling,
  ticks,
  dates,
}: {
  values: readonly number[]
  ceiling: number
  ticks: readonly number[]
  dates: readonly string[]
}) {
  return (
    <div className={styles.chart}>
      <div className={styles.chartPlot}>
        {ticks.map((tick) => (
          <span
            key={tick}
            className={styles.chartRule}
            style={{ bottom: `${(tick / ceiling) * 100}%` }}
          >
            <b>{tick}</b>
          </span>
        ))}
        <div className={styles.chartBars}>
          {values.map((value, index) => (
            <span
              key={index}
              className={styles.chartBar}
              style={
                {
                  height: `${(value / ceiling) * 100}%`,
                  '--i': index,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.chartDates}>
        {dates.map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
    </div>
  )
}

function linePoints(values: readonly number[], ceiling: number) {
  return values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100
    const y = 100 - (value / ceiling) * 100
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })
}

function LineChart({
  values,
  ceiling,
  ticks,
  dates,
}: {
  values: readonly number[]
  ceiling: number
  ticks: readonly number[]
  dates: readonly string[]
}) {
  const points = linePoints(values, ceiling)
  return (
    <div className={styles.chart}>
      <div className={styles.chartPlot}>
        {ticks.map((tick) => (
          <span
            key={tick}
            className={styles.chartRule}
            style={{ bottom: `${(tick / ceiling) * 100}%` }}
          >
            <b>{tick}</b>
          </span>
        ))}
        <div className={styles.chartWipe}>
          <div className={styles.chartWipeInner}>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="block h-full w-full"
              focusable="false"
            >
              <polygon
                points={`0,100 ${points.join(' ')} 100,100`}
                fill="var(--tone)"
                opacity="0.22"
              />
              <polyline
                points={points.join(' ')}
                fill="none"
                stroke="var(--tone)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.chartDates}>
        {dates.map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
    </div>
  )
}

function Spark({
  values,
  dimBefore = 0,
}: {
  values: readonly number[]
  dimBefore?: number
}) {
  const peak = Math.max(...values)
  return (
    <span className={styles.spark}>
      {values.map((value, index) => (
        <i
          key={index}
          className={cn(index < dimBefore && 'opacity-35')}
          style={
            {
              height: `${Math.max((value / peak) * 100, value ? 10 : 0)}%`,
              '--i': index,
            } as CSSProperties
          }
        />
      ))}
    </span>
  )
}

function SparkLine({ values }: { values: readonly number[] }) {
  const points = linePoints(values, Math.max(...values) * 1.1)
  return (
    <span className={styles.sparkLine}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="block h-full w-full"
        focusable="false"
      >
        <polygon
          points={`0,100 ${points.join(' ')} 100,100`}
          fill="var(--tone)"
          opacity="0.2"
        />
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke="var(--tone)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

function Rows({ rows }: { rows: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className={cn(styles.card, styles.rows)}>
      {rows.map(([name, value]) => (
        <p key={name}>
          <span>{name}</span>
          <span className={styles.rowValue}>{value}</span>
        </p>
      ))}
    </div>
  )
}

function Highlight({
  icon,
  children,
  toneName,
}: {
  icon: ReactNode
  children: ReactNode
  toneName: Tone
}) {
  return (
    <div className={cn(styles.card, styles.highlight)} style={tone(toneName)}>
      <span className={styles.highlightIcon}>{icon}</span>
      <p>{children}</p>
    </div>
  )
}

type MetricCardProps = {
  id: PrismAppScreenId
  toneName: Tone
  icon: ReactNode
  label: string
  period: string
  value: number
  unit: string
  note?: string
  viz?: ReactNode
  onSelect?: (id: PrismAppScreenId) => void
}

function MetricCard({
  id,
  toneName,
  icon,
  label,
  period,
  value,
  unit,
  note,
  viz,
  onSelect,
}: MetricCardProps) {
  const body = (
    <>
      <span className={styles.metricHead}>
        <span className={styles.metricLabel}>
          {icon}
          {label}
        </span>
        <span className={styles.secondary}>{period}</span>
      </span>
      <span className={styles.metricBody}>
        <span>
          <span className={styles.metricValue}>
            {value.toLocaleString('en-US')}
            <span className={styles.totalUnit}>{unit}</span>
          </span>
          {note ? <span className={styles.metricNote}>{note}</span> : null}
        </span>
        {viz}
        <ChevronRight className={styles.metricChevron} />
      </span>
    </>
  )

  // The cards open their screens, as they do in the app. Pointer only: the
  // tabs beside the phone are the keyboard and screen reader path.
  return onSelect ? (
    <button
      type="button"
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSelect(id)}
      className={cn(styles.card, styles.metric)}
      style={tone(toneName)}
    >
      {body}
    </button>
  ) : (
    <div className={cn(styles.card, styles.metric)} style={tone(toneName)}>
      {body}
    </div>
  )
}

function SummaryScreen({
  onSelect,
}: {
  onSelect?: (id: PrismAppScreenId) => void
}) {
  return (
    <>
      <div className={styles.largeTitleRow}>
        <div>
          <p className={styles.largeTitle}>Summary</p>
          <p className={styles.siteName}>{SITE}</p>
        </div>
        <span className={styles.avatar}>
          <UserRound />
        </span>
      </div>

      <div className={cn(styles.card, styles.live)} style={tone('green')}>
        <span className={styles.liveDot} />
        <p>
          <span className={styles.strong}>14 people on your site</span>
          <span className={styles.secondary}>Right now · last 30 minutes</span>
        </p>
      </div>

      <p className={styles.sectionLabel}>Highlights</p>
      <div className={cn(styles.card, styles.feedItem)} style={tone('orange')}>
        <span className={styles.feedIcon}>
          <Search />
        </span>
        <p>
          <span className={styles.strong}>On Google’s first page</span>
          <span className={styles.secondary}>
            Bayview Dental now ranks #7 for “emergency dentist.”
          </span>
        </p>
      </div>

      <MetricCard
        id="leads"
        toneName="green"
        icon={<Mail />}
        label="Leads"
        period="Last 28 Days"
        value={30}
        unit="forms"
        note="About the same as last month"
        viz={<Spark values={LEADS_DAILY.slice(12)} />}
        onSelect={onSelect}
      />
      <MetricCard
        id="visits"
        toneName="blue"
        icon={<UsersRound />}
        label="Visits"
        period="Last 7 Days"
        value={1223}
        unit="visits"
        note="Up 3% from last week"
        viz={<Spark values={WEEK_VISITS} dimBefore={7} />}
        onSelect={onSelect}
      />
      <MetricCard
        id="search"
        toneName="orange"
        icon={<Search />}
        label="Google Search"
        period="Through Nov 5"
        value={498}
        unit="clicks"
        note="Up 16% from last month"
        viz={<SparkLine values={CLICKS_DAILY.slice(14)} />}
        onSelect={onSelect}
      />
      <MetricCard
        id="ai"
        toneName="violet"
        icon={<Sparkles />}
        label="AI Assistants"
        period="Last 28 Days"
        value={23}
        unit="visits"
        onSelect={onSelect}
      />
    </>
  )
}

function LeadsScreen() {
  return (
    <>
      <p className={styles.navTitle}>Leads</p>
      <div className={cn(styles.card, styles.chartCard)} style={tone('green')}>
        <Segments />
        <Total value={30} unit="forms" range="Oct 12 – Nov 8" />
        <BarChart
          values={LEADS_DAILY}
          ceiling={4}
          ticks={[0, 2, 4]}
          dates={['Oct 12', 'Oct 18', 'Oct 25', 'Nov 1']}
        />
      </div>
      <p className={styles.footnote}>
        Forms people sent through your website, such as appointment requests.
        Prism only counts them and never stores what people wrote.
      </p>
      <p className={styles.sectionLabel}>Highlights</p>
      <Highlight icon={<Mail />} toneName="green">
        Your latest form came in 2 hours ago.
      </Highlight>
      <p className={styles.sectionLabel}>By Form</p>
      <Rows
        rows={[
          ['Appointment request', '21'],
          ['Contact message', '9'],
        ]}
      />
    </>
  )
}

function VisitsScreen() {
  return (
    <>
      <p className={styles.navTitle}>Visits</p>
      <div className={cn(styles.card, styles.chartCard)} style={tone('blue')}>
        <Segments />
        <Total value={4660} unit="visits" range="Oct 11 – Nov 7" />
        <BarChart
          values={VISITS_DAILY}
          ceiling={300}
          ticks={[0, 100, 200, 300]}
          dates={['Oct 11', 'Oct 18', 'Oct 25', 'Nov 1']}
        />
      </div>
      <p className={styles.sectionLabel}>Highlights</p>
      <Highlight icon={<CalendarDays />} toneName="blue">
        Your busiest day was Friday, November 6, with 212 visits.
      </Highlight>
      <p className={styles.sectionLabel}>Details</p>
      <Rows
        rows={[
          ['Visitors', '3,900'],
          ['Engaged visits', '61%'],
        ]}
      />
      <p className={styles.footnote}>
        A visit counts as engaged when someone stays longer than 10 seconds,
        views more than one page, or takes an action such as calling or
        booking.
      </p>
    </>
  )
}

function SearchScreen() {
  return (
    <>
      <p className={styles.navTitle}>Google Search</p>
      <div className={cn(styles.card, styles.chartCard)} style={tone('orange')}>
        <Segments />
        <Total value={498} unit="clicks" range="Oct 9 – Nov 5" />
        <LineChart
          values={CLICKS_DAILY}
          ceiling={30}
          ticks={[0, 10, 20, 30]}
          dates={['Oct 11', 'Oct 18', 'Oct 25', 'Nov 1']}
        />
      </div>
      <p className={styles.footnote}>
        Google shares search data about three days late, so the most recent
        days appear once they’re final.
      </p>
      <p className={styles.sectionLabel}>Last 28 Days</p>
      <Rows
        rows={[
          ['Clicks', '498'],
          ['Times shown on Google', '15,438'],
          ['Average position', '8.4'],
        ]}
      />
      <p className={styles.footnote}>
        Clicks are people who chose your site from Google’s results. Position
        is where your site appeared on average; 1 to 10 is the first page.
      </p>
    </>
  )
}

function AiScreen() {
  return (
    <>
      <p className={styles.navTitle}>AI Assistants</p>
      <div className={cn(styles.card, styles.chartCard)} style={tone('violet')}>
        <Total value={23} unit="visits" range="Last 28 days" />
      </div>
      <p className={styles.footnote}>
        Visits from people who followed a link in an answer from an AI
        assistant such as ChatGPT or Perplexity.
      </p>
      <p className={styles.sectionLabel}>Assistants</p>
      <Rows
        rows={[
          ['ChatGPT', '17'],
          ['Perplexity', '6'],
        ]}
      />
    </>
  )
}

const UPDATES: ReadonlyArray<{
  day: string
  items: ReadonlyArray<{
    toneName: Tone
    icon: ReactNode
    title: string
    time: string
    body: string
    from?: string
  }>
}> = [
  {
    day: 'Today',
    items: [
      {
        toneName: 'green',
        icon: <Mail />,
        title: 'New appointment request',
        time: '6:15 PM',
        body: `Someone sent an appointment request through ${SITE}.`,
      },
      {
        toneName: 'green',
        icon: <TrendingUp />,
        title: 'Your site is busy right now',
        time: '4:50 PM',
        body: '64 people are on Bayview Dental, about 3× your usual for this time.',
      },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      {
        toneName: 'orange',
        icon: <Search />,
        title: 'On Google’s first page',
        time: '7:30 AM',
        body: 'Bayview Dental now ranks #7 for “emergency dentist.”',
      },
    ],
  },
  {
    day: 'Friday, Nov 6',
    items: [
      {
        toneName: 'violet',
        icon: <BadgeCheck />,
        title: 'New Invisalign page is live',
        time: '2:12 PM',
        body: 'Answers the questions patients ask Google and ChatGPT most.',
        from: 'From Prism',
      },
    ],
  },
]

function UpdatesScreen() {
  return (
    <>
      <div className={styles.largeTitleRow}>
        <div>
          <p className={styles.largeTitle}>Updates</p>
          <p className={styles.siteName}>{SITE}</p>
        </div>
        <span className={styles.avatar}>
          <UserRound />
        </span>
      </div>
      {UPDATES.map((group) => (
        <div key={group.day} className={styles.feedGroup}>
          <p className={styles.sectionLabel}>{group.day}</p>
          <div className={cn(styles.card, styles.feed)}>
            {group.items.map((item, index) => (
              <div
                key={item.title}
                className={styles.feedItem}
                style={{ ...tone(item.toneName), '--i': index } as CSSProperties}
              >
                <span className={styles.feedIcon}>{item.icon}</span>
                <p>
                  <span className={styles.feedHead}>
                    <span className={styles.strong}>{item.title}</span>
                    <span className={styles.feedTime}>{item.time}</span>
                  </span>
                  <span className={styles.secondary}>{item.body}</span>
                  {item.from ? (
                    <span className={styles.feedFrom}>{item.from}</span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

type AppScreenProps = {
  id: PrismAppScreenId
  /** Lets the Summary cards open their screens. */
  onSelect?: (id: PrismAppScreenId) => void
}

export function AppScreen({ id, onSelect }: AppScreenProps) {
  return (
    <div className={styles.screen}>
      <StatusBar />
      <div className={styles.screenBody}>
        {id === 'summary' ? <SummaryScreen onSelect={onSelect} /> : null}
        {id === 'leads' ? <LeadsScreen /> : null}
        {id === 'visits' ? <VisitsScreen /> : null}
        {id === 'search' ? <SearchScreen /> : null}
        {id === 'ai' ? <AiScreen /> : null}
        {id === 'updates' ? <UpdatesScreen /> : null}
      </div>
    </div>
  )
}

/** The Lock Screen behind the hero's notifications. */
export function AppLockScreen() {
  return (
    <div className={cn(styles.screen, styles.lock)}>
      <StatusBar />
      <div className={styles.screenBody}>
        <p className={styles.lockDate}>Sunday, November 8</p>
        <p className={styles.lockTime}>9:41</p>
      </div>
    </div>
  )
}

/** One Lock Screen notification, at page scale so it reads on any screen. */
export function AppNotification({
  title,
  body,
  time,
  className,
}: {
  title: string
  body: string
  time: string
  className?: string
}) {
  return (
    <li className={cn(styles.notification, className)}>
      <Image
        src="/prism-app/app-icon.png"
        alt=""
        width={88}
        height={88}
        className="size-11 shrink-0 rounded-[0.7rem]"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline justify-between gap-3">
          <span className="truncate text-[15px] font-semibold text-foreground">
            {title}
          </span>
          <span className="shrink-0 text-[13px] text-subtle">{time}</span>
        </p>
        <p className="mt-0.5 truncate text-[15px] leading-5 text-muted-foreground">
          {body}
        </p>
      </div>
    </li>
  )
}

import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  ChevronsUpDown,
  CircleUserRound,
  Eye,
  FileText,
  Mail,
  MessageCircleQuestion,
  Search,
  Share,
  Sparkles,
  Star,
  TrendingUp,
  UsersRound,
} from 'lucide-react'

import type { PrismAppScreenId } from '@/lib/prism-app'
import { cn } from '@/lib/utils'

import styles from './app-page.module.css'

/**
 * Prism Grow 1.5's screens, drawn in HTML from the demo-mode captures so they
 * stay sharp and readable at any size. Every number and sentence comes from
 * the app's demo (Bayview Dental, fictional) as it reads on Wednesday,
 * November 11, 2026, the day of the App Store screenshots: the demo derives
 * its daily numbers from the date (prism-platform:
 * apps/ios/Prism/Core/SampleData.swift). Sizes are in `--u`, one iOS point on
 * a 390pt-wide screen, so a screen scales with its phone. Decorative to
 * assistive tech: the copy beside each phone carries the content.
 *
 * Do not draw anything the app does not show.
 */

const SITE = 'bayviewdental.example'

/** Forms per day, Oct 15 to Nov 11. Sums to 30. */
const FORMS_DAILY = [
  0, 0, 2, 3, 0, 1, 2, 0, 0, 1, 2, 3, 0, 1, 0, 0, 0, 1, 2, 3, 0, 0, 0, 3, 0, 1,
  2, 3,
]

/** Visits per day, Oct 14 to Nov 10. Sums to 4,675; the 28 days before, 4,053. */
const VISITS_DAILY = [
  176, 166, 163, 106, 114, 193, 192, 182, 172, 170, 110, 118, 200, 198, 188,
  178, 176, 114, 122, 206, 204, 194, 184, 182, 118, 126, 212, 211,
]

/** Google clicks per day, Oct 12 to Nov 8. Sums to 498; the 28 days before, 432. */
const CLICKS_DAILY = [
  19, 19, 19, 19, 19, 11, 11, 20, 21, 21, 20, 18, 11, 12, 22, 23, 21, 19, 18,
  11, 12, 22, 23, 22, 20, 19, 12, 14,
]

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
  label = 'Total',
  value,
  unit,
  range,
}: {
  label?: string
  value: number
  unit: string
  range: string
}) {
  return (
    <>
      <p className={styles.totalLabel}>{label}</p>
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
      <span>7D</span>
      <span data-selected="">28D</span>
      <span>90D</span>
    </div>
  )
}

/** The row at the foot of each chart card. */
function ReadDailyValues() {
  return (
    <p className={styles.chartFoot}>
      Read Daily Values
      <ChevronRight />
    </p>
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

function Spark({ values }: { values: readonly number[] }) {
  const peak = Math.max(...values)
  return (
    <span className={styles.spark}>
      {values.map((value, index) => (
        <i
          key={index}
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

/**
 * A card that opens its screen, as it does in the app. Pointer only: the tabs
 * beside the phone are the keyboard and screen reader path.
 */
function Opens({
  id,
  onSelect,
  className,
  style,
  children,
}: {
  id?: PrismAppScreenId
  onSelect?: (id: PrismAppScreenId) => void
  className: string
  style?: CSSProperties
  children: ReactNode
}) {
  return id && onSelect ? (
    <button
      type="button"
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSelect(id)}
      className={className}
      style={style}
    >
      {children}
    </button>
  ) : (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

type MetricCardProps = {
  /** The screen the card opens. Visits has none on this page. */
  id?: PrismAppScreenId
  toneName: Tone
  icon: ReactNode
  label: string
  period: string
  value: number
  unit: string
  note?: ReactNode
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
  return (
    <Opens
      id={id}
      onSelect={onSelect}
      className={cn(styles.card, styles.metric)}
      style={tone(toneName)}
    >
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
    </Opens>
  )
}

function Up({ children }: { children: ReactNode }) {
  return (
    <>
      <ArrowUpRight className={styles.inlineArrow} />
      {children}
    </>
  )
}

function SummaryScreen({
  onSelect,
}: {
  onSelect?: (id: PrismAppScreenId) => void
}) {
  return (
    <>
      <div className={styles.toolbar}>
        <span className={styles.toolbarPill}>
          <MessageCircleQuestion />
          <CircleUserRound />
        </span>
      </div>
      <div className={styles.largeTitleRow}>
        <div>
          <p className={styles.largeTitle}>Summary</p>
          <p className={styles.siteName}>Website: {SITE}</p>
        </div>
      </div>

      <div className={cn(styles.card, styles.takeaway)} style={tone('green')}>
        <span className={styles.takeawayIcon}>
          <ArrowUpRight />
        </span>
        <p>
          <span className={styles.takeawayTitle}>Visits are up 15%</span>
          <span className={styles.secondary}>
            4,675 in the last 28 days, compared with 4,053 in the 28 days
            before.
          </span>
        </p>
      </div>

      <Opens
        id="report"
        onSelect={onSelect}
        className={cn(styles.card, styles.linkRow)}
        style={tone('violet')}
      >
        <FileText className={styles.linkRowIcon} />
        <span className={styles.strong}>Latest Monthly Report</span>
        <ChevronRight className={styles.metricChevron} />
      </Opens>

      <MetricCard
        id="forms"
        toneName="green"
        icon={<Mail />}
        label="Forms Submitted"
        period="Last 28 Days"
        value={30}
        unit="forms"
        note="About the same as the previous 28 days"
        viz={<Spark values={FORMS_DAILY} />}
        onSelect={onSelect}
      />
      <MetricCard
        toneName="blue"
        icon={<UsersRound />}
        label="Visits"
        period="Last 28 Days"
        value={4675}
        unit="visits"
        note={<Up>Up 15% from the previous 28 days</Up>}
        viz={<Spark values={VISITS_DAILY} />}
      />
      <MetricCard
        id="search"
        toneName="orange"
        icon={<Search />}
        label="Google Search"
        period="Through Nov 8"
        value={498}
        unit="clicks"
        note={<Up>Up 15% from the previous 28 days</Up>}
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

/** October 2026 in the demo: every month is built from the same daily rates. */
const REPORT_ROWS: ReadonlyArray<{
  icon: ReactNode
  label: string
  value: number
  change: string
}> = [
  { icon: <UsersRound />, label: 'Visits', value: 5301, change: '9%' },
  { icon: <Mail />, label: 'Forms submitted', value: 32, change: '19%' },
  { icon: <Search />, label: 'Clicks from Google', value: 558, change: '24%' },
  { icon: <Eye />, label: 'Times shown on Google', value: 17298, change: '24%' },
  {
    icon: <Sparkles />,
    label: 'Visits from AI assistants',
    value: 23,
    change: '35%',
  },
]

function ReportScreen() {
  return (
    <>
      <div className={styles.navRow}>
        <p className={styles.navRowTitle}>Monthly Report</p>
        <span className={styles.navButton}>
          <Share />
        </span>
      </div>

      <div className={styles.card}>
        <p className={styles.pickerRow}>
          <span>Month</span>
          <span className={styles.pickerValue}>
            October 2026
            <ChevronsUpDown />
          </span>
        </p>
        <p className={styles.reportHeadline}>
          October had <Count value={5301} /> visits, up 9% from September.
        </p>
        <p className={styles.reportMeta}>
          Bayview Dental · Thursday, October 1 – Saturday, October 31
        </p>
        <p className={styles.reportDemo}>Demo · sample data</p>
      </div>

      <div className={cn(styles.card, styles.reportRows)} style={tone('blue')}>
        {REPORT_ROWS.map((row) => (
          <div key={row.label} className={styles.reportRow}>
            <span className={styles.reportIcon}>{row.icon}</span>
            <p>
              <span className={styles.reportLabel}>{row.label}</span>
              <span className={styles.reportValue}>
                {row.value.toLocaleString('en-US')}
              </span>
            </p>
            <span className={styles.changePill}>
              <ArrowUpRight />
              {row.change}
            </span>
          </div>
        ))}
      </div>
      <p className={styles.footnote}>Compared with September 2026.</p>

      <p className={styles.sectionTitle}>What Changed</p>
      <div className={styles.card}>
        <p>Visits (Sessions): 5,301, compared with 4,860 in the previous month.</p>
      </div>
    </>
  )
}

function FormsScreen() {
  return (
    <>
      <p className={styles.navTitle}>Forms Submitted</p>
      <div className={cn(styles.card, styles.chartCard)} style={tone('green')}>
        <Segments />
        <Total
          label="Captured total"
          value={30}
          unit="forms"
          range="Oct 15 – Nov 11"
        />
        <BarChart
          values={FORMS_DAILY}
          ceiling={4}
          ticks={[0, 2, 4]}
          dates={['Oct 18', 'Oct 25', 'Nov 1', 'Nov 8']}
        />
        <ReadDailyValues />
      </div>
      <p className={styles.footnote}>
        Forms people submitted through your website. Prism counts submissions
        and never stores what people wrote.
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
      <p className={styles.footnote}>Last 28 days.</p>
    </>
  )
}

function SearchScreen() {
  return (
    <>
      <p className={styles.navTitle}>Google Search</p>
      <div className={cn(styles.card, styles.chartCard)} style={tone('orange')}>
        <Segments />
        <Total value={498} unit="clicks" range="Oct 12 – Nov 8" />
        <LineChart
          values={CLICKS_DAILY}
          ceiling={30}
          ticks={[0, 10, 20, 30]}
          dates={['Oct 18', 'Oct 25', 'Nov 1', 'Nov 8']}
        />
        <ReadDailyValues />
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
        Clicks count clicks on your site’s Google results, not unique people or
        submitted forms. Position is where your site appeared on average; 1 to
        10 is the first page.
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

/** The demo's Updates feed at 9:41 AM on Wednesday, November 11. */
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
        title: 'New form submission',
        time: '8:06 AM',
        body: `${SITE} received a form: Appointment request.`,
      },
      {
        toneName: 'green',
        icon: <TrendingUp />,
        title: 'Your site is busy right now',
        time: '6:41 AM',
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
    day: 'Monday, Nov 9',
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
  {
    day: 'Saturday, Nov 7',
    items: [
      {
        toneName: 'blue',
        icon: <Star />,
        title: 'Best week since August',
        time: '8:00 AM',
        body: 'Bayview Dental had 1,032 visits last week.',
      },
    ],
  },
]

function UpdatesScreen() {
  return (
    <>
      <div className={styles.toolbar}>
        <span className={styles.navButton}>
          <CircleUserRound />
        </span>
      </div>
      <div className={styles.largeTitleRow}>
        <div>
          <p className={styles.largeTitle}>Updates</p>
          <p className={styles.siteName}>Website: {SITE}</p>
        </div>
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
        {id === 'report' ? <ReportScreen /> : null}
        {id === 'forms' ? <FormsScreen /> : null}
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
        <p className={styles.lockDate}>Wednesday, November 11</p>
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

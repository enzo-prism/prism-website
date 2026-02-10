import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { HOME_HERO_MONTHLY_LEADS_STATS } from "@/content/home-hero-leads"
import { cn } from "@/lib/utils"

const MONTH_NAMES_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

function parseMonthKey(monthKey: string) {
  const [yearRaw, monthRaw] = monthKey.split("-")
  const year = Number.parseInt(yearRaw ?? "", 10)
  const month = Number.parseInt(monthRaw ?? "", 10)
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return null
  }
  return { year, monthIndex: month - 1 }
}

function formatMonthKeyLong(monthKey: string) {
  const parsed = parseMonthKey(monthKey)
  if (!parsed) return monthKey
  return `${MONTH_NAMES_LONG[parsed.monthIndex]} ${parsed.year}`
}

function formatMonthKeyShort(monthKey: string) {
  const parsed = parseMonthKey(monthKey)
  if (!parsed) return monthKey
  return `${MONTH_NAMES_SHORT[parsed.monthIndex]} ${parsed.year}`
}

type HeroMonthlyLeadsPillProps = {
  className?: string
}

export default function HeroMonthlyLeadsPill({ className }: HeroMonthlyLeadsPillProps) {
  const latest = HOME_HERO_MONTHLY_LEADS_STATS[0]
  if (!latest) return null

  const monthLong = formatMonthKeyLong(latest.month)
  const monthShort = formatMonthKeyShort(latest.month)
  const leadsText = latest.leads.toLocaleString("en-US")

  return (
    <Link
      href="/case-studies"
      aria-label={`View case studies: ${monthLong}, ${leadsText} new leads delivered across Prism clients`}
      className={cn(
        "group inline-flex max-w-[46rem] flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-border/60 bg-background/75 px-4 py-2 text-center text-xs text-muted-foreground shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border/80 hover:bg-background/85 hover:shadow-[0_26px_60px_-34px_rgba(0,0,0,0.55)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-5 sm:py-2.5 sm:text-sm",
        className,
      )}
    >
      <span className="font-semibold text-foreground">
        <span className="sm:hidden">{monthShort}</span>
        <span className="hidden sm:inline">{monthLong}</span>
      </span>
      <span aria-hidden="true">•</span>
      <span className="font-semibold text-foreground">{leadsText}</span>
      <span>new leads delivered across Prism clients</span>
      <span aria-hidden="true">•</span>
      <span className="sm:hidden">Updated monthly</span>
      <span className="hidden sm:inline">Updated last day of each month</span>
      <ArrowUpRight
        aria-hidden="true"
        className="ml-1 h-4 w-4 opacity-50 transition-opacity group-hover:opacity-80"
      />
    </Link>
  )
}


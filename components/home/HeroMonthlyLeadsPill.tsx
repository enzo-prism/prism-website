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

type HeroMonthlyLeadsPillProps = {
  className?: string
}

export default function HeroMonthlyLeadsPill({ className }: HeroMonthlyLeadsPillProps) {
  const latest = HOME_HERO_MONTHLY_LEADS_STATS[0]
  if (!latest) return null

  const monthLong = formatMonthKeyLong(latest.month)
  const leadsText = latest.leads.toLocaleString("en-US")

  return (
    <Link
      href="/case-studies"
      aria-label={`View case studies: ${leadsText} new leads delivered to Prism clients in ${monthLong}. Stat updated last day of each month.`}
      className={cn(
        "group relative inline-flex w-fit max-w-[25rem] flex-col items-center justify-center gap-0.5 rounded-[1.5rem] border border-border/60 bg-background/80 px-4 py-3 text-center text-xs text-muted-foreground shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border/80 hover:bg-background/90 hover:shadow-[0_26px_60px_-34px_rgba(0,0,0,0.55)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 sm:py-3.5 sm:text-sm",
        className,
      )}
    >
      <span className="font-semibold leading-tight text-foreground">{leadsText} new leads delivered to Prism clients</span>
      <span className="leading-none">in</span>
      <span className="font-semibold leading-tight text-foreground">{monthLong}</span>
      <span className="text-[10px] leading-tight sm:text-xs">*stat updated last day of each month</span>
      <span className="sr-only">View case studies</span>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-3 top-3 h-4 w-4 opacity-45 transition-opacity group-hover:opacity-80"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/5" />
    </Link>
  )
}

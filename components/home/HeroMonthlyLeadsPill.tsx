import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { HOME_HERO_MONTHLY_LEADS_STATS } from "@/content/home-hero-leads"
import { cn } from "@/lib/utils"

type HeroMonthlyLeadsPillProps = {
  className?: string
}

export default function HeroMonthlyLeadsPill({ className }: HeroMonthlyLeadsPillProps) {
  const latest = HOME_HERO_MONTHLY_LEADS_STATS[0]
  if (!latest) return null

  const leadsText = latest.leads.toLocaleString("en-US")

  return (
    <Link
      href="/get-started"
      aria-label={`Get started with Prism: ${leadsText} leads delivered to clients last month.`}
      className={cn(
        "group relative inline-flex w-fit max-w-[min(25rem,calc(100vw-2rem))] flex-col items-center justify-center gap-1.5 rounded-[1.5rem] border border-border/60 bg-background/80 px-4 py-3.5 text-center text-xs text-muted-foreground shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border/80 hover:bg-background/90 hover:shadow-[0_26px_60px_-34px_rgba(0,0,0,0.55)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-1 sm:px-6 sm:py-3.5 sm:text-sm",
        className,
      )}
    >
      <span className="max-w-[18.5rem] text-balance pr-0 font-semibold leading-snug text-foreground sm:max-w-none sm:pr-5">
        {leadsText} leads delivered to clients last month
      </span>
      <span className="sr-only">Get started with Prism</span>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-3 top-3 hidden h-4 w-4 opacity-45 transition-opacity group-hover:opacity-80 sm:block"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/5" />
    </Link>
  )
}

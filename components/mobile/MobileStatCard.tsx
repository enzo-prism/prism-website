import React from "react"
import { LucideIcon, TrendingDown, TrendingUp, Info } from "lucide-react"

import { cn } from "@/lib/utils"

interface MobileStatCardProps {
  title: string
  value: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  description?: string
  icon?: LucideIcon
  variant?: "primary" | "warning" | "success" | "danger"
  className?: string
}

const iconMap = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Info
}

/** One thin spectrum accent per variant; the card itself stays neutral. */
const variantAccent = {
  primary: "bg-spectrum-blue",
  warning: "bg-spectrum-orange",
  success: "bg-spectrum-green",
  danger: "bg-spectrum-red",
}

export function MobileStatCard({
  title,
  value,
  trend,
  trendValue,
  description,
  icon: Icon,
  variant = "primary",
  className = ""
}: MobileStatCardProps) {
  const TrendIcon = trend ? iconMap[trend] : null
  const accent = variantAccent[variant]

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-colors duration-300 hover:border-white/[0.14]",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("absolute inset-x-5 top-0 h-px opacity-80", accent)} />

      <div className="mb-6 flex items-start justify-between gap-3">
        <p className="my-0! text-sm font-medium leading-snug text-muted-foreground">{title}</p>
        {Icon ? (
          <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
            <Icon className="size-4 text-foreground/85" aria-hidden="true" />
          </span>
        ) : null}

        {trend && TrendIcon && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            <TrendIcon className="size-3" aria-hidden="true" />
            {trendValue && <span>{trendValue}</span>}
          </span>
        )}
      </div>

      <p className="mb-3! mt-0! font-semibold leading-none tracking-[-0.04em] text-foreground text-[2.25rem] tabular-nums">
        {value}
      </p>

      {description && (
        <p className="mb-0! mt-auto! text-[13px] leading-5 text-subtle">{description}</p>
      )}
    </div>
  )
}

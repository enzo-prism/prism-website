import React from "react"
import {
  Info,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Star,
  Zap,
  Award
} from "lucide-react"

import { cn } from "@/lib/utils"

interface MobileInfoCardProps {
  title?: string
  content: string
  variant?: "info" | "tip" | "warning" | "success" | "highlight"
  icon?: "info" | "tip" | "warning" | "success" | "highlight" | "lightbulb" | "target" | "trending" | "star" | "zap" | "award"
  className?: string
}

const iconMap = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  success: CheckCircle,
  highlight: Star,
  lightbulb: Lightbulb,
  target: Target,
  trending: TrendingUp,
  star: Star,
  zap: Zap,
  award: Award
}

/** Neutral card with one thin spectrum accent and a tinted icon per variant. */
const variantStyles = {
  info: { accent: "bg-spectrum-blue", icon: "text-spectrum-blue" },
  tip: { accent: "bg-spectrum-yellow", icon: "text-spectrum-yellow" },
  warning: { accent: "bg-spectrum-orange", icon: "text-spectrum-orange" },
  success: { accent: "bg-spectrum-green", icon: "text-spectrum-green" },
  highlight: { accent: "bg-spectrum-violet", icon: "text-spectrum-violet" },
}

export function MobileInfoCard({
  title,
  content,
  variant = "info",
  icon,
  className = ""
}: MobileInfoCardProps) {
  // Explicit icon wins; otherwise tips get a lightbulb and the rest use the variant icon.
  const selectedIcon = icon ?? (variant === "tip" ? "lightbulb" : variant)
  const IconComponent = iconMap[selectedIcon] || Info
  const styles = variantStyles[variant] ?? variantStyles.info

  return (
    <div
      className={cn(
        "relative my-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-5 pl-6 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-6 sm:pl-7",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-0.5 opacity-90", styles.accent)} />

      <div className="flex items-start gap-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
          <IconComponent className={cn("size-4", styles.icon)} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1 pt-1">
          {title && (
            <p className="mb-1.5! mt-0! text-base font-semibold leading-tight text-foreground">{title}</p>
          )}
          <p className="my-0! text-[15px] leading-7 text-muted-foreground">{content}</p>
        </div>
      </div>
    </div>
  )
}

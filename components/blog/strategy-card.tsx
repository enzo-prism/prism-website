import { Target, Users, Zap, MessageCircle, LayoutGrid, Gauge, Scale, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StrategyCardProps {
  icon: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  timeframe: string
  impact: "High" | "Medium" | "Low"
  steps?: string[]
  tips?: string[]
  className?: string
}

const ICONS = {
  target: Target,
  users: Users,
  zap: Zap,
  "message-circle": MessageCircle,
  "layout-grid": LayoutGrid,
  gauge: Gauge,
  scale: Scale,
} as const

const DIFFICULTY_DOT: Record<string, string> = {
  Easy: "bg-spectrum-green",
  Medium: "bg-spectrum-yellow",
  Hard: "bg-spectrum-red",
}

const IMPACT_DOT: Record<string, string> = {
  High: "bg-spectrum-blue",
  Medium: "bg-spectrum-violet",
  Low: "bg-white/40",
}

export default function StrategyCard({
  icon,
  title,
  description,
  difficulty,
  timeframe,
  impact,
  steps = [],
  tips = [],
  className = ""
}: StrategyCardProps) {
  const Icon = ICONS[icon as keyof typeof ICONS] ?? Target

  return (
    <div
      className={cn(
        "my-8 rounded-2xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-colors duration-300 hover:border-white/[0.14] sm:p-7",
        className,
      )}
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
          <Icon className="size-5 text-foreground/85" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="mb-2! mt-0! text-lg! text-foreground sm:text-xl!">{title}</h3>
          <p className="mb-4! mt-0! text-[15px] leading-7 text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              <span aria-hidden="true" className={cn("size-1.5 rounded-full", DIFFICULTY_DOT[difficulty])} />
              {difficulty}
            </Badge>
            <Badge variant="outline">
              <span aria-hidden="true" className={cn("size-1.5 rounded-full", IMPACT_DOT[impact])} />
              {impact} Impact
            </Badge>
            <Badge variant="outline">
              <Clock aria-hidden="true" />
              {timeframe}
            </Badge>
          </div>
        </div>
      </div>

      {steps.length > 0 ? (
        <div>
          <p className="text-eyebrow mb-3! mt-0! text-subtle">Implementation Steps</p>
          <ol className="my-0! flex list-none! flex-col gap-2.5 pl-0!">
            {steps.map((step, index) => (
              <li key={index} className="my-0! flex items-start gap-3 pl-0!">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-white/10 font-mono text-[11px] text-muted-foreground">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-foreground/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {tips && tips.length > 0 && (
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-4 pl-5">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-spectrum-blue" />
          <p className="text-eyebrow mb-2! mt-0! text-subtle">Pro Tips</p>
          <ul className="my-0! flex list-none! flex-col gap-2 pl-0!">
            {tips.map((tip, index) => (
              <li key={index} className="my-0! flex gap-2.5 pl-0! text-sm leading-6 text-muted-foreground">
                <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-white/40" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

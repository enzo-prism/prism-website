"use client"

import { useState } from "react"
import { Check, Clock, ChevronDown, Zap, Target, TrendingUp, BarChart3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const strategies = [
  {
    id: 1,
    title: "Brand Tagline",
    description: "Create a memorable 5-7 word tagline",
    timeframe: "Week 1",
    difficulty: "Easy",
    impact: "High",
    icon: Target,
    steps: [
      "Define your business in 5-7 words",
      "Add to website and social profiles",
      "Use in 20-30 online mentions"
    ]
  },
  {
    id: 2,
    title: "Online Presence Alignment",
    description: "Unify your business description across all platforms",
    timeframe: "Week 2",
    difficulty: "Medium",
    impact: "High",
    icon: TrendingUp,
    steps: [
      "Audit top 10-20 online mentions",
      "Create 50-word source of truth bio",
      "Update inconsistent information"
    ]
  },
  {
    id: 3,
    title: "Branded Method",
    description: "Coin your own method or approach",
    timeframe: "Week 3",
    difficulty: "Medium",
    impact: "Medium",
    icon: Zap,
    steps: [
      "Develop unique approach/method",
      "Mention in 40-50 online instances",
      "Encourage customer usage in reviews"
    ]
  },
  {
    id: 4,
    title: "FAQ Optimization",
    description: "Turn customer questions into AI-friendly content",
    timeframe: "Week 4",
    difficulty: "Easy",
    impact: "High",
    icon: BarChart3,
    steps: [
      "Monitor social threads for questions",
      "Create comprehensive FAQ page",
      "Format as Question > Answer > Link"
    ]
  }
]

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

export default function StrategyTimelineChart() {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)
  const [completedStrategies, setCompletedStrategies] = useState<number[]>([])

  const toggleComplete = (strategyId: number) => {
    setCompletedStrategies(prev =>
      prev.includes(strategyId)
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    )
  }

  const progress = Math.round((completedStrategies.length / strategies.length) * 100)

  return (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8">
      <div className="mb-6">
        <p className="text-eyebrow mb-3! mt-0! text-subtle">Roadmap</p>
        <h3 className="mb-2! mt-0! text-xl! text-foreground">
          4-Week Implementation Timeline
        </h3>
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          Your roadmap to AI search optimization success
        </p>
      </div>

      <ol className="my-0! flex list-none! flex-col gap-3 pl-0!">
        {strategies.map((strategy) => {
          const isCompleted = completedStrategies.includes(strategy.id)
          const isSelected = selectedStrategy === strategy.id
          const Icon = strategy.icon
          const panelId = `strategy-steps-${strategy.id}`

          return (
            <li
              key={strategy.id}
              className={cn(
                "relative my-0! overflow-hidden rounded-2xl border pl-0! transition-colors duration-300",
                isCompleted
                  ? "border-white/20 bg-white/[0.04]"
                  : isSelected
                  ? "border-white/15 bg-background/60"
                  : "border-white/[0.08] bg-background/50 hover:border-white/15"
              )}
            >
              {isCompleted ? (
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-spectrum-green" />
              ) : null}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleComplete(strategy.id)}
                    className={cn(
                      "mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      isCompleted
                        ? "border-transparent bg-foreground text-background"
                        : "border-white/20 text-transparent hover:border-white/40"
                    )}
                    aria-label={isCompleted ? `Mark ${strategy.title} incomplete` : `Mark ${strategy.title} complete`}
                    aria-pressed={isCompleted}
                  >
                    <Check className="size-4" strokeWidth={2.25} aria-hidden="true" focusable="false" />
                  </button>

                  <span className="hidden size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] sm:grid">
                    <Icon className="size-4 text-foreground/85" strokeWidth={1.75} aria-hidden="true" focusable="false" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="my-0! text-base! text-foreground">{strategy.title}</h4>
                    <p className="mb-0! mt-0.5! text-[13px] leading-5 text-muted-foreground">{strategy.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">
                        <span aria-hidden="true" className={cn("size-1.5 rounded-full", DIFFICULTY_DOT[strategy.difficulty])} />
                        {strategy.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        <span aria-hidden="true" className={cn("size-1.5 rounded-full", IMPACT_DOT[strategy.impact])} />
                        {strategy.impact} Impact
                      </Badge>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-subtle">
                        <Clock className="size-3.5" aria-hidden="true" focusable="false" />
                        {strategy.timeframe}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedStrategy(isSelected ? null : strategy.id)}
                    aria-expanded={isSelected}
                    aria-controls={panelId}
                    aria-label={`${isSelected ? "Hide" : "Show"} steps for ${strategy.title}`}
                    className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <ChevronDown
                      className={cn("size-4 transition-transform duration-200", isSelected && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {isSelected ? (
                  <div id={panelId} className="mt-4 border-t border-white/[0.08] pt-4">
                    <p className="text-eyebrow mb-3! mt-0! text-subtle">Implementation Steps</p>
                    <ol className="my-0! flex list-none! flex-col gap-2 pl-0!">
                      {strategy.steps.map((step, stepIndex) => (
                        <li
                          key={stepIndex}
                          className="my-0! flex items-start gap-3 rounded-xl border border-white/[0.06] bg-card p-3 pl-3!"
                        >
                          <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/10 font-mono text-[11px] text-muted-foreground">
                            {stepIndex + 1}
                          </span>
                          <span className="pt-0.5 text-sm leading-6 text-foreground/85">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1! mt-0! text-sm font-semibold text-foreground">Progress Tracker</p>
          <p className="my-0! text-[13px] text-muted-foreground">
            {completedStrategies.length} of {strategies.length} strategies completed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08] sm:w-40"
            role="progressbar"
            aria-label="Strategies completed"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="bg-spectrum h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="min-w-[2.5rem] text-right font-mono text-sm tabular-nums text-foreground">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  )
}

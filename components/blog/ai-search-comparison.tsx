import { User, Bot, ArrowRight, Search, Globe, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type FlowStep = {
  step: number
  title: string
  description: string
  icon: LucideIcon
}

const traditionalFlow: FlowStep[] = [
  {
    step: 1,
    title: "User Query",
    description: "User searches for \"best coffee roasters\"",
    icon: Search,
  },
  {
    step: 2,
    title: "Search Results",
    description: "Google shows 10 blue links",
    icon: Globe,
  },
  {
    step: 3,
    title: "Click Through",
    description: "User clicks on your website",
    icon: ArrowRight,
  },
  {
    step: 4,
    title: "Engagement",
    description: "User reads your content",
    icon: User,
  },
]

const aiFlow: FlowStep[] = [
  {
    step: 1,
    title: "User Query",
    description: "User searches for \"best coffee roasters\"",
    icon: Search,
  },
  {
    step: 2,
    title: "AI Processing",
    description: "AI analyzes multiple sources",
    icon: Bot,
  },
  {
    step: 3,
    title: "Direct Answer",
    description: "AI provides summary on results page",
    icon: Sparkles,
  },
  {
    step: 4,
    title: "No Click",
    description: "User gets answer without visiting sites",
    icon: User,
  },
]

function FlowColumn({
  label,
  caption,
  icon: LabelIcon,
  accentClass,
  steps,
  result,
}: {
  label: string
  caption: string
  icon: LucideIcon
  accentClass: string
  steps: FlowStep[]
  result: string
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex flex-col items-start gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[13px] font-medium text-foreground">
          <span aria-hidden="true" className={`size-1.5 rounded-full ${accentClass}`} />
          <LabelIcon aria-hidden="true" className="size-3.5 text-muted-foreground" />
          {label}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          {caption}
        </span>
      </div>

      <ol className="my-0! flex list-none! flex-col gap-2 pl-0!">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <li
              key={step.step}
              className="my-0! flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-background/50 p-4 pl-4!"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Icon aria-hidden="true" className="size-4 text-foreground/85" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">{step.title}</span>
                <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">
                  {step.description}
                </span>
              </span>
              <span className="font-mono text-[11px] tabular-nums text-subtle">
                0{step.step}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-3 pl-4">
        <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-0.5 ${accentClass}`} />
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          <strong>Result:</strong> {result}
        </p>
      </div>
    </div>
  )
}

export default function AISearchComparison() {
  return (
    <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8">
      <div className="mb-8">
        <p className="text-eyebrow mb-3! mt-0! text-subtle">Comparison</p>
        <h3 className="mb-2! mt-0! text-xl! text-foreground">
          The Search Experience Evolution
        </h3>
        <p className="my-0! text-sm leading-6 text-muted-foreground">
          How AI is changing the way users find and consume information
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        <FlowColumn
          label="Traditional Search"
          caption="The old way (pre-AI)"
          icon={User}
          accentClass="bg-spectrum-green"
          steps={traditionalFlow}
          result="Your website gets traffic and engagement"
        />
        <FlowColumn
          label="AI-Powered Search"
          caption="The new reality (2024+)"
          icon={Bot}
          accentClass="bg-spectrum-red"
          steps={aiFlow}
          result="Your website loses traffic and visibility"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-5 text-center sm:p-6">
        <h4 className="mb-2! mt-0! text-base! text-foreground">The Solution: AI-First Optimization</h4>
        <p className="mx-auto mb-4! mt-0! max-w-[52ch] text-sm leading-6 text-muted-foreground">
          Instead of fighting AI, work with it. Make your brand the obvious choice for AI to mention.
        </p>
        <ul className="my-0! flex list-none! flex-wrap justify-center gap-x-5 gap-y-2 pl-0! text-sm">
          {[
            { label: "Consistent branding", accent: "bg-spectrum-green" },
            { label: "Quality content", accent: "bg-spectrum-blue" },
            { label: "Authority building", accent: "bg-spectrum-violet" },
          ].map((item) => (
            <li key={item.label} className="my-0! flex items-center gap-2 pl-0! text-muted-foreground">
              <span aria-hidden="true" className={`size-1.5 rounded-full ${item.accent}`} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

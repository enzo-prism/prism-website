import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BotMessageSquare,
  ChartLine,
  LayoutDashboard,
  SearchCheck,
  Sparkles,
} from 'lucide-react'

const ICON_ROTATION: LucideIcon[] = [
  LayoutDashboard,
  ChartLine,
  Activity,
  SearchCheck,
  BotMessageSquare,
  Sparkles,
]

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
      {children}
    </p>
  )
}

function OutcomePanel({
  description,
  icon: Icon,
}: {
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/70 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background">
          <Icon className="size-4 text-foreground" aria-hidden="true" />
        </span>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

type CaseStudyOutcomesGridProps = {
  eyebrow?: string
  title: string
  outcomes: string[]
}

export default function CaseStudyOutcomesGrid({
  eyebrow = 'what prism built',
  title,
  outcomes,
}: CaseStudyOutcomesGridProps) {
  if (!outcomes || outcomes.length === 0) {
    return null
  }

  return (
    <section className="border-b border-border/60 px-4 py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 max-w-3xl space-y-4">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome, idx) => (
            <OutcomePanel
              key={outcome}
              description={outcome}
              icon={ICON_ROTATION[idx % ICON_ROTATION.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

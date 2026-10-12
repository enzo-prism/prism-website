import type { LucideIcon } from "lucide-react"
import { AppWindow, ArrowUpRight, ChartColumn, Command, Play } from "lucide-react"

import { SpotlightCard } from "@/components/prism/spotlight-card"
import { Badge } from "@/components/ui/badge"
import type { SoftwareApp } from "@/lib/software-apps"
import { cn } from "@/lib/utils"

type SoftwareAppCardsProps = {
  apps: SoftwareApp[]
  cardClassName?: string
  buttonClassName?: string
}

/** Legacy pixel icon paths in lib/software-apps.ts mapped to lucide glyphs. */
const ICONS: Record<string, LucideIcon> = {
  "/pixelish/bar-chart-average.svg": ChartColumn,
  "/pixelish/media-play.svg": Play,
  "/pixelish/command.svg": Command,
}

export default function SoftwareAppCards({
  apps,
  cardClassName = "",
  buttonClassName = "",
}: SoftwareAppCardsProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {apps.map((app, index) => {
        const Icon = ICONS[app.icon.src] ?? AppWindow
        return (
          <li key={app.title}>
            <SpotlightCard
              beam={index === 0}
              className={cn("group/app flex h-full flex-col p-6 sm:p-7", cardClassName)}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  role="img"
                  aria-label={app.icon.alt}
                  className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground"
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <Badge variant="outline">{app.platform ?? "Prism app"}</Badge>
              </div>
              <h3 className="text-heading mt-8 text-foreground">{app.title}</h3>
              <p className="mt-3 max-w-[48ch] text-pretty text-[0.95rem] leading-7 text-muted-foreground">
                {app.description}
              </p>
              <div className="mt-auto pt-8">
              <a
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  buttonClassName,
                )}
              >
                <span>{app.hrefLabel}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover/app:-translate-y-0.5 group-hover/app:translate-x-0.5"
                />
              </a>
              </div>
            </SpotlightCard>
          </li>
        )
      })}
    </ul>
  )
}

import type { ReactNode } from 'react'
import { Check, Clapperboard, FileText, Images, Phone } from 'lucide-react'

import BrowserFrame from '@/components/prism/browser-frame'
import type { PrismServiceId } from '@/lib/services'

/* Decorative vignettes for the three service cards on /services. Real client
   screenshots or illustrative UI only; no metrics. */

function WebsiteVisual() {
  return (
    <div className="relative h-56 overflow-hidden">
      <BrowserFrame
        src="/case-studies/olympic-bootworks-home-desktop.jpg"
        alt=""
        url="olympicbootworks.com"
        sizes="(min-width: 1024px) 24rem, 90vw"
        className="absolute left-6 right-[-18%] top-6 transition-transform duration-500 group-hover/service:-translate-y-1.5"
      />
    </div>
  )
}

const CONTENT_ROWS = [
  { day: 'Mon', title: 'Reel edit, three cuts', icon: Clapperboard, state: 'Published' },
  { day: 'Wed', title: 'Service page story', icon: FileText, state: 'In review' },
  { day: 'Fri', title: 'Team photo carousel', icon: Images, state: 'Planned' },
] as const

function ContentVisual() {
  return (
    <div className="flex h-56 flex-col justify-center gap-2 px-6">
      {CONTENT_ROWS.map((row, index) => {
        const Icon = row.icon
        return (
          <div
            key={row.title}
            className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-popover px-3.5 py-2.5"
          >
            <span className="w-8 font-mono text-[11px] text-subtle">{row.day}</span>
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-[13px] text-foreground/90">
              {row.title}
            </span>
            <span
              className={
                index === 0
                  ? 'inline-flex items-center gap-1 text-[11px] text-foreground'
                  : 'text-[11px] text-subtle'
              }
            >
              {index === 0 ? <Check className="size-3" /> : null}
              {row.state}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function AdsVisual() {
  return (
    <div className="flex h-56 flex-col justify-center gap-3 px-6">
      <div className="rounded-xl border border-white/[0.08] bg-popover p-4">
        <p className="text-[11px] text-subtle">Sponsored</p>
        <p className="mt-1 text-sm font-medium text-foreground">Your business · Book this week</p>
        <div className="mt-2.5 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-white/10" />
          <span className="block h-1.5 w-3/5 rounded-full bg-white/10" />
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-foreground">
          <Phone className="size-3" />
          Call
        </span>
      </div>
      <div className="flex gap-4 px-1 text-[11px] text-subtle">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-spectrum-blue" />
          Calls tracked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-white/40" />
          Inquiries tracked
        </span>
      </div>
    </div>
  )
}

export const SERVICE_VISUALS: Record<PrismServiceId, () => ReactNode> = {
  website: WebsiteVisual,
  content: ContentVisual,
  ads: AdsVisual,
}

import {
  CheckCircle2,
  Clapperboard,
  Camera,
  Infinity as InfinityIcon,
  Megaphone,
  MonitorSmartphone,
  Palette,
  PanelsTopLeft,
  PenLine,
  type LucideIcon,
} from 'lucide-react'

import { Marquee } from '@/components/prism/marquee'
import {
  QUEUE_BOARD,
  QUEUE_BOARD_TYPES,
  QUEUE_STREAM,
  type InfinityRequestType,
} from '@/components/prism-infinity/infinity-content'
import { cn } from '@/lib/utils'

import styles from './infinity.module.css'

export const REQUEST_TYPE_META: Record<
  InfinityRequestType,
  { label: string; icon: LucideIcon }
> = {
  landing: { label: 'Landing page', icon: PanelsTopLeft },
  ad: { label: 'Ad creative', icon: Megaphone },
  website: { label: 'Website', icon: MonitorSmartphone },
  video: { label: 'Video', icon: Clapperboard },
  photo: { label: 'Photoshoot', icon: Camera },
  content: { label: 'Content', icon: PenLine },
  brand: { label: 'Brand', icon: Palette },
}

function TypeIcon({ type, className }: { type: InfinityRequestType; className?: string }) {
  const Icon = REQUEST_TYPE_META[type].icon
  return <Icon aria-hidden="true" className={cn('size-4 shrink-0', className)} />
}

function RequestRow({
  title,
  type,
  index,
}: {
  title: string
  type: InfinityRequestType
  index?: number
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground">
        <TypeIcon type={type} className="size-[15px]" />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm text-foreground/90">{title}</span>
      <span className="hidden shrink-0 text-xs text-subtle sm:inline">
        {REQUEST_TYPE_META[type].label}
      </span>
      {index !== undefined ? (
        <span className="shrink-0 font-mono text-[11px] text-subtle">
          {String(index).padStart(2, '0')}
        </span>
      ) : null}
    </div>
  )
}

/**
 * The hero "queue": the last delivery, the one active request (with the
 * section's spectrum beam), what is up next, and an endless stream of example
 * requests rising into place behind it. CSS-only motion.
 */
export function InfinityQueue({ className }: { className?: string }) {
  const activeType = QUEUE_BOARD_TYPES[QUEUE_BOARD.active] ?? 'website'

  return (
    <div
      className={cn(
        'relative isolate rounded-[2rem] border border-white/[0.08] bg-card p-3 shadow-[0_40px_120px_-40px_oklch(0_0_0/90%),0_1px_0_0_oklch(1_0_0/6%)_inset] sm:p-4',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1.5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <InfinityIcon aria-hidden="true" className="size-4" />
          Your queue
        </p>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted-foreground">
          Example
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Delivered */}
        <div className="flex min-w-0 items-center gap-3 rounded-xl px-3.5 py-2.5">
          <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-subtle" />
          <span className="min-w-0 flex-1 truncate text-sm text-subtle line-through decoration-white/20">
            {QUEUE_BOARD.delivered}
          </span>
          <span className="shrink-0 text-xs text-subtle">Delivered</span>
        </div>

        {/* Active */}
        <div className="prism-beam rounded-xl border border-white/[0.1] bg-popover px-3.5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/[0.06] text-foreground">
              <TypeIcon type={activeType} className="size-[15px]" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {QUEUE_BOARD.active}
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-foreground">
              <span
                aria-hidden="true"
                className={cn('size-1.5 rounded-full bg-foreground', styles.pulseDot)}
              />
              In progress
            </span>
          </div>
          <div aria-hidden="true" className={cn('mt-3.5 h-1 rounded-full', styles.queueBar)}>
            <span className={styles.queueBarFill} />
          </div>
        </div>

        {/* Up next */}
        <p className="text-eyebrow px-2 pb-0.5 pt-3 text-subtle">Up next</p>
        {QUEUE_BOARD.queued.map((title, index) => (
          <RequestRow
            key={title}
            title={title}
            type={QUEUE_BOARD_TYPES[title] ?? 'content'}
            index={index + 2}
          />
        ))}

        {/* The endless part of the queue */}
        <Marquee
          vertical
          duration={34}
          gap="0.5rem"
          className="h-44 sm:h-52"
          label="More example requests waiting in the queue"
        >
          {QUEUE_STREAM.map((request) => (
            <RequestRow key={request.title} title={request.title} type={request.type} />
          ))}
        </Marquee>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.06] px-2 pt-3.5">
        <span className="font-mono text-[11px] text-subtle">Unlimited requests</span>
        <span className="font-mono text-[11px] text-subtle">One active at a time</span>
      </div>
    </div>
  )
}

export default InfinityQueue

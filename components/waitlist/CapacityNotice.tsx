import { CAPACITY_MESSAGE } from '@/lib/waitlist'
import { cn } from '@/lib/utils'

type CapacityNoticeProps = {
  /**
   * `inline` is a compact two-line notice for heroes and hubs.
   * `panel` is the full contained explanation used above the waitlist form.
   */
  variant?: 'inline' | 'panel'
  className?: string
}

/**
 * The one shared capacity notice. Copy lives in `lib/waitlist.ts` so every
 * surface says the same thing; never paste this text into a page.
 */
export default function CapacityNotice({
  variant = 'inline',
  className,
}: CapacityNoticeProps) {
  if (variant === 'panel') {
    return (
      <div
        data-capacity-notice="panel"
        role="status"
        className={cn(
          'rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 sm:p-8',
          className,
        )}
      >
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
          {CAPACITY_MESSAGE.eyebrow}
        </p>
        <p className="mt-4 font-sans text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#f5f0e8]">
          {CAPACITY_MESSAGE.headline}
        </p>
        <p className="mt-3 text-pretty font-sans text-[1rem] leading-7 text-[#b8afa2]">
          {CAPACITY_MESSAGE.body}
        </p>
        <p className="mt-2 text-pretty font-sans text-[1rem] leading-7 text-[#b8afa2]">
          {CAPACITY_MESSAGE.action}
        </p>
      </div>
    )
  }

  return (
    <div
      data-capacity-notice="inline"
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-xl border border-[#d8bc79]/25 bg-[#d8bc79]/[0.06] px-4 py-3',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="home-signal-dot mt-2 h-2 w-2 shrink-0 rounded-full bg-[#d8bc79]"
      />
      <p className="text-pretty font-sans text-[0.94rem] leading-6 text-[#e9e2d6]">
        <span className="font-medium text-[#f5f0e8]">
          {CAPACITY_MESSAGE.headline}
        </span>{' '}
        {CAPACITY_MESSAGE.body}
      </p>
    </div>
  )
}

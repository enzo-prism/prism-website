'use client'

import { getWaitlistIntakeDate, toWaitlistIntakeMonth } from '@/lib/waitlist'
import { cn } from '@/lib/utils'

/**
 * Honest intake calendar for the thank-you route: the month before the next
 * intake (fully booked), the live next intake (highlighted, where the visitor
 * is in line), and the two monthly intakes after it. No spot counts, no
 * countdowns. Usually the booked slot is the current month; while
 * `WAITLIST_EARLIEST_INTAKE` pushes the intake further out, it is the last
 * booked month before it.
 *
 * Months resolve from the visitor's clock, like `<WaitlistIntakeMonth />`.
 * The structure never depends on the clock (the highlight is always the
 * second slot), so only the month text can differ between the static HTML
 * and the client, and those text nodes opt out of the hydration warning.
 */
const SLOTS = [
  { offset: -1, status: 'Fully booked' },
  { offset: 0, status: 'You’re in line' },
  { offset: 1, status: 'Upcoming' },
  { offset: 2, status: 'Upcoming' },
] as const

const NEXT_INTAKE_SLOT = 1

/** Month name `offset` months from the next intake. */
function intakeMonthAt(now: Date, offset: number) {
  const intake = getWaitlistIntakeDate(now)
  return toWaitlistIntakeMonth(
    new Date(intake.getFullYear(), intake.getMonth() + offset, 1),
  ).month
}

export default function WaitlistIntakeStrip({
  className,
}: {
  className?: string
}) {
  const now = new Date()

  return (
    <ol
      aria-label="Prism intake calendar"
      data-waitlist-intake-strip=""
      className={cn('grid grid-cols-4 gap-1.5 sm:gap-2', className)}
    >
      {SLOTS.map((slot, index) => {
        const month = intakeMonthAt(now, slot.offset)
        const isNext = index === NEXT_INTAKE_SLOT
        const isBooked = index < NEXT_INTAKE_SLOT
        return (
          <li
            key={slot.offset}
            aria-current={isNext ? 'step' : undefined}
            data-state={isNext ? 'next' : isBooked ? 'booked' : 'upcoming'}
            className={cn(
              'relative flex min-w-0 flex-col items-start gap-1 overflow-hidden rounded-xl border px-2.5 pb-3 pt-3.5 text-left sm:px-3.5 sm:pb-3.5 sm:pt-4',
              isNext
                ? 'border-white/20 bg-white/[0.06] shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset,0_18px_50px_-24px_oklch(0.66_0.16_258/55%)]'
                : 'border-white/[0.08] bg-white/[0.02]',
            )}
          >
            {/* Top hairline, echoing the form's spectrum progress bar. */}
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-x-0 top-0 h-0.5',
                isNext
                  ? 'bg-spectrum'
                  : isBooked
                    ? 'bg-white/20'
                    : 'bg-white/[0.06]',
              )}
            />
            <span
              className={cn(
                'flex min-w-0 items-center gap-1.5 text-[15px] font-medium leading-5 tracking-[-0.015em] sm:text-base',
                isNext ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {isNext ? (
                <span aria-hidden="true" className="prism-live-dot shrink-0" />
              ) : null}
              <span suppressHydrationWarning className="truncate sm:hidden">
                {month.slice(0, 3)}
              </span>
              <span suppressHydrationWarning className="hidden truncate sm:inline">
                {month}
              </span>
            </span>
            <span
              className={cn(
                'text-pretty text-[12px] leading-4 sm:text-[13px]',
                isNext ? 'text-muted-foreground' : 'text-subtle',
              )}
            >
              {slot.status}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

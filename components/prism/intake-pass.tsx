import { PrismMark } from '@/components/prism/prism-logo'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { cn } from '@/lib/utils'

type IntakePassProps = {
  /** Analytics location for the CTA. */
  location: string
  className?: string
}

const FIELDS = [
  { label: 'Status', value: 'Fully booked', live: true },
  { label: 'Waitlist', value: 'Open' },
  { label: 'First pick', value: 'Waitlist members' },
] as const

/**
 * The next intake as a ticket: live status, the intake month from the
 * visitor's clock, and the waitlist CTA on a perforated stub. Every field is
 * standing policy (fully booked, monthly intake, waitlist members get first
 * pick); it never shows spot counts or deadlines.
 */
export function IntakePass({ location, className }: IntakePassProps) {
  return (
    <div
      className={cn(
        'prism-pass group/pass relative isolate grid w-full overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-card shadow-[0_1px_0_0_oklch(1_0_0/7%)_inset,0_40px_90px_-50px_oklch(0_0_0/95%)] sm:grid-cols-[minmax(0,1fr)_auto]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 -z-10 opacity-[0.18] mask-fade-b"
      />
      <div
        aria-hidden="true"
        className="prism-pass-sheen absolute inset-0 -z-10"
      />

      <div className="flex min-w-0 flex-col gap-6 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-foreground">
            <PrismMark className="size-5" />
            Prism
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
            Intake pass
          </span>
        </div>

        <p className="text-[clamp(1.9rem,1.4rem+1.6vw,2.6rem)] font-semibold leading-none tracking-[-0.05em] text-foreground">
          <WaitlistIntakeMonth /> intake
        </p>

        <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-dashed border-white/[0.12] pt-5">
          {FIELDS.map((field) => (
            <div key={field.label} className="min-w-0 shrink-0">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                {field.label}
              </dt>
              <dd className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium leading-snug text-foreground sm:text-sm">
                {'live' in field && field.live ? (
                  <span className="prism-live-dot" aria-hidden="true" />
                ) : null}
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="prism-pass-stub relative flex flex-col items-start justify-center gap-3 border-t border-dashed border-white/[0.14] p-6 sm:items-center sm:border-l sm:border-t-0 sm:px-7">
        <WaitlistButton location={location} className="w-full sm:w-auto" />
        <p className="text-[12px] text-subtle">Takes about two minutes</p>
      </div>
    </div>
  )
}

export default IntakePass

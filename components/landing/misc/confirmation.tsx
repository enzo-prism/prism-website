import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Eyebrow } from '@/components/prism/section'
import { cn } from '@/lib/utils'

type ConfirmationShellProps = {
  children: ReactNode
  /** Center the content vertically in the viewport (default true). */
  center?: boolean
  className?: string
}

/**
 * Page chrome for post-submit and post-payment routes: navbar, a quiet grid
 * lit by a soft glow, the content, and the footer.
 */
export function ConfirmationShell({
  children,
  center = true,
  className,
}: ConfirmationShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          'relative isolate flex flex-1 overflow-x-clip py-16 sm:py-24',
          center && 'items-center',
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="bg-grid mask-fade-b absolute inset-x-0 top-0 h-[560px] opacity-50" />
          <div className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(40%_45%_at_50%_30%,oklch(0.66_0.16_258/16%),transparent_70%),radial-gradient(30%_40%_at_70%_40%,oklch(0.63_0.19_295/12%),transparent_70%)] blur-2xl" />
          <div className="bg-noise absolute inset-0 opacity-[0.05]" />
        </div>
        <div className="prism-container w-full">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

type ConfirmationCardProps = {
  icon?: ReactNode
  eyebrow?: ReactNode
  /** Lowercase headline; renders as the page h1. */
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
}

/** Centered rounded panel with an icon badge, eyebrow, headline, and body. */
export function ConfirmationCard({
  icon,
  eyebrow,
  title,
  description,
  children,
  className,
}: ConfirmationCardProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-5 py-10 text-center shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset,0_40px_120px_-60px_oklch(0_0_0/90%)] sm:px-12 sm:py-14',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[18%] top-0 h-px bg-spectrum opacity-70"
      />
      {icon ? (
        <div className="mx-auto mb-7 grid size-14 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset] [&_svg]:size-6">
          {icon}
        </div>
      ) : null}
      {eyebrow ? (
        <div className="flex justify-center">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h1
        className={cn(
          'text-gradient mx-auto max-w-[18ch] text-balance pb-1 text-[clamp(2.1rem,1.6rem+2.2vw,3.25rem)] font-semibold leading-[1] tracking-[-0.05em]',
          eyebrow ? 'mt-5' : null,
        )}
      >
        {title}
      </h1>
      {description ? (
        <p className="text-lead mx-auto mt-5 max-w-[48ch] text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}

type ConfirmationStep = {
  title?: string
  body: ReactNode
}

/** Numbered next-step list for confirmation panels. */
export function ConfirmationSteps({
  steps,
  className,
}: {
  steps: readonly ConfirmationStep[]
  className?: string
}) {
  return (
    <ol
      className={cn(
        'mt-10 divide-y divide-white/[0.06] border-y border-white/[0.08] text-left',
        className,
      )}
    >
      {steps.map((step, index) => (
        <li key={index} className="flex gap-4 py-4">
          <span className="mt-0.5 font-mono text-[11px] font-medium tracking-[0.14em] text-subtle tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] leading-6 text-muted-foreground">
            {step.title ? (
              <span className="block font-medium text-foreground">
                {step.title}
              </span>
            ) : null}
            {step.body}
          </span>
        </li>
      ))}
    </ol>
  )
}

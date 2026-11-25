import { Pin } from 'lucide-react'

import type { LoveClientNote } from '@/components/home/love/love-wall'
import { cn } from '@/lib/utils'

/*
 * Cards for the homepage testimonials. Server components, no interaction.
 * Client notes carry a lit surface, an initials avatar, the name, the
 * business (or "Website Design client") and a mono CLIENT tag.
 */

/** Hover lift of 2px. */
const CARD_LIFT =
  'transition-[border-color,transform] duration-300 ease-(--ease-out) hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export function LoveClientCard({ note }: { note: LoveClientNote }) {
  return (
    <figure
      className={cn(
        CARD_LIFT,
        'relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.13] bg-popover bg-[radial-gradient(140%_100%_at_0%_0%,oklch(1_0_0/8%),transparent_55%)] p-4 shadow-[0_1px_0_0_oklch(1_0_0/9%)_inset,0_30px_60px_-34px_oklch(0_0_0/95%)] hover:border-white/[0.22] sm:p-6',
      )}
    >
      <span
        aria-hidden="true"
        className="mb-3 inline-flex rounded-full border border-white/[0.14] bg-white/[0.05] px-2 py-[5px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-muted-foreground sm:hidden"
      >
        Client
      </span>
      <blockquote className="mb-4 text-pretty text-[15px] font-medium leading-[1.4] sm:mb-6 tracking-[-0.015em] text-foreground sm:text-[1.2rem] sm:leading-[1.38] sm:tracking-[-0.022em]">
        <p>&ldquo;{note.text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5 border-t border-white/[0.07] pt-3.5 sm:gap-3 sm:pt-4">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full border border-white/[0.16] bg-[linear-gradient(150deg,oklch(1_0_0/20%),oklch(1_0_0/5%)_72%)] text-[11px] font-semibold tracking-[0.02em] text-foreground shadow-[0_1px_0_0_oklch(1_0_0/16%)_inset] sm:size-9 sm:text-[12px]"
        >
          {note.initials}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[13px] font-medium leading-5 text-foreground sm:text-[14px]">
            {note.name}
          </span>
          <span className="text-[12px] leading-5 text-subtle sm:text-[12.5px]">
            {note.role}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="hidden shrink-0 rounded-full border border-white/[0.14] bg-white/[0.05] px-2 py-[5px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-muted-foreground sm:inline-flex"
        >
          Client
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * The pinned note above the three client notes.
 */
export function LoveFeaturedNote({ note }: { note: LoveClientNote }) {
  return (
    <figure className="relative mx-auto flex max-w-[52rem] flex-col items-center text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[56rem] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,oklch(1_0_0/5.5%),transparent_72%)]"
      />
      <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
        <Pin aria-hidden="true" className="size-3.5 rotate-45" strokeWidth={1.75} />
        Pinned client note
      </p>
      <blockquote className="mt-6 text-balance text-[clamp(1.6rem,1rem+2.7vw,3rem)] font-medium leading-[1.08] tracking-[-0.045em] text-foreground">
        <p>&ldquo;{note.text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3 text-left">
        <span aria-hidden="true" className="inline-flex size-11 shrink-0 rounded-full bg-white/25 p-px">
          <span className="grid size-full place-items-center rounded-full bg-popover text-[13px] font-semibold tracking-[0.02em] text-foreground">
            {note.initials}
          </span>
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] font-medium leading-5 text-foreground">{note.name}</span>
          <span className="text-[13px] leading-5 text-subtle">{note.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

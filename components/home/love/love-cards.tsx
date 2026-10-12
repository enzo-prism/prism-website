import { Heart, Instagram, Pin } from 'lucide-react'

import type {
  LoveClientNote,
  LoveCommunityComment,
  LoveItem,
} from '@/components/home/love/love-wall'
import { cn } from '@/lib/utils'

/*
 * Cards for the homepage wall of love. Server components, no interaction:
 * the wall moves, so nothing inside it is a link or a button.
 *
 * Client notes carry the stronger treatment: a lit surface, larger type, an
 * initials avatar, the name, "Website client" and a mono CLIENT tag.
 * Community comments read like Instagram comments (handle, glyph, "on
 * Instagram", a quiet heart) on a fainter surface, so a comment can never be
 * mistaken for a client review.
 */

/** Hover lift of 2px (the column pauses on hover, so the card can be read). */
const CARD_LIFT =
  'transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export function LoveClientCard({ note }: { note: LoveClientNote }) {
  return (
    <figure
      className={cn(
        CARD_LIFT,
        'relative overflow-hidden rounded-2xl border border-white/[0.13] bg-popover bg-[radial-gradient(140%_100%_at_0%_0%,oklch(1_0_0/8%),transparent_55%)] p-4 shadow-[0_1px_0_0_oklch(1_0_0/9%)_inset,0_30px_60px_-34px_oklch(0_0_0/95%)] hover:border-white/[0.22] sm:p-6',
      )}
    >
      <span
        aria-hidden="true"
        className="mb-3 inline-flex rounded-full border border-white/[0.14] bg-white/[0.05] px-2 py-[5px] font-mono text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-muted-foreground sm:hidden"
      >
        Client
      </span>
      <blockquote className="text-pretty text-[15px] font-medium leading-[1.4] tracking-[-0.015em] text-foreground sm:text-[1.2rem] sm:leading-[1.38] sm:tracking-[-0.022em]">
        <p>&ldquo;{note.text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5 border-t border-white/[0.07] pt-3.5 sm:mt-6 sm:gap-3 sm:pt-4">
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

/** Short reactions read bigger, so the wall has a typographic rhythm. */
const isOneLiner = (text: string) => text.length <= 32

export function LoveCommunityCard({ comment }: { comment: LoveCommunityComment }) {
  const oneLiner = isOneLiner(comment.text)

  // figcaption stays the figure's first child; grid placement draws the
  // avatar to its left on wider screens.
  return (
    <figure
      className={cn(
        CARD_LIFT,
        'grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 rounded-2xl border border-white/[0.065] bg-white/[0.018] p-3.5 hover:border-white/[0.14] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-3 sm:p-4 sm:pr-5',
      )}
    >
      <figcaption className="col-start-1 row-start-1 flex min-w-0 flex-col gap-0.5 text-[12.5px] leading-[1.1rem] sm:col-start-2 sm:flex-row sm:items-center sm:gap-1.5 sm:text-[13px] sm:leading-5">
        <span className="truncate font-semibold text-foreground/90">{comment.handle}</span>
        <span className="flex shrink-0 items-center gap-1 text-subtle">
          <Instagram aria-hidden="true" className="size-3" strokeWidth={1.75} />
          <span>on Instagram</span>
        </span>
      </figcaption>
      <span
        aria-hidden="true"
        className="hidden size-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-[12px] font-semibold text-muted-foreground sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:grid"
      >
        {comment.monogram}
      </span>
      <Heart
        aria-hidden="true"
        strokeWidth={1.75}
        className="col-start-2 row-start-1 mt-0.5 size-3.5 shrink-0 text-subtle sm:col-start-3 sm:mt-[3px]"
      />
      <blockquote
        className={cn(
          'col-span-2 col-start-1 row-start-2 mt-2.5 text-pretty sm:col-span-1 sm:col-start-2 sm:mt-1',
          oneLiner
            ? 'text-[15px] font-medium leading-[1.35] tracking-[-0.015em] text-foreground sm:text-[17px]'
            : 'text-[13.5px] leading-[1.5] text-foreground/80 sm:text-[15px] sm:tracking-[-0.006em]',
        )}
      >
        <p>{comment.text}</p>
      </blockquote>
    </figure>
  )
}

export function LoveCard({ item }: { item: LoveItem }) {
  return item.kind === 'client' ? (
    <LoveClientCard note={item} />
  ) : (
    <LoveCommunityCard comment={item} />
  )
}

/**
 * The pinned note above the wall. Its avatar ring is the section's one
 * spectrum accent.
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

import { ArrowUpRight, Quote } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import TrackedLink from '@/components/tracked-link'
import { InitialsAvatar } from '@/components/wall-of-love/initials-avatar'
import {
  clientNoteAuthorCount,
  clientNotes,
  type ClientNote,
} from '@/components/wall-of-love/wall-of-love-feed'
import { cn } from '@/lib/utils'

/**
 * Bento placement for the client notes, by quote id. The first two get the
 * wide slots; Dr. Ji's second note closes the grid in a wide slot so the
 * business line fits beside the avatar. Unknown ids (new quotes) fall back to
 * a standard tile.
 */
const LAYOUT: Record<number, { span: string; size: 'feature' | 'large' | 'base' }> = {
  3: { span: 'lg:col-span-7', size: 'feature' },
  1: { span: 'lg:col-span-5', size: 'large' },
  6: { span: 'lg:col-span-3', size: 'base' },
  2: { span: 'lg:col-span-3', size: 'base' },
  10: { span: 'lg:col-span-3', size: 'base' },
  5: { span: 'lg:col-span-3', size: 'base' },
  4: { span: 'lg:col-span-5', size: 'large' },
  8: { span: 'sm:col-span-2 lg:col-span-7', size: 'large' },
}

const ORDER = [3, 1, 6, 2, 10, 5, 4, 8]

function orderNotes(notes: ClientNote[]) {
  const rank = (id: number) => {
    const index = ORDER.indexOf(id)
    return index === -1 ? ORDER.length : index
  }
  return notes.slice().sort((a, b) => rank(a.id) - rank(b.id))
}

const textSize = {
  feature: 'text-[1.75rem] leading-[1.15] tracking-[-0.035em] sm:text-[2.35rem] lg:text-[2.6rem]',
  large: 'text-[1.4rem] leading-[1.25] tracking-[-0.03em] sm:text-[1.75rem]',
  base: 'text-[1.2rem] leading-[1.3] tracking-[-0.025em] sm:text-[1.35rem]',
} as const

/**
 * Name plus "Website Design client", or, only when the repo verifies the business
 * (see VERIFIED_CLIENT_CASE_STUDIES), name and business linking to the case
 * study. The whole row is the link so the tap target clears 44px.
 */
function ClientAttribution({ note, featured }: { note: ClientNote; featured: boolean }) {
  const avatar = (
    <InitialsAvatar initials={note.initials} variant="client" size={featured ? 'lg' : 'md'} />
  )

  if (!note.business) {
    return (
      <span className="flex items-center gap-3">
        {avatar}
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[15px] font-medium text-foreground">{note.name}</span>
          <span className="text-[13px] text-subtle">Website Design client</span>
        </span>
      </span>
    )
  }

  return (
    <TrackedLink
      href={note.business.href}
      label={`${note.business.name} case study`}
      location="wall of love client note"
      className="group/client -m-2 flex min-h-11 items-center gap-3 rounded-xl p-2 outline-none transition-colors hover:bg-white/[0.03] focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {avatar}
      <span className="flex min-w-0 flex-col">
        <span className="text-[15px] font-medium text-foreground">
          {note.name}
          <span className="sr-only"> · </span>
        </span>
        <span className="inline-flex items-center gap-1 text-[13px] text-muted-foreground transition-colors group-hover/client:text-foreground">
          {note.business.name}
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 shrink-0 transition-transform duration-200 group-hover/client:-translate-y-0.5 group-hover/client:translate-x-0.5"
          />
          <span className="sr-only">, read the case study</span>
        </span>
      </span>
    </TrackedLink>
  )
}

function ClientNoteCard({ note, index }: { note: ClientNote; index: number }) {
  const layout = LAYOUT[note.id] ?? { span: 'lg:col-span-4', size: 'base' as const }
  const featured = layout.size === 'feature'

  return (
    <Reveal
      delay={(index % 4) * 70}
      className={cn('flex', featured && 'sm:col-span-2', layout.span)}
    >
      <SpotlightCard
        beam={featured}
        className={cn(
          'flex w-full flex-col justify-between gap-8 p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-8',
          featured && 'bg-[radial-gradient(90%_120%_at_0%_0%,oklch(1_0_0/6%),transparent_60%)] sm:p-10',
        )}
      >
        <figure className="flex h-full flex-col justify-between gap-7 sm:gap-10">
          <div>
            <Quote aria-hidden="true" className="size-6 fill-current text-white/15" />
            <blockquote
              className={cn(
                'mt-5 text-pretty font-medium text-foreground',
                textSize[layout.size],
              )}
            >
              <p>&ldquo;{note.text}&rdquo;</p>
            </blockquote>
          </div>
          <figcaption>
            <ClientAttribution note={note} featured={featured} />
          </figcaption>
        </figure>
      </SpotlightCard>
    </Reveal>
  )
}

export function ClientNotes() {
  const notes = orderNotes(clientNotes)

  return (
    <Section id="from-clients" aria-labelledby="from-clients-title" className="pt-8 sm:pt-12">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader
          id="from-clients-title"
          eyebrow="from clients"
          title="in their own words."
          description="Notes from the people Prism builds websites for, with their names on them."
        />
        <p className="text-eyebrow shrink-0 text-subtle lg:pb-3">
          {notes.length} notes · {clientNoteAuthorCount} named clients
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-12">
        {notes.map((note, index) => (
          <ClientNoteCard key={note.id} note={note} index={index} />
        ))}
      </div>
    </Section>
  )
}

export default ClientNotes

import { HOMEPAGE_TESTIMONIALS } from '@/components/home/homepage-content'
import { getInitials } from '@/components/wall-of-love/wall-of-love-feed'
import { getClientQuoteBusiness } from '@/components/case-studies/case-study-proof'

/*
 * Data for the homepage testimonials (#love). Server only.
 *
 * Client notes only (HOMEPAGE_TESTIMONIALS.clientQuotes: website clients,
 * named, consent-safe). Community comments from Prism's Instagram live on
 * /wall-of-love, where they are clearly labelled as such. Quote text is
 * always rendered verbatim.
 */

export type LoveClientNote = {
  kind: 'client'
  key: string
  name: string
  /** The business when a case study ties the person to it, else "Website Design client". */
  role: string
  initials: string
  text: string
}

/**
 * The pinned note: the most specific client note, from a client the
 * published case study ties to a business (Dr. Tingjen Ji, Grace Dental
 * Santa Rosa). Falls back to the first client note.
 */
const FEATURED_CLIENT_QUOTE_ID = 3

/**
 * The three notes under it, one per person, in editorial order: what we
 * built, how it landed, how it felt.
 */
const RAIL_CLIENT_QUOTE_IDS = [4, 1, 6] as const

const toClientNote = (quote: {
  id: number
  client: string
  text: string
}): LoveClientNote => ({
  kind: 'client',
  key: `client-${quote.id}`,
  name: quote.client,
  role: getClientQuoteBusiness(quote.client) ?? 'Website Design client',
  initials: getInitials(quote.client),
  text: quote.text,
})

const allClientNotes = HOMEPAGE_TESTIMONIALS.clientQuotes.map(toClientNote)
const byKey = new Map(allClientNotes.map((note) => [note.key, note]))

export const featuredClientNote: LoveClientNote | undefined =
  byKey.get(`client-${FEATURED_CLIENT_QUOTE_ID}`) ?? allClientNotes[0]

/** Three notes from three different people, never the pinned person. */
export const railClientNotes: LoveClientNote[] = (() => {
  const people = new Set<string>(
    featuredClientNote ? [featuredClientNote.name] : [],
  )
  const picked: LoveClientNote[] = []
  const take = (note: LoveClientNote | undefined) => {
    if (!note || people.has(note.name) || picked.length >= 3) return
    people.add(note.name)
    picked.push(note)
  }
  RAIL_CLIENT_QUOTE_IDS.forEach((id) => take(byKey.get(`client-${id}`)))
  // A note that stops passing consent simply drops out; fill from the rest.
  allClientNotes.forEach(take)
  return picked
})()

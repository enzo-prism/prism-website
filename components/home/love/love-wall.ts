import { AUDIENCE_COMMENTS } from '@/components/home/audience/audience-data'
import { HOMEPAGE_TESTIMONIALS } from '@/components/home/homepage-content'
import {
  communityComments,
  getHandleMonogram,
  getInitials,
} from '@/components/wall-of-love/wall-of-love-feed'
import { getClientQuoteBusiness } from '@/components/case-studies/case-study-proof'
import { formatSocialHandle } from '@/content/wall-of-love-data'

/*
 * Data for the homepage wall of love (#love). Server only.
 *
 * Two clearly separated kinds, never mixed up:
 * - client notes: HOMEPAGE_TESTIMONIALS.clientQuotes (website clients, named)
 * - community comments: comments people left on Prism's own Instagram posts.
 *   HOMEPAGE_TESTIMONIALS.communityQuotes first, then extra picks from
 *   `quotesData` resolved through the shared curation policy
 *   (lib/community-comments.ts via wall-of-love-feed), so every pick is
 *   consent-safe (`requiresConsent` falsy) and on brand.
 *
 * Quote text is always rendered verbatim. Counts are computed from the same
 * sets /wall-of-love prints, so the two pages always agree.
 */

export type LoveClientNote = {
  kind: 'client'
  key: string
  name: string
  /** The business when a case study ties the person to it, else "Website client". */
  role: string
  initials: string
  text: string
}

export type LoveCommunityComment = {
  kind: 'community'
  key: string
  handle: string
  monogram: string
  text: string
}

export type LoveItem = LoveClientNote | LoveCommunityComment

export type LoveColumn = {
  items: LoveItem[]
  /** Seconds for one loop, derived from the estimated column height. */
  duration: number
  reverse: boolean
}

/**
 * The pinned note above the wall: the most specific client note, from a
 * client the published case study ties to a business (Dr. Tingjen Ji, Grace
 * Dental Santa Rosa). Falls back to the first client note.
 */
const FEATURED_CLIENT_QUOTE_ID = 3

/**
 * Extra community picks beyond HOMEPAGE_TESTIMONIALS.communityQuotes, in
 * editorial order: comments about the edit and the content first, then what
 * it did for someone, then short reactions for rhythm. Keys resolve against
 * the curated set, so a pick that stops passing the policy simply drops out.
 */
const EXTRA_COMMUNITY_PICKS = [
  'quote-186',
  'quote-86',
  'quote-205',
  'quote-18',
  'quote-30',
  'quote-96',
  'quote-41',
  'quote-13',
  'quote-103',
  'quote-33',
  'quote-31',
  'quote-39',
  'quote-32',
  'quote-36',
  'quote-12',
  'quote-19',
  'quote-252',
  'quote-11',
  'quote-72',
  'quote-251',
  'quote-61',
  'quote-44',
] as const

const toClientNote = (quote: {
  id: number
  client: string
  text: string
}): LoveClientNote => ({
  kind: 'client',
  key: `client-${quote.id}`,
  name: quote.client,
  role: getClientQuoteBusiness(quote.client) ?? 'Website client',
  initials: getInitials(quote.client),
  text: quote.text,
})

const allClientNotes = HOMEPAGE_TESTIMONIALS.clientQuotes.map(toClientNote)

export const featuredClientNote: LoveClientNote | undefined =
  allClientNotes.find((note) => note.key === `client-${FEATURED_CLIENT_QUOTE_ID}`) ??
  allClientNotes[0]

// One note per person on the wall (the pinned person included), so the
// wall never reads as padded.
const wallClientNotes = (() => {
  const people = new Set<string>(
    featuredClientNote ? [featuredClientNote.name] : [],
  )
  return allClientNotes.filter((note) => {
    if (people.has(note.name)) return false
    people.add(note.name)
    return true
  })
})()

const curatedByKey = new Map(
  communityComments.map((comment) => [comment.key, comment]),
)

const wallCommunityComments: LoveCommunityComment[] = (() => {
  // The audience section floats its own comments; never show one twice.
  const seen = new Set<string>(AUDIENCE_COMMENTS.map((comment) => comment.key))
  const out: LoveCommunityComment[] = []
  const push = (key: string, handle: string, text: string) => {
    if (seen.has(key)) return
    seen.add(key)
    out.push({
      kind: 'community',
      key,
      handle,
      monogram: getHandleMonogram(handle),
      text,
    })
  }

  for (const quote of HOMEPAGE_TESTIMONIALS.communityQuotes) {
    push(`quote-${quote.id}`, formatSocialHandle(quote.client), quote.text)
  }
  for (const key of EXTRA_COMMUNITY_PICKS) {
    const comment = curatedByKey.get(key)
    if (comment) push(comment.key, comment.handle, comment.text)
  }
  return out
})()

/** Rough rendered height in px at a ~370px column, used to balance columns. */
function estimateHeight(item: LoveItem) {
  if (item.kind === 'client') {
    const lines = Math.max(1, Math.ceil(item.text.length / 30))
    return 176 + lines * 27
  }
  const lines = Math.max(1, Math.ceil(item.text.length / 36))
  return 74 + lines * 23
}

const GAP_PX = 16

/**
 * Column speeds against the estimated height. The estimate runs high, so the
 * real drift is roughly 20, 16 and 23 px/s on desktop: slow enough to read.
 */
const COLUMN_SPEEDS = [24, 19, 28] as const
/** Index of the first client note in each column, so they never line up. */
const CLIENT_PHASE = [1, 3, 2] as const

/**
 * Three columns. Client notes go round robin so every column has some; the
 * community comments fill whichever column is shortest, so the loops end up
 * close in length. Column 1 is the one phones see; it gets the first client
 * note and the strongest comments.
 */
function buildColumns(count = 3): LoveColumn[] {
  const clientBuckets: LoveClientNote[][] = Array.from({ length: count }, () => [])
  wallClientNotes.forEach((note, index) => {
    clientBuckets[index % count].push(note)
  })

  const communityBuckets: LoveCommunityComment[][] = Array.from(
    { length: count },
    () => [],
  )
  const heights = clientBuckets.map((bucket) =>
    bucket.reduce((sum, note) => sum + estimateHeight(note) + GAP_PX, 0),
  )
  for (const comment of wallCommunityComments) {
    let target = 0
    for (let index = 1; index < count; index += 1) {
      if (heights[index] < heights[target]) target = index
    }
    communityBuckets[target].push(comment)
    heights[target] += estimateHeight(comment) + GAP_PX
  }

  return clientBuckets.map((clients, column) => {
    const community = communityBuckets[column]
    const total = clients.length + community.length
    const spacing = clients.length > 0 ? Math.max(2, Math.floor(total / clients.length)) : 0
    const slots = new Set(
      clients.map((_, index) =>
        Math.min(total - 1, (CLIENT_PHASE[column % CLIENT_PHASE.length] ?? 1) + index * spacing),
      ),
    )
    const items: LoveItem[] = []
    let clientIndex = 0
    let communityIndex = 0
    for (let position = 0; position < total; position += 1) {
      const takeClient =
        clientIndex < clients.length &&
        (slots.has(position) || communityIndex >= community.length)
      if (takeClient) {
        items.push(clients[clientIndex])
        clientIndex += 1
      } else if (communityIndex < community.length) {
        items.push(community[communityIndex])
        communityIndex += 1
      } else {
        items.push(clients[clientIndex])
        clientIndex += 1
      }
    }

    const speed = COLUMN_SPEEDS[column % COLUMN_SPEEDS.length]
    return {
      items,
      duration: Math.round(heights[column] / speed),
      reverse: column % 2 === 1,
    }
  })
}

export const loveColumns: LoveColumn[] = buildColumns(3)

import { isClientQuote, quotesData } from '@/content/wall-of-love-data'
import { CASE_STUDIES } from '@/lib/case-study-data'
import {
  curatedCommunityComments,
  emojiOnlyCommunityComments,
  getCommentCraftScore,
  type CommunityCommentRecord,
} from '@/lib/community-comments'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

/**
 * Derived, consent-safe views of `content/wall-of-love-data.tsx` for the
 * /wall-of-love page.
 *
 * Policy: items flagged `requiresConsent` never reach a component. Only
 * quotes tagged `company: 'website client'` are client notes; everything else
 * is a comment people left on Prism's own Instagram content, labeled that
 * way, and curated by the shared rules in `lib/community-comments.ts` (the
 * same rules /content uses).
 *
 * Words are never edited: a quote renders verbatim or not at all.
 */

export type ClientBusiness = {
  name: string
  href: string
}

export type ClientNote = {
  id: number
  name: string
  initials: string
  text: string
  /** Only set when the repo verifies who this client is. */
  business?: ClientBusiness
}

export type CommunityComment = {
  /** Stable key across both source arrays. */
  key: string
  handle: string
  text: string
  featured: boolean
}

const TITLE_PREFIX = /^(dr|mr|mrs|ms)\.?\s+/i

/** "Dr. Tingjen Ji" -> "TJ", "Mary Lynn Wheaton" -> "MW", "Michael" -> "M". */
export function getInitials(name: string): string {
  const words = name
    .replace(TITLE_PREFIX, '')
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean)
  if (words.length === 0) return '?'
  const first = words[0].charAt(0)
  const last = words.length > 1 ? words[words.length - 1].charAt(0) : ''
  return `${first}${last}`.toUpperCase()
}

/** First letter or digit of a handle, for the community avatar. */
export function getHandleMonogram(handle: string): string {
  const match = handle.match(/[\p{L}\p{N}]/u)
  return match ? match[0].toUpperCase() : '@'
}

/**
 * Client name -> case study slug, only where `lib/case-study-data.ts` itself
 * names the person (Grace Dental's story: "led by Dr. Tingjen Ji"). Everyone
 * else stays "Website client": never guess a business.
 */
export const VERIFIED_CLIENT_CASE_STUDIES: Readonly<Record<string, string>> = {
  'Dr. Tingjen Ji': 'grace-dental-santa-rosa',
}

const formerClientSlugs = new Set<string>(FORMER_CLIENT_SLUGS)

export function getClientBusiness(name: string): ClientBusiness | undefined {
  const slug = VERIFIED_CLIENT_CASE_STUDIES[name]
  if (!slug || formerClientSlugs.has(slug)) return undefined
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  if (!study) return undefined
  return { name: study.client, href: `/case-studies/${study.slug}` }
}

export const clientNotes: ClientNote[] = quotesData
  .filter((quote) => !quote.requiresConsent && isClientQuote(quote))
  .map((quote) => ({
    id: quote.id,
    name: quote.client,
    initials: getInitials(quote.client),
    text: quote.text,
    business: getClientBusiness(quote.client),
  }))

/** Distinct people behind the client notes. */
export const clientNoteAuthorCount = new Set(clientNotes.map((note) => note.name)).size

const toComment = (record: CommunityCommentRecord): CommunityComment => ({
  key: record.key,
  handle: record.handle,
  text: record.text,
  featured: record.featured,
})

/**
 * Every community comment the page may print: consent-safe, on brand, not
 * low signal, each wording once. This is the number the page quotes.
 */
export const communityComments: CommunityComment[] = curatedCommunityComments.map(toComment)

/** Emoji-only replies that pass the policy. They feed the emoji tally only. */
export const emojiOnlyComments: CommunityComment[] = emojiOnlyCommunityComments.map(toComment)

const craftScore = new Map(
  curatedCommunityComments.map((record) => [record.key, getCommentCraftScore(record.text)]),
)

/** Small deterministic PRNG so server output is stable between requests. */
function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  let state = seed >>> 0
  const random = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const copy = items.slice()
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Editorial spotlight: comments about the edit itself, shown large above the
 * wall. Keys resolve against the curated set, so a pick that stops passing
 * the rules simply drops out (and the best remaining craft comments fill in).
 */
const SPOTLIGHT_PICKS = ['quote-186', 'takeaway-218', 'quote-196'] as const

export function getCommunitySpotlight(
  count = 3,
  comments: readonly CommunityComment[] = communityComments,
): CommunityComment[] {
  const byKey = new Map(comments.map((comment) => [comment.key, comment]))
  const picks = SPOTLIGHT_PICKS.map((key) => byKey.get(key)).filter(
    (comment): comment is CommunityComment => Boolean(comment),
  )
  const fill = comments.filter(
    (comment) => !picks.includes(comment) && craftScore.get(comment.key) === 2,
  )
  return [...picks, ...fill].slice(0, count)
}

/**
 * Wall order (spotlight excluded): pinned comments and comments about the
 * edit first, then what a video did for someone, then fuller reactions, then
 * one-liners. Each tier is mixed so one video's thread does not cluster.
 * Every curated comment appears exactly once across spotlight + wall.
 */
export function getCommunityWall(
  comments: readonly CommunityComment[] = communityComments,
  spotlight: readonly CommunityComment[] = getCommunitySpotlight(3, comments),
) {
  const skip = new Set(spotlight.map((comment) => comment.key))
  const rest = comments.filter((comment) => !skip.has(comment.key))
  const score = (comment: CommunityComment) => craftScore.get(comment.key) ?? 0

  const lead = rest.filter((comment) => comment.featured || score(comment) === 2)
  const impact = rest.filter((comment) => !lead.includes(comment) && score(comment) === 1)
  const other = rest.filter((comment) => !lead.includes(comment) && !impact.includes(comment))
  const full = other.filter((comment) => comment.text.length >= 24)
  const short = other.filter((comment) => comment.text.length < 24)

  return [
    ...seededShuffle(lead, 2026),
    ...seededShuffle(impact, 2027),
    ...seededShuffle(full, 2023),
    ...seededShuffle(short, 2028),
  ]
}

/**
 * Editorial picks for the hero marquee rails: short reactions to Prism's
 * content, by comment key. Keys that disappear from the curated set simply
 * drop out.
 */
const MARQUEE_PICKS: readonly (readonly string[])[] = [
  [
    'quote-12', 'quote-14', 'quote-42', 'quote-27', 'quote-72', 'quote-205',
    'quote-69', 'quote-30', 'quote-11', 'quote-176', 'quote-19', 'quote-173',
  ],
  [
    'quote-31', 'quote-16', 'quote-41', 'quote-88', 'quote-13', 'quote-33',
    'takeaway-207', 'quote-61', 'quote-76', 'takeaway-200', 'quote-258', 'quote-130',
  ],
  [
    'quote-32', 'quote-34', 'quote-103', 'quote-92', 'quote-251', 'quote-39',
    'quote-74', 'takeaway-204', 'quote-52', 'quote-101', 'takeaway-220', 'quote-252',
  ],
]

const hasWords = (text: string) => /\p{L}/u.test(text)

const isMarqueeSafe = (comment: CommunityComment) =>
  hasWords(comment.text) && comment.text.length <= 40

/** Short, punchy comments for the marquee rails, split into `rows` rows. */
export function getMarqueeRows(
  rows = 3,
  perRow = 12,
  comments: readonly CommunityComment[] = communityComments,
): CommunityComment[][] {
  const byKey = new Map(comments.map((comment) => [comment.key, comment]))
  const used = new Set<string>()
  const picked = MARQUEE_PICKS.slice(0, rows).map((keys) =>
    keys
      .filter((key) => {
        if (used.has(key)) return false
        used.add(key)
        return true
      })
      .map((key) => byKey.get(key))
      .filter((comment): comment is CommunityComment => Boolean(comment && isMarqueeSafe(comment)))
      .slice(0, perRow),
  )
  if (picked.length === rows && picked.every((row) => row.length >= perRow / 2)) {
    return picked
  }

  // Fallback if the picks drift from the data: any short curated comment.
  const pool = seededShuffle(
    comments.filter((comment) => isMarqueeSafe(comment) && comment.text.length >= 9),
    9,
  )
  return Array.from({ length: rows }, (_, row) =>
    pool.slice(row * perRow, row * perRow + perRow),
  ).filter((items) => items.length > 0)
}

const REACTIONS = ['🔥', '💯', '🙌', '👏', '🙏', '❤️'] as const

/**
 * How many comments contain each reaction emoji, most used first. Counted
 * across the printed comments plus the emoji-only replies.
 */
export function getReactionCounts(
  comments: readonly CommunityComment[] = [...communityComments, ...emojiOnlyComments],
) {
  return REACTIONS.map((emoji) => ({
    emoji,
    count: comments.filter((comment) => comment.text.includes(emoji)).length,
  }))
    .filter((reaction) => reaction.count > 0)
    .sort((a, b) => b.count - a.count)
}

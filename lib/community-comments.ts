import {
  formatSocialHandle,
  isClientQuote,
  quotesData,
  takeawaysData,
} from '@/content/wall-of-love-data'

/**
 * One curation policy for the Instagram comments Prism shows anywhere on the
 * site (/wall-of-love, /content). Source: `content/wall-of-love-data.tsx`.
 *
 * The comments are reactions to Prism's own short videos. Many of those
 * videos cut motivational talks, so the raw thread also holds reactions that
 * read as someone else's audience: prayers, celebrity names, all-caps
 * shouting, get-rich slogans, and replies to other commenters. To a business
 * owner that looks borrowed, so those never render. What stays is the
 * comments about the edit, the craft, and what the video did for someone.
 *
 * Rules (each returns a reason so tests and reviews can see why):
 * - `consent`: anything flagged `requiresConsent` (never shown, ever).
 * - `religious`: God, Jesus, Lord, amen, prayer, "it is written", and so on.
 * - `named-person`: other creators or celebrities (Hormozi, Alex, Naval,
 *   Goggins, Tate, Rogan...). Movie titles like "Gladiator" are fine.
 * - `quoted-line`: the comment is itself a quotation of somebody's line.
 * - `shouting`: mostly uppercase, or three or more all-caps words in a row.
 * - `hustle`: money and risk slogans ("get rich", "regret", "nothing to
 *   lose", "9-5", "LLC", "YOLO"...).
 * - `profanity`: stronger swearing ("shit", "tf", "ahh"). A mild "damn" stays.
 * - `reply`: only makes sense as a reply or bait: @-mentions of anyone but
 *   Prism, questions to other people, "like this to remind me", "what do you
 *   think".
 * - `off-brand-handle`: handles that advertise forex, "high ticket" sales,
 *   "top G", wealth or masculinity pages.
 *
 * Separately, `isLowSignalComment` marks emoji-only replies, one-word
 * replies, and bare "thank you"s. They stay out of printed comment lists;
 * emoji-only replies may still feed an emoji tally.
 *
 * Quotes are never edited. A comment either renders verbatim or not at all.
 */

export type CommentExclusionReason =
  | 'consent'
  | 'religious'
  | 'named-person'
  | 'quoted-line'
  | 'shouting'
  | 'hustle'
  | 'profanity'
  | 'reply'
  | 'off-brand-handle'

/** Prism's own Instagram handle: mentioning it is not a reply to someone. */
export const PRISM_INSTAGRAM_HANDLE = 'the_design_prism'

const RELIGIOUS =
  /\b(god|gods|jesus|christ|lord|amen|allah|bible|scripture|pray|prays|prayer|prayers|praying|blessed|bless|heaven|church|holy spirit|it is written)\b/i

const NAMED_PEOPLE =
  /\b(hormozi|alex|naval|ravikant|goggins|tate|rogan|peterson|garyvee|gary vee|vaynerchuk|elon|musk|kobe|jocko|huberman|robbins|dan pena|bilyeu|sinek|aurelius|seneca|epictetus|jake the dog)\b/i

const QUOTED_LINE = /^\s*["'‘“]/

const HUSTLE =
  /\b(get rich|rich|regret|die trying|you only live once|yolo|9-5|nine to five|llc|companies|millionaire|billionaire|money|cash|grind|hustle|high ticket|1% men|top g|sigma|nothing to lose|everything to gain|no risk|risk)\b/i

const PROFANITY = /\b(shit|shitty|fuck\w*|tf|wtf|ahh|ass|asf|bitch\w*)\b/i

const REPLY_PATTERNS: readonly RegExp[] = [
  /\bwhat do you think\b/i,
  /\blike this (comment )?to\b/i,
  /\?\s*$/,
]

const MENTION = /@([\w.]+)/g

const OFF_BRAND_HANDLE =
  /(forex|trading|topg|42069|highticket|wealth|masculin|percent_?men|sigma|alpha|hustle|grind|motivat|millionaire|getrich|money)/i

const LETTER = /\p{L}/gu
const UPPER = /\p{Lu}/gu
const CAPS_RUN = /\b[A-Z]{2,}(?:[\s,.!?]+[A-Z]{2,}){2,}\b/

function isShouting(text: string) {
  const letters = text.match(LETTER)?.length ?? 0
  const upper = text.match(UPPER)?.length ?? 0
  if (letters >= 6 && upper / letters > 0.6) return true
  return CAPS_RUN.test(text)
}

function mentionsSomeoneElse(text: string) {
  for (const match of text.matchAll(MENTION)) {
    if (match[1].toLowerCase() !== PRISM_INSTAGRAM_HANDLE) return true
  }
  return false
}

/**
 * Why a comment must stay off the site, or `null` when it may render.
 * `handle` is the raw or `@`-prefixed Instagram handle.
 */
export function getCommentExclusionReason(
  text: string,
  handle = '',
  options: { requiresConsent?: boolean } = {},
): CommentExclusionReason | null {
  if (options.requiresConsent) return 'consent'
  if (RELIGIOUS.test(text)) return 'religious'
  if (NAMED_PEOPLE.test(text)) return 'named-person'
  if (QUOTED_LINE.test(text)) return 'quoted-line'
  if (isShouting(text)) return 'shouting'
  if (HUSTLE.test(text)) return 'hustle'
  if (PROFANITY.test(text)) return 'profanity'
  if (mentionsSomeoneElse(text) || REPLY_PATTERNS.some((pattern) => pattern.test(text))) {
    return 'reply'
  }
  if (OFF_BRAND_HANDLE.test(handle)) return 'off-brand-handle'
  return null
}

export function isOnBrandComment(text: string, handle = '') {
  return getCommentExclusionReason(text, handle) === null
}

/** No letters at all: a reaction made only of emoji, numbers, or symbols. */
export function isEmojiOnlyComment(text: string) {
  return !/\p{L}/u.test(text)
}

/** Words that carry no reaction on their own ("Thank you", "Ty!!! Ty."). */
const FILLER_WORDS = new Set(['thank', 'thanks', 'you', 'man', 'bro', 'ty', 'si', 'fyp', 'lol'])

function words(text: string) {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}'’%]+/u)
    .filter((word) => /\p{L}/u.test(word))
}

/** Emoji-only, one word, or only filler ("Thank you"): nothing to read. */
export function isLowSignalComment(text: string) {
  if (isEmojiOnlyComment(text)) return true
  const list = words(text)
  if (list.length <= 1) return true
  return list.every((word) => FILLER_WORDS.has(word))
}

/** On brand and worth printing as a card or chip. */
export function isCuratedComment(text: string, handle = '') {
  return isOnBrandComment(text, handle) && !isLowSignalComment(text)
}

const CRAFT =
  /\b(edit|edits|edited|editing|video|videos|reel|reels|clip|clips|content|post|posts|minutes|extracting|reframing|framework|instagram|algorithm|illegal|this good|cooked|shot|filmed|production)\b/i

const IMPACT =
  /\b(repeat|every ?day|every monday|morning alarm|life changing|changed|chills|goosebumps|needed (this|it)|came when|saving me|locking in|re heard|shook me|perspective|flipped|hits?|hit different|felt (this|it)|realest)\b/i

/**
 * Editorial preference: 2 for comments about the edit or the content itself,
 * 1 for comments about what it did for someone, 0 otherwise.
 */
export function getCommentCraftScore(text: string): 0 | 1 | 2 {
  if (CRAFT.test(text)) return 2
  if (IMPACT.test(text)) return 1
  return 0
}

export type CommunityCommentRecord = {
  /** Stable key across both source arrays: `quote-<id>` / `takeaway-<id>`. */
  key: string
  id: number
  source: 'quote' | 'takeaway'
  /** Display handle, always `@`-prefixed. */
  handle: string
  /** Verbatim comment text. */
  text: string
  /** Pinned or hero-spotlighted in the source data. */
  featured: boolean
  requiresConsent: boolean
}

/** Every community comment (never a named client quote), consent flag kept. */
export const allCommunityComments: readonly CommunityCommentRecord[] = [
  ...quotesData
    .filter((quote) => !isClientQuote(quote))
    .map((quote) => ({
      key: `quote-${quote.id}`,
      id: quote.id,
      source: 'quote' as const,
      handle: formatSocialHandle(quote.client),
      text: quote.text,
      featured: Boolean(quote.pinned || quote.heroSpotlight),
      requiresConsent: Boolean(quote.requiresConsent),
    })),
  ...takeawaysData.map((takeaway) => ({
    key: `takeaway-${takeaway.id}`,
    id: takeaway.id,
    source: 'takeaway' as const,
    handle: formatSocialHandle(takeaway.handle),
    text: takeaway.text,
    featured: Boolean(takeaway.pinned),
    requiresConsent: Boolean(takeaway.requiresConsent),
  })),
]

export function getRecordExclusionReason(record: CommunityCommentRecord) {
  return getCommentExclusionReason(record.text, record.handle, {
    requiresConsent: record.requiresConsent,
  })
}

/** Consent-safe and on brand, including emoji-only and one-word replies. */
export const onBrandCommunityComments: readonly CommunityCommentRecord[] =
  allCommunityComments.filter((record) => getRecordExclusionReason(record) === null)

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

/**
 * The printable set: on brand, not low signal, and each wording once (the
 * first occurrence wins when two people left the same line).
 */
export const curatedCommunityComments: readonly CommunityCommentRecord[] = (() => {
  const seen = new Set<string>()
  return onBrandCommunityComments.filter((record) => {
    if (isLowSignalComment(record.text)) return false
    const key = normalize(record.text)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
})()

/** Emoji-only reactions that pass the policy (for emoji tallies only). */
export const emojiOnlyCommunityComments: readonly CommunityCommentRecord[] =
  onBrandCommunityComments.filter((record) => isEmojiOnlyComment(record.text))

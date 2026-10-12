import type { CaseStudyMeta } from '@/lib/case-study-data'
import { quotesData, type Quote } from '@/content/wall-of-love-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

/**
 * The human voice on a case study page: a verified client video and/or a
 * verified client quote. Nothing here is inferred. A `heroVideoId` in the
 * data only renders when its YouTube oEmbed record has been checked and
 * written below, and a quote only renders when the quoted person is tied to
 * the business in the published case study copy.
 */

export type CaseStudyVideo = {
  youtubeId: string
  /** The video's real YouTube title (oEmbed), shown as the caption. */
  title: string
  /** YouTube channel that published it (oEmbed author_name). */
  channel: string
  /** Who published it, for the meta line ("Prism on YouTube"). */
  source: string
  /** Running time, e.g. "21 min". */
  duration: string
  /** Poster frame. A YouTube-generated still from the video itself. */
  poster: string
  eyebrow: string
  /** Section headline (lowercase house style, ends with a period). */
  heading: string
  /** One or two sentences, sourced from the video's own description. */
  summary: string
  /** Kind label for the meta line, e.g. "Interview". */
  kind: string
}

/**
 * Checked 2026-10-12 against
 * https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>
 * and each video's published description.
 */
const VERIFIED_VIDEOS: Record<string, CaseStudyVideo> = {
  // oEmbed: "Meet Dr. Wong 👋", design prism, 21:15. Description: "Enzo Sison
  // sits down with Dr. Chris Wong to discuss his impressive career journey
  // ... to acquiring a new dental practice in Palo Alto."
  HrksJeYb02Q: {
    youtubeId: 'HrksJeYb02Q',
    title: 'Meet Dr. Wong',
    channel: 'design prism',
    source: 'Prism on YouTube',
    duration: '21 min',
    poster: 'https://i.ytimg.com/vi/HrksJeYb02Q/maxres3.jpg',
    eyebrow: 'In his words',
    heading: 'hear it from Dr. Wong.',
    summary:
      'Enzo Sison sits down with Dr. Wong to talk about his path from dental school to owning a Palo Alto practice, how he handled the ownership transition, and where he is taking it next.',
    kind: 'Interview',
  },
  // oEmbed: "Heel-Loc  Olympic Bootworks", Buck Brown, 3:14. Embedded on
  // olympicbootworks.com as "Hear how athletes use the Heel-Loc technology
  // developed by Buck Brown." Description: "Featuring Travis Ganong from
  // the US Olympic Ski Team".
  Cgi7CZHMYQ0: {
    youtubeId: 'Cgi7CZHMYQ0',
    title: 'Heel-Loc Olympic Bootworks',
    channel: 'Buck Brown',
    source: 'Buck Brown on YouTube',
    duration: '3 min',
    poster: 'https://i.ytimg.com/vi/Cgi7CZHMYQ0/maxresdefault.jpg',
    eyebrow: 'On film',
    heading: 'the fit, in their words.',
    summary:
      'Athletes, including US Ski Team racer Travis Ganong, talk about the Heel-Loc boot fitting technology developed by Buck Brown.',
    kind: 'Short film',
  },
}

/** The verified video for a study, or nothing. */
export function getCaseStudyVideo(study: CaseStudyMeta): CaseStudyVideo | undefined {
  const id = study.structured?.heroVideoId
  return id ? VERIFIED_VIDEOS[id] : undefined
}

/**
 * Named client quotes (content/wall-of-love-data.tsx, company "website
 * client") whose speaker is tied to the business in the published case
 * study copy. Grace Dental's story names Dr. Tingjen Ji as the practice lead.
 */
const QUOTE_SPEAKERS: Record<string, { name: string; role: string }> = {
  'grace-dental-santa-rosa': { name: 'Dr. Tingjen Ji', role: 'Grace Dental Santa Rosa' },
}

const FORMER = new Set<string>(FORMER_CLIENT_SLUGS)

/** The business a named client quote is tied to, when the case study says so. */
export function getClientQuoteBusiness(name: string): string | undefined {
  return Object.entries(QUOTE_SPEAKERS).find(
    ([slug, speaker]) => speaker.name === name && !FORMER.has(slug),
  )?.[1].role
}

export type CaseStudyQuotes = {
  speaker: { name: string; role: string }
  quotes: Quote[]
}

export function getCaseStudyQuotes(slug: string): CaseStudyQuotes | undefined {
  const speaker = QUOTE_SPEAKERS[slug]
  if (!speaker || FORMER.has(slug)) return undefined
  const quotes = quotesData.filter(
    (quote) =>
      quote.client === speaker.name &&
      quote.company === 'website client' &&
      !quote.requiresConsent,
  )
  return quotes.length > 0 ? { speaker, quotes } : undefined
}

/** Owner-facing names for the delivered services in the stats band. */
const PLAIN_SERVICE: Record<string, string> = {
  'Website design': 'website',
  'Website transfer': 'site migration',
  'Brand design': 'brand',
  'SEO/AEO': 'search visibility',
  'Local listing optimization': 'local listings',
  'Google Ads': 'Google Ads',
  'Meta ads': 'Meta ads',
  'Enterprise analytics setup and optimization': 'analytics',
  'CRM integration': 'CRM',
  'Video editing': 'video',
  'Formspree form system': 'lead forms',
  'AI assistant setup': 'AI assistant',
}

/** "website, brand, search visibility, and 3 more" (sentence case). */
export function summarizeServices(services: string[], shown = 3) {
  const names = services.map((service) => PLAIN_SERVICE[service] ?? service)
  const head = names.slice(0, shown)
  const rest = names.length - head.length
  let text: string
  if (rest > 0) text = `${head.join(', ')}, and ${rest} more`
  else if (head.length <= 2) text = head.join(' and ')
  else text = `${head.slice(0, -1).join(', ')}, and ${head[head.length - 1]}`
  return text.charAt(0).toUpperCase() + text.slice(1)
}

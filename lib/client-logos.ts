import manifest from '@/public/clients/logos/manifest.json'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

/**
 * Current-client logos for the logo rails (homepage hero, Work, waitlist).
 *
 * Files live in public/clients/logos/ and were taken from each client's own
 * site or repo (never redrawn); `manifest.json` records the source of every
 * file. SVGs use `currentColor` and rasters are white on transparent, so
 * `components/prism/client-logo.tsx` can tint them through a CSS mask.
 * Former clients are filtered out here and guarded by
 * __tests__/former-clients-highlight.test.ts.
 */

export type ClientLogo = {
  slug: string
  name: string
  /** Public path, or null when no usable logo exists (name fallback). */
  file: string | null
  aspect: number
  /**
   * Marks that carry no name (a tooth, an emblem) render with the client's
   * name beside them, the way each client's own header sets it.
   */
  withName: boolean
  /** Who the client sells to, for the B2C / B2B framing. */
  sellsTo: 'consumers' | 'businesses' | 'nonprofit'
}

type ManifestEntry = {
  slug: string
  name: string
  file: string | null
  aspect: number | null
  kind: string | null
  quality: string | null
}

/** Clients that sell to other businesses or run as nonprofits. */
const SELLS_TO: Record<string, ClientLogo['sellsTo']> = {
  'practice-transitions-institute': 'businesses',
  'michael-njo-dds': 'businesses',
  'infobell-it': 'businesses',
  'leadership-retreat': 'businesses',
  'belize-kids-foundation': 'nonprofit',
  'canary-foundation': 'nonprofit',
  'mach-1': 'businesses',
}

/** Rail order: the featured clients first, then everyone else. */
const LEAD_SLUGS = [
  'exquisite-dentistry',
  'canary-cove',
  'practice-transitions-institute',
  'olympic-bootworks',
  'roseville-dental-academy',
  'mach-1',
]

/** Seals whose built-in type is too small to read at rail size. */
const NAME_BESIDE = new Set([
  'roseville-dental-academy',
  'practice-transitions-institute',
])

const former = new Set<string>(FORMER_CLIENT_SLUGS)

const rank = (slug: string) => {
  const index = LEAD_SLUGS.indexOf(slug)
  return index === -1 ? LEAD_SLUGS.length : index
}

export const CLIENT_LOGOS: ClientLogo[] = (manifest as ManifestEntry[])
  .filter((entry) => !former.has(entry.slug))
  .map((entry) => ({
    slug: entry.slug,
    name: entry.name,
    file: entry.file,
    aspect: entry.aspect ?? 1,
    withName:
      entry.kind === 'mark' ||
      entry.quality === 'weak' ||
      NAME_BESIDE.has(entry.slug),
    sellsTo: SELLS_TO[entry.slug] ?? 'consumers',
  }))
  .sort((a, b) => rank(a.slug) - rank(b.slug))

import { existsSync } from 'node:fs'
import path from 'node:path'

import {
  CASE_STUDIES,
  type CaseStudyMeta,
  type CaseStudyResultMetric,
} from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

/**
 * Server-only helpers for the Work section (/case-studies and every case
 * study page). Everything here is computed from lib/case-study-data.ts so the
 * index ledger, the gallery filters, and the "more work" rows never drift
 * from what the detail pages publish.
 */

export type WorkGroupKey = 'dental' | 'founders' | 'community' | 'retail'

export const WORK_GROUPS: ReadonlyArray<{ key: WorkGroupKey; label: string }> = [
  { key: 'dental', label: 'Dental' },
  { key: 'founders', label: 'Founders & consulting' },
  { key: 'community', label: 'Nonprofit & community' },
  { key: 'retail', label: 'Retail & hospitality' },
]

/** Every data category maps to exactly one gallery filter (type-checked). */
const CATEGORY_GROUP: Record<CaseStudyMeta['category'], WorkGroupKey> = {
  dentistry: 'dental',
  consulting: 'founders',
  event: 'founders',
  nonprofit: 'community',
  'online community': 'community',
  education: 'community',
  retail: 'retail',
  'private estate': 'retail',
}

const FORMER = new Set<string>(FORMER_CLIENT_SLUGS)

export function isFormerClient(slug: string) {
  return FORMER.has(slug)
}

/** Current clients only: the proof surfaces. */
export const CURRENT_CASE_STUDIES = CASE_STUDIES.filter(
  (study) => !FORMER.has(study.slug),
)

// Former clients keep their archive pages (reachable by URL and the sitemap)
// but never feature as proof, so nothing here lists them.

export function getWorkGroup(study: CaseStudyMeta): WorkGroupKey {
  return CATEGORY_GROUP[study.category]
}

function publicAssetExists(publicPath: string) {
  try {
    return existsSync(
      path.join(process.cwd(), 'public', publicPath.replace(/^\//, '')),
    )
  } catch {
    return false
  }
}

export function getDesktopShot(slug: string) {
  const src = `/case-studies/${slug}-home-desktop.jpg`
  return publicAssetExists(src) ? src : undefined
}

export function getMobileShot(slug: string) {
  const src = `/case-studies/${slug}-home-mobile.jpg`
  return publicAssetExists(src) ? src : undefined
}

export function getHostLabel(url?: string) {
  if (!url) return undefined
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** The first verified, source-attributed metric (if the study has one). */
export function getVerifiedMetric(
  study: CaseStudyMeta,
): CaseStudyResultMetric | undefined {
  return study.structured?.results?.[0]
}

const proofWeight = (study: CaseStudyMeta) =>
  (getVerifiedMetric(study) ? 2 : 0) + (study.explainerVideo ? 1 : 0)

/**
 * Gallery order: studies with a verified metric first, explainer videos
 * next, then data order. The second metric study is moved to index 3 so the
 * two wide "featured" cards alternate sides in the 3-column grid.
 */
export function orderForGallery(studies: CaseStudyMeta[]) {
  const sorted = [...studies].sort((a, b) => proofWeight(b) - proofWeight(a))
  const featured = sorted.filter((study) => getVerifiedMetric(study))
  const rest = sorted.filter((study) => !getVerifiedMetric(study))
  if (featured.length < 2) return [...featured, ...rest]
  return [
    featured[0],
    ...rest.slice(0, 2),
    featured[1],
    ...featured.slice(2),
    ...rest.slice(2),
  ]
}

/**
 * "More work" on a case study page: other CURRENT clients only, same filter
 * group first, verified metrics first within each tier.
 */
export function getRelatedWork(slug: string, count = 3) {
  const self = CASE_STUDIES.find((study) => study.slug === slug)
  const pool = CURRENT_CASE_STUDIES.filter((study) => study.slug !== slug)
  const group = self ? getWorkGroup(self) : undefined
  const byProof = (list: CaseStudyMeta[]) =>
    [...list].sort((a, b) => proofWeight(b) - proofWeight(a))
  const sameGroup = byProof(pool.filter((study) => getWorkGroup(study) === group))
  const others = byProof(pool.filter((study) => getWorkGroup(study) !== group))
  return [...sameGroup, ...others].slice(0, count)
}

/** "Palo Alto, CA" -> "US"; "San Pedro, Belize" -> "Belize". */
function countryOf(location: string) {
  const last = location.split(',').pop()?.trim() ?? location
  return /^[A-Z]{2}$/.test(last) ? 'US' : last
}

export function getWorkLedger() {
  const locations = new Set(CURRENT_CASE_STUDIES.map((study) => study.location))
  const countries = new Set(
    CURRENT_CASE_STUDIES.map((study) => countryOf(study.location)),
  )
  const metrics = CURRENT_CASE_STUDIES.flatMap((study) => {
    const metric = getVerifiedMetric(study)
    return metric ? [{ study, metric }] : []
  })
  return {
    stories: CURRENT_CASE_STUDIES.length,
    locations: locations.size,
    countries: countries.size,
    metrics,
  }
}

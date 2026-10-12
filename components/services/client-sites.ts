import { CASE_STUDIES } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

export type ClientSite = {
  slug: string
  client: string
  host: string
  location: string
  href: string
  desktop: string
  mobile: string
}

const FORMER = new Set<string>(FORMER_CLIENT_SLUGS)

function hostOf(url: string | undefined) {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Resolve current-client sites (screenshots in public/case-studies) from
 * case-study slugs. Former clients are always dropped, even if listed, so a
 * stale slug can never put them back on a proof surface.
 */
export function getClientSites(slugs: readonly string[]): ClientSite[] {
  return slugs.flatMap((slug) => {
    if (FORMER.has(slug)) return []
    const study = CASE_STUDIES.find((item) => item.slug === slug)
    if (!study) return []
    return [
      {
        slug,
        client: study.client,
        host: hostOf(study.websiteUrl),
        location: study.location,
        href: `/case-studies/${slug}`,
        desktop: `/case-studies/${slug}-home-desktop.jpg`,
        mobile: `/case-studies/${slug}-home-mobile.jpg`,
      },
    ]
  })
}

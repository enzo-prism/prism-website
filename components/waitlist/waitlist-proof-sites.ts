import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

export type WaitlistProofSite = {
  /** Case-study slug; the screenshot lives at public/case-studies/<slug>-home-desktop.jpg. */
  slug: string
  name: string
}

/**
 * Current-client websites for the waitlist proof rail. Real captures only
 * (scripts/capture-case-study-screenshots.mjs). Former clients are filtered
 * out below as a second line of defense; never list them here.
 */
const SITES: readonly WaitlistProofSite[] = [
  { slug: 'dr-christopher-wong', name: 'Dr. Christopher B. Wong, DDS' },
  { slug: 'exquisite-dentistry', name: 'Exquisite Dentistry' },
  { slug: 'olympic-bootworks', name: 'Olympic Bootworks' },
  { slug: 'coast-periodontics-and-laser-surgery', name: 'Coast Periodontics' },
  { slug: 'waikiki-dental', name: 'Waikiki Dental' },
  { slug: 'practice-transitions-institute', name: 'Practice Transitions Institute' },
  { slug: 'rebellious-aging', name: 'Rebellious Aging' },
  { slug: 'town-centre-dental', name: 'Town Centre Dental' },
  { slug: 'sacramento-dental-medicine', name: 'Sacramento Dental Medicine' },
  { slug: 'belize-kids-foundation', name: 'Belize Kids' },
]

export const WAITLIST_PROOF_SITES: readonly WaitlistProofSite[] = SITES.filter(
  (site) => !(FORMER_CLIENT_SLUGS as readonly string[]).includes(site.slug),
)

export function getWaitlistProofImage(slug: string): string {
  return `/case-studies/${slug}-home-desktop.jpg`
}

/**
 * Slim slug → client lookup for shared chrome (Navbar breadcrumbs).
 *
 * The Navbar is a client component that renders on every route. Importing
 * the full `lib/case-study-data.ts` blob (~41KB of quotes, summaries, and
 * structured results) from it shipped ~17KB gzipped of dead copy in every
 * page's client JS just to map a slug to a display name — so the chrome
 * imports this tiny module instead.
 *
 * Kept in sync with `lib/case-study-data.ts` by
 * `__tests__/lib/case-study-nav-data.test.ts`.
 */

export type CaseStudyNavItem = {
  slug: string
  client: string
}

export const CASE_STUDY_NAV_ITEMS: readonly CaseStudyNavItem[] = [
  { slug: 'dr-christopher-wong', client: 'Dr. Christopher B. Wong' },
  { slug: 'exquisite-dentistry', client: 'Exquisite Dentistry' },
  { slug: 'olympic-bootworks', client: 'Olympic Bootworks' },
  { slug: 'laguna-beach-dental-arts', client: 'Laguna Beach Dental Arts' },
  { slug: 'family-first-smile-care', client: 'Family First Smile Care' },
  { slug: 'town-centre-dental', client: 'Town Centre Dental' },
  { slug: 'grace-dental-santa-rosa', client: 'Grace Dental Santa Rosa' },
  { slug: 'roseville-dental-academy', client: 'Roseville Dental Academy' },
  { slug: 'rebellious-aging', client: 'Rebellious Aging' },
  { slug: 'wine-country-root-canal', client: 'Wine Country Root Canal' },
  { slug: 'sr4-partners', client: 'sr4 Partners' },
  { slug: 'infobell-it', client: 'Infobell IT' },
  { slug: 'canary-foundation', client: 'Canary Foundation' },
  { slug: 'belize-kids-foundation', client: 'Belize Kids Foundation' },
  { slug: 'canary-cove', client: 'Canary Cove' },
  { slug: 'we-are-saplings', client: 'We Are Saplings' },
  {
    slug: 'coast-periodontics-and-laser-surgery',
    client: 'Coast Periodontics & Laser Surgery',
  },
  {
    slug: 'practice-transitions-institute',
    client: 'Practice Transitions Institute',
  },
  { slug: 'leadership-retreat', client: 'Dentist Retreat' },
  { slug: 'michael-njo-dds', client: 'Dental Strategies' },
  { slug: 'saorsa-growth-partners', client: 'Saorsa Growth Partners' },
  { slug: 'mataria-dental-group', client: 'Mataria Dental Group' },
]

export function findCaseStudyNavItem(
  slug: string,
): CaseStudyNavItem | undefined {
  return CASE_STUDY_NAV_ITEMS.find((item) => item.slug === slug)
}

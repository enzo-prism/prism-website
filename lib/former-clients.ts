/**
 * Clients Prism is not currently working with.
 * Keep their case-study archive pages, but do not feature their websites
 * on current-client proof surfaces (homepage deck, offer pages, pricing,
 * dental rosters, services proof, schema highlights, or llms measured examples).
 */
export const FORMER_CLIENT_SLUGS = [
  'saorsa-growth-partners',
  'sr4-partners',
  'laguna-beach-dental-arts',
] as const

export type FormerClientSlug = (typeof FORMER_CLIENT_SLUGS)[number]

export const FORMER_CLIENT_SLUG_SET = new Set<string>(FORMER_CLIENT_SLUGS)

export function isFormerClientSlug(slug: string): boolean {
  return FORMER_CLIENT_SLUG_SET.has(slug)
}

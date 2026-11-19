/**
 * Blog posts name their author in several ways ("Enzo Sison", "Enzo",
 * "Enzo from Prism", "Prism Team", or only in `openGraph.authors`). The
 * byline and the BlogPosting schema both resolve through here so they always
 * agree, and every post by the founder links to the one founder entity
 * (`#founder`, the /about page) that answer engines use to judge who wrote it.
 */

export type BlogAuthor =
  | { kind: 'founder'; name: 'Enzo Sison' }
  | { kind: 'organization'; name: 'Prism' }
  | { kind: 'person'; name: string }

export const FOUNDER_NAME = 'Enzo Sison'

const FOUNDER_ALIASES = new Set(['enzo sison', 'enzo', 'enzo from prism'])
const ORGANIZATION_ALIASES = new Set(['prism', 'prism team', 'design prism'])

export function resolveBlogAuthor(
  ...candidates: Array<string | null | undefined>
): BlogAuthor {
  const raw = candidates.map((value) => value?.trim()).find(Boolean)
  if (!raw) return { kind: 'organization', name: 'Prism' }

  const key = raw.toLowerCase().replace(/\s+/g, ' ')
  if (FOUNDER_ALIASES.has(key)) return { kind: 'founder', name: FOUNDER_NAME }
  if (ORGANIZATION_ALIASES.has(key)) return { kind: 'organization', name: 'Prism' }
  return { kind: 'person', name: raw }
}

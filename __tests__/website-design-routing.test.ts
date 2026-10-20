import fs from 'node:fs'
import path from 'node:path'

import { isRouteIndexable } from '@/lib/seo/search-visibility'

// 2026-10-19: the website service is Website Design. /website-design is the
// real, indexable page; the old /websites page and the web design shortpaths
// land there in one permanent hop, so one URL owns the topic.
const WEBSITE_DESIGN_ALIASES = [
  '/websites',
  '/website',
  '/web-design',
  '/website-design-services',
  '/web-design-services',
] as const

const root = process.cwd()

const SCANNED_DIRS = ['app', 'components', 'lib', 'content', 'public']
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.txt'])
// The search policy names the old path to keep it noindex, and the catalog
// comment records the rename.
const ALLOWED_FILES = new Set([
  'lib/seo/search-visibility.ts',
  'lib/services.ts',
])

function collectTextFiles(dir: string): string[] {
  const absolute = path.join(root, dir)
  if (!fs.existsSync(absolute)) return []
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name)
    if (entry.isDirectory()) return collectTextFiles(relative)
    return TEXT_EXTENSIONS.has(path.extname(entry.name)) ? [relative] : []
  })
}

type Redirect = { source: string; destination: string; permanent: boolean }

// next.config.mjs is ESM with build-time imports, so read the one-line
// redirect entries as text (the same approach as aeo-routing.test.ts).
function readRedirects(): Redirect[] {
  const config = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8')
  return Array.from(
    config.matchAll(
      /\{\s*source:\s*'([^']+)',\s*destination:\s*'([^']+)',\s*permanent:\s*(true|false)\s*\}/g,
    ),
  ).map(([, source, destination, permanent]) => ({
    source,
    destination,
    permanent: permanent === 'true',
  }))
}

describe('Website Design routing', () => {
  const redirects = readRedirects()

  it('serves /website-design as an indexable page', () => {
    expect(
      fs.existsSync(path.join(root, 'app/website-design/page.tsx')),
    ).toBe(true)
    expect(
      redirects.filter((entry) => entry.source === '/website-design'),
    ).toEqual([])
    expect(isRouteIndexable('/website-design')).toBe(true)
  })

  it.each(WEBSITE_DESIGN_ALIASES)(
    'permanently redirects %s to /website-design in one hop',
    (source) => {
      expect(redirects.filter((entry) => entry.source === source)).toEqual([
        { source, destination: '/website-design', permanent: true },
      ])
      expect(isRouteIndexable(source)).toBe(false)
    },
  )

  it('deletes the old /websites page and never chains through it', () => {
    expect(fs.existsSync(path.join(root, 'app/websites'))).toBe(false)
    expect(
      redirects.filter((entry) => entry.destination === '/websites'),
    ).toEqual([])
  })

  it('links /website-design directly instead of /websites anywhere on the site', () => {
    const offenders = SCANNED_DIRS.flatMap(collectTextFiles)
      .filter((file) => !ALLOWED_FILES.has(file))
      .filter((file) =>
        /\/websites\b/.test(fs.readFileSync(path.join(root, file), 'utf8')),
      )

    expect(offenders).toEqual([])
  })
})

import fs from 'node:fs'
import path from 'node:path'

import { isRouteIndexable } from '@/lib/seo/search-visibility'

// 2026-10-18: AEO is a service again. /aeo is a real, indexable page, and the
// AI search shortpaths plus the retired /ai-seo-services lander consolidate
// there in one permanent hop, so one page owns the topic.
const AEO_ALIASES = [
  '/ai',
  '/ai-seo-services',
  '/ai-seo',
  '/ai-search-optimization',
  '/llm-seo-services',
  '/answer-engine-optimization',
  '/generative-engine-optimization',
  '/aeo-services',
] as const

const root = process.cwd()

const SCANNED_DIRS = ['app', 'components', 'lib', 'content', 'public']
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.txt'])
// The search policy must still name the retired path to keep it noindex.
const ALLOWED_FILES = new Set(['lib/seo/search-visibility.ts'])

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
// redirect entries as text (the same approach as retired-offers.test.ts).
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

describe('AEO routing', () => {
  const redirects = readRedirects()

  it('parses the redirect table', () => {
    expect(redirects.length).toBeGreaterThan(50)
  })

  it('serves /aeo as a page instead of redirecting it away', () => {
    expect(fs.existsSync(path.join(root, 'app/aeo/page.tsx'))).toBe(true)
    expect(redirects.filter((entry) => entry.source === '/aeo')).toEqual([])
    expect(isRouteIndexable('/aeo')).toBe(true)
  })

  it.each(AEO_ALIASES)(
    'permanently redirects %s to /aeo in one hop',
    (source) => {
      const matches = redirects.filter((entry) => entry.source === source)
      expect(matches).toEqual([
        { source, destination: '/aeo', permanent: true },
      ])
      expect(isRouteIndexable(source)).toBe(false)
    },
  )

  it('deletes the old AI search lander and never chains through it', () => {
    expect(fs.existsSync(path.join(root, 'app/ai-seo-services'))).toBe(false)
    expect(
      redirects.filter((entry) => entry.destination === '/ai-seo-services'),
    ).toEqual([])
  })

  it('links /aeo directly instead of the retired lander anywhere on the site', () => {
    const offenders = SCANNED_DIRS.flatMap(collectTextFiles)
      .filter((file) => !ALLOWED_FILES.has(file))
      .filter((file) =>
        fs
          .readFileSync(path.join(root, file), 'utf8')
          .includes('/ai-seo-services'),
      )

    expect(offenders).toEqual([])
  })
})

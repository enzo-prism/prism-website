import fs from 'node:fs'
import path from 'node:path'

import { NAV_SERVICE_ITEMS } from '@/lib/constants'
import { PRICING_OFFER_ORDER } from '@/lib/pricing-model'
import { isRouteIndexable } from '@/lib/seo/search-visibility'
import { PRISM_SERVICES } from '@/lib/services'

// 2026-10-12: Prism offers exactly three services (Websites, Content, Ads),
// and AEO joined as the fourth on 2026-10-18. The two retired packaged offers
// redirect permanently; dental stays a specialty and proof cluster (dental
// landers and case studies remain).
const RETIRED_REDIRECTS = [
  { source: '/dental-os', destination: '/dental-website' },
  { source: '/prism-infinity', destination: '/content' },
] as const

const RETIRED_MENTION = /\bdental os\b|\bprism infinity\b|\/dental-os\b|\/prism-infinity\b/i

const SCANNED_DIRS = ['app', 'components', 'lib', 'content', 'public', 'scripts']
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.txt', '.mjs', '.js', '.css'])
// Guard definitions that must name what they forbid.
const ALLOWED_FILES = new Set(['lib/pricing-consistency.ts'])

const root = process.cwd()

function collectTextFiles(dir: string): string[] {
  const absolute = path.join(root, dir)
  if (!fs.existsSync(absolute)) return []
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'node_modules' ? [] : collectTextFiles(relative)
    }
    return TEXT_EXTENSIONS.has(path.extname(entry.name)) ? [relative] : []
  })
}

describe('four services only', () => {
  it('keeps the header, catalog, and pricing on the same four services', () => {
    const hrefs = ['/website-design', '/content', '/ads', '/aeo']
    expect(NAV_SERVICE_ITEMS.map((item) => item.href)).toEqual(hrefs)
    expect(PRISM_SERVICES.map((service) => service.href)).toEqual(hrefs)
    expect(PRICING_OFFER_ORDER).toEqual(['website', 'content', 'ads', 'aeo'])
  })

  it('permanently redirects the retired offer routes and deletes their pages', () => {
    const config = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8')

    for (const { source, destination } of RETIRED_REDIRECTS) {
      const escaped = source.replace(/[/-]/g, '\\$&')
      const entry = config.match(
        new RegExp(`\\{\\s*source:\\s*'${escaped}',[^}]*\\}`),
      )?.[0]
      expect(entry).toBeDefined()
      expect(entry).toContain(`destination: '${destination}'`)
      expect(entry).toContain('permanent: true')

      expect(fs.existsSync(path.join(root, 'app', source))).toBe(false)
      expect(isRouteIndexable(source)).toBe(false)
      expect(isRouteIndexable(destination)).toBe(true)
    }
  })

  it('never names or links the retired offers anywhere on the site', () => {
    const offenders = SCANNED_DIRS.flatMap(collectTextFiles)
      .filter((file) => !ALLOWED_FILES.has(file))
      .filter((file) => RETIRED_MENTION.test(fs.readFileSync(path.join(root, file), 'utf8')))

    expect(offenders).toEqual([])
  })
})

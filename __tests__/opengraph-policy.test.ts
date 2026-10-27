import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

import { buildRouteMetadata } from '@/lib/seo/metadata'
import { DEFAULT_OG_IMAGE, SOCIAL_IMAGE_EXCEPTIONS } from '@/lib/seo/rules'

const EXPECTED_IMAGE_SHA256 =
  '67954e0cd727f68a007d5bb916ed499606bb8dd44d33b6eea3273f61131ccffa'

function walkFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walkFiles(path) : [path]
  })
}

describe('site-wide Open Graph image policy', () => {
  const appDirectory = join(process.cwd(), 'app')

  it('uses the exact approved 1200x630 PNG asset', () => {
    const image = readFileSync(
      join(process.cwd(), 'public/prism-opengraph.png'),
    )
    const digest = createHash('sha256').update(image).digest('hex')

    expect(digest).toBe(EXPECTED_IMAGE_SHA256)
  })

  it('has no file-based images that can override route metadata', () => {
    const overrides = walkFiles(appDirectory)
      .map((path) => relative(appDirectory, path))
      .filter((path) =>
        /(^|\/)(?:opengraph-image|twitter-image)\.[^.]+$/.test(path),
      )

    expect(overrides).toEqual([])
  })

  it('routes every page through the shared image policy', () => {
    const pageFiles = walkFiles(appDirectory).filter((path) =>
      path.endsWith('/page.tsx'),
    )

    expect(pageFiles.length).toBeGreaterThan(100)

    for (const pageFile of pageFiles) {
      const source = readFileSync(pageFile, 'utf8')
      const usesSharedMetadata = source.includes('buildRouteMetadata')
      const usesSharedImageDirectly = source.includes('DEFAULT_OG_IMAGE')

      expect({
        page: relative(appDirectory, pageFile),
        usesSharedPolicy: usesSharedMetadata || usesSharedImageDirectly,
      }).toEqual({
        page: relative(appDirectory, pageFile),
        usesSharedPolicy: true,
      })
    }
  })

  it('limits social image exceptions to approved 1200x630 files', () => {
    expect(Object.keys(SOCIAL_IMAGE_EXCEPTIONS)).toEqual(['/case-studies/mach-1'])

    for (const [path, image] of Object.entries(SOCIAL_IMAGE_EXCEPTIONS)) {
      const file = readFileSync(join(process.cwd(), 'public', image.url))
      // JPEG SOF0/SOF2 or PNG IHDR carry the pixel size; check it is 1200x630.
      const size =
        file[0] === 0x89
          ? [file.readUInt32BE(16), file.readUInt32BE(20)]
          : (() => {
              for (let i = 2; i < file.length; ) {
                const marker = file[i + 1]
                const length = file.readUInt16BE(i + 2)
                if (marker === 0xc0 || marker === 0xc2) {
                  return [file.readUInt16BE(i + 7), file.readUInt16BE(i + 5)]
                }
                i += 2 + length
              }
              return [0, 0]
            })()
      expect({ path, size }).toEqual({ path, size: [1200, 630] })
      expect(image.alt.length).toBeGreaterThan(10)

      const metadata = buildRouteMetadata({
        titleStem: 'Exception check',
        description: 'Checks that an approved route uses its own share card.',
        path,
      })
      expect(metadata.twitter?.images).toEqual([image.url])
    }

    const other = buildRouteMetadata({
      titleStem: 'Default check',
      description: 'Checks that every other route keeps the site-wide card.',
      path: '/case-studies/exquisite-dentistry',
    })
    expect(other.twitter?.images).toEqual([DEFAULT_OG_IMAGE])
  })

  it('keeps retired ChatGPT Ads metadata routes deleted', () => {
    expect(
      existsSync(join(appDirectory, 'chatgpt-ads/opengraph-image.tsx')),
    ).toBe(false)
    expect(
      existsSync(join(appDirectory, 'chatgpt-ads/twitter-image.tsx')),
    ).toBe(false)
  })

  it('keeps Library metadata titles compact by excluding speaker prefixes', () => {
    const source = readFileSync(
      join(appDirectory, 'library/[slug]/page.tsx'),
      'utf8',
    )

    expect(source).toContain('const rawTitle = post.title')
    expect(source).not.toContain('speakerName ?')
  })
})

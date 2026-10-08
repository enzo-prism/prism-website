import fs from 'node:fs'
import path from 'node:path'

import {
  HOMEPAGE_CASE_STUDY_SLUGS,
  HOMEPAGE_CLIENT_WINS,
} from '@/components/home/homepage-content'
import { CLIENTS } from '@/lib/clients'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { websiteProjects } from '@/lib/website-projects'

// Current-client proof surfaces. Former clients keep their /case-studies
// archive pages but must not be featured on any of these.
const FEATURED_FILES = [
  'components/home/homepage-content.ts',
  'components/home/HomeProofSection.tsx',
  'components/schema-markup.tsx',
  'components/dental-client-carousel.tsx',
  'app/websites/page.tsx',
  'app/pricing/client-page.tsx',
  'app/services/page.tsx',
  'app/dental-os/page.tsx',
  'app/dental-website/page.tsx',
  'app/models/client-page.tsx',
  'lib/website-projects.ts',
  'lib/clients.ts',
  'public/ai-data.json',
] as const

const FORMER_CLIENT_MARKERS = [
  ...FORMER_CLIENT_SLUGS,
  'saorsapartners.com',
  'sr4partners.com',
  'lagunabeachdentalarts.com',
  'saorsa growth partners',
  'sr4 partners',
  'laguna beach dental arts',
] as const

describe('former clients stay off current-client proof surfaces', () => {
  it('keeps former clients out of the homepage cover flow', () => {
    const hrefs = HOMEPAGE_CLIENT_WINS.slides.map((slide) => slide.href)
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(hrefs).not.toContain(`/case-studies/${slug}`)
    }
  })

  it('keeps former clients out of the homepage proof grid', () => {
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(HOMEPAGE_CASE_STUDY_SLUGS).not.toContain(slug)
    }
  })

  it('keeps former clients out of the client and project rails', () => {
    const haystack = JSON.stringify([CLIENTS, websiteProjects]).toLowerCase()
    for (const marker of FORMER_CLIENT_MARKERS) {
      expect(haystack).not.toContain(marker)
    }
  })

  it('keeps former clients out of the llms.txt measured examples', () => {
    // The full case-study index in llms.txt stays complete (archive pages are
    // still published); only the featured examples block must exclude them.
    const llms = fs.readFileSync(
      path.join(process.cwd(), 'public/llms.txt'),
      'utf8',
    )
    const start = llms.indexOf('Best measured examples')
    expect(start).toBeGreaterThan(-1)
    const block = llms.slice(start, llms.indexOf('\n\n', start)).toLowerCase()
    for (const marker of FORMER_CLIENT_MARKERS) {
      expect(block).not.toContain(marker)
    }
  })

  it.each(FEATURED_FILES)('%s does not mention a former client', (file) => {
    const contents = fs
      .readFileSync(path.join(process.cwd(), file), 'utf8')
      .toLowerCase()
    const found = FORMER_CLIENT_MARKERS.filter((marker) =>
      contents.includes(marker),
    )
    expect(found).toEqual([])
  })
})

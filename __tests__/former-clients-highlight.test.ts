import { HOMEPAGE_CASE_STUDY_SLUGS, HOMEPAGE_CLIENT_WINS } from '@/components/home/homepage-content'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { websiteProjects } from '@/lib/website-projects'
import { CLIENTS } from '@/lib/clients'
import fs from 'node:fs'
import path from 'node:path'

const FEATURED_FILES = [
  'components/home/homepage-content.ts',
  'components/home/HomeProofSection.tsx',
  'components/schema-markup.tsx',
  'components/dental-client-carousel.tsx',
  'app/websites/page.tsx',
  'app/pricing/client-page.tsx',
  'app/services/page.tsx',
  'app/dental-os/page.tsx',
  'app/models/client-page.tsx',
  'lib/website-projects.ts',
  'lib/clients.ts',
  'public/llms.txt',
  'public/ai-data.json',
] as const

const FORMER_CLIENT_MARKERS = [
  'saorsa-growth-partners',
  'saorsapartners.com',
  'Saorsa Growth Partners',
  'sr4-partners',
  'sr4partners.com',
  'sr4 Partners',
  'laguna-beach-dental-arts',
  'lagunabeachdentalarts.com',
  'Laguna Beach Dental Arts',
  'laguna beach dental arts',
] as const

describe('former clients stay off featured surfaces', () => {
  it('keeps former-client websites out of the homepage cover flow', () => {
    const hrefs = HOMEPAGE_CLIENT_WINS.slides.map((slide) => slide.href)
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(hrefs).not.toContain(`/case-studies/${slug}`)
    }
  })

  it('keeps former-client slugs out of the homepage proof grid', () => {
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(HOMEPAGE_CASE_STUDY_SLUGS).not.toContain(slug)
    }
  })

  it('keeps former-client websites out of featured project and client rails', () => {
    const projectHaystack = JSON.stringify(websiteProjects)
    const clientHaystack = JSON.stringify(CLIENTS)
    for (const marker of FORMER_CLIENT_MARKERS) {
      expect(projectHaystack).not.toContain(marker)
      expect(clientHaystack).not.toContain(marker)
    }
  })

  it('does not mention former clients on current-client proof surfaces', () => {
    for (const relativePath of FEATURED_FILES) {
      const contents = fs.readFileSync(
        path.join(process.cwd(), relativePath),
        'utf8',
      )
      for (const marker of FORMER_CLIENT_MARKERS) {
        expect(`${relativePath} should not contain ${marker}`).not.toEqual(
          contents.includes(marker) ? `${relativePath} should not contain ${marker}` : '',
        )
        expect(contents).not.toContain(marker)
      }
    }
  })
})

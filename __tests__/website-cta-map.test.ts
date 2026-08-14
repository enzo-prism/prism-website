import fs from 'node:fs'
import path from 'node:path'

import { WEBSITE_START_CTA } from '@/lib/pricing-model'

const read = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

describe('website CTA map', () => {
  it('keeps Start my website pointed at the focused intake', () => {
    expect(WEBSITE_START_CTA).toEqual({
      label: 'Start my website',
      href: '/website-intake',
    })
  })

  it('routes website-start surfaces through WEBSITE_START_CTA', () => {
    const surfaces = [
      'components/footer.tsx',
      'components/home/HomeOffersSection.tsx',
      'app/websites/page.tsx',
      'app/dental-website/page.tsx',
      'components/social-link-hub.tsx',
    ]

    for (const relativePath of surfaces) {
      expect(read(relativePath)).toContain('WEBSITE_START_CTA')
    }
  })
})

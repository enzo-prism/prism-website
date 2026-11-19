import fs from 'node:fs'
import path from 'node:path'

import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  changedFilesToPaths,
  parseSitemapUrls,
  selectIndexNowUrls,
} from '@/lib/seo/indexnow'

const SITEMAP = `<?xml version="1.0"?><urlset>
<url><loc>https://www.design-prism.com</loc></url>
<url><loc>https://www.design-prism.com/aeo</loc></url>
<url><loc>https://www.design-prism.com/case-studies</loc></url>
<url><loc>https://www.design-prism.com/case-studies/belize-kids-foundation</loc></url>
<url><loc>https://www.design-prism.com/blog/dental-seo-guide</loc></url>
</urlset>`

describe('IndexNow', () => {
  it('serves the key file at the key location', () => {
    expect(INDEXNOW_KEY).toMatch(/^[0-9a-f]{32}$/)
    expect(INDEXNOW_KEY_LOCATION).toBe(
      `https://www.design-prism.com/${INDEXNOW_KEY}.txt`,
    )
    const file = fs.readFileSync(
      path.join(process.cwd(), 'public', `${INDEXNOW_KEY}.txt`),
      'utf8',
    )
    expect(file.trim()).toBe(INDEXNOW_KEY)
  })

  it('maps page sources to paths and skips site-wide files', () => {
    expect(
      [
        ...changedFilesToPaths([
          'content/blog/dental-seo-guide.mdx',
          'content/blog/some-noindex-post.mdx',
          'app/aeo/page.tsx',
          'app/(marketing)/pricing/page.tsx',
          'app/blog/[slug]/page.tsx',
          'app/api/blog/[slug]/markdown/route.ts',
          'app/page.tsx',
          'components/home/HomeHero.tsx',
          'lib/case-study-data.ts',
          'app/layout.tsx',
          'components/navbar.tsx',
          'README.md',
        ]),
      ].sort(),
    ).toEqual(
      [
        '/',
        '/aeo',
        '/blog/dental-seo-guide',
        '/blog/some-noindex-post',
        '/case-studies/*',
        '/pricing',
      ].sort(),
    )
  })

  it('submits only URLs the sitemap lists', () => {
    const urls = selectIndexNowUrls(
      new Set(['/', '/aeo', '/blog/some-noindex-post', '/case-studies/*']),
      parseSitemapUrls(SITEMAP),
    )
    expect(urls).toEqual([
      'https://www.design-prism.com',
      'https://www.design-prism.com/aeo',
      'https://www.design-prism.com/case-studies',
      'https://www.design-prism.com/case-studies/belize-kids-foundation',
    ])
  })
})

import { renderToStaticMarkup } from 'react-dom/server'

import SeoPage from '@/app/seo/page'

jest.mock('server-only', () => ({}), { virtual: true })
jest.mock('@/lib/mdx-data', () => ({
  getAllPosts: jest.fn().mockResolvedValue([]),
}))
jest.mock('@/components/seo/seo-hero', () => ({ SeoHero: () => null }))
jest.mock('@/components/seo/seo-expandable-image', () => ({
  SeoExpandableImage: () => null,
}))
jest.mock('@/components/video-player', () => ({
  __esModule: true,
  default: () => null,
}))

describe('SEO answers', () => {
  it('renders every structured answer in readable server HTML with relevant next steps', async () => {
    const html = renderToStaticMarkup(await SeoPage())
    const document = new DOMParser().parseFromString(html, 'text/html')
    const schemas = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    ).map((script) => JSON.parse(script.textContent || '{}'))
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage')
    expect(faq).toBeDefined()
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(4)
    for (const question of faq.mainEntity) {
      const answer = Array.from(
        document.querySelectorAll('#seo-questions details'),
      ).find(
        (details) =>
          details.querySelector('summary')?.textContent === question.name,
      )
      // FaqList keeps every answer in the server HTML, right after its summary.
      expect(answer?.querySelector('summary + div')?.textContent).toBe(
        question.acceptedAnswer.text,
      )
    }
    expect(document.querySelector('#seo-questions')?.textContent).toContain(
      'Neither guarantees a ranking or an AI citation',
    )
    for (const href of ['/seo/audit', '/ai-seo-services', '/waitlist']) {
      expect(
        document.querySelector(`#seo-questions a[href="${href}"]`),
      ).not.toBeNull()
    }
  })

  it('keeps the page free of tier language and guarantees, with verified proof', async () => {
    const html = renderToStaticMarkup(await SeoPage())
    const document = new DOMParser().parseFromString(html, 'text/html')
    const text = document.body.textContent ?? ''

    expect(text).not.toMatch(/higher-tier|package/i)
    // The only "guarantee" on the page is the disclaimer that none exists.
    expect(
      text
        .replaceAll('No one can guarantee a ranking', '')
        .replaceAll('Neither guarantees a ranking', ''),
    ).not.toMatch(/guarantee|only improves|#1|top of google/i)
    expect(text).toContain('No one can guarantee a ranking or an AI citation')
    for (const label of ['SEO', 'AEO', 'GEO']) {
      expect(text).toContain(label)
    }

    // Case-study hosts come from lib/case-study-data, never hand-typed.
    expect(text).toContain('chriswongdds.com')
    expect(text).not.toContain('drchriswong.com')
    expect(text).toContain('+49%')
    expect(text).toContain('+60%')
    expect(text).toContain('Source: Google Search Console')

    const finalCta = document.querySelector('#final-cta-heading')
    expect(finalCta?.textContent).toBe('get found next.')
  })
})

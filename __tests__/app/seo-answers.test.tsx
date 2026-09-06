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
jest.mock('@/components/animated/ServiceIllustration', () => ({
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
      expect(answer?.querySelector('p')?.textContent).toBe(
        question.acceptedAnswer.text,
      )
    }
    expect(document.querySelector('#seo-questions')?.textContent).toContain(
      'Neither guarantees a ranking or an AI citation',
    )
    for (const href of ['/seo/audit', '/ai-seo-services', '/aeo']) {
      expect(
        document.querySelector(`#seo-questions a[href="${href}"]`),
      ).not.toBeNull()
    }
  })
})

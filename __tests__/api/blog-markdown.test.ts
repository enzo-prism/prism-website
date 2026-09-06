/** @jest-environment node */
import { GET } from '@/app/api/blog/[slug]/markdown/route'
import { getPost, getPostMarkdownSource } from '@/lib/mdx-data'

jest.mock('@/lib/mdx-data', () => ({
  getPost: jest.fn(),
  getPostMarkdownSource: jest.fn(),
}))

const read = () => GET(new Request('https://preview.example/api/blog/example/markdown'), {
  params: Promise.resolve({ slug: 'example' }),
})

describe('blog markdown discovery', () => {
  beforeEach(() => {
    jest.mocked(getPost).mockResolvedValue({ frontmatter: {} } as Awaited<ReturnType<typeof getPost>>)
    jest.mocked(getPostMarkdownSource).mockResolvedValue('# Example\n\nAuthored article.')
  })

  it('serves crawlable source with an HTML canonical and prevents duplicate indexing', async () => {
    const response = await read()
    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, follow')
    expect(response.headers.get('Link')).toBe('<https://www.design-prism.com/blog/example>; rel="canonical"')
    expect(await response.text()).toBe('# Example\n\nAuthored article.')
  })

  it('respects the article canonical override', async () => {
    jest.mocked(getPost).mockResolvedValue({ frontmatter: { canonical: '/blog/original' } } as Awaited<ReturnType<typeof getPost>>)
    expect((await read()).headers.get('Link')).toBe('<https://www.design-prism.com/blog/original>; rel="canonical"')
  })

  it('returns 404 when a source cannot render as an article', async () => {
    jest.mocked(getPost).mockResolvedValue(null)
    expect((await read()).status).toBe(404)
  })
})

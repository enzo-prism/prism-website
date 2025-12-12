jest.mock('server-only', () => ({}), { virtual: true })
import BlogPostPage from '../app/blog/[slug]/page'
import { getPost } from '../lib/mdx-data'

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => { throw new Error('NEXT_NOT_FOUND') })
}))

describe('mdx helpers', () => {
  test('getPost returns null for missing slug', async () => {
    const result = await getPost('missing-post-slug')
    expect(result).toBeNull()
  })

  test('BlogPostPage throws NEXT_NOT_FOUND for missing slug', async () => {
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: 'missing-post-slug' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })
})

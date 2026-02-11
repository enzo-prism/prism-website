jest.mock('server-only', () => ({}), { virtual: true })
import BlogPostPage, { generateMetadata } from '../app/blog/[slug]/page'
import { getPost } from '../lib/mdx-data'
import { DEFAULT_BLOG_FEATURED_IMAGE, getBlogOpenGraphImage } from '../lib/blog-images'

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

describe('mdx helpers', () => {
  test('getPost returns null for missing slug', async () => {
    const result = await getPost('missing-post-slug')
    expect(result).toBeNull()
  })

  test('BlogPostPage throws NEXT_NOT_FOUND for missing slug', async () => {
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: 'missing-post-slug' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  test('falls back to the shared featured image when frontmatter image format is invalid', async () => {
    const post = await getPost('vibe-coding-platform-foundation-2026')
    expect(post?.frontmatter.image).toBe(DEFAULT_BLOG_FEATURED_IMAGE)
  })

  test('uses shared OG image for posts dated before 2026', () => {
    const ogImage = getBlogOpenGraphImage(
      '2025-12-31',
      'https://example.com/featured.png',
      'https://www.design-prism.com',
    )

    expect(ogImage).toBe(DEFAULT_BLOG_FEATURED_IMAGE)
  })

  test('uses featured image for posts dated during and after 2026', () => {
    const ogImage = getBlogOpenGraphImage(
      '2026-01-01',
      '/blog/brand-strategy.png',
      'https://www.design-prism.com',
    )

    expect(ogImage).toBe('https://www.design-prism.com/blog/brand-strategy.png')
  })

  test('generateMetadata sets OG image by post date rule', async () => {
    const oldPostMetadata = await generateMetadata({
      params: Promise.resolve({ slug: 'how-to-choose-local-seo-agency' }),
    })

    expect(oldPostMetadata.openGraph?.images).toEqual([
      {
        url: DEFAULT_BLOG_FEATURED_IMAGE,
        width: 1200,
        height: 630,
        alt: 'how to choose a local seo agency (checklist + red flags)',
      },
    ])

    const newPostMetadata = await generateMetadata({
      params: Promise.resolve({ slug: 'openclaw-manus-codex-scaling-business' }),
    })

    expect(newPostMetadata.openGraph?.images).toEqual([
      {
        url: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770782009/Skier_xzs8az.png',
        width: 1200,
        height: 630,
        alt: 'openclaw, manus, and codex are scaling my business',
      },
    ])
  })
})

import * as blogPostRoute from '@/app/blog/[slug]/page'

/**
 * `revalidate` alone does not make a dynamic segment cacheable. Next only
 * honours it when the route also exports `generateStaticParams`; without it,
 * `/blog/<slug>` is classified as fully dynamic and every request re-reads and
 * re-compiles the MDX behind `Cache-Control: private, no-cache, no-store`.
 *
 * The export is intentionally empty — prerender nothing, but stay in the
 * static/ISR bucket. Deleting it looks harmless and silently drops blog
 * caching, so pin both halves of the contract here.
 */
describe('blog post ISR configuration', () => {
  it('declares an hourly revalidate window', () => {
    expect(blogPostRoute.revalidate).toBe(3600)
  })

  it('exports generateStaticParams so revalidate is actually honoured', () => {
    expect(typeof blogPostRoute.generateStaticParams).toBe('function')
  })

  it('prerenders no slugs at build time, keeping deployment output small', async () => {
    await expect(blogPostRoute.generateStaticParams()).resolves.toEqual([])
  })
})

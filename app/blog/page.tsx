import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Rss } from 'lucide-react'

import BlogFilterNavigationServer from '@/components/blog-filter-navigation-server'
import { BlogFeaturedCard, BlogGridCard, type BlogCardPost } from '@/components/blog/blog-post-cards'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Reveal } from '@/components/prism/reveal'
import { Eyebrow } from '@/components/prism/section'
import { CollectionPageSchema, ItemListSchema } from '@/components/schema-markup'
import { Button } from '@/components/ui/button'
import { getAllPosts } from '@/lib/mdx-data'
import {
  getBlogFilterFromCategory,
  normalizeBlogFilter,
  type BlogFilterBucket,
} from '@/lib/blog-topic-filters'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { firstSearchParamString, type SearchParamValue } from '@/lib/search-params'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Growth insights',
  description:
    'Practical lessons on websites, search, AI, ads, and local growth from real Prism work.',
  path: '/blog',
  ogImage: '/prism-opengraph.png',
})

const POSTS_PER_PAGE = 12

function buildPageUrl({
  category,
  page,
}: {
  category: string
  page: number
}) {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const search = params.toString()
  return search ? `/blog?${search}` : '/blog'
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{
    category?: SearchParamValue
    q?: SearchParamValue
    page?: SearchParamValue
  }>
}) {
  const resolvedSearchParams = await searchParams
  const rawCategory = firstSearchParamString(resolvedSearchParams?.category, 'all')
  const requestedPage = Number.parseInt(
    firstSearchParamString(resolvedSearchParams?.page, '1'),
    10,
  )

  const posts = await getAllPosts()
  if (!posts) notFound()

  const selectedCategory = normalizeBlogFilter(rawCategory.trim().toLowerCase())
  const topicPosts: BlogCardPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    image: post.image,
    topic: getBlogFilterFromCategory(post.category),
  }))

  const counts = topicPosts.reduce<Partial<Record<BlogFilterBucket, number>>>(
    (acc, post) => {
      acc[post.topic] = (acc[post.topic] ?? 0) + 1
      return acc
    },
    { all: topicPosts.length },
  )

  const filteredPosts = topicPosts.filter(
    (post) => selectedCategory === 'all' || post.topic === selectedCategory,
  )

  // The newest post in the current filter leads page one as a feature; the
  // grid pages through everything after it.
  const [featuredPost, ...restPosts] = filteredPosts
  const totalPages = Math.max(1, Math.ceil(restPosts.length / POSTS_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1
  const visiblePosts = restPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )
  const showFeatured = currentPage === 1 && Boolean(featuredPost)

  const blogItems = posts.slice(0, 10).map((post) => ({
    name: post.title,
    description: post.description,
    url: `https://www.design-prism.com/blog/${post.slug}`,
    itemType: 'BlogPosting',
  }))

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section
          aria-labelledby="blog-title"
          className="relative isolate overflow-x-clip pb-10 pt-14 sm:pb-14 sm:pt-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-x-0 top-0 h-[560px] opacity-50" />
            <div className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(40%_50%_at_25%_30%,oklch(0.66_0.16_258/18%),transparent_70%),radial-gradient(34%_44%_at_70%_35%,oklch(0.63_0.19_295/14%),transparent_70%)] blur-2xl" />
          </div>

          <div className="prism-container">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <Eyebrow className="prism-rise">The Prism journal</Eyebrow>
                <h1
                  id="blog-title"
                  className="prism-rise text-display text-gradient mt-5 max-w-[12ch] text-balance pb-2"
                >
                  notes from the work.
                </h1>
                <p className="prism-rise text-lead mt-5 max-w-[52ch] text-pretty text-muted-foreground">
                  Practical lessons on websites, search, AI, ads, and local growth, written from
                  real Prism projects and experiments.
                </p>
              </div>
              <div className="prism-rise flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <a href="/blog/feed.xml">
                    <Rss aria-hidden="true" />
                    RSS feed
                  </a>
                </Button>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  {posts.length} posts
                </span>
              </div>
            </div>

            <BlogFilterNavigationServer
              selectedCategory={selectedCategory}
              counts={counts}
              className="mt-10 border-t border-white/[0.08] pt-6 sm:mt-14"
            />
          </div>
        </section>

        <section aria-label="Posts" className="pb-8 sm:pb-12">
          <div className="prism-container">
            {showFeatured && featuredPost ? (
              <Reveal className="mb-6 sm:mb-8">
                <BlogFeaturedCard post={featuredPost} />
              </Reveal>
            ) : null}

            {visiblePosts.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {visiblePosts.map((post, index) => (
                  <li key={post.slug} className="min-w-0">
                    <BlogGridCard post={post} priority={!showFeatured && index < 3} />
                  </li>
                ))}
              </ul>
            ) : !showFeatured ? (
              <div className="rounded-3xl border border-white/[0.08] bg-card px-6 py-16 text-center">
                <h2 className="text-heading text-foreground">no writing here yet.</h2>
                <p className="mt-3 text-muted-foreground">Try another topic.</p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href="/blog">See every post</Link>
                </Button>
              </div>
            ) : null}

            {totalPages > 1 ? (
              <nav
                className="mt-12 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-8"
                aria-label="Blog pages"
              >
                {currentPage > 1 ? (
                  <Button asChild variant="outline">
                    <Link
                      href={buildPageUrl({ category: selectedCategory, page: currentPage - 1 })}
                      rel="prev"
                    >
                      <ArrowLeft aria-hidden="true" />
                      Newer
                    </Link>
                  </Button>
                ) : (
                  <span />
                )}
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages ? (
                  <Button asChild variant="outline">
                    <Link
                      href={buildPageUrl({ category: selectedCategory, page: currentPage + 1 })}
                      rel="next"
                    >
                      Older
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </div>
        </section>

        <FinalCta
          location="blog final cta"
          secondary={{ label: 'See the work', href: '/case-studies' }}
        />

        <CollectionPageSchema
          name="Prism Blog"
          description="Insights on web design, AI marketing, and growth systems for local businesses."
          url="https://www.design-prism.com/blog"
          isPartOfId="https://www.design-prism.com/#website"
        />
        <ItemListSchema name="Latest Prism blog posts" url="https://www.design-prism.com/blog" items={blogItems} />
      </main>
      <Footer />
    </div>
  )
}

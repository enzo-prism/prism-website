import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BlogFilterNavigationServer from '@/components/blog-filter-navigation-server'
import Navbar from '@/components/navbar'
import { CollectionPageSchema, ItemListSchema } from '@/components/schema-markup'
import { getAllPosts } from '@/lib/mdx-data'
import {
  getBlogFilterFromCategory,
  normalizeBlogFilter,
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

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function buildPageUrl({
  category,
  query,
  page,
}: {
  category: string
  query: string
  page: number
}) {
  const params = new URLSearchParams()
  if (category !== 'all') params.set('category', category)
  if (query.trim()) params.set('q', query.trim())
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
  const searchQuery = firstSearchParamString(resolvedSearchParams?.q)
  const requestedPage = Number.parseInt(
    firstSearchParamString(resolvedSearchParams?.page, '1'),
    10,
  )

  const posts = await getAllPosts()
  if (!posts) notFound()

  const selectedCategory = normalizeBlogFilter(rawCategory.trim().toLowerCase())
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredPosts = posts
    .map((post) => ({
      ...post,
      topic: getBlogFilterFromCategory(post.category),
    }))
    .filter((post) => {
      if (selectedCategory !== 'all' && post.topic !== selectedCategory) return false
      if (!normalizedQuery) return true
      return (
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.description.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery)
      )
    })

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )
  const blogItems = posts.slice(0, 10).map((post) => ({
    name: post.title,
    description: post.description,
    url: `https://www.design-prism.com/blog/${post.slug}`,
    itemType: 'BlogPosting',
  }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-20">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Prism blog
          </p>
          <h1 className="blog-display-title mt-4 text-balance">Ideas worth building on.</h1>
          <p className="blog-hero-subtitle mt-5 text-muted-foreground">
            Clear thinking on design, technology, and growth, drawn from the work.
          </p>
        </section>

        <BlogFilterNavigationServer
          selectedCategory={selectedCategory}
          query={searchQuery}
          className="mx-auto max-w-4xl"
        />

        <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8 sm:pb-32">
          {visiblePosts.length > 0 ? (
            <div className="border-t border-border/70">
              {visiblePosts.map((post) => (
                <article key={post.slug} className="border-b border-border/70 py-7 sm:py-9">
                  <Link
                    href={`/blog/${post.slug}`}
                    prefetch={false}
                    className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                      <span>{post.category}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={new Date(post.date).toISOString()}>{formatDate(post.date)}</time>
                    </div>
                    <h2 className="mt-3 max-w-[28ch] text-balance text-[1.45rem] font-semibold leading-[1.18] tracking-[-0.025em] transition-colors group-hover:text-muted-foreground sm:text-[1.8rem]">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-[68ch] text-[0.98rem] leading-7 text-muted-foreground sm:text-base">
                      {post.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="border-y border-border/70 py-16">
              <h2 className="text-xl font-semibold">No writing found.</h2>
              <p className="mt-2 text-muted-foreground">Try another topic or search.</p>
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="mt-10 flex items-center justify-between" aria-label="Blog pages">
              {currentPage > 1 ? (
                <Link
                  href={buildPageUrl({ category: selectedCategory, query: searchQuery, page: currentPage - 1 })}
                  className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
                >
                  ← Newer
                </Link>
              ) : <span />}
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {currentPage} / {totalPages}
              </span>
              {currentPage < totalPages ? (
                <Link
                  href={buildPageUrl({ category: selectedCategory, query: searchQuery, page: currentPage + 1 })}
                  className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
                >
                  Older →
                </Link>
              ) : <span />}
            </nav>
          ) : null}
        </section>

        <CollectionPageSchema
          name="Prism Blog"
          description="Insights on web design, AI marketing, and growth systems for local businesses."
          url="https://www.design-prism.com/blog"
          isPartOfId="https://www.design-prism.com/#website"
        />
        <ItemListSchema name="Latest Prism blog posts" url="https://www.design-prism.com/blog" items={blogItems} />
      </main>
    </div>
  )
}

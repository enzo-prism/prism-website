import { access } from 'node:fs/promises'
import path from 'node:path'

import BlogPostLayout from '@/components/blog-post-layout'
import type { BlogCardPost } from '@/components/blog/blog-post-cards'
import { estimateReadingMinutes } from '@/components/blog/blog-utils'
import { getBlogFilterFromCategory } from '@/lib/blog-topic-filters'
import { DEFAULT_BLOG_FEATURED_IMAGE } from '@/lib/blog-images'
import { getAllPosts, getPost } from '@/lib/mdx-data'
import { getMdxToc } from '@/lib/mdx-toc'
import { canonicalUrl } from '@/lib/canonical'
import { renderPost } from '@/lib/mdx'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  buildAbsoluteTitle,
  buildMinimalDescription,
} from '@/lib/seo/rules'
import {
  getOutboundLinkRulesForPost,
  type BlogOutboundLinkProfile,
} from '@/lib/blog-inline-link-rules'
import { injectOutboundLinks } from '@/lib/blog-inline-link-injector'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Render posts on-demand with ISR so deployment output does not balloon
// with one segment bundle per slug.
export const revalidate = 3600

/**
 * Deliberately empty: prerender nothing at build time, but still opt the route
 * into the static/ISR bucket.
 *
 * Without a `generateStaticParams` export at all, Next classifies `[slug]` as
 * fully dynamic and ignores the `revalidate` above — production answered every
 * post with `Cache-Control: private, no-cache, no-store` and re-read plus
 * re-compiled the MDX on each request. Returning `[]` keeps the deployment
 * output small (no per-slug segment bundle, which is the point of the comment
 * above) while restoring `s-maxage=3600, stale-while-revalidate` so the first
 * visitor generates a post and everyone after that gets a cache hit.
 */
export async function generateStaticParams() {
  return []
}

const formatReadableDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

async function getRelatedPosts(slug: string, category: string): Promise<BlogCardPost[]> {
  const posts = (await getAllPosts()) ?? []
  const topic = getBlogFilterFromCategory(category)
  const cards = posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      category: post.category,
      image: post.image,
      topic: getBlogFilterFromCategory(post.category),
    }))
  const sameTopic = cards.filter((post) => post.topic === topic)
  const others = cards.filter((post) => post.topic !== topic)
  return [...sameTopic, ...others].slice(0, 3)
}

type SocialImageCandidate = {
  url: string
  width?: number
  height?: number
  alt?: string
}

const normalizeSocialImageCandidate = (
  entry: unknown,
): SocialImageCandidate | null => {
  if (typeof entry === 'string') {
    const url = entry.trim()
    return url ? { url } : null
  }
  if (!entry || typeof entry !== 'object') return null
  const raw = entry as Record<string, unknown>
  if (typeof raw.url !== 'string' || !raw.url.trim()) return null
  return {
    url: raw.url.trim(),
    width: typeof raw.width === 'number' ? raw.width : undefined,
    height: typeof raw.height === 'number' ? raw.height : undefined,
    alt: typeof raw.alt === 'string' ? raw.alt : undefined,
  }
}

async function publicFileExists(localPath: string): Promise<boolean> {
  const clean = localPath.split(/[?#]/, 1)[0].replace(/^\/+/, '')
  if (!clean || clean.split('/').includes('..')) return false
  try {
    await access(path.join(process.cwd(), 'public', clean))
    return true
  } catch {
    return false
  }
}

/**
 * Social image precedence: explicit `socialImage`, then authored
 * `openGraph.images`, then the featured `image` when it is a real per-post
 * asset (not the shared fallback), then the site-wide default. Local files
 * must exist under public/; entries pointing at the deleted
 * /api/og/blog route are dead and skipped. External URLs pass through
 * untouched because canonicalUrl() rewrites any host to the site host.
 */
async function resolveSocialImage(frontmatter: {
  socialImage?: string
  socialImageAlt?: string
  title?: string
  image?: string
  openGraph?: Record<string, any>
}): Promise<{ url: string; width: number; height: number; alt: string }> {
  const candidates: SocialImageCandidate[] = []

  const explicit = normalizeSocialImageCandidate(frontmatter.socialImage)
  if (explicit) candidates.push({ ...explicit, alt: frontmatter.socialImageAlt })

  const authored = Array.isArray(frontmatter.openGraph?.images)
    ? frontmatter.openGraph.images
    : []
  for (const entry of authored) {
    const candidate = normalizeSocialImageCandidate(entry)
    if (candidate) candidates.push(candidate)
  }

  if (frontmatter.image && frontmatter.image !== DEFAULT_BLOG_FEATURED_IMAGE) {
    candidates.push({ url: frontmatter.image })
  }

  for (const candidate of candidates) {
    if (/^https?:\/\//i.test(candidate.url)) {
      return {
        url: candidate.url,
        width: candidate.width ?? 1200,
        height: candidate.height ?? 630,
        alt: candidate.alt || frontmatter.title || DEFAULT_OG_IMAGE_ALT,
      }
    }
    if (!candidate.url.startsWith('/')) continue
    if (candidate.url.startsWith('/api/og/blog/')) continue
    if (!(await publicFileExists(candidate.url))) continue
    return {
      url: canonicalUrl(candidate.url),
      width: candidate.width ?? 1200,
      height: candidate.height ?? 630,
      alt: candidate.alt || frontmatter.title || DEFAULT_OG_IMAGE_ALT,
    }
  }

  return {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: DEFAULT_OG_IMAGE_ALT,
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post

  const ogImages = [await resolveSocialImage(frontmatter)]
  const twitterImages = ogImages

  const canonical = canonicalUrl(frontmatter.canonical || `/blog/${slug}`)
  const seoTitle = buildAbsoluteTitle(frontmatter.seoTitle || frontmatter.title || 'Blog post')
  const seoDescription = buildMinimalDescription(
    frontmatter.seoTitle || frontmatter.title || 'Blog post',
    frontmatter.seoDescription || frontmatter.description,
  )

  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    openGraph: {
      ...frontmatter.openGraph,
      title: seoTitle,
      description: seoDescription,
      url: canonical,
      images: ogImages,
    },
    twitter: {
      ...frontmatter.twitter,
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: twitterImages,
    },
    alternates: {
      canonical,
      // Advertise the clean, LLM-readable markdown source so AI answer engines
      // can ingest the post text without parsing the full HTML page.
      types: {
        "text/markdown": [
          {
            url: canonicalUrl(`/api/blog/${slug}/markdown`),
            title: `${frontmatter.title} (Markdown)`,
          },
        ],
      },
    },
    robots:
      frontmatter.searchVisibility === "noindex"
        ? { index: false, follow: true }
        : { index: true, follow: true },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post
  const outboundProfile: BlogOutboundLinkProfile =
    getOutboundLinkRulesForPost({
      slug,
      category: frontmatter.category,
      title: frontmatter.title,
      content: post.content,
    })
  const enrichedContent = injectOutboundLinks(post.content, outboundProfile)
  const updatedDate = frontmatter.openGraph?.modifiedTime
  const publishedDate = frontmatter.openGraph?.publishedTime || frontmatter.date
  const content = await renderPost(slug, { content: enrichedContent })
  const [toc, related] = await Promise.all([
    getMdxToc(post.content).catch(() => []),
    getRelatedPosts(slug, frontmatter.category),
  ])
  return (
    <BlogPostLayout
      slug={slug}
      title={frontmatter.title}
      h1Title={frontmatter.h1Title}
      author={frontmatter.author}
      description={frontmatter.description}
      date={frontmatter.date}
      publishedDate={formatReadableDate(publishedDate)}
      updatedDate={updatedDate ? formatReadableDate(updatedDate) : undefined}
      image={frontmatter.image}
      category={frontmatter.category}
      readingMinutes={estimateReadingMinutes(post.content)}
      toc={toc}
      related={related}
      openGraph={frontmatter.openGraph}
      canonical={canonicalUrl(frontmatter.canonical || `/blog/${slug}`)}
      howTo={frontmatter.howTo}
    >
      {content}
    </BlogPostLayout>
  )
}

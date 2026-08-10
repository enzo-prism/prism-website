import BlogPostLayout from '@/components/blog-post-layout'
import { getPost } from '@/lib/mdx-data'
import { getBlogOpenGraphImage } from '@/lib/blog-images'
import { canonicalUrl } from '@/lib/canonical'
import { renderPost } from '@/lib/mdx'
import { buildAbsoluteTitle, buildMinimalDescription } from '@/lib/seo/rules'
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

const WORDS_PER_MINUTE = 225

const formatReadableDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/#+\s+/g, " ")
    .replace(/[`*_>{}/[\]().,:;]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const estimateReadingMinutes = (content: string) => {
  if (!content) return 1
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean)
  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post

  const base =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://www.design-prism.com'
  const datedOpenGraphImage = getBlogOpenGraphImage(
    frontmatter.date,
    frontmatter.image,
    base,
  )
  const ogImages = [
    {
      url: datedOpenGraphImage,
      width: 1200,
      height: 630,
      alt: frontmatter.title,
    },
  ]
  // Twitter must advertise the same image the OG policy selects; frontmatter
  // image lists are intentionally overridden by the dated OG image system.
  const twitterImages = [datedOpenGraphImage]

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
            url: `${base}/api/blog/${slug}/markdown`,
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
  const readingTimeMinutes = estimateReadingMinutes(post.content)
  const updatedDate = frontmatter.openGraph?.modifiedTime
  const publishedDate = frontmatter.openGraph?.publishedTime || frontmatter.date
  const content = await renderPost(slug, { content: enrichedContent })
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
      readingTimeMinutes={readingTimeMinutes}
      category={frontmatter.category}
      image={frontmatter.image}
      openGraph={frontmatter.openGraph}
      canonical={frontmatter.canonical}
      howTo={frontmatter.howTo}
    >
      {content}
    </BlogPostLayout>
  )
}

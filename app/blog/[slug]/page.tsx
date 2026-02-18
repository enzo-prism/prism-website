import BlogPostLayout from '@/components/blog-post-layout'
import BlogEmailSignup from '@/components/blog-email-signup'
import { getAllPosts, getPost } from '@/lib/mdx-data'
import { getBlogOpenGraphImage } from '@/lib/blog-images'
import { canonicalUrl } from '@/lib/canonical'
import { renderPost } from '@/lib/mdx'
import { getMdxToc } from '@/lib/mdx-toc'
import { getPrismImpactForPost } from '@/lib/prism-blog-impact'
import { buildAbsoluteTitle, normalizeDescription } from '@/lib/seo/rules'
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

export const dynamicParams = false

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

function deriveTakeawaysFromToc(toc: Array<{ id: string; label: string; level: number }>) {
  return toc
    .filter((item) => item.level === 2)
    .map((item) => item.label.trim())
    .filter(Boolean)
    .slice(0, 4)
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  if (!posts) return []
  return posts.map((post) => ({ slug: post.slug }))
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
  const frontmatterOpenGraphImages = frontmatter.openGraph?.images
  const normalizedOpenGraphImages = Array.isArray(frontmatterOpenGraphImages)
    ? frontmatterOpenGraphImages
    : frontmatterOpenGraphImages
      ? [frontmatterOpenGraphImages]
      : []
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
  const frontmatterTwitterImages = frontmatter.twitter?.images
  const normalizedTwitterImages = Array.isArray(frontmatterTwitterImages)
    ? frontmatterTwitterImages
    : frontmatterTwitterImages
      ? [frontmatterTwitterImages]
      : []
  const openGraphImageUrls = normalizedOpenGraphImages
    .map((image) => (typeof image === 'string' ? image : image?.url))
    .filter(Boolean)
  const twitterImages =
    normalizedTwitterImages.length > 0
      ? normalizedTwitterImages
      : openGraphImageUrls.length > 0
        ? openGraphImageUrls
        : [datedOpenGraphImage]

  const canonical = canonicalUrl(frontmatter.canonical || `/blog/${slug}`)
  const seoTitle = buildAbsoluteTitle(frontmatter.seoTitle || frontmatter.title || 'Blog post')
  const seoDescription = normalizeDescription(
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
    alternates: { canonical },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post
  const toc = await getMdxToc(post.content)
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
  const allPosts = (await getAllPosts()) ?? []
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const keyTakeaways = deriveTakeawaysFromToc(toc)
  const prismImpact = getPrismImpactForPost({
    slug,
    category: frontmatter.category,
    content: post.content,
  })

  const prioritized = [
    ...relatedPosts.filter((p) => p.categorySlug === frontmatter.categorySlug),
    ...relatedPosts.filter((p) => p.categorySlug !== frontmatter.categorySlug),
  ]

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
      relatedPosts={prioritized.slice(0, 3)}
      toc={toc}
      howTo={frontmatter.howTo}
      keyTakeaways={keyTakeaways}
      prismImpact={prismImpact ?? undefined}
    >
      {content}
      <div className="mt-16">
        <BlogEmailSignup />
      </div>
    </BlogPostLayout>
  )
}

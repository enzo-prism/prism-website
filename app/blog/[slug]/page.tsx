import BlogPostLayout from '@/components/blog-post-layout'
import BlogEmailSignup from "@/components/blog-email-signup"
import { getAllPosts, getPost } from "@/lib/mdx-data"
import { renderPost } from "@/lib/mdx"
import { getMdxToc } from "@/lib/mdx-toc"
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  if (!posts) return []
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post
  
  // Prefer explicit OG images from frontmatter; fall back to dynamic generator.
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.design-prism.com'
  const frontmatterOpenGraphImages = frontmatter.openGraph?.images
  const normalizedOpenGraphImages = Array.isArray(frontmatterOpenGraphImages)
    ? frontmatterOpenGraphImages
    : frontmatterOpenGraphImages
      ? [frontmatterOpenGraphImages]
      : []
  const hasCustomOpenGraphImages = normalizedOpenGraphImages.length > 0
  const fallbackOgImage = `${base}/api/og/blog/${slug}`
  const ogImages = hasCustomOpenGraphImages
    ? normalizedOpenGraphImages
    : [
        {
          url: fallbackOgImage,
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
    .map(image => (typeof image === "string" ? image : image?.url))
    .filter(Boolean)
  const twitterImages =
    normalizedTwitterImages.length > 0
      ? normalizedTwitterImages
      : openGraphImageUrls.length > 0
        ? openGraphImageUrls
        : [fallbackOgImage]
  
  // Normalize canonical to www host regardless of frontmatter
  let canonicalUrl: string
  try {
    const u = new URL(frontmatter.canonical || `${base}/blog/${slug}`)
    u.hostname = 'www.design-prism.com'
    canonicalUrl = u.toString()
  } catch {
    canonicalUrl = `${base}/blog/${slug}`
  }

  // Compute concise SEO title (avoid layout template and long strings)
  const maxTitleLength = 60
  const rawTitle = frontmatter.title || "Blog post"
  const brandSuffix = " | prism"
  const seoTitle =
    rawTitle.length + brandSuffix.length <= maxTitleLength
      ? `${rawTitle}${brandSuffix}`
      : rawTitle.length > maxTitleLength
        ? `${rawTitle.slice(0, maxTitleLength - 1)}…`
        : rawTitle

  return {
    title: { absolute: seoTitle },
    description: frontmatter.description,
    openGraph: {
      ...frontmatter.openGraph,
      url: canonicalUrl,
      images: ogImages,
    },
    twitter: {
      ...frontmatter.twitter,
      images: twitterImages,
    },
    alternates: { canonical: canonicalUrl },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post
  const toc = await getMdxToc(post.content)
  const content = await renderPost(slug)
  const allPosts = (await getAllPosts()) ?? []
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
      category={frontmatter.category}
      gradientClass={frontmatter.gradientClass}
      image={frontmatter.image}
      showHeroImage={frontmatter.showHeroImage}
      openGraph={frontmatter.openGraph}
      canonical={frontmatter.canonical}
      relatedPosts={prioritized.slice(0, 3)}
      toc={toc}
      howTo={frontmatter.howTo}
    >
      {content}
      <div className="mt-16">
        <BlogEmailSignup />
      </div>
    </BlogPostLayout>
  )
}

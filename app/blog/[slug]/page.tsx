import BlogPostLayout from '@/components/blog-post-layout'
import { getAllPosts, getPost, renderPost } from '@/lib/mdx'
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
  
  // Use dynamic OG image if gradientClass is available
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.design-prism.com'
  const ogImage = frontmatter.gradientClass
    ? `${base}/api/og/blog/${slug}`
    : frontmatter.openGraph?.images?.[0]?.url || frontmatter.image
  
  // Normalize canonical to www host regardless of frontmatter
  let canonicalUrl: string
  try {
    const u = new URL(frontmatter.canonical || `${base}/blog/${slug}`)
    u.hostname = 'www.design-prism.com'
    canonicalUrl = u.toString()
  } catch {
    canonicalUrl = `${base}/blog/${slug}`
  }

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      ...frontmatter.openGraph,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.openGraph?.images?.[0]?.alt || frontmatter.title,
        },
      ],
    },
    twitter: {
      ...frontmatter.twitter,
      images: [ogImage],
    },
    alternates: { canonical: canonicalUrl },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { frontmatter } = post
  const content = await renderPost(slug)
  return (
    <BlogPostLayout
      slug={slug}
      title={frontmatter.title}
      description={frontmatter.description}
      date={frontmatter.date}
      category={frontmatter.category}
      gradientClass={frontmatter.gradientClass}
      image={frontmatter.image}
      openGraph={frontmatter.openGraph}
      canonical={frontmatter.canonical}
    >
      {content}
    </BlogPostLayout>
  )
}

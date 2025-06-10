import type { Metadata } from 'next'
import BlogPostLayout from '@/components/blog-post-layout'
import { getAllPosts, getPost, renderPost } from '@/lib/mdx'
import { notFound } from 'next/navigation'

interface PageProps { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  if (!posts) return []
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) notFound()
  const { frontmatter } = post
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: frontmatter.openGraph,
    twitter: frontmatter.twitter,
    alternates: { canonical: frontmatter.canonical },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  const { frontmatter } = post
  const content = await renderPost(params.slug)
  return (
    <BlogPostLayout
      slug={params.slug}
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

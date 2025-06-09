import type { Metadata } from 'next'
import BlogPostLayout from '@/components/blog-post-layout'
import { getPost, renderPost } from '@/lib/mdx'

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { frontmatter } = await getPost(params.slug)
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: frontmatter.openGraph,
    twitter: frontmatter.twitter,
    alternates: { canonical: frontmatter.canonical },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { frontmatter } = await getPost(params.slug)
  const content = await renderPost(params.slug)
  return (
    <BlogPostLayout frontmatter={frontmatter} slug={params.slug}>
      {content}
    </BlogPostLayout>
  )
}

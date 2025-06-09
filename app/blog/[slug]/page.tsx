import type { Metadata } from 'next'
import BlogPostLayout from '@/components/blog-post-layout'
import { getAllPosts, getPost, renderPost } from '@/lib/mdx'

interface PageProps { params: { slug: string } }

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

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

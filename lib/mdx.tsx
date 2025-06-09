import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  image: string
  gradientClass: string
  openGraph?: any
  twitter?: any
  canonical?: string
}

const BLOG_PATH = path.join(process.cwd(), 'content', 'blog')

export async function getPost(slug: string) {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  const raw = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { frontmatter: data as BlogFrontmatter, content }
}

export async function getAllPosts() {
  const files = await fs.readdir(BLOG_PATH)
  const posts = await Promise.all(
    files.filter(f => f.endsWith('.mdx')).map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const { frontmatter } = await getPost(slug)
      return { slug, ...frontmatter }
    })
  )
  // sort by date desc
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function renderPost(slug: string) {
  const { content } = await getPost(slug)
  return <MDXRemote source={content} />
}

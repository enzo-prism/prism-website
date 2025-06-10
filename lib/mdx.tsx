import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { cache } from 'react'

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

async function _getPost(slug: string) {
  try {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
    const raw = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(raw)
    return { frontmatter: data as BlogFrontmatter, content }
  } catch (err) {
    console.error(err)
    return null
  }
}

async function _getAllPosts() {
  try {
    const files = await fs.readdir(BLOG_PATH)
    const posts = await Promise.all(
      files
        .filter(f => f.endsWith('.mdx'))
        .map(async file => {
          const slug = file.replace(/\.mdx$/, '')
          const post = await _getPost(slug)
          return post ? { slug, ...post.frontmatter } : null
        })
    )
    const validPosts = posts.filter(Boolean) as Array<{ slug: string } & BlogFrontmatter>
    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getPost = cache(_getPost)
export const getAllPosts = cache(_getAllPosts)

export async function renderPost(slug: string) {
  const post = await getPost(slug)
  if (!post) throw new Error(`Post "${slug}" not found`)
  return <MDXRemote source={post.content} />
}

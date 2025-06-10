// This module is server-side only, responsible for fetching and parsing blog content.
import "server-only"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { micromark } from "micromark" // Using a simpler markdown parser as a workaround

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  image: string
  gradientClass: string
  openGraph?: Record<string, any>
  twitter?: Record<string, any>
  canonical?: string
}

const BLOG_PATH = "content/blog"

/**
 * Fetches and parses a single blog post by its slug. Server-side only.
 */
async function _getPost(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  try {
    const rawFileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(rawFileContent)
    return { frontmatter: data as BlogFrontmatter, content }
  } catch (error) {
    console.error(`[MDXLib] Failed to get post "${slug}":`, error)
    return null
  }
}

/**
 * Fetches and parses all blog posts. Server-side only.
 */
async function _getAllPosts(): Promise<Array<{ slug: string } & BlogFrontmatter> | null> {
  try {
    const files = await fs.readdir(BLOG_PATH)
    const mdxFiles = files.filter((fileName) => fileName.endsWith(".mdx"))

    if (mdxFiles.length === 0) {
      return []
    }

    const postsData = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const post = await getPost(slug)
        return post ? { slug, ...post.frontmatter } : null
      }),
    )

    const validPosts = postsData.filter(Boolean) as Array<{ slug: string } & BlogFrontmatter>
    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`[MDXLib] Failed to get all posts:`, error)
    return null
  }
}

export const getPost = _getPost
export const getAllPosts = _getAllPosts

/**
 * Renders a blog post's content as HTML.
 * This is a workaround to avoid the 'astring' error from next-mdx-remote.
 * NOTE: This will not render JSX components inside .mdx files.
 */
export async function renderPost(slug: string) {
  const post = await getPost(slug)

  if (!post || typeof post.content !== "string") {
    throw new Error(`Post "${slug}" not found or content is invalid.`)
  }

  // Convert markdown content to an HTML string.
  const htmlContent = micromark(post.content)

  // Render the HTML content. The wrapping div can be styled as needed.
  return <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

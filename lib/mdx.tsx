// This module is server-side only, responsible for fetching and parsing blog content.
import "server-only" // Ensures this module only runs on the server
import React from "react"
import fs from "fs/promises" // Node.js file system module for server-side operations
import path from "path" // Node.js path module for server-side path manipulation
import matter from "gray-matter" // For parsing frontmatter from .mdx files
import { MDXRemote } from "next-mdx-remote"

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

const BLOG_PATH = "content/blog" // Relative path to blog content

/**
 * Fetches and parses a single blog post by its slug. Server-side only.
 */
async function _getPost(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  // Construct the full path to the .mdx file on the server
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  try {
    // Read the file content using fs.readFile (server-side)
    const rawFileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(rawFileContent)
    return { frontmatter: data as BlogFrontmatter, content }
  } catch (error) {
    console.error(`[MDXLib] Failed to get post "${slug}" from "${filePath}":`, error)
    return null
  }
}

/**
 * Fetches and parses all blog posts. Server-side only.
 */
async function _getAllPosts(): Promise<Array<{ slug: string } & BlogFrontmatter> | null> {
  try {
    // Read the list of files in the blog directory (server-side)
    const files = await fs.readdir(BLOG_PATH)
    const mdxFiles = files.filter((fileName) => fileName.endsWith(".mdx"))

    if (mdxFiles.length === 0) {
      console.warn(`[MDXLib] No .mdx files found in ${BLOG_PATH}`)
      return []
    }

    const postsData = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const post = await getPost(slug) // Uses the un-cached version
        return post ? { slug, ...post.frontmatter } : null
      }),
    )

    const validPosts = postsData.filter(Boolean) as Array<{ slug: string } & BlogFrontmatter>

    if (validPosts.length === 0 && mdxFiles.length > 0) {
      console.warn(
        `[MDXLib] MDX files were found in ${BLOG_PATH}, but no valid posts could be processed. Check _getPost errors above.`,
      )
    }

    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`[MDXLib] Failed to get all posts from "${BLOG_PATH}":`, error)
    return null
  }
}

export const getPost = _getPost
export const getAllPosts = _getAllPosts

/**
 * Prepares the raw HTML-like content from the .mdx file for rendering.
 * This function returns a React element that uses dangerouslySetInnerHTML
 * to render the HTML content from the post.
 */
export async function renderPost(slug: string) {
  const post = await getPost(slug) // This function relies on fs operations

  if (!post || typeof post.content !== "string") {
    console.error(`[MDXLib] Post "${slug}" not found or content is invalid for renderPost.`)
    throw new Error(`Post "${slug}" not found or content is invalid.`)
  }

  // The post.content is the string directly from the .mdx file (after frontmatter).
  // This string contains HTML tags with Tailwind classes.
  let cleanedContent = post.content
  
  // Remove import statements which are not valid in HTML
  cleanedContent = cleanedContent.replace(/^import\s+.*$/gm, '')
  
  // Remove trailing ``` if present
  if (cleanedContent.trimEnd().endsWith("```")) {
    cleanedContent = cleanedContent.substring(0, cleanedContent.lastIndexOf("```"))
  }
  
  // Trim any leading/trailing whitespace
  cleanedContent = cleanedContent.trim()
  
  return <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
}

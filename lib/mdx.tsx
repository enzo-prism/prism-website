// This module is server-side only, responsible for fetching and parsing blog content.
import "server-only" // Ensures this module only runs on the server
import React from "react"
import fs from "fs/promises" // Node.js file system module for server-side operations
import path from "path" // Node.js path module for server-side path manipulation
import matter from "gray-matter" // For parsing frontmatter from .mdx files
import { MDXRemote } from "next-mdx-remote/rsc"
import { compile } from "@mdx-js/mdx"

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

// Cache for processed blog posts
const postsCache = new Map<string, { frontmatter: BlogFrontmatter; content: string }>()
const allPostsCache = new Map<string, Array<{ slug: string } & BlogFrontmatter>>()

// Cache TTL (1 hour in production, 1 minute in development)
const CACHE_TTL = process.env.NODE_ENV === 'production' ? 60 * 60 * 1000 : 60 * 1000
let lastCacheTime = 0

const BLOG_PATH = "content/blog" // Relative path to blog content

/**
 * Fetches and parses a single blog post by its slug with caching. Server-side only.
 */
async function _getPost(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  // Check cache first
  const cached = postsCache.get(slug)
  if (cached && (Date.now() - lastCacheTime) < CACHE_TTL) {
    return cached
  }

  // Construct the full path to the .mdx file on the server
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  try {
    // Read the file content using fs.readFile (server-side)
    const rawFileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(rawFileContent)
    const result = { frontmatter: data as BlogFrontmatter, content }
    
    // Cache the result
    postsCache.set(slug, result)
    
    return result
  } catch (error) {
    console.error(`[MDXLib] Failed to get post "${slug}" from "${filePath}":`, error)
    return null
  }
}

/**
 * Fetches and parses all blog posts with caching. Server-side only.
 */
async function _getAllPosts(): Promise<Array<{ slug: string } & BlogFrontmatter> | null> {
  // Check cache first
  const cacheKey = 'all-posts'
  const cached = allPostsCache.get(cacheKey)
  if (cached && (Date.now() - lastCacheTime) < CACHE_TTL) {
    return cached
  }

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
        const post = await getPost(slug) // Uses the cached version
        return post ? { slug, ...post.frontmatter } : null
      }),
    )

    const validPosts = postsData.filter(Boolean) as Array<{ slug: string } & BlogFrontmatter>

    if (validPosts.length === 0 && mdxFiles.length > 0) {
      console.warn(
        `[MDXLib] MDX files were found in ${BLOG_PATH}, but no valid posts could be processed. Check _getPost errors above.`,
      )
    }

    const sortedPosts = validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Cache the result and update timestamp
    allPostsCache.set(cacheKey, sortedPosts)
    lastCacheTime = Date.now()
    
    return sortedPosts
  } catch (error) {
    console.error(`[MDXLib] Failed to get all posts from "${BLOG_PATH}":`, error)
    return null
  }
}

// Cache management utilities
export function clearBlogCache() {
  postsCache.clear()
  allPostsCache.clear()
  lastCacheTime = 0
  console.log('[MDXLib] Blog cache cleared')
}

export function getBlogCacheStats() {
  return {
    postsInCache: postsCache.size,
    allPostsCached: allPostsCache.size > 0,
    lastCacheTime: new Date(lastCacheTime).toISOString(),
    cacheAge: Date.now() - lastCacheTime
  }
}

export const getPost = _getPost
export const getAllPosts = _getAllPosts

// Custom components for MDX rendering
const mdxComponents = {
  // Preserve YouTube video embeds with proper security
  YouTubeVideoEmbed: ({ videoId, title, className = "" }: { videoId: string; title: string; className?: string }) => {
    const containerClass = `relative overflow-hidden rounded-xl shadow-md ${className}`.trim()
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    
    return (
      <div 
        className={containerClass} 
        style={{ paddingBottom: '56.25%' }} 
        data-youtube-embed={videoId} 
        data-youtube-title={title}
      >
        <div className="youtube-thumbnail absolute inset-0 cursor-pointer">
          <img 
            src={thumbnailUrl} 
            alt={`${title} - Video thumbnail`} 
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-red-600 bg-opacity-90 p-4 shadow-lg hover:scale-110 transition-transform">
              <svg className="h-8 w-8 text-white ml-1" fill="white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  },
  // Override potentially dangerous HTML elements
  script: () => null, // Block script tags
  iframe: ({ src, title, ...props }: any) => {
    // Only allow YouTube and other trusted domains
    const allowedDomains = ['youtube.com', 'youtube-nocookie.com', 'vimeo.com']
    const url = new URL(src || '')
    if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
      return null
    }
    return <iframe src={src} title={title} {...props} />
  }
}

/**
 * Safely renders MDX content using next-mdx-remote/rsc
 * This replaces the dangerous dangerouslySetInnerHTML approach
 */
export async function renderPost(slug: string) {
  const post = await getPost(slug)

  if (!post || typeof post.content !== "string") {
    console.error(`[MDXLib] Post "${slug}" not found or content is invalid for renderPost.`)
    throw new Error(`Post "${slug}" not found or content is invalid.`)
  }

  try {
    // Use MDXRemote for secure rendering
    return (
      <MDXRemote 
        source={post.content}
        components={mdxComponents}
        options={{
          parseFrontmatter: false, // We already parsed it
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
            development: process.env.NODE_ENV === 'development'
          }
        }}
      />
    )
  } catch (error) {
    console.error(`[MDXLib] Failed to render MDX content for post "${slug}":`, error)
    throw new Error(`Failed to render blog post "${slug}". Please check the MDX syntax.`)
  }
}

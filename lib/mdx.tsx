// This module is server-side only, responsible for fetching and parsing blog content.
import "server-only" // Ensures this module only runs on the server
import React from "react"
import fs from "fs/promises" // Node.js file system module for server-side operations
import path from "path" // Node.js path module for server-side path manipulation
import matter from "gray-matter" // For parsing frontmatter from .mdx files
import { MDXRemote } from "next-mdx-remote/rsc"

// Import blog components
import AITrafficDeclineChart from '@/components/blog/ai-traffic-decline-chart'
import AITrafficDistributionChart from '@/components/blog/ai-traffic-distribution-chart'
import AISearchComparison from '@/components/blog/ai-search-comparison'
import StrategyTimelineChart from '@/components/blog/strategy-timeline-chart'
import BrandTaglineGenerator from '@/components/blog/brand-tagline-generator'
import AIMentionTracker from '@/components/blog/ai-mention-tracker'
import StrategyCard from '@/components/blog/strategy-card'

// Import mobile components for MDX
import { MobileHeroCard } from '@/components/mobile/MobileHeroCard'
import { MobileStatCard } from '@/components/mobile/MobileStatCard'
import { MobileStrategyCard } from '@/components/mobile/MobileStrategyCard'
import { MobileInfoCard } from '@/components/mobile/MobileInfoCard'
import { MobileContentSection, MobileParagraph, MobileList, MobileHeading } from '@/components/mobile/MobileContentSection'
import { MobileSectionDivider } from '@/components/mobile/MobileSectionDivider'
import { MobileInteractiveWidget } from '@/components/mobile/MobileInteractiveWidget'

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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
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
  // Simple YouTube embed for MDX content
  YouTubeVideoEmbed: ({ videoId, title, className = "" }: { videoId: string; title: string; className?: string }) => {
    return (
      <div 
        className={`relative w-full ${className}`} 
        style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl border-0"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  },
  // Blog post interactive components
  AITrafficDeclineChart,
  AITrafficDistributionChart,
  AISearchComparison,
  StrategyTimelineChart,
  BrandTaglineGenerator,
  AIMentionTracker,
  StrategyCard,
  // Mobile components for blog content
  MobileHeroCard,
  MobileStatCard,
  MobileStrategyCard,
  MobileInfoCard,
  MobileContentSection,
  MobileParagraph,
  MobileList,
  MobileHeading,
  MobileSectionDivider,
  MobileInteractiveWidget,
  // Override potentially dangerous HTML elements
  script: () => null, // Block script tags
  iframe: ({ src, title, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement>) => {
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
            development: process.env.NODE_ENV === 'development',
            // More forgiving JSX parsing
            jsxImportSource: 'react'
          }
        }}
      />
    )
  } catch (error: unknown) {
    console.error(`[MDXLib] Failed to render MDX content for post "${slug}":`, error)
    
    // In development, show detailed error
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="prose-blog">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8">
            <h3 className="text-lg font-semibold text-red-900 mb-2">MDX Rendering Error</h3>
            <p className="text-red-700 mb-4">Failed to render blog post "{slug}"</p>
            <details>
              <summary className="cursor-pointer font-medium text-red-800">Error Details</summary>
              <pre className="mt-2 text-sm text-red-600 overflow-auto">{error instanceof Error ? error.message : String(error)}</pre>
            </details>
          </div>
        </div>
      )
    }
    
    throw new Error(`Failed to render blog post "${slug}". Please check the MDX syntax.`)
  }
}

// This module is server-side only, responsible for fetching and parsing blog content.
import { VideoObjectSchema } from '@/components/schema-markup';
import fs from "fs/promises"; // Node.js file system module for server-side operations
import matter from "gray-matter"; // For parsing frontmatter from .mdx files
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import path from "path"; // Node.js path module for server-side path manipulation
import React from "react";
import "server-only"; // Ensures this module only runs on the server

// Import blog components
import AIMentionTracker from '@/components/blog/ai-mention-tracker';
import AISearchComparison from '@/components/blog/ai-search-comparison';
import AITrafficDeclineChart from '@/components/blog/ai-traffic-decline-chart';
import AITrafficDistributionChart from '@/components/blog/ai-traffic-distribution-chart';
import BrandTaglineGenerator from '@/components/blog/brand-tagline-generator';
import StrategyCard from '@/components/blog/strategy-card';
import StrategyTimelineChart from '@/components/blog/strategy-timeline-chart';

// Import mobile components for MDX
import { MobileContentSection, MobileHeading, MobileList, MobileParagraph } from '@/components/mobile/MobileContentSection';
import { MobileHeroCard } from '@/components/mobile/MobileHeroCard';
import { MobileInfoCard } from '@/components/mobile/MobileInfoCard';
import { MobileInteractiveWidget } from '@/components/mobile/MobileInteractiveWidget';
import { MobileSectionDivider } from '@/components/mobile/MobileSectionDivider';
import { MobileStatCard } from '@/components/mobile/MobileStatCard';
import { MobileStrategyCard } from '@/components/mobile/MobileStrategyCard';

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  image?: string
  gradientClass: string
  openGraph?: Record<string, any>
  twitter?: Record<string, any>
  canonical?: string
}

const BLOG_PATH = "content/blog"

async function getPost(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  try {
    const rawFileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(rawFileContent)
    
    // Validate required fields
    if (!data.title || !data.description || !data.date || !data.category) {
      console.error(`[MDXLib] Post "${slug}" missing required fields:`, {
        title: !!data.title,
        description: !!data.description,
        date: !!data.date,
        category: !!data.category
      })
      return null
    }
    
    // Provide fallback for optional fields
    const frontmatter: BlogFrontmatter = {
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      image: data.image, // No fallback - let the layout component handle missing images
      gradientClass: data.gradientClass || 'bg-gradient-to-br from-blue-300/30 via-purple-300/30 to-pink-300/30',
      openGraph: data.openGraph,
      twitter: data.twitter,
      canonical: data.canonical
    }
    
    return { frontmatter, content }
  } catch (error: unknown) {
    console.error(`[MDXLib] Failed to get post "${slug}" from "${filePath}":`, error)
    return null
  }
}

async function getAllPosts(): Promise<Array<{ slug: string } & BlogFrontmatter> | null> {
  try {
    const files = await fs.readdir(BLOG_PATH)
    const mdxFiles = files.filter((fileName) => fileName.endsWith(".mdx"))
    if (mdxFiles.length === 0) {
      console.warn(`[MDXLib] No .mdx files found in ${BLOG_PATH}`)
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
    if (validPosts.length === 0 && mdxFiles.length > 0) {
      console.warn(
        `[MDXLib] MDX files were found in ${BLOG_PATH}, but no valid posts could be processed. Check getPost errors above.`,
      )
    }
    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error: unknown) {
    console.error(`[MDXLib] Failed to get all posts from "${BLOG_PATH}":`, error)
    return null
  }
}

export { getAllPosts, getPost };

// Custom components for MDX rendering
const mdxComponents = {
  // Next.js Image component for optimized images
  Image,
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
  // Structured data components
  VideoObjectSchema,
  // Override potentially dangerous HTML elements
  script: () => null, // Block script tags
  iframe: ({ src, title, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement>) => {
    // Only allow YouTube and other trusted domains
    const allowedDomains = ['youtube.com', 'youtube-nocookie.com', 'vimeo.com']
    const url = new URL(src || '')
    if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
      return null
    }
    return <iframe src={src} title={title} allowFullScreen {...props} />
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

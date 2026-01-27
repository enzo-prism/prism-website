// This module is server-side only, responsible for fetching and parsing blog content.
import { FAQSchema, VideoObjectSchema } from "@/components/schema-markup"
import MDXComponents from "@/components/mdx-components"
import { getPost } from "@/lib/mdx-data"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import React from "react"
import "server-only"

// Import blog components
import AIMentionTracker from '@/components/blog/ai-mention-tracker';
import AISearchComparison from '@/components/blog/ai-search-comparison';
import BrandTaglineGenerator from '@/components/blog/brand-tagline-generator';
import StrategyCard from '@/components/blog/strategy-card';
import AITrafficDeclineChart from "@/components/blog/ai-traffic-decline-chart-lazy"
import AITrafficDistributionChart from "@/components/blog/ai-traffic-distribution-chart-lazy"
import StrategyTimelineChart from "@/components/blog/strategy-timeline-chart-lazy"

// Import mobile components for MDX
import { MobileContentSection, MobileHeading, MobileList, MobileParagraph } from '@/components/mobile/MobileContentSection';
import { MobileHeroCard } from '@/components/mobile/MobileHeroCard';
import { MobileInfoCard } from '@/components/mobile/MobileInfoCard';
import { MobileInteractiveWidget } from '@/components/mobile/MobileInteractiveWidget';
import { MobileSectionDivider } from '@/components/mobile/MobileSectionDivider';
import { MobileStatCard } from '@/components/mobile/MobileStatCard';
import { MobileStrategyCard } from '@/components/mobile/MobileStrategyCard';

export type { BlogFrontmatter } from "@/lib/mdx-data"

// Custom components for MDX rendering
const mdxComponents = {
  ...MDXComponents,
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
  FAQSchema,
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
    const { default: rehypeSlug } = await import("rehype-slug")
    // Use MDXRemote for secure rendering
    return (
      <MDXRemote 
        source={post.content}
        components={mdxComponents}
        options={{
          parseFrontmatter: false, // We already parsed it
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [rehypeSlug],
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

"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { BlogPostSchema } from "@/components/schema-markup"
import { cn } from "@/lib/utils"
import CoreImage from "@/components/core-image"
import { BlogPostErrorBoundary } from "@/components/blog-error-boundary"
import AnimatedBlogWrapper from "@/components/blog/animated-blog-wrapper"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface Props {
  children: React.ReactNode
  slug: string
  title: string
  description: string
  date: string
  category: string
  gradientClass?: string
  image?: string
  openGraph?: {
    type?: string
    title?: string
    description?: string
    url?: string
    image?: string
    siteName?: string
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
  }
  canonical?: string
}

export default function BlogPostLayout({
  children,
  slug,
  title,
  description,
  date,
  category,
  gradientClass,
  image,
  openGraph,
  canonical,
}: Props) {
  const isMobile = useMobile()
  const effectiveGradient = gradientClass || 'bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-pink-300/30';
  const effectiveImageUrl = image ? `https://design-prism.com${image}` : 'https://design-prism.com/prism-opengraph.png';
  
  const [hasImageError, setHasImageError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.length / 5; // Rough estimate
    return Math.ceil(words / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(description);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollTop / docHeight) * 100;
          
          setScrollProgress(Math.min(progress, 100));
          setShowFloatingNav(scrollTop > 300); // Show after scrolling 300px
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        {/* Minimal progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-neutral-200">
          <div 
            className="h-full bg-neutral-900 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <main className="flex-1 pt-2">
          {/* Simple Header */}
          <div className="px-4 py-6 border-b border-neutral-100">
            <Link
              href="/blog"
              className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">back to blog</span>
            </Link>

            {/* Category */}
            <div className="mb-3">
              <span className="text-xs text-neutral-500 uppercase tracking-wide">{category}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-neutral-900 leading-tight mb-4">
              {title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-neutral-500 text-sm">
              <span>{new Date(date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>

            {/* Description */}
            <p className="text-neutral-600 text-base leading-relaxed mt-4 max-w-2xl">
              {description}
            </p>
          </div>

          {/* Content Section */}
          <div className="px-4 py-8">
            <BlogPostErrorBoundary>
              <div className="prose-minimal">
                {children}
              </div>
            </BlogPostErrorBoundary>
          </div>

          {/* Simple Bottom Navigation */}
          <div className="px-4 py-8 border-t border-neutral-100">
            <div className="text-center">
              <Link 
                href="/blog"
                className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">back to all posts</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />

        <BlogPostSchema
          title={title}
          description={description}
          url={openGraph?.url || canonical || `https://design-prism.com/blog/${slug}`}
          imageUrl={effectiveImageUrl}
          datePublished={openGraph?.publishedTime || date}
          dateModified={openGraph?.modifiedTime || date}
          authorName={openGraph?.authors?.[0] || "prism"}
        />
      </div>
    )
  }

  // Desktop layout (unchanged for now)
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <div className="pt-1">
        <Navbar />
        <Breadcrumbs items={[{ name: "blog", url: "/blog" }, { name: title, url: `/blog/${slug}` }]} />
        <main className="flex-1">
          <div className="w-full bg-gradient-to-b from-neutral-50 to-white py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase touch-feedback min-h-[44px] px-2 -mx-2 rounded-md"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    back to all posts
                  </Link>
                </div>
                <article>
                  <div className="relative w-full max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 rounded-lg overflow-hidden">
                    {image && !hasImageError ? (
                      <CoreImage
                        src={image}
                        alt={title}
                        width={896}
                        height={504}
                        className="w-full h-full object-cover"
                        priority={true}
                        trackingId={`blog_hero_${slug}`}
                        onLoadError={() => setHasImageError(true)}
                        customErrorHandling={true}
                      />
                    ) : (
                      <div className={cn("aspect-[16/9] relative", effectiveGradient)} />
                    )}
                  </div>
                  <div className="mb-8 sm:mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">
                        {category}
                      </span>
                      <span className="text-sm text-neutral-500 lowercase">{date}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight lowercase mb-4 leading-tight">
                      {title}
                    </h1>
                  </div>
                  <BlogPostErrorBoundary>
                    <AnimatedBlogWrapper>
                      <div className="prose-blog lowercase-prose">
                        {children}
                      </div>
                    </AnimatedBlogWrapper>
                  </BlogPostErrorBoundary>
                </article>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <BlogPostSchema
        title={title}
        description={description}
        url={openGraph?.url || canonical || `https://design-prism.com/blog/${slug}`}
        imageUrl={effectiveImageUrl}
        datePublished={openGraph?.publishedTime || date}
        dateModified={openGraph?.modifiedTime || date}
        authorName={openGraph?.authors?.[0] || "prism"}
      />
    </div>
  )
}

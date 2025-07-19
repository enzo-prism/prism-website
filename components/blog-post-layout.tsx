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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      setShowFloatingNav(scrollTop > 300); // Show after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        {/* Mobile-optimized progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Floating back button */}
        {showFloatingNav && (
          <Link
            href="/blog"
            className="fixed top-4 left-4 z-40 w-10 h-10 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </Link>
        )}

        <main className="flex-1">
          {/* Hero Section - Full Screen on Mobile */}
          <div className="relative min-h-screen flex flex-col">
            {/* Background */}
            <div className="absolute inset-0">
              {image && !hasImageError ? (
                <CoreImage
                  src={image}
                  alt={title}
                  width={400}
                  height={800}
                  className="w-full h-full object-cover"
                  priority={true}
                  trackingId={`blog_hero_mobile_${slug}`}
                  onLoadError={() => setHasImageError(true)}
                  customErrorHandling={true}
                />
              ) : (
                <div className={cn("w-full h-full", effectiveGradient)} />
              )}
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-4 pt-8">
              {/* Top navigation - minimal */}
              <div className="flex items-center justify-between mb-4">
                <Link
                  href="/blog"
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
                
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-all duration-300">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Spacer to push content to bottom */}
              <div className="flex-1" />

              {/* Hero content */}
              <div className="space-y-4 pb-8">
                {/* Category badge */}
                <div className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-medium text-neutral-900 lowercase">{category}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-white leading-tight lowercase">
                  {title}
                </h1>

                {/* Meta info */}
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                  {description}
                </p>

                {/* Reading hint */}
                <div className="flex items-center justify-center pt-4">
                  <div className="flex flex-col items-center gap-2 text-white/60">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                      <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
                    </div>
                    <span className="text-xs">Scroll to read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white relative">
            <div className="px-4 py-8">
              <BlogPostErrorBoundary>
                <AnimatedBlogWrapper>
                  <div className="mobile-blog-content prose-mobile">
                    {children}
                  </div>
                </AnimatedBlogWrapper>
              </BlogPostErrorBoundary>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-neutral-50 p-4">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-lg font-bold mb-2 lowercase">enjoyed this post?</h3>
              <p className="text-sm text-neutral-600 mb-4">share it with your network</p>
              <div className="flex gap-3 justify-center">
                <button className="px-4 py-2 bg-neutral-900 text-white rounded-full text-sm font-medium">
                  share
                </button>
                <Link 
                  href="/blog"
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-full text-sm font-medium"
                >
                  more posts
                </Link>
              </div>
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

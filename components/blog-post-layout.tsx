"use client"

import { BlogPostErrorBoundary } from "@/components/blog-error-boundary"
import dynamic from "next/dynamic"
import CoreImage from "@/components/core-image"
import GetStartedCTA from "@/components/GetStartedCTA"
import { BlogPostSchema, HowToSchema } from "@/components/schema-markup"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import Breadcrumbs from "@/components/breadcrumbs"
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const BlogShareIcons = dynamic(() => import("@/components/blog/blog-share-icons"), { ssr: false })

interface Props {
  children: React.ReactNode
  slug: string
  title: string
  h1Title?: string
  description: string
  date: string
  category: string
  gradientClass?: string
  image?: string
  showHeroImage?: boolean
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
  relatedPosts?: Array<{
    slug: string
    title: string
    description: string
    date: string
    category: string
    gradientClass: string
    image?: string
  }>
  howTo?: {
    title: string
    description: string
    totalTime?: string
    steps: { title: string; text: string }[]
    supplies?: string[]
    tools?: string[]
  }
}

export default function BlogPostLayout({
  children,
  slug,
  title,
  h1Title,
  description,
  date,
  category,
  gradientClass,
  image,
  showHeroImage = true,
  openGraph,
  canonical,
  relatedPosts = [],
  howTo,
}: Props) {
  const effectiveGradient = gradientClass || 'bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-pink-300/30';
  const effectiveImageUrl = image ? `https://www.design-prism.com${image}` : 'https://www.design-prism.com/prism-opengraph.png';
  
  const [hasImageError, setHasImageError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollTop / docHeight) * 100;
          
          setScrollProgress(Math.min(progress, 100));
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareUrl =
    openGraph?.url ||
    canonical ||
    `https://www.design-prism.com/blog/${slug}`

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Minimal progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-neutral-200">
        <div
          className="h-full bg-neutral-900 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />
      <main className="flex-1">
        <div className="w-full py-6 sm:py-8 md:py-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs
                items={[
                  { name: "home", url: "/" },
                  { name: "blog", url: "/blog" },
                  { name: title, url: shareUrl },
                ]}
              />
              <article>
                <header className="relative mb-6 sm:mb-8">
                  {showHeroImage && image && !hasImageError ? (
                    <div className="rounded-lg overflow-hidden mb-6">
                      <CoreImage
                        src={image}
                        alt={title}
                        width={896}
                        height={504}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 896px"
                        priority={true}
                        trackingId={`blog_hero_${slug}`}
                        onLoadError={() => setHasImageError(true)}
                        customErrorHandling={true}
                      />
                    </div>
                  ) : (
                    <div className={cn("aspect-[16/9] rounded-lg overflow-hidden mb-6", effectiveGradient)} />
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">
                      {category}
                    </span>
                    <time className="text-sm text-neutral-500 lowercase" dateTime={new Date(date).toISOString()}>
                      {new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date))}
                    </time>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight lowercase leading-tight text-balance">
                    {h1Title || title}
                  </h1>
                  <p className="text-neutral-600 mt-3">
                    {description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
                    <BlogShareIcons url={shareUrl} title={title} />
                  </div>
                </header>
                <BlogPostErrorBoundary>
                  <div className="prose-blog">
                    {children}
                  </div>
                </BlogPostErrorBoundary>

                {relatedPosts.length > 0 && (
                  <section className="mt-16 border border-neutral-100 rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col gap-2 mb-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">keep learning</p>
                      <h2 className="text-2xl font-bold tracking-tight lowercase">related posts</h2>
                      <p className="text-sm text-neutral-600 lowercase">
                        more experiments and playbooks from the prism team.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {relatedPosts.map((related) => (
                        <SimpleBlogPostCard
                          key={related.slug}
                          title={related.title}
                          category={related.category}
                          date={related.date}
                          description={related.description}
                          slug={related.slug}
                          image={related.image ?? "/blog/ai-digital-marketing.png"}
                          gradientClass={related.gradientClass}
                          compact
                        />
                      ))}
                    </div>
                  </section>
                )}
                {/* Contextual CTA */}
                <div className="mt-12">
                  <GetStartedCTA
                    heading={(() => {
                      const c = (category || '').toLowerCase()
                      if (c.includes('ai') && c.includes('growth')) return 'ready to be agent‑ready?'
                      if (c.includes('ai') && c.includes('marketing')) return 'turn ai exposure into booked revenue'
                      if (c.includes('seo') || c.includes('search')) return 'recover organic traffic and convert it into leads'
                      if (c.includes('design') || c.includes('product') || c.includes('development')) return 'ship a conversion‑focused site that moves metrics'
                      if (c.includes('entrepreneur')) return 'get a focused plan and ship in days, not months'
                      return 'want help executing this playbook?'
                    })()}
                    description={(() => {
                      const c = (category || '').toLowerCase()
                      if (c.includes('ai') && c.includes('growth')) return 'we’ll stand up your agent brief, wire the actions map, and ship your first 3 experiments in 30 days.'
                      if (c.includes('ai') && c.includes('marketing')) return 'we help you build the context moat, get agent‑discoverable, and instrument bookings end‑to‑end.'
                      if (c.includes('seo') || c.includes('search')) return 'ai has compressed clicks—let’s rebuild your funnel with task‑first pages, rich context, and interactive wins.'
                      if (c.includes('design') || c.includes('product') || c.includes('development')) return 'from strategy to shipped ui: fast pages, clear messaging, and measured outcomes.'
                      if (c.includes('business')) return 'we’ll help you choose one focus bet, design the experiments, and measure what matters.'
                      return 'work with prism to apply these steps to your brand—fast, focused, and measured.'
                    })()}
                    analyticsLabel={`blog_post_${slug}`}
                    variant="gradient"
                    className="border-t border-neutral-100"
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BlogPostSchema
        title={title}
        description={description}
        url={openGraph?.url || canonical || `https://www.design-prism.com/blog/${slug}`}
        imageUrl={effectiveImageUrl}
        datePublished={openGraph?.publishedTime || date}
        dateModified={openGraph?.modifiedTime || date}
        authorName={openGraph?.authors?.[0] || "prism"}
      />
      {howTo ? (
        <HowToSchema
          name={howTo.title}
          description={howTo.description}
          totalTime={howTo.totalTime}
          supplies={howTo.supplies}
          tools={howTo.tools}
          steps={howTo.steps.map((step) => ({
            name: step.title,
            text: step.text,
          }))}
        />
      ) : null}
    </div>
  )
}

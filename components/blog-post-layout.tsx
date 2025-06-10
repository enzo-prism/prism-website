"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { BlogPostSchema } from "@/components/schema-markup"
import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
  slug: string
  title: string
  description: string
  date: string
  category: string
  gradientClass: string
  image: string
  openGraph?: any
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
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <div className="pt-1">
        <Navbar />
        <Breadcrumbs items={[{ name: "blog", url: "/blog" }, { name: title, url: `/blog/${slug}` }]} />
        <main className="flex-1">
          <div className="w-full bg-gradient-to-b from-neutral-50 to-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    back to all posts
                  </Link>
                </div>
                <article>
                  <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-12 rounded-lg overflow-hidden">
                    <div className={cn("aspect-[16/9] relative", gradientClass)} />
                  </div>
                  <div className="mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase">
                        {category}
                      </span>
                      <span className="text-sm text-neutral-500 lowercase">{date}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight lowercase mb-4">
                      {title}
                    </h1>
                  </div>
                  <div className="prose prose-neutral max-w-none space-y-6 lowercase-prose">
                    {children}
                  </div>
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
        imageUrl={`https://design-prism.com${image}`}
        datePublished={openGraph?.publishedTime || date}
        dateModified={openGraph?.modifiedTime || date}
        authorName={openGraph?.authors?.[0] || "prism"}
      />
    </div>
  )
}

"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Breadcrumbs from "@/components/breadcrumbs"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import { BlogPostSchema } from "@/components/schema-markup"
import { cn } from "@/lib/utils"
import type { BlogFrontmatter } from "@/lib/mdx"

interface Props {
  children: React.ReactNode
  frontmatter: BlogFrontmatter
  slug: string
}

export default function BlogPostLayout({ children, frontmatter, slug }: Props) {
  const { title, category, date, gradientClass } = frontmatter
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
                <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-12 rounded-lg overflow-hidden">
                  <div className={cn("aspect-[16/9] relative", gradientClass)} />
                </div>
                <div className="mb-6">
                  <Link href="/blog" className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors lowercase">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    back to all posts
                  </Link>
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
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <BlogPostSchema
        title={title}
        description={frontmatter.description}
        url={frontmatter.openGraph?.url || frontmatter.canonical || `https://prism.agency/blog/${slug}`}
        imageUrl={`https://prism.agency${frontmatter.image}`}
        datePublished={frontmatter.openGraph?.publishedTime || frontmatter.date}
        dateModified={frontmatter.openGraph?.modifiedTime || frontmatter.date}
        authorName={frontmatter.openGraph?.authors?.[0] || "prism"}
      />
    </div>
  )
}

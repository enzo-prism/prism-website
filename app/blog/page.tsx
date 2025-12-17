import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlogEmailSignup from "@/components/blog-email-signup"
import BlogFilterNavigationServer from "@/components/blog-filter-navigation-server"
import Breadcrumbs from "@/components/breadcrumbs"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import SimpleBlogGrid from "@/components/simple-blog-grid"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import { getAllPosts } from "@/lib/mdx-data"
import BlogCTAButtonLazy from "./BlogCTAButtonLazy"

export const metadata: Metadata = {
  title: "prism blog | web design, ai marketing & growth experiments",
  description:
    "actionable lessons from shipping websites, ai workflows, and conversion experiments for dentists and local businesses, field-tested not theory.",
  alternates: {
    canonical: "https://www.design-prism.com/blog",
  },
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const rawCategory = resolvedSearchParams?.category ?? "all"
  const searchQuery = resolvedSearchParams?.q ?? ""

  const posts = await getAllPosts()
  if (!posts) notFound()

  const categoryMap = new Map<string, string>()
  posts.forEach((post) => {
    if (!categoryMap.has(post.categorySlug)) {
      categoryMap.set(post.categorySlug, post.category)
    }
  })
  const categories = Array.from(categoryMap.entries()).map(([slug, label]) => ({ slug, label }))

  const allowedCategories = new Set(categories.map((c) => c.slug.toLowerCase()))
  const selectedCategory =
    rawCategory && rawCategory.toLowerCase() !== "all" && allowedCategories.has(rawCategory.toLowerCase())
      ? rawCategory.toLowerCase()
      : "all"

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== "all" && post.categorySlug !== selectedCategory) return false
    if (!normalizedQuery) return true

    return (
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery)
    )
  })

  const blogItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.slice(0, 10).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `https://www.design-prism.com/blog/${post.slug}`,
      },
    })),
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="relative flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ name: "home", url: "/" }, { name: "blog", url: "/blog" }]} />
        </div>

        <section className="border-b border-neutral-100 py-6 md:py-10">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl font-bold tracking-tight lowercase sm:text-3xl md:text-4xl">insights & ideas</h1>
            <p className="mt-2 lowercase text-neutral-600">
              thoughts on design, development, and digital strategy from the prism team
            </p>
          </div>
        </section>

        <BlogFilterNavigationServer categories={categories} selectedCategory={selectedCategory} query={searchQuery} />

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            {filteredPosts.length > 0 ? (
              <SimpleBlogGrid>
                {filteredPosts.map((post) => (
                  <SimpleBlogPostCard
                    key={post.slug}
                    title={post.title}
                    category={post.category}
                    date={post.date}
                    description={post.description}
                    slug={post.slug}
                    image={post.image || "/blog/ai-digital-marketing.png"}
                    gradientClass={post.gradientClass}
                    prefetch={false}
                  />
                ))}
              </SimpleBlogGrid>
            ) : (
              <div className="rounded-lg border border-dashed border-neutral-200 py-16 text-center">
                <h3 className="mb-2 text-xl font-medium lowercase text-neutral-600">no posts found</h3>
                <p className="lowercase text-neutral-500">try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </section>

        <BlogEmailSignup />

        <section className="bg-neutral-50 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-bold lowercase tracking-tighter sm:text-3xl">want to work with us?</h2>
              <p className="lowercase text-neutral-600">let's discuss how we can help your business grow</p>
              <div className="pt-4">
                <BlogCTAButtonLazy />
              </div>
            </div>
          </div>
        </section>

        <SeoTextSection title="prism blog: design, development, and growth">
          <p>
            we publish practical notes on product design, engineering, and modern seo—how to ship faster,
            write clearer interfaces, and measure what matters. each post is written from real client work
            and experiments, not theory.
          </p>
        </SeoTextSection>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogItemList) }} />
      </main>
      <Footer />
    </div>
  )
}

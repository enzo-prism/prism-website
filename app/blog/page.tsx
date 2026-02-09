import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlogEmailSignup from "@/components/blog-email-signup"
import BlogFilterNavigationServer from "@/components/blog-filter-navigation-server"
import Breadcrumbs from "@/components/breadcrumbs"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CollectionPageSchema, ItemListSchema } from "@/components/schema-markup"
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
  openGraph: {
    title: "prism blog | web design, ai marketing & growth experiments",
    description:
      "actionable lessons from shipping websites, ai workflows, and conversion experiments for dentists and local businesses, field-tested not theory.",
    url: "https://www.design-prism.com/blog",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "prism blog | web design, ai marketing & growth experiments",
    description:
      "actionable lessons from shipping websites, ai workflows, and conversion experiments for dentists and local businesses, field-tested not theory.",
    images: ["/prism-opengraph.png"],
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

  const blogItems = posts.slice(0, 10).map((post) => ({
    name: post.title,
    description: post.description,
    url: `https://www.design-prism.com/blog/${post.slug}`,
    itemType: "BlogPosting",
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ name: "home", url: "/" }, { name: "blog", url: "/blog" }]} />
        </div>

        <section className="border-b border-border/60 py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">prism blog</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl md:text-6xl">insights & ideas</h1>
            <p className="mt-4 text-muted-foreground">
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
                      author={post.author}
                      description={post.description}
                      slug={post.slug}
                      image={post.image || "/blog/ai-digital-marketing.png"}
                      gradientClass={post.gradientClass}
                      prefetch={false}
                  />
                ))}
              </SimpleBlogGrid>
            ) : (
              <div className="rounded-md border border-dashed border-border/60 bg-card/20 py-16 text-center">
                <h3 className="mb-2 text-xl font-semibold text-foreground">no posts found</h3>
                <p className="text-muted-foreground">try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </section>

        <BlogEmailSignup />

        <section className="border-t border-border/60 bg-card/15 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-2xl font-semibold sm:text-3xl">want to work with us?</h2>
              <p className="text-muted-foreground">let's discuss how we can help your business grow</p>
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
        <CollectionPageSchema
          name="Prism Blog"
          description="Insights on web design, AI marketing, and growth systems for local businesses."
          url="https://www.design-prism.com/blog"
          isPartOfId="https://www.design-prism.com/#website"
        />
        <ItemListSchema
          name="Latest Prism blog posts"
          url="https://www.design-prism.com/blog"
          items={blogItems}
        />
      </main>
      <Footer />
    </div>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlogEmailSignup from "@/components/blog-email-signup"
import BlogFilterNavigationServer from "@/components/blog-filter-navigation-server"
import Breadcrumbs from "@/components/breadcrumbs"
import AsciiHeroCard from "@/components/ascii/AsciiHeroCard"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CollectionPageSchema, ItemListSchema } from "@/components/schema-markup"
import SeoTextSection from "@/components/seo-text-section"
import SimpleBlogGrid from "@/components/simple-blog-grid"
import SimpleBlogPostCard from "@/components/simple-blog-post-card"
import { getAllPosts } from "@/lib/mdx-data"
import {
  getBlogFilterFromCategory,
  normalizeBlogFilter,
} from "@/lib/blog-topic-filters"
import BlogCTAButtonLazy from "./BlogCTAButtonLazy"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "prism blog | web design, ai marketing & growth experiments",
  description: "actionable lessons from shipping websites, ai workflows, and conversion experiments for dentists and local businesses, field-tested not theory.",
  path: "/blog",
  ogImage: "/prism-opengraph.png",
})

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
  const postsWithTopic = posts.map((post) => ({
    ...post,
    topic: getBlogFilterFromCategory(post.category),
  }))

  const selectedCategory = normalizeBlogFilter(rawCategory.trim().toLowerCase())

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredPosts = postsWithTopic.filter((post) => {
    if (selectedCategory !== "all" && post.topic !== selectedCategory) return false
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
    <div className="blog-reading-surface flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1">
        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ name: "home", url: "/" }, { name: "blog", url: "/blog" }]} />
        </div>

        <section className="px-4 py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6">
            <AsciiHeroCard
              animationName="hands"
              frameCount={152}
              fps={18}
              eyebrow="prism blog"
              title="Insights & ideas"
              description="Thoughtful breakdowns on design, development, and digital strategy from the Prism team."
              ariaLabel="Hands ASCII animation behind the Blog page hero"
              className="blog-reading-surface"
            />
          </div>
        </section>

        <BlogFilterNavigationServer selectedCategory={selectedCategory} query={searchQuery} />

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
                      image={post.image}
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
              <h2 className="text-2xl font-semibold sm:text-3xl">Want to work with us?</h2>
              <p className="text-muted-foreground">Let's discuss how we can help your business grow.</p>
              <div className="pt-4">
                <BlogCTAButtonLazy />
              </div>
            </div>
          </div>
        </section>

        <SeoTextSection title="Prism blog: design, development, and growth">
          <p>
            We publish practical notes on product design, engineering, and modern SEO—how to ship faster,
            write clearer interfaces, and measure what matters. Each post is written from real client work
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

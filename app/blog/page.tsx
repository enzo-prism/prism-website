import SeoTextSection from "@/components/seo-text-section"
import { getAllPosts } from "@/lib/mdx"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import BlogPage from "./BlogPage"
import Breadcrumbs from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "prism blog | web design, ai marketing & growth experiments",
  description:
    "actionable lessons from shipping websites, ai workflows, and conversion experiments for dentists and local businesses, field-tested not theory.",
  alternates: {
    canonical: "https://www.design-prism.com/blog",
  },
}

export default async function Blog() {
  const posts = await getAllPosts()
  if (!posts) notFound()
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
    <>
      <div className="mx-auto max-w-5xl px-6">
        <Breadcrumbs items={[{ name: "home", url: "/" }, { name: "blog", url: "/blog" }]} />
      </div>
      <section id="static-blog-hero" className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">prism blog</h1>
            <p className="mt-3 text-lg leading-relaxed text-white/80">
              field notes from building high-converting websites, ai-infused marketing systems, and repeatable playbooks for local businesses. every article captures experiments we shipped for clients and the numbers that proved they worked.
            </p>
            <div className="mt-4">
              <Link href="/blog/feed.xml" className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white">
                subscribe via rss
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="static-blog-preview" className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
            recent insights
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {posts.slice(0, 4).map((post) => (
              <li key={post.slug} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Link href={`/blog/${post.slug}`} className="space-y-2">
                  <span className="block text-xs uppercase tracking-[0.24em] text-neutral-400">{post.category}</span>
                  <span className="block text-lg font-semibold leading-snug text-neutral-900">{post.title}</span>
                  <span className="block text-sm text-neutral-600">{post.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <noscript>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl space-y-4 text-neutral-900">
            <h2 className="text-2xl font-semibold uppercase tracking-tight">prism blog highlights</h2>
            <p>
              recent stories cover ai-assisted seo, conversion-focused design, and growth experiments that helped local companies win more revenue. browse the articles below and keep reading at <a href="https://www.design-prism.com/blog">design-prism.com/blog</a>.
            </p>
            <p>
              prefer feeds? follow the <a href="/blog/feed.xml">rss channel</a>.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {posts.slice(0, 4).map((post) => (
                <li key={`noscript-${post.slug}`}>
                  <a href={`/blog/${post.slug}`} className="underline">
                    {post.title}
                  </a>{" "}
                  — {post.description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </noscript>
      <BlogPage posts={posts} />
      <SeoTextSection title="prism blog: design, development, and growth">
        <p>
          we publish practical notes on product design, engineering, and modern seo—how to ship faster,
          write clearer interfaces, and measure what matters. each post is written from real client work
          and experiments, not theory.
        </p>
      </SeoTextSection>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogItemList) }} />
    </>
  )
}

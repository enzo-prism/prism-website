import SeoTextSection from "@/components/seo-text-section"
import { getAllPosts } from "@/lib/mdx"
import type { Metadata } from "next"
import { notFound } from 'next/navigation'
import BlogPage from "./BlogPage"

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
  return (
    <>
      <h1 className="sr-only">Prism Blog | Web Design, AI Marketing & Growth Experiments</h1>
      <BlogPage posts={posts} />
      <SeoTextSection title="prism blog: design, development, and growth">
        <p>
          we publish practical notes on product design, engineering, and modern seo—how to ship faster,
          write clearer interfaces, and measure what matters. each post is written from real client work
          and experiments, not theory.
        </p>
      </SeoTextSection>
    </>
  )
}

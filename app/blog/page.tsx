import type { Metadata } from "next"
import BlogPage from "./client-page"
import { getAllPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "blog",
  description: "thoughts on design, development, and digital strategy from the prism team.",
  alternates: {
    canonical: "https://prism.agency/blog",
  },
}

export default async function Blog() {
  const posts = await getAllPosts()
  return <BlogPage posts={posts} />
}

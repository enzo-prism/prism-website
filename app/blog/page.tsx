import { getAllPosts } from "@/lib/mdx"
import type { Metadata } from "next"
import { notFound } from 'next/navigation'
import BlogPage from "./BlogPage"

export const metadata: Metadata = {
  title: "blog",
  description: "thoughts on design, development, and digital strategy from the prism team.",
  alternates: {
    canonical: "https://www.design-prism.com/blog",
  },
}

export default async function Blog() {
  const posts = await getAllPosts()
  if (!posts) notFound()
  return <BlogPage posts={posts} />
}

import type { Metadata } from "next"
import BlogPage from "./BlogPage"
import { getAllPosts } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "blog",
  description: "thoughts on design, development, and digital strategy from the prism team.",
}

export default async function Blog() {
  const posts = await getAllPosts()
  return <BlogPage posts={posts} />
}

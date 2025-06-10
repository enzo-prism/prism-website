import type { Metadata } from "next"
import BlogPage from "./BlogPage"
import { getAllPosts } from "@/lib/mdx"
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: "blog",
  description: "thoughts on design, development, and digital strategy from the prism team.",
}

export default async function Blog() {
  const posts = await getAllPosts()
  if (!posts) notFound()
  return <BlogPage posts={posts} />
}

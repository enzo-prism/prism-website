import type { Metadata } from "next"
import BlogPage from "./client-page"

export const metadata: Metadata = {
  title: "blog",
  description: "thoughts on design, development, and digital strategy from the prism team.",
}

export default function Blog() {
  return <BlogPage />
}

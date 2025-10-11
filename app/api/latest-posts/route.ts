export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import { getAllPosts } from "@/lib/mdx"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const posts = await getAllPosts()

    if (!posts) {
      return NextResponse.json({ error: "unable to retrieve posts" }, { status: 500 })
    }

    const latestPosts = posts.slice(0, 3).map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      category: post.category,
      image: post.image ?? null,
      gradientClass: post.gradientClass,
    }))

    return NextResponse.json({ posts: latestPosts })
  } catch (error) {
    console.error("[latest-posts] failed to load blog posts", error)
    return NextResponse.json({ error: "internal error" }, { status: 500 })
  }
}

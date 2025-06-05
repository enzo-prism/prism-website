import type { Metadata } from "next"
import ClientBlogPostPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Create a Website That Gets You More Business: A Simple Guide Using Replit | Prism",
  description:
    "Learn how to create a website that generates more business leads using Replit, even if you're not a tech whiz. A simple guide for 2025.",
  keywords:
    "replit website, build website replit, get more business, website leads, simple website guide, ai website builder, small business website, replit tutorial, website development, online presence",
  authors: [{ name: "Enzo", url: "https://prism.agency" }],
  openGraph: {
    title: "Create a Website That Gets You More Business: A Simple Guide Using Replit",
    description:
      "A step-by-step guide to building a lead-generating website with Replit in 2025, with tips on using AI assistance for beginners.",
    url: "https://prism.agency/blog/create-website-more-business-replit",
    siteName: "Prism",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Illustration of Replit interface for website building",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2025-06-01T00:00:00.000Z",
    authors: ["Enzo"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build a Lead-Generating Website with Replit: Simple 2025 Guide",
    description:
      "No tech expertise? No problem! Learn to create a website that boosts your business using Replit. Includes AI tips.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  alternates: {
    canonical: "https://prism.agency/blog/create-website-more-business-replit",
  },
}

export default function BlogPostPage() {
  return <ClientBlogPostPage />
}

import type { Metadata } from "next"
import ClientBlogPostPage from "./ClientPage"

export const metadata: Metadata = {
  title: "ai for dental practices: effortlessly welcome more patients | prism",
  description:
    "discover how ai tools like chatbots, smart advertising, and seo can help your dental practice attract more new patients without technical expertise.",
  keywords:
    "ai for dentists, dental marketing, patient acquisition, ai chatbot dental, dental seo, dental practice growth, ai tools dental",
  authors: [{ name: "enzo", url: "https://prism.agency" }],
  openGraph: {
    title: "still relying on word-of-mouth? how ai can effortlessly welcome more patients to your dental practice",
    description:
      "learn practical ai strategies to boost patient numbers for your dental practice, from 24/7 ai chat helpers to smarter online advertising, illustrated by a modern tooth design.",
    url: "https://prism.agency/blog/ai-effortlessly-welcome-more-patients-dental-practice",
    siteName: "prism",
    images: [
      {
        url: "/blog/ai-dental-patient-growth.png",
        width: 1200,
        height: 630,
        alt: "stylized tooth with glowing neural network lines",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2025-06-01T00:00:00.000Z",
    authors: ["enzo"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ai for dental practices: attract more patients effortlessly",
    description:
      "ai tools can help your dental practice grow. learn how chatbots, smart ads & seo can welcome more patients. features a stylized tooth with ai network.",
    images: ["/blog/ai-dental-patient-growth.png"],
  },
  alternates: {
    canonical: "https://prism.agency/blog/ai-effortlessly-welcome-more-patients-dental-practice",
  },
}

export default function BlogPostPage() {
  return <ClientBlogPostPage />
}

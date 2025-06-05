import type { Metadata } from "next" // This would typically be in a server component wrapper
import BusinessVisibilityChatGPTClientPage from "./BusinessVisibilityChatGPTClientPage"

export const metadata: Metadata = {
  title: "How I'm Getting My Business to Show Up in ChatGPT (And How You Can Too)",
  description:
    "Learn the six steps to make your business visible to AI like ChatGPT without tricks—just smart strategy.",
  openGraph: {
    title: "How I'm Getting My Business to Show Up in ChatGPT (And How You Can Too)",
    description:
      "Learn the six steps to make your business visible to AI like ChatGPT without tricks—just smart strategy.",
    url: "https://prism.agency/blog/business-visibility-chatgpt",
    images: ["https://prism.agency/blog/chatgpt-business-visibility.png"],
    type: "article",
    publishedTime: "2025-05-27T00:00:00.000Z",
    modifiedTime: "2025-05-27T00:00:00.000Z",
    authors: ["enzo"],
  },
}

export default function BusinessVisibilityChatGPTPage() {
  return <BusinessVisibilityChatGPTClientPage />
}

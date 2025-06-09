import type { Metadata } from "next"
import BusinessVisibilityChatGPTClientPage from "./BusinessVisibilityChatGPTClientPage"

export const metadata: Metadata = {
  title: "How to Rank Higher in AI Search: A Live Experiment | Prism",
  description:
    "Enzo from Prism conducts a live experiment on ranking in AI search (ChatGPT, Gemini, Grock, Perplexity) and shares key takeaways for businesses.",
  openGraph: {
    title: "How to Rank Higher in AI Search: A Live Experiment | Prism",
    description:
      "Enzo from Prism conducts a live experiment on ranking in AI search (ChatGPT, Gemini, Grock, Perplexity) and shares key takeaways for businesses.",
    url: "https://prism.agency/blog/business-visibility-chatgpt",
    images: ["https://prism.agency/blog/ai-search-ranking-experiment.png"],
    type: "article",
    publishedTime: "2025-06-08T00:00:00.000Z",
    modifiedTime: "2025-06-08T00:00:00.000Z",
    authors: ["Enzo from Prism"],
  },
  alternates: {
    canonical: "https://prism.agency/blog/business-visibility-chatgpt",
  },
}

export default function AiSearchRankingExperimentPage() {
  return <BusinessVisibilityChatGPTClientPage />
}

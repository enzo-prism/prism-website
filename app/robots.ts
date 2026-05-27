import type { MetadataRoute } from "next"

// AI answer-engine and training crawlers we explicitly welcome so Prism content
// is eligible for citation in ChatGPT, Claude, Perplexity, Google AI Overviews /
// Gemini, and Apple Intelligence. They get full access except private API routes.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Allow the OG image and the LLM-readable blog markdown endpoint while
        // keeping the rest of /api private. Longer allow paths win over /api.
        allow: ["/api/og/", "/api/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: ["/", "/api/og/", "/api/blog/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.design-prism.com/sitemap.xml",
  }
}

import type { LibraryEditorial } from "@/lib/library/types"

export const libraryEditorial: Record<string, LibraryEditorial> = {
  "instagram:18040111111111111": {
    speaker: {
      name: "John Wooden",
      type: "athlete",
      subtitle: "Legendary coach and educator",
      bioShort:
        "Wooden built UCLA into a dynasty by obsessing over fundamentals, consistency, and character.",
      links: [{ label: "UCLA profile", url: "https://uclabruins.com/" }],
    },
    takeaways: [
      "Master the basics before chasing advanced tactics.",
      "Consistency compounds when paired with clear standards.",
      "Character and preparation outlast short-term hype.",
    ],
    tags: ["fundamentals", "consistency", "leadership"],
    group: "Athlete Lessons",
    featuredWeight: 2,
  },
  "instagram:18040222222222222": {
    speaker: {
      name: "Allyson Felix",
      type: "athlete",
      subtitle: "11x Olympic medalist",
      bioShort:
        "Felix is one of the most decorated sprinters in history, known for longevity and composure under pressure.",
    },
    takeaways: [
      "Longevity is built with repeatable routines, not hero days.",
      "Pressure moments reward calm preparation.",
      "Small efficiency gains keep you ahead over years.",
    ],
    tags: ["performance", "focus", "longevity"],
    group: "Athlete Lessons",
  },
  "instagram:18040333333333333": {
    speaker: {
      name: "Yvon Chouinard",
      type: "founder",
      subtitle: "Founder of Patagonia",
      bioShort:
        "Chouinard proved that purpose-first businesses can outlast the market while staying profitable.",
    },
    takeaways: [
      "Build products that stay true to the mission.",
      "Let your values guide every operational decision.",
      "Long-term brand trust beats short-term growth spikes.",
    ],
    tags: ["values", "mission", "strategy"],
    group: "Founder Lessons",
  },
  "tiktok:7280011122334455667": {
    speaker: {
      name: "Serena Williams",
      type: "athlete",
      subtitle: "23x Grand Slam champion",
      bioShort:
        "Williams pairs relentless training with belief, staying resilient through every stage of her career.",
    },
    takeaways: [
      "Confidence grows when preparation is non-negotiable.",
      "Adversity is part of the training plan, not a surprise.",
      "Focus on the next point, not the last mistake.",
    ],
    tags: ["resilience", "confidence", "training"],
    group: "Athlete Lessons",
  },
  "tiktok:7280011122334455668": {
    speaker: {
      name: "Reed Hastings",
      type: "founder",
      subtitle: "Co-founder of Netflix",
      bioShort:
        "Hastings scaled Netflix by prioritizing talent density, clarity, and deliberate reinvention.",
    },
    takeaways: [
      "High talent density raises the bar for everyone.",
      "Reinvention requires honesty about what must change.",
      "Clear context beats rigid control in fast-moving teams.",
    ],
    tags: ["culture", "reinvention", "teams"],
    group: "Founder Lessons",
  },
}

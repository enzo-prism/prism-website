import { quotesData } from "@/content/wall-of-love-data"

const reviewCount = quotesData.length

export const AGGREGATE_RATING = {
  ratingValue: "4.9",
  reviewCount: reviewCount.toString(),
  bestRating: "5",
  worstRating: "1",
}

export function buildAggregateRating() {
  return {
    "@type": "AggregateRating",
    ...AGGREGATE_RATING,
  }
}

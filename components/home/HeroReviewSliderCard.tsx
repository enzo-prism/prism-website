"use client"

import Link from "next/link"
import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { getHomepageHeroReviewPool, renderFormattedText } from "@/content/wall-of-love-data"
import { trackNavigation } from "@/utils/analytics"
import { sanitizeReviewText } from "@/lib/schema-helpers"

const DEFAULT_REVIEW_RATING = {
  "@type": "Rating",
  ratingValue: "5",
  bestRating: "5",
  worstRating: "1",
}

const HERO_QUOTE_COUNT = 2

type HeroReviewSliderCardProps = {
  className?: string
}

export default function HeroReviewSliderCard({ className }: HeroReviewSliderCardProps) {
  const proofReviews = useMemo(() => getHomepageHeroReviewPool().slice(0, HERO_QUOTE_COUNT), [])
  const heroReviewForSchema = proofReviews[0] ?? null

  const heroReviewSchema = useMemo(() => {
    if (!heroReviewForSchema) return null
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Review",
      name: `Review from ${heroReviewForSchema.client}`,
      author: { "@type": "Person", name: heroReviewForSchema.client },
      reviewBody: sanitizeReviewText(heroReviewForSchema.text),
      reviewRating: DEFAULT_REVIEW_RATING,
      itemReviewed: {
        "@type": "Organization",
        "@id": "https://www.design-prism.com/#organization",
        name: "Prism",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.design-prism.com/#organization",
        name: "Prism",
      },
    })
  }, [heroReviewForSchema])

  return (
    <div className={cn("flex w-full flex-col items-center gap-3 text-center", className)}>
      <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        <span className="text-sm" aria-hidden>
          ❤️
        </span>
        <span className="tracking-tight">owners love prism</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-700 lowercase dark:text-neutral-200">
        {proofReviews.length > 0 ? (
          proofReviews.map((review) => (
            <span key={review.id} className="text-balance text-sm text-neutral-700 dark:text-neutral-200">
              &ldquo;{renderFormattedText(review.text)}&rdquo;
            </span>
          ))
        ) : (
          <span className="text-xs text-neutral-400">loading...</span>
        )}
      </div>

      <div className="flex justify-center">
        <Link
          href="/wall-of-love"
          onClick={() => trackNavigation("hero_review_card_cta", "/wall-of-love")}
          className="text-xs font-semibold text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
        >
          250+ more
        </Link>
      </div>

      {heroReviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: heroReviewSchema }} />
      )}
    </div>
  )
}

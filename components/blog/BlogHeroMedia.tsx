"use client"

import { useState } from "react"

import CoreImage from "@/components/core-image"
import { cn } from "@/lib/utils"
import { toLocalPathIfSameOrigin } from "@/lib/url"

interface BlogHeroMediaProps {
  title: string
  image?: string
  gradientClass: string
  showHeroImage?: boolean
  slug: string
}

export default function BlogHeroMedia({
  title,
  image,
  gradientClass,
  showHeroImage = true,
  slug,
}: BlogHeroMediaProps) {
  const [hasImageError, setHasImageError] = useState(false)

  if (showHeroImage && image && !hasImageError) {
    const effectiveSrc = toLocalPathIfSameOrigin(image)
    return (
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/60 bg-card/20 shadow-sm shadow-black/40">
        <CoreImage
          src={effectiveSrc}
          alt={title}
          width={896}
          height={504}
          className="w-full h-full object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority
          trackingId={`blog_hero_${slug}`}
          onLoadError={() => setHasImageError(true)}
          customErrorHandling
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "aspect-[16/9] sm:aspect-[21/9] relative mb-6 overflow-hidden rounded-2xl border border-border/60 bg-card/20 shadow-sm shadow-black/40",
        gradientClass,
      )}
    />
  )
}

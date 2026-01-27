"use client"

import { useState } from "react"

import CoreImage from "@/components/core-image"
import { cn } from "@/lib/utils"

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
    return (
      <div className="rounded-lg overflow-hidden mb-6">
        <CoreImage
          src={image}
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

  return <div className={cn("aspect-[16/9] rounded-lg overflow-hidden mb-6", gradientClass)} />
}

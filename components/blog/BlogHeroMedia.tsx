'use client'

import { useState } from 'react'

import CoreImage from '@/components/core-image'
import { DEFAULT_BLOG_FEATURED_IMAGE } from '@/lib/blog-images'
import { toLocalPathIfSameOrigin } from '@/lib/url'

interface BlogHeroMediaProps {
  title: string
  image?: string
  slug: string
}

export default function BlogHeroMedia({
  title,
  image,
  slug,
}: BlogHeroMediaProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const featuredImage = image?.trim() || DEFAULT_BLOG_FEATURED_IMAGE
  const effectiveSrc = toLocalPathIfSameOrigin(featuredImage)

  if (!hasImageError) {
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
          onLoadError={() => {
            if (effectiveSrc !== DEFAULT_BLOG_FEATURED_IMAGE) {
              setHasImageError(true)
            }
          }}
          customErrorHandling
        />
      </div>
    )
  }

  if (hasImageError) {
    return (
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/60 bg-card/20 shadow-sm shadow-black/40">
        <CoreImage
          src={DEFAULT_BLOG_FEATURED_IMAGE}
          alt={title}
          width={896}
          height={504}
          className="w-full h-full object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority
          trackingId={`blog_hero_${slug}`}
          customErrorHandling
        />
      </div>
    )
  }

  return null
}

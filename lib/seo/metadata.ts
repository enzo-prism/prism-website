import type { Metadata } from "next"

import { canonicalUrl } from "@/lib/canonical"
import {
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  buildAbsoluteTitle,
  buildMinimalDescription,
  normalizeTitleStem,
} from "@/lib/seo/rules"
import { isRouteIndexable } from "@/lib/seo/search-visibility"

export type RouteSeoInput = {
  titleStem: string
  description: string
  path: string
  index?: boolean
  /** Pass false when the route ships a file-based opengraph-image. */
  ogImage?: string | false
}

function imageFromInput(image?: string | false) {
  if (image === false) return null
  return image && image.trim().length > 0 ? image : DEFAULT_OG_IMAGE
}

function altFromTitle(titleStem: string) {
  const normalized = normalizeTitleStem(titleStem)
  return normalized.length > 0 ? normalized : BRAND_NAME
}

export function buildRouteMetadata(input: RouteSeoInput): Metadata {
  const title = buildAbsoluteTitle(input.titleStem)
  const description = buildMinimalDescription(input.titleStem, input.description)
  const canonical = canonicalUrl(input.path)
  const ogImage = imageFromInput(input.ogImage)
  const index = input.index !== false && isRouteIndexable(input.path)
  const images = ogImage
    ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: altFromTitle(input.titleStem),
        },
      ]
    : undefined

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND_NAME,
      type: "website",
      locale: "en_US",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: index
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
        },
  }
}

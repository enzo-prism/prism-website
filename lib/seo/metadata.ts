import type { Metadata } from "next"

import { canonicalUrl } from "@/lib/canonical"
import {
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  buildAbsoluteTitle,
  normalizeDescription,
  normalizeTitleStem,
} from "@/lib/seo/rules"

export type RouteSeoInput = {
  titleStem: string
  description: string
  path: string
  index?: boolean
  ogImage?: string
}

function imageFromInput(image?: string) {
  return image && image.trim().length > 0 ? image : DEFAULT_OG_IMAGE
}

function altFromTitle(titleStem: string) {
  const normalized = normalizeTitleStem(titleStem)
  return normalized.length > 0 ? normalized : BRAND_NAME
}

export function buildRouteMetadata(input: RouteSeoInput): Metadata {
  const title = buildAbsoluteTitle(input.titleStem)
  const description = normalizeDescription(input.description)
  const canonical = canonicalUrl(input.path)
  const ogImage = imageFromInput(input.ogImage)
  const index = input.index !== false

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: altFromTitle(input.titleStem),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
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

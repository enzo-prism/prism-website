import type { Metadata } from "next"

import { canonicalUrl } from "@/lib/canonical"
import {
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  buildAbsoluteTitle,
  buildMinimalDescription,
} from "@/lib/seo/rules"
import { isRouteIndexable } from "@/lib/seo/search-visibility"

export type RouteSeoInput = {
  titleStem: string
  description: string
  path: string
  index?: boolean
  /** @deprecated Prism now uses one site-wide social image on every route. */
  ogImage?: string | false
}

export function buildRouteMetadata(input: RouteSeoInput): Metadata {
  const title = buildAbsoluteTitle(input.titleStem)
  const description = buildMinimalDescription(input.titleStem, input.description)
  const canonical = canonicalUrl(input.path)
  const index = input.index !== false && isRouteIndexable(input.path)
  const images = [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: DEFAULT_OG_IMAGE_ALT,
    },
  ]

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
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
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

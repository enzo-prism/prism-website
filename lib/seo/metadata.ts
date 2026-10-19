import type { Metadata } from "next"

import { canonicalUrl } from "@/lib/canonical"
import {
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SOCIAL_IMAGE_EXCEPTIONS,
  buildAbsoluteTitle,
  buildMinimalDescription,
} from "@/lib/seo/rules"
import { isRouteIndexable } from "@/lib/seo/search-visibility"

export type RouteSeoInput = {
  titleStem: string
  description: string
  path: string
  index?: boolean
  /**
   * @deprecated Prism uses one site-wide social image on every route; this
   * value is ignored. Approved exceptions live in SOCIAL_IMAGE_EXCEPTIONS.
   */
  ogImage?: string | false
}

export function buildRouteMetadata(input: RouteSeoInput): Metadata {
  const title = buildAbsoluteTitle(input.titleStem)
  const description = buildMinimalDescription(input.titleStem, input.description)
  const canonical = canonicalUrl(input.path)
  const index = input.index !== false && isRouteIndexable(input.path)
  const social = SOCIAL_IMAGE_EXCEPTIONS[input.path] ?? {
    url: DEFAULT_OG_IMAGE,
    alt: DEFAULT_OG_IMAGE_ALT,
  }
  const images = [
    {
      url: social.url,
      width: 1200,
      height: 630,
      alt: social.alt,
    },
  ]

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
      // Indexable routes advertise the machine-readable company/proof
      // snapshot so AI answer engines can ingest entity facts directly.
      // (Page-level alternates replace the root layout's, so this must
      // live here to survive on routes built with this helper.)
      ...(index
        ? {
            types: {
              "application/json": [
                {
                  url: "/ai-data.json",
                  title: "Prism company and proof data (JSON)",
                },
              ],
            },
          }
        : {}),
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
      images: [social.url],
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

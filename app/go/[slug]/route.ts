import { NextRequest, NextResponse } from "next/server"

import { getCampaignLink } from "@/lib/campaign-links"

export const runtime = "edge"

const RESERVED_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "slug",
])

function toAbsoluteUrl(input: string, req: NextRequest): URL {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return new URL(input)
  }

  return new URL(input.startsWith("/") ? input : `/${input}`, req.nextUrl.origin)
}

export async function GET(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  const link = getCampaignLink(slug)

  if (!link) {
    const fallback = new URL("/get-started", req.nextUrl.origin)
    fallback.searchParams.set("utm_source", "shortlink")
    fallback.searchParams.set("utm_medium", "redirect")
    fallback.searchParams.set("utm_campaign", "unknown_slug")
    fallback.searchParams.set("utm_content", slug)
    return NextResponse.redirect(fallback, { status: 302 })
  }

  const target = toAbsoluteUrl(link.destination, req)

  target.searchParams.set("utm_source", link.utmSource)
  target.searchParams.set("utm_medium", link.utmMedium)
  target.searchParams.set("utm_campaign", link.utmCampaign)
  if (link.utmContent) target.searchParams.set("utm_content", link.utmContent)
  if (link.utmTerm) target.searchParams.set("utm_term", link.utmTerm)

  req.nextUrl.searchParams.forEach((value, key) => {
    if (!RESERVED_PARAMS.has(key)) target.searchParams.set(key, value)
  })

  return NextResponse.redirect(target, { status: link.permanent ? 301 : 302 })
}

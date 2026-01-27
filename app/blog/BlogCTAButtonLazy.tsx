"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

import { ArrowRight } from "lucide-react"

import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

const BlogCTAButton = dynamic(() => import("./BlogCTAButton"), {
  loading: () => (
    <Link
      href="/free-analysis"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium lowercase text-white transition hover:bg-neutral-800"
      data-cta-text={FREE_AUDIT_CTA_TEXT}
      data-cta-location="blog page"
    >
      {FREE_AUDIT_CTA_TEXT}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  ),
})

export default function BlogCTAButtonLazy() {
  return <BlogCTAButton />
}

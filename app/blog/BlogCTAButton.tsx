"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"

export default function BlogCTAButton() {
  return (
    <Link href="/get-started">
      <button
        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 lowercase"
        onClick={() => trackCTAClick("get started", "blog page")}
      >
        get started <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </Link>
  )
}

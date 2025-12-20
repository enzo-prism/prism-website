"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

export default function HeroCtas() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button asChild className="w-full rounded-full lowercase sm:w-auto">
          <Link href="/pricing" onClick={() => trackCTAClick("see pricing", "homepage hero")}>
            see pricing
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full rounded-full lowercase sm:w-auto">
          <Link href="/case-studies" onClick={() => trackCTAClick("explore case studies", "homepage hero")}>
            explore case studies
          </Link>
        </Button>
      </div>
      <p className="text-balance text-xs text-neutral-500 lowercase">
        also built for ai-powered search (google ai overviews + chatgpt-style answers).
      </p>
    </div>
  )
}

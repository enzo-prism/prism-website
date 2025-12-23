"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

const DEFAULT_NOTE =
  "built for ai search too: clear pages + structured answers so you show up when customers ask."

type HeroCtasProps = {
  note?: string
  showNote?: boolean
  location?: string
  className?: string
}

export default function HeroCtas({
  note = DEFAULT_NOTE,
  showNote = true,
  location = "homepage hero",
  className,
}: HeroCtasProps) {
  return (
    <div className={["flex flex-col items-center gap-3", className].filter(Boolean).join(" ")}>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button asChild className="w-full rounded-full lowercase sm:w-auto">
          <Link href="/get-started" onClick={() => trackCTAClick("get started", location)}>
            get started
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full rounded-full lowercase sm:w-auto">
          <Link href="/case-studies" onClick={() => trackCTAClick("explore case studies", location)}>
            explore case studies
          </Link>
        </Button>
      </div>
      {showNote ? (
        <p className="text-balance text-xs text-neutral-500 lowercase">{note}</p>
      ) : null}
    </div>
  )
}

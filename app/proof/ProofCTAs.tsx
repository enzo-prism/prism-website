"use client"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"
import Link from "next/link"

interface ProofCTAsProps {
  location: string
  className?: string
}

export default function ProofCTAs({ location, className = "" }: ProofCTAsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Link href="/get-started">
        <Button
          className="rounded-full px-6 py-3 text-base lowercase"
          onClick={() => trackCTAClick("get prism proof", location)}
        >
          get prism proof
        </Button>
      </Link>
      <Link href="/case-studies" className="sm:ml-2">
        <Button
          variant="outline"
          className="rounded-full px-6 py-3 text-base lowercase"
          onClick={() => trackCTAClick("see sample assets", `${location} secondary`)}
        >
          see sample assets
        </Button>
      </Link>
    </div>
  )
}



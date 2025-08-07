"use client"

import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function StickyCTA() {
  const isMobile = useMobile()
  if (!isMobile) return null

  return (
    <div className="md:hidden fixed bottom-16 inset-x-0 z-50 pointer-events-none">
      <div className="pointer-events-auto px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-2">
        <div className="mx-auto max-w-md rounded-full shadow-lg border bg-neutral-900 text-white">
          <Link href="/get-started" className="block text-center py-3 text-sm font-semibold">
            get started
          </Link>
        </div>
      </div>
    </div>
  )
}



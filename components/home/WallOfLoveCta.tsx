"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

export default function WallOfLoveCta() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="text-4xl">🤍</div>
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">wall of love</h2>
          <p className="text-neutral-600 lowercase">read what our clients say about prism</p>
          <div className="pt-2">
            <Link href="/wall-of-love">
              <Button
                className="rounded-full px-6 py-5 lowercase"
                onClick={() => trackCTAClick("visit wall of love", "wall of love cta")}
              >
                reviews
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


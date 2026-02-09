"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { trackCTAClick } from "@/utils/analytics"

export default function WallOfLoveCta() {
  return (
    <section className="relative bg-background py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_15%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(60%_60%_at_90%_30%,rgba(255,255,255,0.06),transparent_65%)]"
        aria-hidden
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="flex justify-center">
            <PixelishIcon src="/pixelish/emoji-heart.svg" alt="" size={40} aria-hidden className="opacity-95" />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">wall of love</h2>
          <p className="text-muted-foreground">read what our clients say about prism</p>
          <div className="pt-2">
            <Button asChild className="rounded-full px-6 py-5">
              <Link
                href="/wall-of-love"
                onClick={() => trackCTAClick("visit wall of love", "wall of love cta")}
              >
                reviews
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

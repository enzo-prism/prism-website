"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

export default function WebsitesFeatures() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">websites</h2>
          <p className="mt-3 text-neutral-600 lowercase md:text-lg">get more traffic and conversions</p>
        </div>

        <div className="mx-auto max-w-3xl mt-8">
          <ul className="grid gap-3 text-neutral-700 lowercase md:grid-cols-2">
            <li className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">optimized to appear in ai search</li>
            <li className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">world class ux</li>
            <li className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">mobile first design principles</li>
            <li className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">conversion copy + measurement ready</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <Link href="/websites">
            <Button
              className="rounded-full px-6 py-5 lowercase"
              onClick={() => trackCTAClick("learn more websites", "websites section")}
            >
              learn more
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}


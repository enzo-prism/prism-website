"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

export default function ValuesSection() {
  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-950 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <p className="text-sm font-medium tracking-[0.32em] text-neutral-500 lowercase dark:text-neutral-400">
            our values
          </p>
          <h2 className="text-3xl font-semibold tracking-tight lowercase text-neutral-900 sm:text-4xl md:text-5xl dark:text-neutral-50">
            impossible is temporary.
          </h2>
          <p className="text-base text-neutral-600 lowercase md:text-lg dark:text-neutral-300">
            our north star is simple — build things people love. ❤️
          </p>
          <div className="grid gap-3 text-sm text-neutral-600 lowercase md:text-base dark:text-neutral-300">
            <p>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">founders</span> love our websites and ad systems because they drive real growth.
            </p>
            <p>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">entrepreneurs</span> watch our content because it teaches, inspires, and gives them the tools to win.
            </p>
            <p>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">clients</span> love working with prism because we make the impossible feel inevitable.
            </p>
          </div>
          <div>
            <Button
              asChild
              className="rounded-full px-8 py-4 text-sm lowercase hardware-hover touch-feedback"
            >
              <Link
                href="/wall-of-love"
                onClick={() => trackCTAClick("visit wall of love", "values section")}
              >
                visit the wall of love <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

const valueHighlights = [
  {
    label: "founders",
    headline: "real growth, not vanity metrics.",
    description: "love our websites and ad systems because they drive real growth.",
  },
  {
    label: "entrepreneurs",
    headline: "content that teaches and inspires.",
    description: "watch our content because it teaches, inspires, and gives them the tools to win.",
  },
  {
    label: "clients",
    headline: "execution that makes the impossible feel inevitable.",
    description: "love working with prism because we make the impossible feel inevitable.",
  },
] as const

export default function ValuesSection() {
  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-950 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 text-center lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16 lg:text-left">
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-[0.32em] text-neutral-500 lowercase dark:text-neutral-400">
                our values
              </p>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight lowercase text-neutral-900 sm:text-4xl md:text-5xl dark:text-neutral-50">
                  impossible is temporary.
                </h2>
                <p className="text-base text-neutral-600 lowercase md:text-lg dark:text-neutral-300">
                  our north star is simple — build things people love. ❤️
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
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
            <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
              {valueHighlights.map((value) => (
                <article
                  key={value.label}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-neutral-200/70 bg-white/70 p-6 text-neutral-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800/70 dark:bg-neutral-900/70 dark:text-neutral-300"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-medium tracking-[0.24em] text-neutral-500 lowercase dark:text-neutral-400">
                      {value.label}
                    </span>
                    <h3 className="text-lg font-semibold leading-tight text-neutral-900 lowercase dark:text-neutral-100">
                      {value.headline}
                    </h3>
                    <p className="text-sm leading-relaxed md:text-base">{value.description}</p>
                  </div>
                  <div className="mt-6 h-px w-12 bg-neutral-200 transition-colors duration-200 group-hover:bg-neutral-900 dark:bg-neutral-800 dark:group-hover:bg-neutral-200" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

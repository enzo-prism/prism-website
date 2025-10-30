"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"

export default function ValuesSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761856728/garden_cejtbs.webp"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900/55 via-neutral-900/35 to-white/65 backdrop-blur-sm dark:from-neutral-950/75 dark:via-neutral-950/80 dark:to-neutral-950/88"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight lowercase text-neutral-50 sm:text-4xl md:text-5xl dark:text-neutral-50">
                impossible is temporary.
              </h2>
              <p className="text-base text-neutral-200 lowercase md:text-lg dark:text-neutral-200">
                our north star is simple — build things people love. 🤍
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                variant="inverted"
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
      </div>
    </section>
  )
}

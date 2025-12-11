"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ArrowRight, Gift } from "lucide-react"

const TYPEFORM_URL = "https://fxuqp40sseh.typeform.com/to/ln0VzAjB"

export default function ReferralSection() {
  return (
    <section className="border-t border-neutral-100 bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tight lowercase sm:text-4xl">
              know a business that could use our help?
            </h2>
            <p className="text-neutral-600 lowercase md:text-lg">
              invite them to prism for a free analysis — we’ll show them how to grow with better systems, design, and data.
            </p>
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="flex items-center gap-3">
                <Gift className="h-6 w-6 text-primary" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  earn up to $1,000
                </p>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                get paid when your referral becomes a prism client. we’ll keep you updated every step of the way.
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full lowercase">
                <Link href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer">
                  refer a business <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full lowercase">
                <Link href="/refer">
                  see referral program
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

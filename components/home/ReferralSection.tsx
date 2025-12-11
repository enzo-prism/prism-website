"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const TYPEFORM_URL = "https://fxuqp40sseh.typeform.com/to/ln0VzAjB"

export default function ReferralSection() {
  return (
    <section className="border-t border-neutral-100 bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">referrals</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight lowercase sm:text-4xl">
            share prism with a friend
          </h2>
          <p className="mt-3 text-sm text-neutral-600 lowercase sm:text-base">
            connect us with a founder who's looking to grow without handling all the tech themselves.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="w-full rounded-full lowercase sm:w-auto">
              <Link href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer">
                refer a business <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full rounded-full lowercase sm:w-auto">
              <Link href="/refer">
                see referral details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

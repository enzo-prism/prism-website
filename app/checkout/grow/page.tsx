import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "grow plan checkout | prism",
  description: "confirm your prism grow website plan and finalize billing details.",
  path: "/checkout/grow",
  index: false,
})

export default function GrowCheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <main className="flex-1 py-12 sm:py-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
             <Button variant="ghost" size="sm" asChild className="gap-2 pl-0 hover:bg-transparent hover:text-muted-foreground">
                <Link href="/get-started">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Get Started
                </Link>
             </Button>
          </div>
          <div className="mb-10 rounded-md border border-border/60 bg-card/30 p-6 shadow-none backdrop-blur-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-flex items-center justify-center rounded-md border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200 font-pixel">
                  Grow Plan
                </span>
                <h1 className="text-4xl font-semibold sm:text-5xl">
                  start your grow plan
                </h1>
                <p className="max-w-xl text-muted-foreground">
                  A conversion-focused website designed to help your business attract more customers and grow online.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-border/60 bg-card/20 px-4 py-3 text-sm text-muted-foreground shadow-none backdrop-blur-sm sm:self-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-sky-400/30 bg-sky-500/10 text-sky-200 text-[10px] font-semibold font-pixel tracking-[0.16em]">
                  1:1
                </div>
                <div className="leading-tight text-left">
                  <div className="font-semibold text-foreground">personal kickoff</div>
                  <div className="text-muted-foreground">we respond within one business day</div>
                </div>
              </div>
            </div>
          </div>

          <CheckoutForm plan="grow" />
        </div>
      </main>
      <Footer />
    </div>
  )
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "grow plan checkout | prism",
  description: "confirm your prism grow website plan and finalize billing details.",
  alternates: {
    canonical: "https://www.design-prism.com/checkout/grow",
  },
}

export default function GrowCheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12 sm:py-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
             <Button variant="ghost" size="sm" asChild className="gap-2 pl-0 hover:bg-transparent hover:text-neutral-600">
                <Link href="/pricing">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Pricing
                </Link>
             </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-6">
            start your grow plan
          </h1>
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-4">
              Grow Plan
            </span>
            <p className="text-slate-600 mt-4 max-w-md mx-auto">
              A conversion-focused website designed to help your business attract more customers and grow online.
            </p>
          </div>

          {/* Plan details */}
          <div className="mb-8 p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900 mb-3">What you get with the Grow Plan:</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Custom website design optimized for conversions</li>
              <li>Mobile-responsive layout that works on all devices</li>
              <li>SEO-friendly structure to help you rank in search</li>
              <li>Fast loading speeds for better user experience</li>
              <li>Contact forms and lead capture integration</li>
              <li>30 days of post-launch support</li>
            </ul>
          </div>

          <CheckoutForm plan="grow" />

          {/* Trust signals */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Secure checkout powered by Stripe. Your information is protected.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

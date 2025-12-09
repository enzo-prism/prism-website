import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "launch plan checkout | prism",
  description: "confirm your prism launch website plan and finalize billing details.",
  alternates: {
    canonical: "https://www.design-prism.com/checkout/launch",
  },
}

export default function LaunchCheckoutPage() {
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
            start your launch plan
          </h1>
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-4">
              Launch Plan
            </span>
            <p className="text-slate-600 mt-4 max-w-md mx-auto">
              Everything in Grow, plus advanced features to accelerate your business growth and online presence.
            </p>
          </div>

          {/* Plan details */}
          <div className="mb-8 p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h2 className="font-semibold text-slate-900 mb-3">What you get with the Launch Plan:</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Everything in the Grow Plan, plus:</li>
              <li>Advanced SEO optimization and keyword strategy</li>
              <li>Google Business Profile setup and optimization</li>
              <li>Local listing management across major directories</li>
              <li>Monthly performance reporting and insights</li>
              <li>Priority support with faster response times</li>
              <li>60 days of post-launch support</li>
            </ul>
          </div>

          <CheckoutForm plan="launch" />

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

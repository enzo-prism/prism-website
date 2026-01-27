import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import RecentLaunchesCarousel from "@/components/checkout/recent-launches-carousel"
import { websiteProjects } from "@/lib/website-projects"

export const metadata: Metadata = {
  title: "launch plan checkout | prism",
  description: "confirm your prism launch website plan and finalize billing details.",
  alternates: {
    canonical: "https://www.design-prism.com/checkout/launch",
  },
  robots: {
    index: false,
    follow: false,
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
                <Link href="/get-started">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Get Started
                </Link>
             </Button>
          </div>
          <div className="mb-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3 text-center sm:text-left">
                <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
                  Launch Plan
                </span>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                  start your launch plan
                </h1>
                <p className="text-slate-600 max-w-xl">
                  Fill out the details below so our team can contact you with next steps.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm sm:self-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  1:1
                </div>
                <div className="leading-tight text-left">
                  <div className="font-semibold text-slate-900">personal kickoff</div>
                  <div className="text-slate-600">we respond within one business day</div>
                </div>
              </div>
            </div>
          </div>

          <CheckoutForm plan="launch" />

          <div className="mt-16">
            <RecentLaunchesCarousel projects={websiteProjects} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

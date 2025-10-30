import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "plan sent | next steps from prism",
  description:
    "thanks for sending your prism pricing plan. we'll review your selections and follow up with next steps shortly.",
  openGraph: {
    title: "plan sent | next steps from prism",
    description:
      "thanks for sending your prism pricing plan. we'll review your selections and follow up with next steps shortly.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/pricing/thank-you",
  },
}

export default function PricingThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Pricing Plan Submitted" />
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-24 sm:py-32">
        <div className="flex w-full max-w-xl flex-col items-center gap-8 rounded-3xl border border-neutral-200 bg-white/60 p-10 text-center shadow-sm backdrop-blur">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white">
            <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">plan on the way</p>
            <h1 className="text-4xl font-semibold lowercase tracking-tight text-neutral-900 sm:text-5xl">
              thank you for sending your plan
            </h1>
            <p className="text-base text-neutral-600 sm:text-lg">
              We&apos;re reviewing your selections and will send next steps, timelines, and a kickoff note to your inbox
              soon.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/">Return to homepage</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8">
              <Link href="/pricing">Adjust your plan</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

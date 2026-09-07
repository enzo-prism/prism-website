import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import LeadSuccessTracker from "@/components/thank-you/LeadSuccessTracker"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pricing reviewed: next steps',
  description:
    'Explore your next step with Prism: share your project or start with a free Growth Dashboard.',
  path: "/pricing/thank-you",
  index: false,
  ogImage: "/prism-opengraph.png",
})

export default function PricingThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LeadSuccessTracker />
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-24 sm:py-32">
        <div className="flex w-full max-w-xl flex-col items-center gap-8 rounded-3xl border border-neutral-200 bg-white/60 p-10 text-center shadow-sm backdrop-blur">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white">
            <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
          </div>
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">your next step</p>
            <h1 className="text-4xl font-semibold lowercase tracking-tight text-neutral-900 sm:text-5xl">
              thanks for reviewing pricing
            </h1>
            <p className="text-base text-neutral-600 sm:text-lg">
              Ready to explore a project? Start with a free Growth Dashboard and request an audit from the team.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/">Return to homepage</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8">
              <Link href="/get-started">Get started free</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

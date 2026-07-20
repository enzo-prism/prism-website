import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PurchaseSuccessTracker from "@/components/thank-you/PurchaseSuccessTracker"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import { firstSearchParamString } from "@/lib/search-params"

const ORDER_PRICE = 300

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Website order confirmed',
  description:
    'Your $300 website payment is confirmed. Prism starts the build now and delivers your first version in about 7 days, then iterates until you love it.',
  path: "/checkout/website/thank-you",
  index: false,
})

/**
 * Post-payment confirmation for the flat-$300 website order.
 *
 * Stripe's Payment Link redirects here with `?session_id={CHECKOUT_SESSION_ID}`
 * (see scripts/update-website-payment-link.sh). That id gives GA4 and Google
 * Ads a stable key to de-duplicate on, and PurchaseSuccessTracker shape-checks
 * it before reporting anything.
 *
 * It is NOT proof of payment — the value arrives in the URL, so only a
 * server-side session lookup or a Stripe webhook can confirm a real purchase.
 * See docs/analytics.md for that upgrade path.
 */
export default async function WebsiteOrderThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>
}) {
  const resolvedSearchParams = await searchParams
  const sessionId = firstSearchParamString(resolvedSearchParams?.session_id)

  return (
    <div className="flex min-h-screen flex-col bg-[#040404] font-sans text-[#f5f0e8]">
      <PurchaseSuccessTracker
        transactionId={sessionId}
        value={ORDER_PRICE}
        currency="USD"
        itemId="website"
        itemName="Website by Prism"
      />
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-xl border border-white/10 bg-[#070707] p-8 shadow-[0_30px_90px_-60px_rgba(216,188,121,0.65)] sm:p-12">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
            Payment confirmed
          </p>
          <h1 className="mt-5 text-balance font-sans text-[clamp(1.9rem,5vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            We're building your website.
          </h1>
          <p className="mt-5 text-[1rem] leading-7 text-[#b8afa2]">
            Your $300 payment is in and your brief is already with the team. Your
            first version lands in about 7 days, and then we iterate until you
            love it.
          </p>

          <ol className="mt-9 space-y-4 border-t border-white/10 pt-7">
            {[
              'A confirmation email is on its way with your receipt.',
              'We review your brief and start the build — no kickoff call required.',
              'You get your first version in about 7 days, then unlimited revisions.',
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="mt-[0.15rem] font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[#d8bc79]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.95rem] leading-6 text-[#b8afa2]">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 flex-1 items-center justify-center border border-[#d8bc79]/60 bg-[#d8bc79]/12 px-7 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-[#f5f0e8] transition-colors duration-200 hover:bg-[#d8bc79]/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/40 motion-reduce:transition-none"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 flex-1 items-center justify-center border border-white/14 bg-white/[0.02] px-5 font-mono text-[0.76rem] uppercase tracking-[0.18em] text-[#b8afa2] transition-colors duration-200 hover:border-white/28 hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 motion-reduce:transition-none"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

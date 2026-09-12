import type { Metadata } from 'next'
import Link from 'next/link'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Website order received',
  description:
    'Prism received your website order and will review the brief before confirming scope, timing, and next steps.',
  path: '/checkout/website/thank-you',
  index: false,
})

/**
 * Legacy Stripe redirect landing page. Query strings are not payment proof.
 * Revenue must come from a verified paid live session/webhook, never arrival
 * at this public URL. Keep the receipt/help surface available for old links.
 */
export default function WebsiteOrderThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#040404] font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-xl border border-white/10 bg-[#070707] p-8 shadow-[0_30px_90px_-60px_rgba(216,188,121,0.65)] sm:p-12">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-[#d8bc79]">
            Order received
          </p>
          <h1 className="mt-5 text-balance font-sans text-[clamp(1.9rem,5vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            We&apos;ve received your website order.
          </h1>
          <p className="mt-5 text-[1rem] leading-7 text-[#b8afa2]">
            Your brief is with the team. Prism will verify the order, review the
            requested scope, and reply within two business days with timing and
            next steps.
          </p>

          <ol className="mt-9 space-y-4 border-t border-white/10 pt-7">
            {[
              'Stripe sends the payment receipt when the transaction completes.',
              'We review the brief, scope, and requested launch path.',
              'Prism confirms timing and the next step within two business days.',
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

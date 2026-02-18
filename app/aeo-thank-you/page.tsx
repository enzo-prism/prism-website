import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "AEO assessment received | prism",
  description: "Your free AEO assessment is submitted and we will send your recommendations soon.",
  path: "/aeo-thank-you",
  index: false,
})

export default function AeoThankYouPage() {
  return (
    <>
      <Script
        id="google-ads-conversion-thank-you"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {
              'send_to': 'AW-11373090310/hBMrCMijk70bEIasjq8q',
              'value': 1.0,
              'currency': 'USD'
            });
          `,
        }}
      />
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <section className="px-6 py-16 sm:py-24">
            <div className="mx-auto flex max-w-4xl flex-col gap-10">
              <RevealOnScroll>
                <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <PixelishIcon
                      src="/pixelish/circle-checkmark.svg"
                      alt=""
                      size={48}
                      invert={false}
                      aria-hidden
                    />
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Assessment received</p>
                      <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                        Your free AEO assessment is on its way.
                      </h1>
                      <p className="text-base text-slate-600">
                        Thanks for submitting. We will review your site, then send your assessment and next-step recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">next</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">Want a discovery call next?</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Bring the assessment and your goals. We’ll confirm priorities and map a launch sequence that keeps momentum.
                    </p>
                    <Button
                      asChild
                      className="mt-5 w-full rounded-full border border-black bg-black px-6 py-3 text-base font-semibold text-white hover:bg-black/90"
                    >
                      <a
                        href="https://calendar.notion.so/meet/enzosison/sfux4ogo"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Book a 15-minute Prism kickoff call"
                      >
                        Book a call →
                      </a>
                    </Button>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">explore next</p>
                    <div className="mt-3 space-y-3 text-sm text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-900">See AEO framework details</p>
                        <Link href="/aeo" className="text-slate-900 underline-offset-4 hover:underline">
                          Read the AEO page →
                        </Link>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Browse AI SEO services</p>
                        <Link href="/ai-seo-services" className="text-slate-900 underline-offset-4 hover:underline">
                          AI SEO services →
                        </Link>
                      </div>
                      <p>
                        Need a deeper roadmap? Check out{" "}
                        <Link href="/seo/audit" className="text-slate-900 underline-offset-4 hover:underline">
                          SEO audit service
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <Link
                  href="/"
                  className="text-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                >
                  ← Back to home
                </Link>
              </RevealOnScroll>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

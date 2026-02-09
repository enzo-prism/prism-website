import type { Metadata } from "next"
import Link from "next/link"

import FreeAnalysisForm from "@/components/forms/FreeAnalysisForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { WebPageSchema } from "@/components/schema-markup"

const PAGE_TITLE = "Free analysis | prism"
const PAGE_DESCRIPTION =
  "Request a free review of your current website, Google listing, and visibility metrics."
const CANONICAL_URL = "https://www.design-prism.com/free-analysis"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism free analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
  },
}

export default function FreeAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-background px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              free analysis
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Get a free analysis of your current website and visibility.
            </h1>
            <p className="text-lg text-muted-foreground">
              We will review your site, Google listing, and performance — then show you how AI-powered design could double
              your traffic. No cost, no commitment.
            </p>
            <p className="text-sm text-muted-foreground">
              Need a deeper crawl and prioritized fixes? See our{" "}
              <Link
                href="/seo/audit"
                className="font-semibold text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border"
              >
                seo audit service
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
              <div>
                <p className="font-pixel text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  what you will receive
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  A concise plan with data-backed recommendations.
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Our team analyzes your online presence and delivers actionable insights within 48 hours.
                Here is what your free analysis includes:
              </p>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Technical and SEO health score with prioritized fixes to improve your search rankings.</span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Visibility snapshot across Google Search, Google Maps, and social channels.</span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Design and messaging improvements tailored to your specific offers and target audience.</span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Competitor comparison showing how you stack up against similar businesses in your area.</span>
                </li>
              </ul>
              <div className="rounded-2xl border border-dashed border-border/60 bg-muted/40 p-5 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Need it sooner?</strong> Mention your timeline in the notes — we
                  prioritize urgent requests and can often deliver within 24 hours.
                </p>
              </div>
            </div>
            <FreeAnalysisForm />
          </div>
        </section>
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}

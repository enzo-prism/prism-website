import type { Metadata } from "next"

import Footer from "@/components/footer"
import GetStartedForm from "@/components/forms/GetStartedForm"
import Navbar from "@/components/navbar"
import { WebPageSchema } from "@/components/schema-markup"
import TrackedLink from "@/components/tracked-link"
import styles from "@/components/get-started/get-started-page.module.css"
import { cn } from "@/lib/utils"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const PAGE_TITLE = "Apply to work with Prism | Prism"
const PAGE_DESCRIPTION =
  "Apply to work with Prism. Better websites, sharper analytics, stronger acquisition, and modern AI workflows. Every real submission gets reviewed."
const CANONICAL_URL = "https://www.design-prism.com/apply"

const APPLY_NOTES = [
  "We help businesses grow with better websites, sharper analytics, stronger acquisition, and modern AI workflows.",
  "Most engagements start between $1k and $3k/month.",
  "Every real submission gets reviewed. If there's a fit, we'll reach out about a custom strategy session.",
] as const

const APPLY_EXPECTATIONS = [
  "Short application",
  "Review guaranteed",
  "Strategy is selective",
] as const

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/apply",
  ogImage: "/prism-opengraph.png",
})

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#040404] font-sans text-[#F5F5F2]">
      <Navbar />
      <main className="flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <section className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-10">
          <div
            className={cn(
              styles.sectionFrame,
              styles.scanlines,
              "relative overflow-hidden border border-white/10 bg-[#070707] px-6 py-6 sm:px-8 sm:py-8 lg:sticky lg:top-[calc(var(--prism-header-height,4rem)+1rem)] lg:self-start",
            )}
          >
            <div className={styles.noiseField} aria-hidden="true" />
            <span className={styles.corner} data-corner="tl" aria-hidden="true" />
            <span className={styles.corner} data-corner="tr" aria-hidden="true" />
            <span className={styles.corner} data-corner="bl" aria-hidden="true" />
            <span className={styles.corner} data-corner="br" aria-hidden="true" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <p className="font-mono text-[0.76rem] uppercase tracking-[0.4em] text-[#9EFF2E]">
                  APPLICATION
                </p>
                <h1 className="max-w-[9ch] text-balance font-sans text-[clamp(2.45rem,5.4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[#F5F5F2]">
                  Apply to work with Prism.
                </h1>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                {APPLY_NOTES.map((note) => (
                  <p
                    key={note}
                    className="font-mono text-[0.98rem] leading-8 text-[#C6C6C0]"
                  >
                    {note}
                  </p>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                {APPLY_EXPECTATIONS.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-[0.76rem] uppercase tracking-[0.24em] text-[#767670]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-mono text-[0.9rem] uppercase tracking-[0.14em] text-[#D6D6CF]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6">
                <TrackedLink
                  href="/get-started"
                  label="back to get started"
                  location="apply page back link"
                  className="font-mono text-[0.78rem] uppercase tracking-[0.24em] text-[#A0A09A] transition-colors hover:text-[#F5F5F2] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  Back to the 3-step overview
                </TrackedLink>
              </div>
            </div>
          </div>

          <GetStartedForm />
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

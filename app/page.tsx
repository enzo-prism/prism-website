import type { Metadata } from "next"
import Link from "next/link"
import { getStaticHeroReview, renderFormattedText } from "@/content/wall-of-love-data"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism growth engine for local businesses",
  description:
    "launch high-converting websites, paid ads, and local seo with one partner so your small business gets found, trusted, and chosen.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const staticHeroReview = getStaticHeroReview()

  return (
    <>
      <section
        id="static-home-hero"
        className="bg-neutral-900 text-white"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight">prism growth engine for local businesses</h1>
            <p className="text-lg leading-relaxed text-white/80">
              prism designs, builds, and markets the digital storefronts that keep neighborhood brands booked. we combine fast websites, local-first seo, and paid acquisition into one measurable system so your team can focus on the work only you can do.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/80"
              >
                view pricing
              </Link>
              <Link
                href="/free-analysis"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                free design audit
              </Link>
            </div>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p>
              teams partner with prism to clarify messaging, modernize design, and automate follow-up. every engagement starts with a complimentary audit that surfaces the gaps in your current experience and ends with a roadmap that ties aesthetics to revenue metrics.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              <li className="rounded-xl border border-white/20 px-4 py-3">
                conversion-focused websites that load fast, rank locally, and guide visitors to book.
              </li>
              <li className="rounded-xl border border-white/20 px-4 py-3">
                performance ad campaigns with landing pages, creative, and reporting under one roof.
              </li>
              <li className="rounded-xl border border-white/20 px-4 py-3">
                local listing optimization and reputation workflows that keep your practice discoverable.
              </li>
              <li className="rounded-xl border border-white/20 px-4 py-3">
                analytics instrumentation so every channel shows its contribution to new revenue.
              </li>
            </ul>
            {staticHeroReview ? (
              <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white/90 backdrop-blur-sm">
                <p className="text-base leading-relaxed">
                  &ldquo;{renderFormattedText(staticHeroReview.text)}&rdquo;
                </p>
                <div className="mt-3 text-sm text-white/70">
                  <span className="font-semibold text-white">{staticHeroReview.client}</span>
                  <span className="mx-2 text-white/40">•</span>
                  <span>{staticHeroReview.company}</span>
                </div>
                <Link
                  href="/wall-of-love"
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/70 transition hover:text-white"
                >
                  explore the wall of love
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <noscript>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl space-y-4 text-neutral-900">
            <h2 className="text-2xl font-semibold">prism for local businesses</h2>
            <p>
              if you are viewing this page without javascript, here is the short version: prism designs and powers digital experiences that help neighborhood brands earn trust and new revenue. we build fast websites, run performance ads, and optimize local listings under one strategy so your team can focus on serving clients.
            </p>
            <p>
              ready to see how it fits your business? review our <a href="/pricing">pricing plans</a> or request a <a href="/get-started">free design audit</a>.
            </p>
          </div>
        </section>
      </noscript>
      <ClientPage />
    </>
  )
}

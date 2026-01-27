import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "shoot request received | prism",
  description: "Your photography windows are on our calendar—look for a confirmation email with next steps.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.design-prism.com/book-a-shoot/thank-you",
  },
}

export default function BookAShootThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-50 px-4 py-12 sm:py-20">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">shoot request sent</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              windows received—thanks for the details.
            </h1>
            <p className="mt-4 text-base text-neutral-600">
              We&apos;ll reply within one business day to confirm your preferred time, share travel details, and send the prep
              checklist for your team.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto grid max-w-5xl gap-6 lg:grid-cols-[3fr_2fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">what happens next</p>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                  <p className="text-sm font-semibold text-neutral-900">1. Confirmation email</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Expect a note from <span className="font-semibold">support@design-prism.com</span> confirming the shoot window
                    and travel logistics.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                  <p className="text-sm font-semibold text-neutral-900">2. Prep checklist</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    We&apos;ll include lighting, wardrobe, and staging tips so your team, ops lead, and signage look production-ready.
                  </p>
                </div>
                <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                  <p className="text-sm font-semibold text-neutral-900">3. Shoot day reminders</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    We send reminders 48 hours ahead with final timing, gear list, and what to expect when the crew arrives.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">stay ready</p>
              <div className="mt-4 space-y-4 text-sm text-neutral-600">
                <div>
                  <p className="font-semibold text-neutral-900">Get the office + team checklist</p>
                  <Link
                    href="/dental-photography/office-team"
                    className="text-neutral-900 underline-offset-4 hover:underline"
                  >
                    review the walkthrough →
                  </Link>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Dial in before + after shots</p>
                  <Link
                    href="/dental-photography/before-after"
                    className="text-neutral-900 underline-offset-4 hover:underline"
                  >
                    view the guide →
                  </Link>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  asChild
                  className="w-full rounded-2xl border border-neutral-900 bg-neutral-900 px-6 py-3 text-base font-semibold text-white hover:bg-neutral-900/90"
                >
                  <a href="mailto:support@design-prism.com" aria-label="Email Prism support">
                    email support
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-base font-semibold text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50"
                >
                  <a
                    href="https://calendar.notion.so/meet/enzosison/sfux4ogo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a 15-minute kickoff call"
                  >
                    book a call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

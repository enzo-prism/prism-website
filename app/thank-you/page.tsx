import type { Metadata } from "next"

import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ApplyDashboardClaimCta from "@/components/thank-you/ApplyDashboardClaimCta"
import ApplySuccessTracker from "@/components/thank-you/ApplySuccessTracker"
import LeadSuccessTracker from "@/components/thank-you/LeadSuccessTracker"
import { buildRouteMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Thank you | Prism",
  description:
    "We received your submission. Every real inquiry is reviewed, and Prism reaches out when the next step is a fit.",
  path: "/thank-you",
  index: false,
})

const DEFAULT_NEXT_STEPS = [
  {
    label: "01",
    title: "Submission received",
    body: "Your form is in. The team has what it needs to begin the review.",
  },
  {
    label: "02",
    title: "Review is guaranteed",
    body: "Every real submission gets reviewed. That review is part of the standard flow.",
  },
  {
    label: "03",
    title: "Next step is selective",
    body: "If there is a fit, Prism will reach out with the right next step, including a strategy conversation when it makes sense.",
  },
] as const

const APPLY_NEXT_STEPS = [
  {
    label: "01",
    title: "Dashboard intake received",
    body: "Thanks, we've got it. Your Growth Dashboard intake is in the queue.",
  },
  {
    label: "02",
    title: "Dashboard link sent",
    body: "We sent a private dashboard link to the email you entered. Claim it to follow the audit from one place.",
  },
  {
    label: "03",
    title: "Light Audit findings live there",
    body: "Your Light Audit findings will appear in the dashboard. If you become a Prism client, growth data and progress updates will live there too.",
  },
] as const

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const isApplyFlow = resolvedSearchParams?.source === "apply"
  const nextSteps = isApplyFlow ? APPLY_NEXT_STEPS : DEFAULT_NEXT_STEPS

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#040404] font-sans text-[#F5F5F2]">
        {isApplyFlow ? <ApplySuccessTracker /> : <LeadSuccessTracker />}
        <Navbar />
        <main className="flex-1 px-4 py-16 sm:px-6 sm:py-20">
          <section className="mx-auto max-w-[1180px] space-y-8">
            <div className="border border-white/10 bg-[#070707] px-6 py-8 sm:px-10 sm:py-12">
              <p className="font-mono text-[0.76rem] uppercase tracking-[0.4em] text-[#9EFF2E]">
                {isApplyFlow ? "GROWTH DASHBOARD" : "RECEIVED"}
              </p>
              <h1 className="mt-6 max-w-[9ch] text-balance font-sans text-[clamp(2.45rem,5.4vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[#F5F5F2]">
                {isApplyFlow ? "Dashboard intake received." : "Review in progress."}
              </h1>
              <p className="mt-6 max-w-[42rem] font-mono text-[1rem] leading-8 text-[#A0A09A]">
                {isApplyFlow
                  ? "Thanks, we've got it. Every real practice submission receives a Light Audit, and we sent a private dashboard link to the email you entered. Claim it to follow findings and future growth updates from one place."
                  : "We received your submission. Every real inquiry gets reviewed. If there&apos;s a fit, we&apos;ll reach out with the right next step."}
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {nextSteps.map((step) => (
                <article
                  key={step.label}
                  className="border border-white/10 bg-[#070707] px-5 py-5"
                >
                  <p className="font-mono text-[0.8rem] uppercase tracking-[0.32em] text-[#767670]">
                    {step.label}
                  </p>
                  <h2 className="mt-4 font-sans text-[1.45rem] font-medium tracking-[-0.04em] text-[#F5F5F2]">
                    {step.title}
                  </h2>
                  <p className="mt-4 font-mono text-[0.92rem] leading-7 text-[#C6C6C0]">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-4 border border-white/10 bg-[#070707] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-sans text-[1.5rem] font-medium tracking-[-0.04em] text-[#F5F5F2]">
                  {isApplyFlow ? "While we review" : "In the meantime"}
                </p>
                <p className="mt-2 font-mono text-[0.92rem] leading-7 text-[#A0A09A]">
                  {isApplyFlow
                    ? "Check your inbox for the dashboard link, or claim it from this page if you submitted from this browser."
                    : "You can review case studies or head back home."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/case-studies"
                  className="inline-flex min-h-12 items-center justify-center border border-white/12 px-5 py-3 font-mono text-[0.82rem] uppercase tracking-[0.2em] text-[#F5F5F2] transition-colors hover:border-[#9EFF2E]/45 hover:text-[#9EFF2E] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#9EFF2E]/35"
                >
                  View case studies
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center border border-white/12 px-5 py-3 font-mono text-[0.82rem] uppercase tracking-[0.2em] text-[#A0A09A] transition-colors hover:border-white/30 hover:text-[#F5F5F2] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  Back to home
                </Link>
              </div>
            </div>
            {isApplyFlow ? <ApplyDashboardClaimCta /> : null}
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

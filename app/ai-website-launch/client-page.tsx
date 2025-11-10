"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertTriangle, ArrowRight, CheckCircle2, Quote, Sparkles, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { trackCTAClick, trackFormSubmission } from "@/utils/analytics"

const painPoints = [
  "You’re tired of waiting weeks and still not getting what you paid for.",
  "Your site looks outdated — and clients notice before you can explain your services.",
  "You’ve lost trust because your online presence doesn’t match your real quality.",
  "Agencies promise ‘strategy’ — then bill you thousands for a slow, confusing process.",
]

const howItWorksSteps = [
  "Tell us about your business — takes 3 minutes.",
  "Our AI builds your site preview — you’ll see it within 24 hours.",
  "Launch & grow — SEO-ready, mobile-friendly, connected to Google tools.",
]

const valueList = [
  "Modern design that builds instant trust",
  "Copy written for conversion — not fluff",
  "Domain & hosting setup help",
  "SEO optimization + Google Analytics",
  "Mobile & tablet responsiveness",
  "48–72 hour turnaround",
  "No subscriptions — you own it",
]

const proofItems = [
  {
    quote: "“Prism rebuilt our site in two days — and we started getting calls again.”",
    person: "Dr. Ji",
    role: "Grace Dental Santa Rosa",
  },
  {
    quote: "“They handled everything. I just sent photos and went live.”",
    person: "Tiff Woo",
    role: "SR4 Partners",
  },
  {
    quote: "“Finally a web company that actually delivers.”",
    person: "Lax",
    role: "Infobell IT",
  },
]

const comparisonRows = [
  {
    oldWay: "4–8 week project",
    prismWay: "48 hours flat",
  },
  {
    oldWay: "Endless meetings",
    prismWay: "3-minute intake",
  },
  {
    oldWay: "$2 000–$10 000 cost",
    prismWay: "$400 flat",
  },
  {
    oldWay: "‘Maybe next month’ launch",
    prismWay: "Live this week",
  },
]

const FORM_ENDPOINT = "https://formspree.io/f/manawlzn"
const GROWTH_CALL_LINK = "https://calendar.notion.so/meet/enzosison/sfux4ogo"

const CTA_TARGET_ID = "launch-form"

const heroCtaLabel = "Get My Website →"
const howItWorksCtaLabel = "Start My 48-Hour Build →"
const valueCtaLabel = "Get My AI Website →"
const upgradeCtaLabel = "Book a 15-Minute Growth Call →"
const formButtonLabel = "Generate My Site Plan →"

export default function AiWebsiteLaunchClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleCtaClick = (label: string, location: string) => () => {
    trackCTAClick(label, location)
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitError(null)
    setIsSubmitting(true)
    trackFormSubmission("ai_website_launch", "final_cta_form")

    try {
      const formData = new FormData(form)
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Formspree rejected submission")
      }
      form.reset()
      setIsSubmitting(false)
      router.push("/thank-you?utm_source=google_ads")
    } catch (error) {
      console.error("[AI Website Launch] form submission failed", error)
      setSubmitError("We couldn’t submit right now. Please try again in a moment.")
      setIsSubmitting(false)
      return
    }
  }

  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:py-16 lg:py-24">
          <Badge
            variant="outline"
            className="border-slate-200 bg-white text-slate-600 uppercase tracking-[0.22em] text-xs sm:text-sm sm:tracking-[0.3em]"
          >
            ai launch offer
          </Badge>
          <div className="space-y-5 text-center sm:text-left">
            <h1 className="text-[clamp(2.1rem,6vw,3.6rem)] font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Launch a stunning, high-performing website in 48 hours — built by AI, perfected by experts.
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              You don&apos;t need another quote, meeting, or six-week project. You need a site that looks incredible,
              loads fast, and actually brings you leads. Prism builds and launches it in days — for a flat $400.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Button asChild size="lg" className="text-base w-full sm:w-auto">
              <a href={`#${CTA_TARGET_ID}`} onClick={handleCtaClick(heroCtaLabel, "hero section")}>
                {heroCtaLabel}
              </a>
            </Button>
            <p className="text-sm text-slate-500 text-center sm:text-left">
              Trusted by 50+ businesses in California — from dentists to consultants to local shops.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="bg-slate-50 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-10">
          <header className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">pain points</p>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">Your current website is costing you business.</h2>
            </div>
          </header>
          <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {painPoints.map((point) => (
              <li key={point} className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
                <AlertTriangle className="mt-1 h-5 w-5 text-rose-500" aria-hidden />
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{point}</p>
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-lg font-medium text-slate-800">
            Prism fixes all of that — with AI speed and agency-level design.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-10 rounded-[32px] border border-slate-200 bg-white px-4 py-10 sm:px-8 lg:grid lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:gap-12 lg:space-y-0">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">speed run</p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">From zero to launch in 48 hours.</h2>
            <ol className="space-y-4">
              {howItWorksSteps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-slate-900 shadow-inner">
                    {index + 1}️⃣
                  </div>
                  <p className="flex-1 text-lg text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="text-base w-full sm:w-auto">
                <a href={`#${CTA_TARGET_ID}`} onClick={handleCtaClick(howItWorksCtaLabel, "how it works")}>
                  {howItWorksCtaLabel}
                </a>
              </Button>
              <p className="text-sm text-slate-500">No contracts. No hidden fees. Just momentum.</p>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex items-center gap-3 text-slate-600">
              <Zap className="h-5 w-5" aria-hidden />
              <span className="text-sm uppercase tracking-[0.35em]">intake preview</span>
            </div>
            <p className="mt-4 text-lg text-slate-700">
              We translate your 3-minute intake into layouts, copy, and tracking so you can react before anything goes
              live. Every step is captured in your project doc so nothing slips.
            </p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-emerald-500" aria-hidden />
                <div>
                  <p className="text-base font-semibold text-slate-900">
                    Live Preview in <span className="whitespace-nowrap">24 hours</span>
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    We send a share link with hero concepts, section copy, and CTA plan so you can green-light the build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-6 sm:p-10 lg:p-12">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">deliverables</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="lg:pr-8">
                <h2 className="text-3xl font-semibold sm:text-4xl">A complete, done-for-you site for just $400.</h2>
                <ul className="mt-6 grid gap-3 text-lg text-slate-700 sm:grid-cols-2">
                  {valueList.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-slate-900 lg:max-w-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">price anchor</p>
                <p className="mt-4 text-lg font-medium text-slate-700">
                  Other agencies charge $2 000–$5 000 for the same results. We charge $400 one-time. Why? Because AI
                  makes it faster — and we pass those savings straight to you.
                </p>
                <Button asChild size="lg" className="mt-6 w-full text-base">
                  <a href={`#${CTA_TARGET_ID}`} onClick={handleCtaClick(valueCtaLabel, "what you get")}>
                    {valueCtaLabel}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="bg-slate-50 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">proof</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Real sites. Real businesses. Real results.</h2>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {proofItems.map((item) => (
              <Card key={item.person} className="h-full border-slate-200 bg-white">
                <CardHeader className="space-y-4">
                  <Quote className="h-6 w-6 text-slate-300" aria-hidden />
                  <CardTitle className="text-lg font-semibold text-slate-900">{item.quote}</CardTitle>
                  <p className="text-sm text-slate-600">
                    {item.person} — {item.role}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="secondary" size="lg" className="text-base">
              <Link href="/proof" onClick={handleCtaClick("See more success stories", "proof section")}>
                See more success stories →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-6">
          <header className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">compare</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Because we removed everything you hate about web design.
            </h2>
          </header>
          <div className="space-y-4 md:hidden">
            {comparisonRows.map((row) => (
              <div key={row.oldWay} className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">old way</p>
                <p className="mt-2 text-base font-medium text-slate-600">{row.oldWay}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.4em] text-emerald-600">prism way</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{row.prismWay}</p>
              </div>
            ))}
          </div>
          <div className="hidden overflow-hidden rounded-3xl border border-slate-200 md:block">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.25em]">
                    Old Way
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-[0.25em]">
                    Prism Way
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-lg">
                {comparisonRows.map((row) => (
                  <tr key={row.oldWay} className="hover:bg-slate-50">
                    <td className="px-6 py-5 text-slate-600">{row.oldWay}</td>
                    <td className="px-6 py-5 font-semibold text-slate-900">{row.prismWay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Optional upgrade */}
      <section className="px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">optional upgrade</p>
          <div className="mt-6 space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">Want traffic, not just a website?</h2>
            <p className="text-lg text-slate-600">
              Once you’re live, our Growth team can manage your SEO, ads, and content for as low as $900/month. Most
              clients start with Launch, then scale when the leads start rolling in.
            </p>
          </div>
          <Button asChild size="lg" className="mt-6 w-full text-base sm:w-auto">
            <a
              href={GROWTH_CALL_LINK}
              target="_blank"
              rel="noreferrer noopener"
              onClick={handleCtaClick(upgradeCtaLabel, "optional upgrade")}
              onSubmit={handleFormSubmit}
            >
              {upgradeCtaLabel}
            </a>
          </Button>
        </div>
      </section>

      {/* Final CTA + Form */}
      <section id={CTA_TARGET_ID} className="bg-slate-50 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:gap-14">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">get your launch</p>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Ready to stop losing leads and start growing?
                </h2>
                <p className="text-lg text-slate-600">
                  You’ll get a modern, professional site — done for you, in 48 hours, for $400. No risk. No contracts.
                  Just results.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">what happens next</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>We confirm your intake within 1 business day.</li>
                  <li>You review your preview link and share tweaks.</li>
                  <li>We launch, connect tracking, and hand off assets.</li>
                </ul>
              </div>
            </div>

            <form
              action={FORM_ENDPOINT}
              method="POST"
              className="space-y-5 rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200 sm:p-6"
              onSubmit={handleFormSubmit}
            >
              <input
                type="hidden"
                name="_redirect"
                value="https://www.design-prism.com/thank-you?utm_source=google_ads"
              />
              <input type="hidden" name="_subject" value="New AI Website Request" />

              <div className="space-y-2">
                <label htmlFor="launch-name" className="text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  id="launch-name"
                  name="name"
                  autoComplete="name"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="launch-email" className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="launch-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="launch-business" className="text-sm font-semibold text-slate-700">
                  Business Name
                </label>
                <input
                  id="launch-business"
                  name="business"
                  autoComplete="organization"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="launch-website" className="text-sm font-semibold text-slate-700">
                  Current Website
                </label>
                <input
                  id="launch-website"
                  name="website"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="launch-industry" className="text-sm font-semibold text-slate-700">
                  Industry
                </label>
                <select
                  id="launch-industry"
                  name="industry"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  defaultValue="Dental"
                >
                  <option>Dental</option>
                  <option>Consulting</option>
                  <option>Local Business</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="launch-goals" className="text-sm font-semibold text-slate-700">
                  Goals
                </label>
                <textarea
                  id="launch-goals"
                  name="message"
                  rows={4}
                  placeholder="Describe what you’d like to achieve"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-inner focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base"
                onClick={handleCtaClick(formButtonLabel, "final form")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : formButtonLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              {submitError ? (
                <p className="text-center text-sm text-rose-600" role="alert">
                  {submitError}
                </p>
              ) : null}
              <p className="text-center text-xs text-slate-500">
                Form submits securely via Formspree. You’ll hit our thank-you page with next steps instantly.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
        100% satisfaction guarantee — we’ll keep tweaking until you’re proud. You own your site completely.
      </footer>
    </div>
  )
}

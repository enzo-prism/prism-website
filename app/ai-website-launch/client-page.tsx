import { AlertTriangle, CheckCircle2, Sparkles, Zap } from "lucide-react"

import AnimatedGradient from "@/components/animations/animated-gradient"
import RippleHighlight from "@/components/animations/ripple-highlight"
import AiWebsiteLaunchForm from "@/components/ai-website-launch/AiWebsiteLaunchForm"
import ClientsRail from "@/components/home/ClientsRail"
import RevealOnScroll from "@/components/reveal-on-scroll"
import TrackedAnchor from "@/components/tracked-anchor"
import VideoPlayer from "@/components/video-player"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

const GROWTH_CALL_LINK = "https://calendar.notion.so/meet/enzosison/sfux4ogo"

const CTA_TARGET_ID = "launch-form"

const heroCtaLabel = "Get My Website →"
const howItWorksCtaLabel = "Start My 48-Hour Build →"
const valueCtaLabel = "Get My AI Website →"
const upgradeCtaLabel = "Book a 15-Minute Growth Call →"
const formButtonLabel = "Generate My Site Plan →"

export default function AiWebsiteLaunchClientPage() {
  return (
    <div className="bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <AnimatedGradient
          className="absolute inset-x-0 top-0 h-[130%]"
          colors={["#bae6fd", "#c4b5fd"]}
          opacity={0.25}
          blur={220}
          parallaxIntensity={6}
        />
        <div className="relative mx-auto max-w-4xl space-y-8 px-4 py-12 sm:py-16 lg:py-24">
          <div className="space-y-6 text-center sm:text-left">
            <div className="relative inline-flex items-center justify-center sm:justify-start">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-sky-300/70 via-white/30 to-indigo-400/70 blur-2xl mix-blend-screen animate-pulse"
                style={{ boxShadow: "0 0 60px rgba(59,130,246,0.35)" }}
              />
              <Badge
                variant="outline"
                className="relative border-slate-200 bg-white text-slate-600 uppercase tracking-[0.22em] text-xs sm:text-sm sm:tracking-[0.3em]"
              >
                ai launch offer
              </Badge>
            </div>
            <div className="space-y-4">
              <h1 className="text-[clamp(2.1rem,6vw,3.6rem)] font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Launch a stunning, high-performing website in 48 hours — built by AI, perfected by experts.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                You don&apos;t need another quote, meeting, or six-week project. You need a site that looks incredible,
                loads fast, and actually brings you leads. Prism builds and launches it in days — for a flat $400.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
              <RippleHighlight asChild fullWidth className="sm:w-auto">
                <Button asChild size="lg" className="text-base w-full sm:w-auto">
                  <TrackedAnchor href={`#${CTA_TARGET_ID}`} label={heroCtaLabel} location="hero section">
                    {heroCtaLabel}
                  </TrackedAnchor>
                </Button>
              </RippleHighlight>
              <p className="text-center text-sm text-slate-500 sm:text-left">
                Trusted by 50+ businesses in California — from dentists to consultants to local shops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div id="ai-launch-founder-vsl" className="mx-auto max-w-3xl text-left">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
            hear from our founder
          </p>
          <VideoPlayer
            className="mt-4"
            src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763160814/prism_websites_vsl_2_ojqiku.mp4"
            poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/prism_websites_vsl_2_ojqiku.jpg"
            title="Founder Enzo Sison explains Prism Websites"
            caption="Enzo explains how slow load times, unclear messaging, and disorganized SEO choke growth—and how Prism’s fast, conversion-ready websites boost visibility, drive more inquiries, and keep customers coming back."
            schema={{
              id: "https://www.design-prism.com/ai-website-launch#founder-vsl",
              name: "Founder Enzo Sison explains Prism Websites",
              description:
                "Enzo Sison explains how Prism turns slow, confusing sites into fast, conversion-focused experiences that improve discovery, conversion, and retention.",
              thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/prism_websites_vsl_2_ojqiku.jpg",
              uploadDate: "2025-01-24T00:00:00Z",
              duration: "PT38S",
              contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763160814/prism_websites_vsl_2_ojqiku.mp4",
              embedUrl: "https://www.design-prism.com/ai-website-launch#founder-vsl",
              width: 1920,
              height: 1080,
              creatorName: "Enzo Sison",
            }}
          />
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">0:38</p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400 text-center">
            Founder Enzo Sison explains Prism Websites
          </p>
          <p className="mt-4 text-sm text-slate-700 sm:text-base text-center">
            Enzo explains how slow load times, unclear messaging, and disorganized SEO choke growth—and how Prism’s
            fast, conversion-ready websites boost visibility, drive more inquiries, and keep customers coming back.
          </p>
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
              <li
                key={point}
                className="group flex gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-[0px_18px_38px_rgba(15,23,42,0.08)] sm:p-5"
              >
                <AlertTriangle
                  className="mt-1 h-5 w-5 text-rose-500 transition-colors group-hover:text-rose-600"
                  aria-hidden
                />
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
        <div className="mx-auto max-w-6xl space-y-10 rounded-[32px] border border-slate-200 bg-white px-4 py-10 sm:px-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:space-y-0">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">speed run</p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">From zero to launch in 48 hours.</h2>
            <div className="relative pl-3">
              <span
                aria-hidden
                className="pointer-events-none absolute left-9 top-6 hidden h-[calc(100%-40px)] w-px bg-gradient-to-b from-slate-200 via-slate-300 to-transparent sm:block"
              />
              <ol className="space-y-4">
                {howItWorksSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-slate-900 shadow-inner">
                      {index + 1}️⃣
                    </div>
                    <p className="flex-1 text-lg text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RippleHighlight asChild fullWidth className="sm:w-auto">
                <Button asChild size="lg" className="text-base w-full sm:w-auto">
                  <TrackedAnchor
                    href={`#${CTA_TARGET_ID}`}
                    label={howItWorksCtaLabel}
                    location="how it works"
                  >
                    {howItWorksCtaLabel}
                  </TrackedAnchor>
                </Button>
              </RippleHighlight>
              <p className="text-sm text-slate-500">No contracts. No hidden fees. Just momentum.</p>
            </div>
          </div>
          <div className="group rounded-[32px] border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)] sm:p-8">
            <div className="flex items-center gap-3 text-slate-600">
              <Zap className="h-5 w-5" aria-hidden />
              <span className="text-sm uppercase tracking-[0.35em]">intake preview</span>
            </div>
            <p className="mt-4 text-lg text-slate-700">
              We translate your 3-minute intake into layouts, copy, and tracking so you can react before anything goes
              live. Every step is captured in your project doc so nothing slips.
            </p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
                    <li
                      key={item}
                      className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0px_18px_40px_rgba(15,23,42,0.08)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 text-emerald-500 transition-transform group-hover:rotate-6"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-6 text-slate-900 transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_30px_60px_rgba(15,23,42,0.14)] lg:max-w-sm">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[-20%] rounded-[40px] bg-gradient-to-r from-sky-100 via-white to-indigo-100 opacity-40"
                />
                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">price anchor</p>
                  <p className="mt-4 text-lg font-medium text-slate-700">
                    Other agencies charge $2,000–$5,000 for the same results. We charge $400 one-time. Why? Because AI
                    makes it faster — and we pass those savings straight to you.
                  </p>
                  <RippleHighlight asChild fullWidth>
                    <Button asChild size="lg" className="mt-6 w-full text-base">
                      <TrackedAnchor href={`#${CTA_TARGET_ID}`} label={valueCtaLabel} location="what you get">
                        {valueCtaLabel}
                      </TrackedAnchor>
                    </Button>
                  </RippleHighlight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Carousel */}
      <section className="bg-slate-50 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-10">
          <RevealOnScroll className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">our clients</p>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Real brands, live Prism builds, measurable results.
              </h2>
              <div className="flex justify-center">
                <span className="inline-block h-0.5 w-24 rounded-full bg-slate-300" />
              </div>
            </div>
            <p className="text-base text-slate-600 sm:text-lg">
              Scroll through the practices, consultants, and local businesses launching in days—not months.
            </p>
          </RevealOnScroll>
          <ClientsRail />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl space-y-6">
          <RevealOnScroll className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">compare</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Because we removed everything you hate about web design.
            </h2>
          </RevealOnScroll>
          <div className="space-y-4 md:hidden">
            {comparisonRows.map((row) => (
              <div
                key={row.oldWay}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:scale-[1.01] hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">old way</p>
                <p className="mt-2 text-base font-medium text-slate-600">{row.oldWay}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.4em] text-emerald-600">prism way</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{row.prismWay}</p>
              </div>
            ))}
          </div>
          <RevealOnScroll className="hidden overflow-hidden rounded-3xl border border-slate-200 md:block">
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
                  <tr key={row.oldWay} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-5 text-slate-600">{row.oldWay}</td>
                    <td className="px-6 py-5 font-semibold text-slate-900">{row.prismWay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RevealOnScroll>
        </div>
      </section>

      {/* Optional upgrade */}
      <section className="px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-10 transition-all hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_40px_80px_rgba(15,23,42,0.12)] sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">optional upgrade</p>
          <div className="mt-6 space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">Want traffic, not just a website?</h2>
            <p className="text-lg text-slate-600">
              Once you’re live, our Growth team can manage your SEO, ads, and content for as low as $900/month. Most
              clients start with Launch, then scale when the leads start rolling in.
            </p>
          </div>
          <RippleHighlight asChild fullWidth className="sm:w-auto">
            <Button asChild size="lg" className="mt-6 w-full text-base sm:w-auto">
              <TrackedAnchor
                href={GROWTH_CALL_LINK}
                target="_blank"
                rel="noreferrer noopener"
                label={upgradeCtaLabel}
                location="optional upgrade"
              >
                {upgradeCtaLabel}
              </TrackedAnchor>
            </Button>
          </RippleHighlight>
        </div>
      </section>

      {/* Final CTA + Form */}
      <section id={CTA_TARGET_ID} className="bg-slate-50 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
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
              <div
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-6"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(255,255,255,0.2), rgba(148,163,184,0.2), rgba(255,255,255,0.2))",
                  backgroundSize: "200% 100%",
                }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">what happens next</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>We confirm your intake within 1 business day.</li>
                  <li>You review your preview link and share tweaks.</li>
                  <li>We launch, connect tracking, and hand off assets.</li>
                </ul>
              </div>
            </div>

            <AiWebsiteLaunchForm submitLabel={formButtonLabel} />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-10 text-center text-sm text-slate-500">
        100% satisfaction guarantee — we’ll keep tweaking until you’re proud. You own your site completely.
      </footer>
    </div>
  )
}

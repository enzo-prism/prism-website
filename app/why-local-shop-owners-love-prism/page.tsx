import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import FAQSection from "@/components/faq-section"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { pixelishForEmoji } from "@/lib/pixelish-emoji"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const coreOutcomes = [
  {
    icon: "📍",
    title: "more people finding you online",
    description: "accurate listings, fresh reviews, and local seo that keeps you visible on google, apple, and beyond."
  },
  {
    icon: "🚪",
    title: "more customers walking in",
    description: "smarter ads and stronger visibility turn online interest into in-store visits."
  },
  {
    icon: "💬",
    title: "more repeat business",
    description: "automated follow-ups, reminders, and offers keep customers coming back."
  }
]

const handledThemes = [
  {
    heading: "Be Found Everywhere",
    bullets: [
      "Google Business Profile optimization and management",
      "Local SEO + AEO to rank in map packs and AI answers",
      "Consistent listings across 50+ directories (Apple Maps, Yelp, Bing, etc.)"
    ]
  },
  {
    heading: "Look Great Online",
    bullets: [
      "Custom websites that reflect your shop’s style and expertise",
      "Fast, mobile-first design that builds trust and drives visits",
      "Simple forms and CTAs that turn browsers into buyers"
    ]
  },
  {
    heading: "Convert and Keep Customers",
    bullets: [
      "Review collection and reputation management",
      "Targeted local ads on Google, Meta, and Instagram",
      "Automated reminders, offers, and updates that bring people back"
    ]
  }
]

const transitionPoints = [
  "We communicate directly with your old provider on your behalf.",
  "We ensure your domain, listings, and data transfer perfectly — no downtime or missing assets.",
  "You’ll never have to chase anyone or manage the switch yourself."
]

const innovationHighlights = [
  "We continuously improve your website, listings, and ads with the latest tools and strategies.",
  "AI-driven analytics and AEO keep your business ahead of search and platform changes.",
  "Every improvement is backed by data — not guesswork."
]

const segmentWhoItsFor = [
  "Local retail shops, studios, and service businesses that rely on nearby customers.",
  "Owners who want more foot traffic without learning marketing tech.",
  "Teams adding new locations, products, or seasonal promotions.",
]

const segmentProblemsWeSolve = [
  "Low visibility in Google Maps and local search.",
  "Outdated sites that don’t show what’s new or why you’re different.",
  "Listings that drift out of sync across Apple, Yelp, and niche directories.",
  "Ad spend that doesn’t translate into real visits or orders.",
  "No repeat‑visit engine—customers buy once and disappear.",
]

const segmentDeliverables = [
  "A fast, mobile‑first website that reflects your shop and converts visitors.",
  "Local SEO + AEO structure so you show up when people search nearby.",
  "Listings and review engine kept accurate across major platforms.",
  "Google/Meta/Yelp campaigns tied to calls, directions, and sales.",
  "Simple follow‑ups and offer loops to bring customers back.",
  "Reporting dashboards that show what’s driving revenue.",
]

const segmentProcess = [
  { step: "visibility audit", detail: "we clean up your website, listings, and map presence first." },
  { step: "convert the demand", detail: "refresh your site and offers so browsers become buyers." },
  { step: "add growth loops", detail: "ads, reviews, and retention campaigns layer in next." },
  { step: "optimize monthly", detail: "we keep improving as your products and seasons change." },
]

const segmentFaqItems = [
  {
    question: "Will you work with my existing website platform?",
    answer:
      "Yes. We can rebuild on Next.js for speed or migrate from Squarespace/WordPress if your current stack is holding you back.",
  },
  {
    question: "How fast can we see more local visibility?",
    answer:
      "Listings fixes and profile updates often lift map engagement within weeks. Rankings compound as reviews and content stack up.",
  },
  {
    question: "Do you handle promotions and seasonal updates?",
    answer:
      "Yes. We keep your homepage, offers, and listings fresh so customers always see what’s new.",
  },
  {
    question: "Can you track in‑store results?",
    answer:
      "We track calls, direction requests, form fills, and promo redemptions where possible, then review trends with you monthly.",
  },
  {
    question: "What if I don’t want to run ads?",
    answer:
      "That’s fine. Many shops start with website + local presence and add ads only when the foundation is ready.",
  },
  {
    question: "Do I own my domain and data?",
    answer:
      "Always. Prism works inside your accounts and keeps everything transferable.",
  },
]

const localCaseStudies = CASE_STUDIES.filter((study) => study.segments.includes("local"))

const stayingReasons = [
  { icon: "🔓", text: "Pause or cancel anytime — no long contracts" },
  { icon: "💼", text: "You own all your assets and data" },
  { icon: "🧠", text: "Ongoing updates and optimizations" },
  { icon: "🛠️", text: "99.9% uptime and fast hosting" },
  { icon: "📊", text: "Clear monthly reports on what’s working" },
  { icon: "💬", text: "Direct line to the founder for support" }
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "why local shop owners love prism",
  description: "prism helps local shops stand out online, bring more people through the door, and run smoother — without tech headaches or outdated marketing systems.",
  path: "/why-local-shop-owners-love-prism",
})

export default function LocalShopOwnersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
                local growth playbook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                More customers. Less tech stress.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism helps local shops stand out online, bring more people through the door, and run smoother than ever — without you having to deal with complicated tech or marketing systems.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    talk to prism
                  </Button>
                </Link>
                <Link href="/free-analysis">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    {FREE_AUDIT_CTA_TEXT}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Core Results */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We help local businesses grow — online and offline.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism brings design, technology, and data together — so you can focus on running your shop, not managing your website.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreOutcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50/60 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <PixelishIcon src={pixelishForEmoji(outcome.icon).src} alt="" size={34} invert={false} aria-hidden />
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{outcome.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What Prism Handles */}
        <section className="border-t border-neutral-100 bg-neutral-50/80">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                We manage everything that connects you to your customers.
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {handledThemes.map((theme) => (
                <div
                  key={theme.heading}
                  className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-neutral-900">{theme.heading}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    {theme.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {theme.heading === "Be Found Everywhere" ? (
                    <p className="mt-6 text-sm text-neutral-600">
                      Explore our{" "}
                      <Link href="/local-seo-services" className="font-semibold text-neutral-900 underline underline-offset-4">
                        local seo services
                      </Link>{" "}
                      — or work with Prism as your{" "}
                      <Link href="/local-seo-agency" className="font-semibold text-neutral-900 underline underline-offset-4">
                        local seo agency
                      </Link>
                      .
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Seamless Transitions */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.05fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Switching from your old provider? We make it effortless.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Most local business owners dread changing website or marketing vendors — it feels risky and confusing. Prism makes the transition smooth, secure, and stress-free.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                {transitionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50/80 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">Transition checklist</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>Intro call to collect logins and goals</li>
                <li>Direct outreach to your current provider</li>
                <li>Domain, hosting, and listings secured</li>
                <li>Website and content audit completed</li>
                <li>Launch plan shared, reviewed, and executed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Communication */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                You’ll always know what’s happening — and who to call.
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                You get direct access to Prism’s founder, Enzo — by call, text, or email anytime. We pride ourselves on communication, transparency, and trust — three things local business owners say are missing from most agencies.
              </p>
              <p className="mt-6 text-sm text-neutral-300">
                We don’t hide behind tickets or dashboards. We show up, explain things clearly, and move fast when you need help.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Innovation */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.05fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                The world changes fast — your marketing should too.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Most agencies use cookie-cutter systems that haven’t evolved in years. Prism is built differently.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600">
                {innovationHighlights.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">Always-on improvements</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>Quarterly website refreshes with new offers</li>
                <li>Monthly analytics reviews and insight reports</li>
                <li>Campaign experiments to test new channels</li>
                <li>AEO monitoring to capture AI search demand</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Client Grid */}
        <section className="border-t border-neutral-100 bg-neutral-50/80">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trusted by local businesses across California and beyond.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                From custom ski boot shops to dental practices, Prism helps local business owners grow with confidence and ease.
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                Each business is different — but all share the same story: they wanted to grow without the headaches of managing tech, marketing, and communication alone.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {localCaseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                    {study.industry}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-900">{study.client}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{study.location}</p>
                  <p className="mt-3 text-sm font-medium text-neutral-700">{study.description}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                    read case study
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Why Businesses Stay */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.05fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Simple, reliable, and built for the long haul.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism stays by your side as you grow — keeping your marketing, technology, and customer experience tight and up-to-date.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
              <ul className="space-y-4 text-sm text-neutral-600">
                {stayingReasons.map((reason) => (
                  <li key={reason.text} className="flex items-start gap-3">
                    <PixelishIcon src={pixelishForEmoji(reason.icon).src} alt="" size={22} invert={false} aria-hidden />
                    <span>{reason.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50/70">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">local business playbook</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                what prism delivers for local shop owners
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900">who it&apos;s for</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  {segmentWhoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900">problems we solve</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  {segmentProblemsWeSolve.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900">what you get</h3>
              <ul className="mt-4 grid gap-3 text-sm text-neutral-600 md:grid-cols-2">
                {segmentDeliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900">how it works</h3>
              <ol className="mt-4 space-y-4 text-sm text-neutral-600">
                {segmentProcess.map((item, index) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900">{item.step}</p>
                      <p className="mt-1">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <FAQSection
          title="local business faq"
          subtitle="questions owners ask before they hand off growth."
          items={segmentFaqItems}
          className="bg-neutral-50/70"
        />

        {/* Section 8: Closing CTA */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to grow your business the easy way?
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                Prism helps local businesses get found, look great, and run smoother — with less stress and better results.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    talk to prism
                  </Button>
                </Link>
                <Link href="/free-analysis">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    {FREE_AUDIT_CTA_TEXT}
                  </Button>
                </Link>
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

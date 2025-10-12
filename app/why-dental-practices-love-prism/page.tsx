import type { Metadata } from "next"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"

const coreResults = [
  {
    icon: "📈",
    title: "Steady growth",
    description: "More new patients through SEO, ads, and conversion-focused design."
  },
  {
    icon: "💬",
    title: "More reviews and referrals",
    description: "Authentic patient feedback fuels trust and organic word-of-mouth."
  },
  {
    icon: "🤝",
    title: "Less hassle",
    description: "Seamless handoff from your old provider, handled 100% by our team."
  }
]

const dentistFavorites = [
  {
    title: "Seamless Transitions — No Downtime, No Headaches",
    summary: "Switching from a previous provider can feel risky. We make it effortless.",
    bullets: [
      "We interface directly with your old website or marketing company on your behalf.",
      "We ensure every domain, file, photo, and form transitions cleanly.",
      "We guarantee no downtime and no data loss.",
      "You don’t have to chase anyone — we handle all the back-and-forth."
    ],
    quote:
      "Dentists tell us this is the smoothest transition they’ve ever had from one provider to another."
  },
  {
    title: "Direct Access & Exceptional Communication",
    summary: "You’ll never feel like you’re talking to a support ticket again.",
    bullets: [
      "Work directly with Prism’s founder, Enzo — call, text, or email anytime.",
      "Transparent updates and clear next steps at every stage.",
      "We believe strong communication builds strong practices — and we live by it."
    ],
    quote: "Our clients say the biggest relief after moving to Prism is finally having someone who picks up the phone."
  },
  {
    title: "Continuous Innovation",
    summary:
      "Most dental marketing companies use the same cookie-cutter templates and outdated SEO tricks. Prism doesn’t.",
    bullets: [
      "We constantly refine websites, ad strategies, and listings as technology evolves.",
      "AEO (Answer Engine Optimization) ensures your practice shows up in AI-driven search results.",
      "Your digital presence improves month after month — without you needing to ask."
    ],
    quote: "The dental industry moves fast. We make sure your practice keeps up — and stays ahead."
  }
]

const connectedPresence = [
  {
    emoji: "🧭",
    title: "Be Found Everywhere",
    bullets: [
      "Local SEO & AEO to appear at the top of Google",
      "Fully optimized Google Business Profile",
      "Consistent listings across 50+ directories"
    ]
  },
  {
    emoji: "🎨",
    title: "Look Exceptional Online",
    bullets: [
      "Modern, custom web design built for conversion",
      "Clear, educational service pages for every treatment",
      "Beautiful before-and-after galleries and team photography"
    ]
  },
  {
    emoji: "💬",
    title: "Turn Visitors into Patients",
    bullets: [
      "Automated review collection and reminders",
      "Friction-free appointment forms and scheduling",
      "Precision-targeted ads on Google and Meta"
    ]
  }
]

const stayingReasons = [
  { icon: "🔓", text: "Pause or cancel anytime — no lock-in contracts" },
  { icon: "💼", text: "You own 100% of your site, data, and content" },
  { icon: "🛠️", text: "Continuous improvements with no extra fees" },
  { icon: "📊", text: "Simple monthly reports that show what’s working" },
  { icon: "🧠", text: "AI-driven insights that help you grow faster" }
]

const dentalCaseStudies = CASE_STUDIES.filter((study) => study.segments.includes("dental"))

export const metadata: Metadata = {
  title: "Why Dental Practices Love Prism",
  description:
    "Prism helps dental practices attract new patients, modernize their online presence, and transition away from outdated providers without downtime or stress.",
  alternates: {
    canonical: "https://www.design-prism.com/why-dental-practices-love-prism"
  },
  openGraph: {
    title: "Why Dental Practices Love Prism",
    description:
      "Grow your practice and worry less about marketing and technology. Prism handles seamless transitions, modern design, and patient acquisition.",
    url: "https://www.design-prism.com/why-dental-practices-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Dental Practices Love Prism",
    description:
      "Prism helps dentists attract new patients, modernize their online presence, and move on from outdated providers without stress.",
    creator: "@designprism"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function DentalPracticesPage() {
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
                dental growth playbook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Grow your practice. Worry less about marketing and technology.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism helps dentists attract new patients, modernize their online presence, and transition away from outdated providers — all without stress or downtime.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/get-started">
                  <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                    {FREE_AUDIT_CTA_TEXT}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-3 text-base"
                  >
                    Talk to Prism
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
                More new patients. More trust. Less stress.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism turns marketing from a stress point into a strength — with technology, design, and communication that actually work.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {coreResults.map((result) => (
                <div
                  key={result.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50/60 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden>{result.icon}</span>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{result.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What Dentists Love Most */}
        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                What dentists love most about Prism
              </h2>
            </div>
            <div className="mt-12 space-y-12">
              {dentistFavorites.map((favorite, idx) => (
                <div
                  key={favorite.title}
                  className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-[0.12fr_1fr]"
                >
                  <div className="flex items-start justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-xl font-semibold text-white">
                      {idx + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{favorite.title}</h3>
                    <p className="mt-3 text-sm text-neutral-200">{favorite.summary}</p>
                    <ul className="mt-6 space-y-3 text-sm leading-relaxed text-neutral-100">
                      {favorite.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl bg-white/10 px-4 py-3 text-sm italic text-neutral-50">
                      “{favorite.quote}”
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Connected Presence */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Every part of your online presence, connected and optimized.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {connectedPresence.map((group) => (
                <div
                  key={group.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50/70 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden>{group.emoji}</span>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">{group.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                    {group.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Why Dentists Stay */}
        <section className="border-t border-neutral-100 bg-neutral-50/80">
          <div className="container mx-auto grid gap-10 px-4 py-24 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Transparent. Reliable. Always improving.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Prism isn’t just another dental marketing vendor — we’re your long-term growth partner. Our team handles everything behind the scenes, so your staff can focus on patients, not pixels.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <ul className="space-y-4 text-sm text-neutral-600">
                {stayingReasons.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Dental Practices */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trusted by leading dental practices across California and beyond.
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Each practice is unique, but all share the same outcome — peace of mind knowing their marketing is handled by experts who care as much as they do.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {dentalCaseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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

        {/* Section 6: Closing CTA */}
        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready for a practice that grows without the stress?
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Join hundreds of dentists switching to a better way — with seamless transitions, strong communication, and modern marketing that works.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-8 py-3 text-base">
                    Talk to Prism
                  </Button>
                </Link>
                <Link href="/get-started">
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

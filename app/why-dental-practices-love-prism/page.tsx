import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  Camera,
  CheckCircle2,
  Cpu,
  Globe2,
  Layers,
  LineChart,
  Mail,
  MapPin,
  MessageSquare,
  Palette,
  PenSquare,
  Radar,
  RefreshCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow
} from "lucide-react"
import VideoCarousel from "@/components/video-carousel"
import type { CaseStudyMeta } from "@/lib/case-study-data"
import { CASE_STUDIES } from "@/lib/case-study-data"

const CTA_PRIMARY_LABEL = "Claim Free Analysis"
const CTA_SECONDARY_LABEL = "Contact Prism"
const CTA_PRIMARY_HREF = "/get-started"
const CTA_SECONDARY_HREF = "/contact"

const modernPracticePromises = [
  { icon: Globe2, label: "Stay visible everywhere patients search." },
  { icon: ShieldCheck, label: "Build trust before the first appointment." },
  { icon: Workflow, label: "Automate repetitive front-office work." },
  { icon: Cpu, label: "Leverage technology that gives small teams big-practice power." }
] as const

const prismMethodPillars = [
  {
    title: "Visibility & Growth",
    headline: "Be everywhere patients are looking.",
    description:
      "We ensure your listings, reviews, and search presence stay accurate and active across Google, Yelp, Apple, Facebook, and beyond — so new patients find you first.",
    includes: [
      { icon: Radar, label: "Local SEO + AEO (Answer Engine Optimization)" },
      { icon: MapPin, label: "Google Business Profile & directory optimization" },
      { icon: MessageSquare, label: "Review monitoring and engagement" },
      { icon: BarChart3, label: "Deep analytics showing which channels drive new patients" }
    ]
  },
  {
    title: "Trust & Storytelling",
    headline: "Your brand should feel as polished online as it does in person.",
    description:
      "From authentic photography and clear service pages to consistent branding across every platform — Prism builds digital trust that converts clicks into booked patients.",
    includes: [
      { icon: Palette, label: "Brand identity & design (digital + print)" },
      { icon: Camera, label: "Professional photography & video" },
      { icon: Users, label: "Team bios, reviews, and success stories" },
      { icon: PenSquare, label: "Website copy and visual storytelling" }
    ]
  },
  {
    title: "Automation & Operations",
    headline: "Run smoother with less manual work.",
    description:
      "We automate your intake, forms, and communications so your staff can focus on patients — not paperwork or follow-ups.",
    includes: [
      { icon: CalendarCheck2, label: "Online appointment & referral forms" },
      { icon: Mail, label: "Custom email setup for you and your team" },
      { icon: Workflow, label: "FAQ automation and follow-up workflows" },
      { icon: RefreshCcw, label: "Seamless transition off old vendors and platforms" }
    ]
  },
  {
    title: "Technology & Leverage",
    headline: "The Silicon Valley advantage.",
    description:
      "Prism isn’t just another marketing company — it’s your embedded product and engineering team. We use modern frameworks and AI to make your website faster, smarter, and future-proof.",
    includes: [
      { icon: Layers, label: "Full-stack website architecture" },
      { icon: Sparkles, label: "AI optimization and insights" },
      { icon: Shield, label: "HIPAA-aware hosting and security" },
      { icon: LineChart, label: "Continuous performance improvements" }
    ]
  }
] as const

const connectedPresenceHighlights = [
  {
    emoji: "🧭",
    title: "Be Found Everywhere",
    bullets: [
      "Local SEO & AEO to appear at the top of Google.",
      "Fully optimized Google Business Profile.",
      "Consistent listings across 50+ directories."
    ]
  },
  {
    emoji: "🎨",
    title: "Look Exceptional Online",
    bullets: [
      "Modern, conversion-driven web design.",
      "Clear, educational service pages for every treatment.",
      "Beautiful before-and-after galleries and team photography."
    ]
  },
  {
    emoji: "💬",
    title: "Turn Visitors into Patients",
    bullets: [
      "Automated review collection and reminders.",
      "Friction-free forms and scheduling.",
      "Precision-targeted ads on Google and Meta."
    ]
  }
] as const

const featuredCaseStudyDetails = [
  { slug: "dr-christopher-wong", highlight: "100% patient retention during transition" },
  { slug: "exquisite-dentistry", highlight: "Sophisticated digital experience" },
  { slug: "family-first-smile-care", highlight: "Family-focused design and conversion clarity" },
  { slug: "grace-dental-santa-rosa", highlight: "Brand refresh and multi-channel visibility" },
  { slug: "town-centre-dental", highlight: "Analytics-driven site relaunch" }
] as const

const videoItems = [
  {
    videoId: "wCQrUajsnk8",
    title: "Dr. Teagan Willes Interview",
    role: "Cosmetic dentist & practice owner",
    focus: "Maintaining concierge-level care while scaling patient demand"
  },
  {
    videoId: "HrksJeYb02Q",
    title: "Dr. Christopher Wong Interview",
    role: "Practice founder",
    focus: "Protecting patient trust during a high-stakes ownership transition"
  },
  {
    videoId: "WIWxwdZflzo",
    title: "Dr. Ahmed Mataria Interview",
    role: "Specialty endodontist",
    focus: "Building calm digital experiences for anxious referrals"
  },
  {
    videoId: "FxuzACT-o2Q",
    title: "Dr. Katie Lee Interview",
    role: "Family dentist",
    focus: "Designing educational journeys that help parents choose confidently"
  },
  {
    videoId: "jE6YAimUxMQ",
    title: "Melissa, Front Desk Interview",
    role: "Front-desk leader",
    focus: "Streamlining intake, forms, and follow-ups for busy teams"
  },
  {
    videoId: "5eB4Y27zkE8",
    title: "Ludmila, Office Manager Interview",
    role: "Office manager",
    focus: "Keeping operations aligned across marketing, scheduling, and email"
  }
] as const

const featuredCaseStudies = featuredCaseStudyDetails
  .map(({ slug, highlight }) => {
    const match = CASE_STUDIES.find((study) => study.slug === slug)
    if (!match) {
      return null
    }

    return {
      ...match,
      highlight
    }
  })
  .filter((study): study is CaseStudyMeta & { highlight: string } => Boolean(study))

export const metadata: Metadata = {
  title: "Why Dentists Love Working with Prism",
  description:
    "Prism helps dental practices grow through modern websites, AI-powered marketing, and seamless operations. Discover why dentists across California trust Prism to boost visibility, build trust, and attract more patients — stress-free.",
  alternates: {
    canonical: "https://www.design-prism.com/why-dental-practices-love-prism"
  },
  openGraph: {
    title: "Why Dentists Love Working with Prism",
    description:
      "Prism helps dental practices grow through modern websites, AI-powered marketing, and seamless operations. Discover why dentists across California trust Prism to boost visibility, build trust, and attract more patients — stress-free.",
    url: "https://www.design-prism.com/why-dental-practices-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Dentists Love Working with Prism",
    description:
      "Prism helps dental practices grow through modern websites, AI-powered marketing, and seamless operations. Discover why dentists across California trust Prism to boost visibility, build trust, and attract more patients — stress-free.",
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
        <section className="relative overflow-hidden border-b border-neutral-100">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <p className="text-sm font-semibold text-neutral-500">🦷 Why Dentists Love Working with Prism</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Grow your practice. Worry less about marketing and technology.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                Prism helps dentists attract new patients, modernize their online presence, and transition away from outdated providers — all without stress or downtime.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href={CTA_PRIMARY_HREF}>
                  <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                    {CTA_PRIMARY_LABEL}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={CTA_SECONDARY_HREF}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group rounded-full px-8 py-3 text-base"
                  >
                    {CTA_SECONDARY_LABEL}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-14">
              <div className="relative mx-auto max-w-5xl">
                <div
                  className="absolute inset-0 -z-10 rounded-[48px] bg-gradient-to-r from-blue-200/60 via-purple-200/60 to-pink-200/60 blur-3xl"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-2xl shadow-neutral-900/5">
                  <Image
                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762536261/Screenshot_2025-11-07_at_9.22.02_AM_peemtq.webp"
                    alt="Preview of the Prism dental practice experience"
                    width={1920}
                    height={1080}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="grid gap-12 lg:gap-16 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-neutral-500">Why Prism</p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Why Modern Dental Practices Choose Prism
                </h2>
                <p className="text-base text-neutral-600">
                  Most dentists aren’t losing patients because they’re bad at dentistry — they’re losing visibility, consistency, and control online.
                </p>
                <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6 text-base text-neutral-800 shadow-sm">
                  Prism was built to fix that.
                </div>
                <p className="text-base text-neutral-600">
                  We pair Silicon Valley engineering, brand design, and AI-driven marketing to create systems dentists can rely on every single day.
                </p>
              </div>

              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-primary/5 via-pink-200/40 to-violet-200/50 blur-3xl"
                  aria-hidden
                />
                <div className="relative rounded-[32px] border border-neutral-100 bg-white p-8 shadow-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
                    The Prism Method
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-neutral-900">
                    We combine full-stack engineering, brand design, and AI-driven marketing to help practices:
                  </p>
                  <ul className="mt-6 space-y-4 text-base text-neutral-700">
                    {modernPracticePromises.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-900/5 text-neutral-900">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Visibility", "Trust", "Automation", "Leverage"].map((value) => (
                      <span
                        key={value}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm font-semibold text-neutral-700"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-neutral-500">
                    That’s The Prism Method — Visibility. Trust. Automation. Leverage. It’s how local dental practices
                    compete (and win) in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">The Prism Method</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Visibility. Trust. Automation. Leverage.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {prismMethodPillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8"
                >
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/70">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white">
                      {index + 1}
                    </span>
                    {pillar.title}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{pillar.headline}</h3>
                  <p className="mt-3 text-sm text-neutral-200">{pillar.description}</p>
                  <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Includes</p>
                    <ul className="mt-4 space-y-3 text-sm text-white">
                      {pillar.includes.map(({ icon: Icon, label }) => (
                        <li key={label} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
                Real Results, Real Voices
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                🎥 Watch the Conversations
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Enzo interviews dentists and their teams — founders, office managers, and front-desk leaders — to understand
                what really matters when you’re running a modern dental practice and creating an end-to-end patient experience.
              </p>
              <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-neutral-100 bg-neutral-50/80 p-6 text-sm text-neutral-700 shadow-sm">
                These conversations surface the operational bottlenecks, technology gaps, and storytelling wins that keep
                patients feeling confident from the first search to their follow-up email.
              </div>
            </div>
            <div className="mt-12">
              <VideoCarousel items={videoItems.map(({ videoId, title }) => ({ videoId, title }))} />
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {videoItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
                    <span aria-hidden>🎙️</span>
                    {item.role}
                  </div>
                  <p className="mt-3 text-base font-semibold text-neutral-900">{item.title}</p>
                  <p className="mt-2 text-sm text-neutral-600">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Every Part of Your Online Presence — Unified Through the Prism Method
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Visibility, trust, automation, and leverage come together when every channel shares the same standard.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {connectedPresenceHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
                >
                  <span className="text-3xl" aria-hidden>
                    {highlight.emoji}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">{highlight.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    {highlight.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-3xl border border-neutral-200 bg-white px-8 py-10 shadow-sm md:px-12 md:py-12">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-2xl font-semibold md:text-3xl">
                  Own the Inbox Experience, Not Just the Website
                </h3>
                <p className="mt-4 text-base text-neutral-600">
                  See how Prism configures custom email systems so patients, hiring platforms, and partners trust every message — with verified deliverability and HIPAA-aware safeguards built in.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link href={CTA_PRIMARY_HREF}>
                    <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                      {CTA_PRIMARY_LABEL}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href={CTA_SECONDARY_HREF}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group rounded-full px-8 py-3 text-base"
                    >
                      {CTA_SECONDARY_LABEL}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trusted by Leading Dental Practices Across California and Beyond
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Each practice is unique — but they all share the same outcome: peace of mind knowing their marketing is handled by experts who care as much as they do.
              </p>
            </div>
            <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Case Studies
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {featuredCaseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                    {study.industry}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-900">{study.client}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{study.location}</p>
                  <p className="mt-4 text-sm text-neutral-700">{study.highlight}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-semibold text-neutral-900">
                    Read Case Study
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center text-sm font-semibold text-neutral-900"
              >
                Read More Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to Experience the Prism Method?
              </h2>
              <p className="mt-4 text-base text-white/80">
                Join hundreds of dentists modernizing their practices with smarter systems, cleaner design, and reliable growth.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href={CTA_PRIMARY_HREF}>
                  <Button
                    size="lg"
                    variant="inverted"
                    className="group rounded-full px-8 py-3 text-base"
                  >
                    {CTA_PRIMARY_LABEL}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={CTA_SECONDARY_HREF}>
                  <Button
                    size="lg"
                    variant="outline-inverted"
                    className="group rounded-full px-8 py-3 text-base"
                  >
                    {CTA_SECONDARY_LABEL}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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

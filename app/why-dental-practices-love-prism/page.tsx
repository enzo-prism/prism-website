import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import FAQSection from "@/components/faq-section"
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

const CTA_PRIMARY_LABEL = "Get Started"
const CTA_SECONDARY_LABEL = "Get Started"
const CTA_PRIMARY_HREF = "/get-started"
const CTA_SECONDARY_HREF = "/get-started"

const heroWhatYouGet = [
  "Dental practice website that explains services and drives calls.",
  "Google Business Profile cleanup + local SEO built for map results.",
  "Review system that keeps feedback coming in.",
  "Tracking for calls, forms, and booked consults.",
  "ADA-aware and HIPAA-aware foundation."
] as const

const modernPracticePromises = [
  { icon: Globe2, label: "Show up in the map pack when patients search." },
  { icon: ShieldCheck, label: "Look trusted before the first call." },
  { icon: Workflow, label: "Keep reviews and referrals moving without extra work." },
  { icon: Cpu, label: "See clear tracking for calls, forms, and booked visits." }
] as const

const prismMethodPillars = [
  {
    title: "Visibility & Growth",
    headline: "If you have ever searched your practice and felt invisible.",
    description:
      "When your Google Business Profile is wrong, patients skip you. We fix listings and build local SEO + AEO so you show up when people ask.",
    includes: [
      { icon: Radar, label: "Local SEO + AEO for the treatments you want to book" },
      { icon: MapPin, label: "Google Business Profile cleanup and weekly updates" },
      { icon: MessageSquare, label: "Reviews workflow with asks, follow-ups, and replies" },
      { icon: BarChart3, label: "Tracking for calls, forms, and booked consults" }
    ]
  },
  {
    title: "Trust & Storytelling",
    headline: "If your website feels dated or unclear.",
    description:
      "When service pages are thin, patients bounce. We build a dental practice website with clear service pages, photos, and proof that feel like your chairside care.",
    includes: [
      { icon: Palette, label: "Design that matches how your office feels" },
      { icon: Camera, label: "Team + office photography and short videos" },
      { icon: Users, label: "Team bios, reviews, and patient stories" },
      { icon: PenSquare, label: "Clear copy for every service page" }
    ]
  },
  {
    title: "Automation & Operations",
    headline: "If the front desk is buried in follow-ups.",
    description:
      "When intake is manual, the team loses time. We automate forms, referrals, and follow-ups so patients get fast answers.",
    includes: [
      { icon: CalendarCheck2, label: "Online forms for new patients and referrals" },
      { icon: Mail, label: "Patient-ready email templates and routing" },
      { icon: Workflow, label: "Follow-up workflows for recalls and no-shows" },
      { icon: RefreshCcw, label: "Clean handoff from old vendors and tools" }
    ]
  },
  {
    title: "Technology & Leverage",
    headline: "If your tech stack feels fragile.",
    description:
      "Slow sites and broken tracking waste budget. We build a HIPAA-aware, ADA-aware foundation so the system keeps working when you are busy.",
    includes: [
      { icon: Layers, label: "Fast website architecture that loads on phones" },
      { icon: Sparkles, label: "AEO-ready pages and structured answers" },
      { icon: Shield, label: "HIPAA-aware and ADA-aware setup" },
      { icon: LineChart, label: "Performance checks and tracking cleanup" }
    ]
  }
] as const

const connectedPresenceHighlights = [
  {
    emoji: "🧭",
    title: "Be Found Where Patients Look",
    bullets: [
      "Local SEO + AEO for the treatments you want to book.",
      "Google Business Profile that stays accurate and active.",
      "Listings consistency across the directories patients use."
    ]
  },
  {
    emoji: "🎨",
    title: "Look Clear and Trustworthy",
    bullets: [
      "Dental practice website that feels calm and modern.",
      "Service pages that explain treatments in plain language.",
      "Real team photos and before-and-after proof."
    ]
  },
  {
    emoji: "💬",
    title: "Turn Visits into Calls",
    bullets: [
      "Reviews workflow that keeps feedback steady.",
      "Fast forms and easy scheduling.",
      "Ads with call and form tracking."
    ]
  }
] as const

const dentalPhotographyHighlights = [
  {
    title: "One-day capture",
    description: "We shoot team portraits, chairside moments, and lobby details in one day."
  },
  {
    title: "Sized for every channel",
    description: "You get crops for your website hero, ads, local listings, and hiring."
  },
  {
    title: "Handled end to end",
    description: "We manage the shot list, staff reminders, and delivery so you can focus on patients."
  }
] as const

const beforeAfterGuideHighlights = [
  {
    title: "Step-by-step guide",
    description: "Camera settings, lighting, and positioning so every shot looks consistent."
  },
  {
    title: "Gear list with links",
    description: "Use the exact flashes, reflectors, and mirrors we recommend."
  },
  {
    title: "Patient-ready handoff",
    description: "Embed-ready galleries and templates keep clinical and marketing in sync."
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

const segmentWhoItsFor = [
  "Owner dentists who want a calmer new patient flow and less marketing stress.",
  "Multi-location groups that need one standard across offices.",
  "Practices adding a new provider, service, or transition story.",
]

const segmentProblemsWeSolve = [
  "Service pages that don't answer patient questions.",
  "Map pack visibility lost to messy listings and NAP data.",
  "Reviews that only show up when someone remembers to ask.",
  "Ads that drive the wrong calls or lack tracking.",
  "Front desk buried in manual intake and follow-ups.",
]

const segmentDeliverables = [
  "Dental practice website with clear service pages and ADA-aware UX.",
  "Local SEO + AEO for treatments, providers, and locations.",
  "Google Business Profile + directory management with reviews workflow.",
  "Call, form, and booking tracking tied to each channel.",
  "HIPAA-aware hosting setup with forms and email routing.",
  "Photos and video that show real care and real people.",
]

const segmentProcess = [
  {
    step: "Audit and map the patient journey",
    detail: "We review your site, listings, and intake to find the fastest wins.",
  },
  {
    step: "Build the foundation",
    detail: "We launch a clean site and local presence patients trust.",
  },
  {
    step: "Add growth steps",
    detail: "We add ads, content, and reviews once the core is solid.",
  },
  {
    step: "Track and improve",
    detail: "We report in plain language and adjust each month.",
  },
]

const segmentFaqItems = [
  {
    question: "How long does a dental website rebuild take?",
    answer:
      "Most practices launch in 6-10 weeks. Timing depends on content, approvals, and locations.",
  },
  {
    question: "Do you handle HIPAA and ADA considerations?",
    answer:
      "Yes. We build with HIPAA-aware and ADA-aware practices in mind and coordinate on any requirements.",
  },
  {
    question: "Can you work with our existing brand and photos?",
    answer:
      "Yes. We can work inside your current brand and reuse strong assets. We only recommend a new shoot when needed.",
  },
  {
    question: "Will you improve our Google Business Profile and reviews?",
    answer:
      "Yes. Listings cleanup and a reviews workflow are core parts of the Prism dental playbook.",
  },
  {
    question: "How do you measure results for dental practices?",
    answer:
      "We track calls, forms, referrals, and booked visits against search and ads. We report in plain language.",
  },
  {
    question: "What if we have multiple locations?",
    answer:
      "We standardize the system across offices and tailor pages and listings to each market.",
  },
]

type FeaturedHighlight = (typeof featuredCaseStudyDetails)[number]["highlight"]

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
  .filter((study): study is CaseStudyMeta & { highlight: FeaturedHighlight } => Boolean(study))

export const metadata: Metadata = {
  title: "Prism | Dental practice website + local SEO for new patients",
  description:
    "Prism helps dentist owners fix messy dental marketing with a clear system: dental practice website, dental practice SEO, Google Business Profile, local SEO, reviews, and tracking so you can see new patient demand.",
  alternates: {
    canonical: "https://www.design-prism.com/why-dental-practices-love-prism"
  },
  openGraph: {
    title: "Prism | Dental practice website + local SEO for new patients",
    description:
      "Prism helps dentist owners fix messy dental marketing with a clear system: dental practice website, dental practice SEO, Google Business Profile, local SEO, reviews, and tracking so you can see new patient demand.",
    url: "https://www.design-prism.com/why-dental-practices-love-prism",
    siteName: "Prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism | Dental practice website + local SEO for new patients",
    description:
      "Prism helps dentist owners fix messy dental marketing with a clear system: dental practice website, dental practice SEO, Google Business Profile, local SEO, reviews, and tracking so you can see new patient demand.",
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
              <p className="text-sm font-semibold text-neutral-500">🦷 For dentist owners</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                grow your practice. worry less about marketing + tech.
              </h1>
              <p className="mt-6 text-base text-neutral-600 md:text-lg">
                prism helps dentists get more new-patient calls, modernize their online presence, and switch off outdated
                providers — without stress or downtime.
              </p>
              <div className="mt-6 w-full max-w-2xl rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">What you get</p>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {heroWhatYouGet.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 text-sm text-neutral-600">
                Want a calmer week and clearer numbers? Get started by booking a demo with the Prism team.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href={CTA_PRIMARY_HREF}>
                  <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                    {CTA_PRIMARY_LABEL}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-neutral-600">
                Need a{" "}
                <Link
                  href="/dental-practice-seo-expert"
                  className="font-semibold text-neutral-900 underline decoration-neutral-200 underline-offset-4"
                >
                  seo for dentists playbook
                </Link>
                ? See how Prism maps treatments to intent, tightens listings + reviews, and ships steady improvements.
                Need{" "}
                <Link
                  href="/dental-website"
                  className="font-semibold text-neutral-900 underline decoration-neutral-200 underline-offset-4"
                >
                  a dental practice website
                </Link>
                ? Start with the dental practice website blueprint.
              </p>
            </div>
            <div className="mt-14">
              <div className="relative mx-auto max-w-[220px] md:max-w-sm">
                <div
                  className="absolute inset-0 -z-10 rounded-[24px] bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 blur-lg"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-[18px] border border-white/80 bg-white/80 shadow-md shadow-neutral-900/5">
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
            <div className="mx-auto max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
                Founder note
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                A note to one dentist owner
              </h2>
              <div className="mt-4 space-y-4 text-base text-neutral-600">
                <p>
                  I built Prism for dentist owners who feel stuck with marketing that creates more
                  work. When phones go quiet, your team scrambles. Missed calls pile up. Listings
                  show the wrong hours.
                </p>
                <p>
                  Service pages read like a brochure and don't answer patient questions. Reviews
                  come in when someone remembers to ask. Staff jumps between tools and still can't
                  see which channel brought the new patient. You don't have to chase vendors or
                  decode reports.
                </p>
                <p>
                  Prism exists to fix that. We run the dental practice website, dental practice SEO,
                  Google Business Profile, local SEO, and AEO as one clean system. We set up
                  tracking for calls, forms, and booked consults so you can see what is working. We
                  keep the foundation HIPAA-aware and ADA-aware. Your team stays focused on care
                  while we handle the mess of dental marketing and your online presence.
                </p>
                <p className="text-sm font-semibold text-neutral-900">
                  If you want a calmer week and a clearer patient flow, start below.
                </p>
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
                  Why dentist owners choose Prism
                </h2>
                <p className="text-base text-neutral-600">
                  most dentists aren't losing patients because they're bad at dentistry. they're losing visibility,
                  consistency, and control online.
                </p>
                <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6 text-base text-neutral-800 shadow-sm">
                  prism was built to fix that.
                </div>
                <p className="text-base text-neutral-600">
                  we pair silicon valley engineering, brand design, and ai-driven marketing to build systems your team
                  can rely on every day.
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
                    We run the website, local SEO, and dental marketing as one system so you can:
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
                    That is the Prism Method: visibility, trust, automation, and leverage. Leverage means the system
                    keeps working even when you are in the operatory.
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
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-white/80">
              Want the dentist-specific AI overviews checklist? Read{" "}
              <Link
                href="/blog/ai-search-for-dental-practice"
                className="font-semibold text-white underline underline-offset-4"
              >
                ai search for dental practice
              </Link>
              . Want the step-by-step checklist to rank higher in Google? Read{" "}
              <Link
                href="/blog/dental-practice-rank-higher-google-search"
                className="font-semibold text-white underline underline-offset-4"
              >
                dental practice rank higher in google search
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
                Real Results, Real Voices
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                🎥 Hear from real dental teams
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                These interviews exist so you can hear what changed inside a real practice. You will learn what they
                fixed first, how they track new patients, and what made the biggest difference.
              </p>
              <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-neutral-100 bg-neutral-50/80 p-6 text-sm text-neutral-700 shadow-sm">
                Each conversation shows the real wins and real bottlenecks, from listings and reviews to front-desk
                follow-up and tracking.
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
                Your online presence should feel like one system
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                When every channel shares the same standard, patients feel trust and your team feels calm.
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
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-neutral-600">
              Running paid social for your practice? Start with{" "}
              <Link href="/tiktok-ads-for-dentists" className="font-semibold text-neutral-900 underline underline-offset-4">
                tiktok ads for dentists
              </Link>
              .
            </p>
            <div className="mt-12 rounded-3xl border border-neutral-200 bg-white px-8 py-10 shadow-sm md:px-12 md:py-12">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-2xl font-semibold md:text-3xl">
                  Own the inbox, not just the website
                </h3>
                <p className="mt-4 text-base text-neutral-600">
                  Prism sets up custom email so patients, hiring platforms, and partners trust every message. We keep it
                  HIPAA-aware and easy for your team to manage.
                </p>
                <p className="mt-6 text-sm text-neutral-600">
                  If you want email that builds trust and doesn't break, start here.
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

        <section className="border-t border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/70">On-site storytelling</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Show the photos patients want to see
                </h2>
                <p className="mt-4 text-base text-white/80">
                  Our office and team photography day captures real operatories, care moments, and lobby details so your
                  funnel feels consistent. The full breakdown lives on our{" "}
                  <Link
                    href="/dental-photography/office-team"
                    className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  >
                    office &amp; team photography page
                  </Link>
                  , where you can tour recent shoots and see how the Apple Maps proof works.
                </p>
                <p className="mt-4 text-base text-white/80">
                  Use those assets across your website, ads, local listings, and hiring without juggling vendors. Prism
                  plans the shot list, handles scheduling, and delivers files sized for each channel.
                </p>
                <p className="mt-6 text-sm text-white/80">
                  If you want photos that match the care you give, start here.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/dental-photography/office-team">
                    <Button
                      size="lg"
                      variant="inverted"
                      className="group rounded-full px-8 py-3 text-base"
                    >
                      Explore office &amp; team photography
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/book-a-shoot">
                    <Button
                      size="lg"
                      variant="outline-inverted"
                      className="group rounded-full px-8 py-3 text-base"
                    >
                      Book a shoot
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">What you get</p>
                <ul className="mt-6 space-y-5">
                  {dentalPhotographyHighlights.map((highlight) => (
                    <li
                      key={highlight.title}
                      className="rounded-2xl border border-white/10 bg-neutral-900/30 p-5"
                    >
                      <p className="text-lg font-semibold text-white">{highlight.title}</p>
                      <p className="mt-2 text-sm text-white/80">{highlight.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">What the guide covers</p>
                <ul className="mt-6 space-y-5">
                  {beforeAfterGuideHighlights.map((highlight) => (
                    <li key={highlight.title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                      <p className="text-lg font-semibold text-neutral-900">{highlight.title}</p>
                      <p className="mt-2 text-sm text-neutral-600">{highlight.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">Before &amp; after mastery</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  A simple before-and-after system your team can follow
                </h2>
                <p className="mt-4 text-base text-neutral-600">
                  If you are not ready for an on-site production day, Prism still gives you a repeatable system. The{" "}
                  <Link
                    href="/dental-photography/before-after"
                    className="underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-600"
                  >
                    before + after photography guide
                  </Link>{" "}
                  shows your team how to stage, light, and document cases without slowing the schedule.
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  Follow the tabs for gear, lighting, and workflow tips, then drop the assets into your website, social,
                  and consult decks. If you need Prism on-site later, you can move into the office and team service
                  without learning a new system.
                </p>
                <p className="mt-6 text-sm text-neutral-600">
                  If you want a clear way to capture cases, start with the guide.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/dental-photography/before-after">
                    <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                      Explore the guide
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/dental-photography/office-team">
                    <Button
                      size="lg"
                      variant="outline"
                      className="group rounded-full px-8 py-3 text-base"
                    >
                      Book Prism on-site
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50/70">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">dental playbook</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                what you get with Prism
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-neutral-900">who it&apos;s for</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  {segmentWhoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
          title="dental marketing faq"
          subtitle="straight answers about scope, timeline, and results."
          items={segmentFaqItems}
          className="bg-neutral-50/70"
        />

        <section className="border-t border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trusted by dental practices across California and beyond
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Each practice is different, but they all wanted the same thing: steady new patient flow and clear tracking.
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
                Ready for a calmer dental marketing system?
              </h2>
              <p className="mt-4 text-base text-white/80">
                Get a clear plan, clean tracking, and a system your team can trust.
              </p>
              <p className="mt-6 text-sm text-white/80">
                If you want new patient demand without the mess, start here.
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

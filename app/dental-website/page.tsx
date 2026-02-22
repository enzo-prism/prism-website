import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Handshake, LineChart, ShieldCheck, Sparkles } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import ServiceIllustration from "@/components/animated/ServiceIllustration"
import { Button } from "@/components/ui/button"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import DentalTrendsChart from "@/components/dental-trends-chart"
import DentalClientsSection from "@/components/dental-clients-section"
import VideoCarousel from "@/components/video-carousel"
import HeroLoopingVideo from "@/components/HeroLoopingVideo"
import { FAQSchema, ServiceSchema } from "@/components/schema-markup"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const lovePoints = [
  {
    title: "clear answers in seconds",
    description:
      "treatment pages, insurance info, and provider bios are organized so patients can quickly confirm they’re in the right place."
  },
  {
    title: "trust before the first call",
    description:
      "real photos, reviews, and what-to-expect details reduce anxiety and make it easy to choose your practice."
  },
  {
    title: "booking feels effortless on mobile",
    description:
      "tap-to-call, request forms, and scheduling paths are obvious and fast—so more visits become booked appointments."
  }
]

const designEssentials = [
  {
    title: "clear treatment pages",
    description:
      "service pages (implants, invisalign, emergency, whitening) written for patient intent, with FAQs, next steps, and financing context.",
  },
  {
    title: "trust signals that reduce anxiety",
    description:
      "provider bios, reviews, real photos/video, and what-to-expect sections so patients feel confident choosing you.",
  },
  {
    title: "fast path to booking",
    description:
      "call + form + online booking designed for mobile, wired to the right team, and measured with conversion tracking.",
  },
  {
    title: "ada-aware UX",
    description:
      "accessible patterns (semantic headings, readable typography, keyboard support, alt text) so more patients can use your site.",
  },
  {
    title: "seo-ready foundations",
    description:
      "clean information architecture, internal linking, and schema so google understands your services and your practice.",
  },
  {
    title: "migration + ownership",
    description:
      "a clean cutover with redirects, analytics, and ownership of your domain and accounts — so you’re not stuck again later.",
  },
]

const designExamples = [
  {
    label: "Dr. Christopher Wong",
    description: "practice transition + modern rebuild",
    href: "/case-studies/dr-christopher-wong",
  },
  {
    label: "Mataria Dental Group",
    description: "multi-location clarity + growth foundation",
    href: "/case-studies/mataria-dental-group",
  },
  {
    label: "Family First Smile Care",
    description: "patient-first experience + conversion upgrades",
    href: "/case-studies/family-first-smile-care",
  },
  {
    label: "Wine Country Root Canal",
    description: "specialty positioning + high-trust journey",
    href: "/case-studies/wine-country-root-canal",
  },
]

const revenueHighlights = [
  {
    icon: <LineChart className="h-6 w-6" aria-hidden />,
    title: "boosted case acceptance",
    description:
      "interactive treatment explainers and before/after sliders help patients trust premium procedures."
  },
  {
    icon: <Sparkles className="h-6 w-6" aria-hidden />,
    title: "local seo coverage",
    description:
      "schema, reviews, and hyperlocal landing pages push your practice to the top for high-intent searches."
  },
  {
    icon: <Handshake className="h-6 w-6" aria-hidden />,
    title: "automated follow-up",
    description:
      "email + sms reminders and post-visit review flows keep schedule gaps filled and referrals climbing."
  }
]

const transferSteps = [
  {
    step: "01",
    title: "we coordinate the handoff",
    description: "our team contacts your old provider, secures domains, hosting, and access without adding to your plate."
  },
  {
    step: "02",
    title: "content & compliance audit",
    description: "we migrate forms, HIPAA-sensitive assets, and redirects so no appointment requests are lost."
  },
  {
    step: "03",
    title: "zero-downtime launch",
    description: "cutover happens overnight with performance monitoring, uptime alerts, and instant rollback safeguards."
  }
]

const integrationPoints = [
  "instant sync with practice management tools (dentrix, open dental, eaglesoft).",
  "secure patient forms and payment links connected to HIPAA-aware workflows.",
  "custom email setup so hello@yourpractice.com routes to the right team members.",
  "advanced analytics dashboards that show calls, bookings, and top-performing services."
]

const faqs = [
  {
    question: "will search rankings drop when we migrate?",
    answer:
      "no. we map every legacy URL, keep metadata intact, and submit the new structure to search engines so visibility only improves."
  },
  {
    question: "what should a dental practice website include?",
    answer:
      "clear treatment pages, provider bios, reviews, and a simple booking path — plus fast performance, accessibility, and seo-ready structure so patients (and google) understand you quickly.",
  },
  {
    question: "how much does a dental practice website cost?",
    answer:
      "it depends on scope: number of locations, services, integrations, content needs, and whether you’re migrating from an old provider. we scope around what will actually move calls and bookings, not a one-size template.",
  },
  {
    question: "can you integrate specialty services like ortho or implants?",
    answer:
      "yes. we build dedicated funnels with financing options, smile simulations, and testimonial blocks tailored to each specialty."
  },
  {
    question: "how quickly can we switch?",
    answer:
      "most practices launch in 3-4 weeks. urgent transitions are possible when an old provider is unresponsive or access is expiring."
  }
]

export const metadata: Metadata = buildRouteMetadata({
  titleStem: "Dental Practice Website Design That Converts | Prism",
  description: "Modern dental practice websites that get found, build trust, and convert visits into booked appointments. Fast, mobile-first, and built for long-term content.",
  path: "/dental-website",
  ogImage: "/prism-opengraph.png",
})

export default function DentalWebsitePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,201,240,0.15),_transparent_55%)]" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-28">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div className="flex max-w-4xl flex-col items-center text-center md:items-start md:text-left">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-neutral-200">
                  dental practice website blueprint
                </span>
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                  dental practice websites that get found, trusted, and chosen.
                </h1>
                <p className="mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
                  prism builds modern dental practice websites that earn trust quickly, rank for local intent, and turn visits into booked
                  appointments. every launch includes a stress-free transfer from your previous provider.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                  <Button asChild size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                    <Link href="/get-started">
                      {FREE_AUDIT_CTA_TEXT}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                    <Link href="/why-dental-practices-love-prism">
                      why dentists pick prism
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div
                tabIndex={0}
                role="group"
                className="group mx-auto flex h-64 w-full max-w-[18rem] items-center justify-center rounded-3xl border border-white/20 bg-white/10 p-4 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-orange-300/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-300/60"
              >
                <ServiceIllustration
                  variant="local"
                  className="h-full w-full text-neutral-200 transition-colors group-hover:text-orange-200 group-focus-visible:text-orange-200 group-active:text-orange-100"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
              <div className="space-y-6">
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">crafted for dental growth</p>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  what patients expect from a dental practice website
                </h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  before patients choose a dentist, they want clarity, proof, and an easy next step. a great website removes friction and answers questions the way people actually search.
                </p>
                <div className="space-y-4">
                  {lovePoints.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                      <div>
                        <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-neutral-600">
                  who wrote this: the prism design + engineering team. how we build: patient-first structure, fast performance, and measurement tied to calls/forms. why: so your website compounds trust and bookings over time.
                </p>
                <p className="text-sm text-neutral-600">
                  want the dentist-specific ai overviews checklist? read{" "}
                  <Link
                    href="/blog/ai-search-for-dental-practice"
                    className="font-medium text-neutral-900 underline decoration-neutral-200 underline-offset-4"
                  >
                    ai search for dental practice
                  </Link>
                  . want the step-by-step checklist to rank higher in google? read{" "}
                  <Link
                    href="/blog/dental-practice-rank-higher-google-search"
                    className="font-medium text-neutral-900 underline decoration-neutral-200 underline-offset-4"
                  >
                    dental practice rank higher in google search
                  </Link>
                  . want the website checklist? read{" "}
                  <Link
                    href="/blog/dentist-website-design-checklist"
                    className="font-medium text-neutral-900 underline decoration-neutral-200 underline-offset-4"
                  >
                    dentist website design checklist
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">dentists see results within weeks</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li>• more booked implant, ortho, and cosmetic consultations driven by tailored landing pages.</li>
                  <li>• measurable lift in phone calls and online bookings through simplified forms and tracking.</li>
                  <li>• improved review velocity thanks to automated requests wired into the new site.</li>
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline decoration-neutral-200 underline-offset-4">
                  <Link href="/why-dental-practices-love-prism">see full dentist success stories</Link>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">what we build</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                what we build (and why it works)
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                the goal isn’t “a prettier site.” it’s a calmer, clearer experience patients trust — and a structure google can understand.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {designEssentials.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">proof</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                dental website examples and case studies
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                explore real dental launches—how we structure pages, clarify services, and improve booking paths.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                {designExamples.map((example) => (
                  <Link
                    key={example.href}
                    href={example.href}
                    className="block rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">case study</p>
                    <h3 className="mt-2 text-lg font-semibold text-neutral-900">{example.label}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{example.description}</p>
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-sm text-neutral-600">
                want the full transformation story? read{" "}
                <Link
                  href="/blog/from-broken-to-beautiful-dental-website-transformation"
                  className="font-semibold text-neutral-900 underline decoration-neutral-200 underline-offset-4"
                >
                  from broken to beautiful: dental website transformation
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-white px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">our process</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">our build process</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                a clear plan, a fast build, and a launch that protects what already works—so your new website performs on day one.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "intent + site map",
                  description:
                    "we map treatments, locations, and common questions into a structure patients and search engines can follow.",
                },
                {
                  step: "02",
                  title: "copy + conversion plan",
                  description:
                    "we clarify your offer, write patient-first pages, and define the booking paths (call, form, online scheduling).",
                },
                {
                  step: "03",
                  title: "design + build",
                  description:
                    "mobile-first design, fast pages, and technical seo foundations (headings, internal links, schema).",
                },
                {
                  step: "04",
                  title: "launch + redirects",
                  description:
                    "we migrate content, set up redirects, and verify analytics so you don’t lose calls during the switch.",
                },
                {
                  step: "05",
                  title: "measure + iterate",
                  description:
                    "we track calls and forms, ship improvements, and expand content so results compound over time.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">{item.step}</span>
                  <h3 className="mt-3 text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">revenue levers</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">sites designed to grow production</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                from emergency dentistry to full-smile makeovers, every page guides patients from first impression to scheduled visit. here&apos;s how we turn design into dependable revenue.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {revenueHighlights.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-800">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
              <div className="mt-10 flex justify-center">
                <Button asChild variant="outline" className="rounded-full px-8">
                <Link href="/dental-practice-seo-expert">see our dentist seo playbook</Link>
                </Button>
              </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-md">
              <HeroLoopingVideo
                videoSrc="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1762028676/scheduling-dental-website_nehxuw.mp4"
                posterSrc="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762028718/scheduling-dental-website_dnebtj.webp"
                alt="Preview of a dental practice website scheduling flow"
                className="border-none shadow-none"
                aspectClassName="aspect-[16/9]"
                videoClassName="object-cover"
              />
            </div>
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">frictionless scheduling</p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                booking flows that feel effortless for every patient
              </h2>
              <p className="text-base leading-relaxed text-neutral-600">
                prism wires real-time availability, reminders, and two-way updates into your site so new and returning
                patients can confirm visits without a phone call.
              </p>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                  <span>synced with dentrix, open dental, and leading practice management tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                  <span>automatic confirmations, reminders, and follow-up emails + sms when patients book.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
                  <span>availability updates instantly reflected across specialty landing pages and paid campaigns.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Button asChild className="rounded-full px-6">
                  <Link href="/get-started">
                    explore scheduling options
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl space-y-10">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-md">
              <HeroLoopingVideo
                videoSrc="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1762028436/dental-website_axxdfz.mp4"
                posterSrc="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762028473/dental-website-thumbnail_bpbzex.webp"
                alt="Preview of a modern dental practice website design"
                className="border-none shadow-none"
                aspectClassName="aspect-[16/9]"
                videoClassName="object-cover"
              />
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
                hear from the dentists we work with
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                interviews with enzo and our dental partners
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                founders and front office teams share, in their own words, how prism reshaped their digital presence,
                schedules, and patient experience.
              </p>
            </div>
            <VideoCarousel
              items={[
                { videoId: "wCQrUajsnk8", title: "Dr. Teagan Willes Interview" },
                { videoId: "HrksJeYb02Q", title: "Dr. Christopher Wong Interview" },
                { videoId: "WIWxwdZflzo", title: "Dr. Ahmed Mataria Interview" },
                { videoId: "IQJoQt4b2ls", title: "Dental Practice Success Story" },
                { videoId: "FxuzACT-o2Q", title: "Dr. Katie Lee Interview" },
                { videoId: "zL4Ax2bs9pU", title: "Dr. A Interview" },
                { videoId: "jE6YAimUxMQ", title: "Melissa Front Desk Interview" },
                { videoId: "5eB4Y27zkE8", title: "Ludmila Office Manager Interview" },
              ]}
            />
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-900 text-white px-4 py-16 sm:py-20">
          <div className="container mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/60">beyond the website</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                grow every channel your practice depends on
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                prism handles more than beautiful dental sites—we run the ads, local listings, and review workflows that
                keep chairs filled. curious how the full system works together?
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  <span>
                    hyper-local google ads and meta campaigns tied to actual booked treatment. see{" "}
                    <Link href="/facebook-ads-for-dentists" className="font-semibold text-white underline underline-offset-4">
                      facebook ads for dentists
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  <span>50+ directories and ai search surfaced with accurate hours, services, and reviews.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  <span>ongoing optimization so your practice stays ahead of algorithm shifts.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 shadow-[0_30px_120px_-70px_rgba(15,23,42,0.8)] md:max-w-sm">
              <p className="text-base font-semibold text-white">ready to see the whole growth engine?</p>
              <p>
                explore how prism helps dentists win more patients with ads, listings, and automated follow-up built on
                top of your website.
              </p>
              <Button asChild className="w-full rounded-full bg-white text-neutral-900 hover:bg-neutral-100">
                <Link href="/why-dental-practices-love-prism">
                  see why dental practices love prism
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl space-y-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">
                research-led decisions
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                we monitor real search demand weekly
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                prism keeps a pulse on traditional google trends and ai overview coverage so your website matches the
                searches patients already make. here&apos;s a live snapshot of the keywords we optimize most often.
              </p>
            </div>
            <DentalTrendsChart />
            <div className="mx-auto max-w-3xl text-center text-sm text-neutral-600">
              <p>
                we pair trend data with answer engine optimization, so whether patients ask claude, chatgpt, or google
                for treatments, your pages surface with the right messaging.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center">
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">no-stress migration</p>
                <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                  we do the heavy lifting when you leave your old provider
                </h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  dentists often feel trapped by agencies that own their domain or hosting. prism handles every detail so the transition is invisible to your patients and internal team.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {transferSteps.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">{item.step}</span>
                    <h3 className="mt-3 text-base font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline decoration-neutral-200 underline-offset-4">
              <Link href="/custom-email-for-dental-practices">secure communications with custom email</Link>
              <ArrowRight className="h-4 w-4" aria-hidden />
            </div>
          </div>
        </section>

        <DentalClientsSection />

        <section className="border-t border-neutral-100 bg-white px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <ShieldCheck className="h-8 w-8 text-neutral-800" aria-hidden />
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">connected systems</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">all of your patient touchpoints in sync</h2>
                  <ul className="grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                    {integrationPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline decoration-neutral-200 underline-offset-4">
                    <Link href="/custom-email-for-dental-practices">learn more about custom email for dental teams</Link>
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:items-start">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white">
                  FAQ
                </h2>
                <p className="mt-4 text-sm text-neutral-600">
                  the questions we hear from practice owners preparing to switch providers.
                </p>
              </div>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-neutral-900">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-16 sm:pb-24">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-neutral-500">ready for a practice website that performs?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">next step</h2>
            <p className="mt-4 text-base text-neutral-600">
              start with a complimentary audit, see real patient journeys, and get a tailored roadmap for your new dental practice website.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                <Link href="/get-started">
                  {FREE_AUDIT_CTA_TEXT}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-3 text-base lowercase">
                <Link href="/get-started">
                  get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              want dental-specific pricing? view{" "}
              <Link href="/pricing-dental" className="font-semibold text-neutral-900 underline underline-offset-4">
                dental pricing plans
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <ServiceSchema
        serviceId="dental-practice-website-design"
        name="Dental practice website design"
        description="Dental practice website design, copy, and development built to earn trust, load fast, and support long-term local visibility."
        serviceType="Website design"
        areaServed="United States"
      />
      <FAQSchema questions={faqs} />
    </>
  )
}

import Link from "next/link"
import type { Metadata } from "next"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ServiceSchema } from "@/components/schema-markup"
import FAQSection from "@/components/faq-section"

type CoreService = {
  name: string
  summary: string
  outcomes: string[]
  caseStudies: { label: string; href: string }[]
  learnMoreLinks?: { label: string; href: string }[]
}

const coreServices: CoreService[] = [
  {
    name: "Websites & Experience Design",
    summary: "Design systems, copy, and development that give you a conversion-ready site — managed end to end by Prism.",
    learnMoreLinks: [
      { label: "website design services", href: "/websites" },
      { label: "start a website project", href: "/get-started?service=website-design" },
    ],
    outcomes: [
      "Custom design, UX, and development in one sprint team",
      "Editable component library and CMS governance",
      "Launch support, hosting, and ongoing optimizations",
    ],
    caseStudies: [
      { label: "Laguna Beach Dental Arts", href: "/case-studies/laguna-beach-dental-arts" },
      { label: "Family First Smile Care", href: "/case-studies/family-first-smile-care" },
      { label: "Infobell IT", href: "/case-studies/infobell-it" },
    ],
  },
  {
    name: "Local Presence & Reviews",
    summary: "Keep your practice or storefront discoverable with listings, reputation management, and map pack reporting.",
    learnMoreLinks: [
      { label: "local seo services", href: "/local-seo-services" },
      { label: "local seo agency", href: "/local-seo-agency" },
      { label: "dentist seo", href: "/dental-practice-seo-expert" },
      { label: "seo audit service", href: "/seo/audit" },
      { label: "ai seo services", href: "/ai-seo-services" },
    ],
    outcomes: [
      "Google, Apple, Yelp, and niche directory management",
      "Review capture flows and response playbooks",
      "Local landing blocks, schema, and reporting dashboards",
    ],
    caseStudies: [
      { label: "Wine Country Root Canal", href: "/case-studies/wine-country-root-canal" },
      { label: "Town Centre Dental", href: "/case-studies/town-centre-dental" },
    ],
  },
  {
    name: "Paid Media & Creative",
    summary: "Strategy, creative, and execution for always-on paid search and paid social campaigns.",
    outcomes: [
      "Full-funnel campaign setup across Google, Meta, and TikTok",
      "High-performing creative, landing pages, and reporting",
      "Weekly optimizations and offer testing",
    ],
    caseStudies: [
      { label: "Dr. Christopher B. Wong", href: "/case-studies/dr-christopher-wong" },
      { label: "Exquisite Dentistry", href: "/case-studies/exquisite-dentistry" },
    ],
  },
  {
    name: "Content & Communications",
    summary: "Operator-friendly content systems for email, video, blogs, and in-practice storytelling.",
    learnMoreLinks: [
      { label: "custom email for dental practices", href: "/custom-email-for-dental-practices" },
    ],
    outcomes: [
      "Editorial calendars and brand voice guidelines",
      "Short-form video, blog, and email nurture production",
      "Asset library and automation-ready templates",
    ],
    caseStudies: [
      { label: "Grace Dental Santa Rosa", href: "/case-studies/grace-dental-santa-rosa" },
      { label: "Rebellious Aging", href: "/case-studies/rebellious-aging" },
    ],
  },
  {
    name: "Analytics, Automation & Support",
    summary: "A single source of truth with GA4, ads, CRM, and in-office tools stitched together.",
    outcomes: [
      "Dashboards and scorecards for leads, bookings, and revenue",
      "Automations for follow-up, reminders, and hand-offs",
      "Quarterly planning and priority shaping with the Prism team",
    ],
    caseStudies: [
      { label: "Practice Transitions Institute", href: "/case-studies/practice-transitions-institute" },
      { label: "sr4 Partners", href: "/case-studies/sr4-partners" },
    ],
  },
]

const bundleExamples = [
  {
    name: "Local Starter",
    price: "$300/mo",
    description: "starter stack for new practices and solo operators.",
    includes: ["Starter Site", "Local Listings"],
  },
  {
    name: "Growth 10",
    price: "$1,100/mo",
    description: "balanced mix for teams layering paid acquisition.",
    includes: ["Business Site", "Local Listings", "Starter Ads"],
  },
  {
    name: "Content Pro",
    price: "$1,400/mo",
    description: "adds ongoing content to move visitors from interest to trust.",
    includes: ["Pro Site", "Local Listings", "Light Content"],
  },
  {
    name: "Dominate Local",
    price: "$3,600/mo",
    description: "full-funnel package for multi-location groups.",
    includes: ["Pro Site", "Local Listings", "Scale Ads", "Pro Content"],
  },
]

const workflow = [
  {
    title: "map the system",
    description: "we audit every touchpoint — site, listings, paid media, email, and practice operations — so we know where to focus first.",
  },
  {
    title: "build the core",
    description: "your website, analytics, and local presence are stabilized in a single project sprint, giving every other channel a reliable foundation.",
  },
  {
    title: "layer the growth levers",
    description: "paid media, content, and automation join the mix as we hit traction milestones, with bundles tailored to your goals and budget.",
  },
  {
    title: "optimize and report",
    description: "weekly measurements, quarterly planning, and shared dashboards keep the entire growth engine accountable and transparent.",
  },
]

const whoItsFor = [
  "Local businesses that need a clear, conversion‑ready online presence.",
  "Founders or operators tired of juggling five vendors for one growth goal.",
  "Teams launching new locations, services, or product lines.",
  "Brands that want one system for website, local visibility, ads, and analytics.",
]

const problemsWeSolve = [
  "Outdated websites that look fine but don’t convert.",
  "Inconsistent listings, reviews, and map pack visibility.",
  "Paid ads that spend money without showing real ROI.",
  "Disconnected analytics that make growth decisions guessy.",
  "Manual follow‑ups and intake that slow your team down.",
]

const deliverables = [
  "A modern website and design system you can evolve.",
  "Listings + review engine that keeps you accurate and trusted.",
  "Always‑on paid search/social campaigns tuned to local intent.",
  "Content and creative that supports offers and authority.",
  "Dashboards tying leads, bookings, and revenue to channels.",
  "Quarterly planning and weekly optimizations with Prism.",
]

const proofLinks = [
  { label: "Olympic Bootworks", href: "/case-studies/olympic-bootworks" },
  { label: "Dr. Christopher B. Wong", href: "/case-studies/dr-christopher-wong" },
  { label: "sr4 Partners", href: "/case-studies/sr4-partners" },
]

const faqItems = [
  {
    question: "Do I need every service to work with Prism?",
    answer:
      "No. Most clients start with one foundation—usually a website or local presence—and add paid media, content, or automation once the core is stable.",
  },
  {
    question: "How do you decide what to prioritize first?",
    answer:
      "We start with a short audit of your website, listings, ads, and analytics, then map the fastest path to measurable wins based on your market and goals.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We focus on local and service‑based businesses—dental and medical practices, local retail, professional services, nonprofits, and community brands.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We track calls, forms, bookings, and revenue lift against channel spend, then report in plain English so you know what’s working and why.",
  },
  {
    question: "Can you collaborate with our internal team?",
    answer:
      "Yes. We plug into existing marketing, ops, or front‑office teams, share dashboards, and provide playbooks so execution stays aligned.",
  },
  {
    question: "What does an engagement look like month to month?",
    answer:
      "You get a dedicated Prism sprint team, weekly check‑ins, and quarterly planning. We ship improvements continuously rather than in big, risky redesigns.",
  },
]

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

export const metadata: Metadata = {
  title: {
    absolute: "Prism Services | Websites, Local Presence, Ads & Analytics",
  },
  description:
    "One partner for websites, local presence, paid media, content systems, and analytics—so your business gets found, trusted, and chosen.",
  alternates: {
    canonical: "https://www.design-prism.com/services",
  },
  openGraph: {
    title: "Prism Services | Websites, Local Presence, Ads & Analytics",
    description:
      "One partner for websites, local presence, paid media, content systems, and analytics—so your business gets found, trusted, and chosen.",
    url: "https://www.design-prism.com/services",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism Services",
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="relative overflow-hidden border-b border-neutral-100">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-white" aria-hidden="true" />
          <div className="container relative mx-auto px-4 pb-16 pt-20 sm:pt-24 md:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">services</p>
              <h1 className="mt-4 text-4xl font-semibold lowercase tracking-tight text-neutral-900 sm:text-5xl">
                one partner for every growth lever
      </h1>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                Prism brings together websites, local presence, paid media, content, and analytics so you don't have to juggle five vendors. Pick what you need today and add new levers when you're ready.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  get started
                </Link>
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
                >
                  talk with prism
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">who it&apos;s for</h2>
                <ul className="space-y-2 text-sm text-neutral-600 sm:text-base">
                  {whoItsFor.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">problems we solve</h2>
                <ul className="space-y-2 text-sm text-neutral-600 sm:text-base">
                  {problemsWeSolve.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-4xl text-center">
              <h2 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">what you get</h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                A single sprint team that covers strategy, design, engineering, and growth—so every lever stays connected.
              </p>
            </div>
            <ul className="mx-auto mt-8 grid max-w-4xl gap-3 text-sm text-neutral-600 sm:grid-cols-2 sm:text-base">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2 rounded-2xl border border-neutral-200 bg-white p-4">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                what we run for you
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Every engagement starts with the essentials, then layers in new channels as we unlock wins. Here's how each service helps.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {coreServices.map((service) => (
                <div
                  key={service.name}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-semibold lowercase text-neutral-900">{service.name}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{service.summary}</p>
                    {service.learnMoreLinks?.length ? (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {service.learnMoreLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">case studies</p>
                    <div className="flex flex-wrap gap-2">
                      {service.caseStudies.map((caseStudy) => (
                        <Link
                          key={caseStudy.href}
                          href={caseStudy.href}
                          className="text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                        >
                          {caseStudy.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
              dental teams running paid social: see{" "}
              <Link href="/tiktok-ads-for-dentists" className="font-semibold text-neutral-900 underline underline-offset-4">
                tiktok ads for dentists
              </Link>
              .
            </div>
            <div className="mx-auto mt-6 max-w-4xl rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700">
              building an app alongside your growth stack? explore our{" "}
              <Link href="/apps" className="font-semibold text-neutral-900 underline underline-offset-4">
                app development work
              </Link>{" "}
              or{" "}
              <Link
                href="/get-started?service=app-development"
                className="font-semibold text-neutral-900 underline underline-offset-4"
              >
                start an app project
              </Link>
              .
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-100 bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">how it works</h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                We start with the foundation, then bring in additional services as your goals expand.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {workflow.map((step, idx) => (
                <div key={step.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">step {String(idx + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">popular bundles clients launch with</h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Use the get started plan to fine-tune your mix. These example stacks show where most teams begin.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {bundleExamples.map((bundle) => (
                <div key={bundle.name} className="flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">bundle</p>
                    <h3 className="mt-2 text-xl font-semibold lowercase text-neutral-900">{bundle.name}</h3>
                    <p className="text-sm font-semibold text-neutral-500">{bundle.price}</p>
                  </div>
                  <p className="text-sm text-neutral-600">{bundle.description}</p>
                  <ul className="space-y-1 text-sm text-neutral-600">
                    {bundle.includes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link
                      href="/get-started"
                      className="text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                    >
                      configure this in your plan
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-100 bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">proof in the wild</h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Recent launches showing how Prism connects design, engineering, and growth for local brands.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {proofLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold lowercase text-neutral-900 transition hover:border-neutral-900"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/case-studies"
                  className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold lowercase text-white transition hover:bg-neutral-800"
                >
                  see all case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FAQSection
          title="services faq"
          subtitle="Answers about scope, timing, and how to start."
          items={faqItems}
          className="bg-neutral-50"
        />

        <section className="bg-neutral-900 py-16 text-white sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">build your mix with prism</h2>
              <p className="mt-3 text-sm text-neutral-300 sm:text-base">
                Tell us where you need momentum—local visibility, conversions, or full-funnel growth—and we'll recommend the right combination of services.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                >
                  claim your audit & plan
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  see client wins
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {coreServices.map((service) => (
        <ServiceSchema
          key={`service-schema-${slugify(service.name)}`}
          serviceId={slugify(service.name)}
          name={service.name}
          description={service.summary}
          serviceType={service.name}
          areaServed="United States"
        />
      ))}
    </>
  )
}

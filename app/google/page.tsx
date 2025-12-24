import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle2, Globe2, MailCheck, Sparkles } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"

const GET_STARTED_HREF = "/get-started"
const PRICING_HREF = "/get-started"
const GOOGLE_WORKSPACE_LINK =
  "https://c.gle/APy2Ad08G18tc2DVKTvFnIX7ZsIi8C_16CofJocN9aFYsQDXBJRKDAH3FRQb6BfrqNgPv1Buz5DypvRjWF8E2rqpEvohTLTUWmLF6UOh4oCinNkIBx-wbk3wUX2jqxqDYiPNn4cWz4pfBlfNZT7je1YO"
const GOOGLE_MARKETING_PLANS_HREF = "/get-started"
const BLOG_HREF = "/blog"
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@the_design_prism"
const HIPAA_PATIENT_FORMS_GUIDE = "/google/dental-patient-forms"

const servicesHighlights = [
  {
    title: "google workspace setup & optimization",
    description:
      "we help you set up professional email, shared drives, forms, and workflows — all under your own business domain. get your team collaborating smarter, not harder.",
    ctaLabel: "Set up Workspace (with discount)",
    href: GOOGLE_WORKSPACE_LINK,
    external: true,
    icon: MailCheck
  },
  {
    title: "google marketing integration",
    description:
      "we connect and optimize your google business profile, google ads, analytics, and youtube — ensuring every ad click and search result leads to measurable growth.",
    ctaLabel: "Get started with Prism",
    href: GOOGLE_MARKETING_PLANS_HREF,
    external: false,
    icon: Globe2
  },
  {
    title: "insights & automation",
    description:
      "from automated reporting to conversion tracking, we use google tools to make your marketing smarter and your operations more efficient.",
    ctaLabel: undefined,
    href: undefined,
    external: false,
    icon: BarChart3
  }
]

const partnershipPoints = [
  "Official Google Workspace Partner",
  "Deep expertise in Ads, Analytics, and Business Profile optimization",
  "Hands-on setup, support, and automation",
  "Proven results with local businesses across industries"
]

const learningLinks = [
  {
    title: "our blog",
    description: "guides on google ads, business profiles, workspace, and analytics.",
    href: BLOG_HREF,
    external: false
  },
  {
    title: "youtube channel",
    description: "walkthroughs and tutorials for building on google tools.",
    href: YOUTUBE_CHANNEL_URL,
    external: true
  }
]

export const metadata: Metadata = {
  title: "google workspace & ads partner",
  description:
    "prism is a google partner helping small businesses grow through google workspace, ads, analytics, and business profile optimization. get started or set up workspace with a partner discount.",
  alternates: {
    canonical: "https://www.design-prism.com/google"
  },
  openGraph: {
    title: "google workspace & ads partner",
    description:
      "prism is a google partner helping small businesses grow through google workspace, ads, analytics, and business profile optimization. get started or set up workspace with a partner discount.",
    url: "https://www.design-prism.com/google",
    siteName: "prism",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "google workspace & ads partner",
    description:
      "prism is a google partner helping small businesses grow through google workspace, ads, analytics, and business profile optimization. get started or set up workspace with a partner discount."
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function GooglePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900 lowercase">
        <section className="relative overflow-hidden rounded-b-[3rem] bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,0,0,0.88))]"
          />
          <div className="absolute inset-0 opacity-40 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.25),_rgba(76,29,149,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center lowercase md:gap-8 md:px-6 md:py-32">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-white/70">
                <Sparkles className="h-4 w-4" aria-hidden />
                prism × google
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                prism + google: growing local businesses with the world’s best tools
              </h1>
              <p className="text-base text-white/80 sm:text-lg">
                we help small businesses and local practices grow faster by setting up, integrating, and optimizing google
                products — from workspace to ads — all under one roof.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href={PRICING_HREF} className="lowercase">
                    get started <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline-inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href={GOOGLE_WORKSPACE_LINK} target="_blank" rel="noopener noreferrer" className="lowercase">
                    set up google workspace (with discount) <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white lowercase">
          <div className="container mx-auto flex flex-col gap-8 px-4 py-16 md:flex-row md:gap-12 md:px-6 lg:py-24">
            <div className="md:w-1/2">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">why google matters</p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900 md:text-4xl">
                the foundation of modern business runs on google.
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-base text-neutral-600 sm:text-lg md:w-1/2">
              <p>
                every day, millions of businesses rely on google products to operate, communicate, and grow. from gmail and
                google drive to google ads, analytics, and business profiles, google provides the infrastructure for small
                businesses to look professional, stay organized, and attract customers.
              </p>
              <p>
                at prism, we help you make the most of these tools — integrating everything into one seamless system built
                for performance, visibility, and growth.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">What we do</p>
              <h2 className="text-3xl font-semibold md:text-4xl">
                We don’t just use Google.
                <br className="hidden sm:block" />
                We optimize it for your business.
              </h2>
              <p className="text-sm text-white/70">
                Our team helps you implement and manage the Google ecosystem in a way that actually drives results. Here’s
                how we do it:
              </p>
            </div>
            <div className="grid gap-6 text-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
              {servicesHighlights.map((service) => {
                const isExternal = service.href?.startsWith("http") ?? false
                const Icon = service.icon
                return (
                  <div
                    key={service.title}
                    className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                  >
                    <div className="space-y-4">
                      <Icon className="h-6 w-6 text-white/70" aria-hidden />
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-sm text-white/70">{service.description}</p>
                    </div>
                    {service.href && service.ctaLabel && (
                      <Link
                        href={service.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:text-white/80"
                      >
                        {service.ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Why partner with Prism
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                A Google Partner that actually helps you grow.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-600 sm:text-lg">
              <p>
                We’re not just another marketing agency — we’re builders, operators, and problem solvers who live inside the
                Google ecosystem every day. Our clients use Google products to manage their business, communicate with
                customers, and drive revenue — and we help them do it better.
              </p>
              <p>
                When you partner with Prism, you’re not just getting setup help. You’re getting a team that knows how to make
                Google work for your business.
              </p>
              <ul className="space-y-4">
                {partnershipPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-neutral-700 sm:text-base">
                    <span className="mt-0.5 rounded-full bg-emerald-400/20 p-1.5 text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="h-auto w-full rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white sm:w-auto"
              >
                <Link href={GET_STARTED_HREF}>
                  Get Started <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                hipaa patient intake
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                make google workspace safe for dental forms.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-700 sm:text-lg">
              <p>
                dental practices ask us how to collect new patient histories without leaving workspace. our implementation-grade
                guide walks through baa execution, shared drive controls, dlp, and checklist tooling so your intake stays hipaa-ready.
              </p>
              <p>
                we also include our partner discount so you can spin up workspace on the covered editions before you build the form.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-auto w-full rounded-full px-8 py-4 text-base font-semibold sm:w-auto"
                >
                  <Link href={HIPAA_PATIENT_FORMS_GUIDE}>
                    see the hipaa setup guide <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-auto w-full rounded-full px-8 py-4 text-base font-semibold sm:w-auto"
                >
                  <Link href={GOOGLE_WORKSPACE_LINK} target="_blank" rel="noopener noreferrer">
                    claim the workspace discount <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px),_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Learn & grow with Google
              </p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                Free guides to master Google tools.
              </h2>
            </div>
            <div className="space-y-6 text-base text-neutral-700 sm:text-lg">
              <p>
                We regularly publish free guides and videos showing how to use Google tools to grow your business — from
                running effective ad campaigns to improving your search ranking and online presence.
              </p>
              <p>Check them out on our blog or YouTube channel:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {learningLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col gap-2 rounded-3xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500 group-hover:text-neutral-900">
                      {link.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-sm text-neutral-600">{link.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-950">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-white md:px-6 md:py-24">
            <h2 className="text-3xl font-semibold md:text-4xl">Let’s build your business on Google.</h2>
            <p className="max-w-2xl text-base text-white/80 sm:text-lg">
              Whether you’re setting up your first business email or scaling a multi-location brand, we’ll help you get the
              most out of Google’s tools and ecosystem.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                variant="inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href={PRICING_HREF}>
                  Get started with Prism <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href={GOOGLE_WORKSPACE_LINK} target="_blank" rel="noopener noreferrer">
                  Set Up Google Workspace (with discount) <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, MailCheck, ShieldCheck, Users2 } from "lucide-react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { FAQSchema, WebPageSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

const tldrPoints = [
  "Looks professional and trustworthy to patients and partners.",
  "Works better with hiring sites like Handshake (they prefer company-domain emails).",
  "Keeps your brand and data under your control (not an employee's personal inbox).",
  "Delivers more reliably when set up with email-security basics (SPF, DKIM, DMARC).",
  "Plays nice with healthcare rules when configured properly (HIPAA plus BAA options).",
]

const benefits = [
  {
    title: "look legit. build trust.",
    description:
      "emails from hello@yourpractice.com match your website and signage. it is a small signal that patients and partners notice, and hiring portals recognize it too.",
  },
  {
    title: "better hiring and vendor verification.",
    description:
      "platforms like handshake prefer company-domain emails for faster employer validation. generic mailboxes often face limited functionality or extra steps.",
  },
  {
    title: "own the inbox, not the employee.",
    description:
      "create or remove accounts in minutes. forward or archive safely when staff changes so resumes and treatment history never live in a personal gmail.",
  },
  {
    title: "fewer deliverability headaches.",
    description:
      "with spf, dkim, and dmarc in place, receiving servers can verify that your messages are real. that reduces spam flags and blocks spoofers that target clinics.",
  },
  {
    title: "security foundation for healthcare.",
    description:
      "google workspace or microsoft 365 can be configured with baas and policies that support hipaa compliance when used correctly. hhs allows email with reasonable safeguards.",
  },
  {
    title: "shared and role addresses that just work.",
    description:
      "use addresses like frontdesk@, billing@, care@, and jobs@ that route to the right people and can be reassigned as your team changes.",
  },
  {
    title: "simple to use with the same apps.",
    description:
      "prefer gmail or outlook? keep the same interface, just with your own domain and the protections prism configures behind the scenes.",
  },
]

const setupChecklist = [
  "Professional mailboxes on Google Workspace or Microsoft 365.",
  "Aliases and groups (info@, billing@, jobs@, care@).",
  "Deliverability and anti-spoofing: SPF, DKIM, DMARC records configured.",
  "Admin control with easy onboarding, offboarding, password policies, and 2FA.",
  "HIPAA-aware configuration, BAAs, and guidance on safe patient email habits.",
  "Migration from old inboxes with labels, folders, and contacts where possible.",
  "One-page cheat sheet so the team knows how to use the new addresses safely.",
]

const pricingOptions = [
  {
    name: "Starter",
    description: "1-3 mailboxes plus 3 role aliases, flat setup, and per-user licensing.",
  },
  {
    name: "Growth",
    description: "4-10 mailboxes with full migration and a baked-in security policy baseline.",
  },
  {
    name: "Multi-location",
    description: "everything above plus org-wide policies and location-specific routing.",
  },
]

const faqs = [
  {
    question: "Do we have to change our website?",
    answer: "No. We add a few DNS records behind the scenes so your current site stays untouched.",
  },
  {
    question: "Can we keep using Gmail or Outlook?",
    answer: "Yes. You keep the same apps on desktop and mobile, just with your own domain name.",
  },
  {
    question: "Is this HIPAA compliant?",
    answer:
      "Email can be used with patients when safeguards are in place. With Workspace or 365 plus a signed BAA and the right settings, Prism helps you support HIPAA requirements.",
  },
  {
    question: "Will our emails land in spam less?",
    answer:
      "Setting SPF, DKIM, and DMARC gives receiving servers a way to trust your messages, which improves deliverability and blocks spoofing attempts.",
  },
  {
    question: "Why not just keep yourpractice@gmail.com?",
    answer:
      "You do not control it, it looks less professional, staff changes get messy, hiring platforms may slow you down, and it is harder to secure long term.",
  },
]

const microChecklist = [
  "Verify your domain and provision accounts.",
  "Add SPF, DKIM, and DMARC records and confirm alignment.",
  "Create role addresses and routing rules that match your workflow.",
  "Turn on two-step verification and basic data-loss protections.",
  "Sign BAAs (when needed) and apply HIPAA-aware policies.",
  "Migrate legacy mail and contacts.",
  "Deliver the one-page team guide.",
]

const sources = [
  "Handshake prefers company-domain email; generic emails face limits and extra steps.",
  "SPF, DKIM, and DMARC basics and their impact on spoofing and deliverability.",
  "HIPAA and email: HHS allows email with safeguards; Google Workspace offers BAAs on paid tiers.",
]

const PAGE_TITLE = "custom email for dental practices"
const PAGE_DESCRIPTION =
  "why name@yourpractice.com beats free mailboxes. prism sets up secure, professional email so dental practices look legit, hire faster, and stay compliant."
const CANONICAL_URL = "https://www.design-prism.com/custom-email-for-dental-practices"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "give your dental practice a professional email foundation. prism handles workspace or 365 setup, deliverability, hipaa safeguards, and team training.",
    url: CANONICAL_URL,
    type: "website",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism custom email for dental practices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "own your inbox, build trust, and protect patient communication. prism configures professional email that works for modern dental teams.",
    images: ["/prism-opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CustomEmailDentalPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.25),_transparent_55%)]" aria-hidden />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-neutral-200">
                Email foundations for dental teams
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Custom Email for Dental Practices
              </h1>
              <p className="mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
                name@yourpractice.com beats @gmail.com every time. Earn trust, unlock hiring portals like Handshake, and control every inbox without losing the tools you already love.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="group rounded-full px-8 py-3 text-base">
                    Talk to Prism
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/40 bg-white px-8 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-200 hover:text-neutral-900"
                  >
                    analyze my online presence
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                TL;DR for the no-nonsense crowd
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Five reasons your dental practice needs a custom domain email yesterday.
              </p>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {tldrPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-50/80">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                The problem we keep seeing
              </h2>
              <p className="mt-6 text-base text-neutral-700">
                Practices try to post jobs or verify their business with third-party platforms and get stuck because they are using yourpractice@gmail.com. Handshake, for instance, expects employer accounts to use a company email so they can validate faster. Generic emails face limits and manual review.
              </p>
              <p className="mt-4 text-base text-neutral-700">
                Patients feel the same. Medical information sent from a free mailbox looks less trustworthy, and when a staff member leaves you lose conversations, candidate threads, and patient context tied to their personal inbox. It is preventable.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                The benefits, explained in plain English
              </h2>
              <p className="mt-4 text-base text-neutral-600">
                Seven wins you feel the first week you switch from generic inboxes.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {benefits.map((benefit, idx) => (
                <div
                  key={benefit.title}
                  className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50/80 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-neutral-500">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-base font-semibold text-white">
                      {idx + 1}
                    </span>
                    <MailCheck className="h-5 w-5 text-neutral-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-neutral-900">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                What Prism sets up for you
              </h2>
              <p className="mt-4 text-base text-neutral-300">
                Done-for-you implementation so your practice can focus on patients, not MX records.
              </p>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {setupChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-100">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Pricing that stays simple
                </h2>
                <p className="mt-4 text-base text-neutral-600">
                  Whether you are modernizing one practice or coordinating multiple locations, Prism scopes everything up front.
                </p>
                <p className="mt-4 text-sm text-neutral-500">
                  Already on Google Workspace or Microsoft 365? We will harden deliverability, clean up DNS, and lock in best practices without rebuilding from scratch.
                </p>
                <p className="mt-4 text-sm text-neutral-500">
                  Need a HIPAA-safe intake workflow too? Read our{" "}
                  <Link href="/google/dental-patient-forms" className="font-semibold text-neutral-900 underline underline-offset-4">
                    Google Workspace patient forms guide
                  </Link>
                  .
                </p>
              </div>
              <div className="grid gap-4">
                {pricingOptions.map((option) => (
                  <div
                    key={option.name}
                    className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Users2 className="h-5 w-5 text-neutral-500" />
                      <h3 className="text-lg font-semibold text-neutral-900">{option.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-900 text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-12 text-center shadow-lg sm:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-300">
                google workspace partner perk
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                10% off your first year of Google Workspace
              </h2>
              <p className="mt-6 text-base text-neutral-100 sm:text-lg">
                Prism is set up with Google to pass preferred pricing to our clients. When we launch your
                custom domain email, you can enroll through our partner link and keep an extra 10% in your
                pocket while we handle the setup, security hardening, and training.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full bg-white px-8 py-3 text-base font-semibold text-neutral-900 hover:bg-white/90">
                  <a
                    href="https://c.gle/APy2Ad08G18tc2DVKTvFnIX7ZsIi8C_16CofJocN9aFYsQDXBJRKDAH3FRQb6BfrqNgPv1Buz5DypvRjWF8E2rqpEvohTLTUWmLF6UOh4oCinNkIBx-wbk3wUX2jqxqDYiPNn4cWz4pfBlfNZT7je1YO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Activate 10% off Google Workspace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="max-w-md text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Link opens in a new tab · available for new workspace orgs only
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-50/80">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Frequently asked questions</h2>
            </div>
            <div className="mt-12 space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Micro-checklist we execute for every dental practice
              </h2>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {microChecklist.map((item) => (
                <li key={item} className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-700">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-neutral-100 bg-neutral-50/60">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
                sources for your ops notes
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-600">
                {sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-100 bg-neutral-900 px-6 py-16 text-center text-white shadow-lg">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to look legit, hire faster, and protect your brand?
              </h2>
              <p className="mt-4 text-base text-neutral-200">
                Prism sets up the infrastructure, migration, and team training so your practice can focus on care.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/get-started">
                  <Button size="lg" className="group rounded-full bg-white px-8 py-3 text-base font-semibold text-neutral-900 hover:bg-white/90">
                    {FREE_AUDIT_CTA_TEXT}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full border border-white/20 bg-transparent px-8 py-3 text-base text-white hover:bg-white/10"
                  >
                    Talk to Prism
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
      <FAQSchema questions={faqs} />
    </>
  )
}

"use client"

import Link from "next/link"
import {
  BarChart3,
  Check,
  Globe,
  MonitorSmartphone,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"

import ClientsSection from "@/components/home/Clients"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const pricingTiers = [
  {
    name: "Launch",
    emoji: "🚀",
    price: "$400 one-time",
    description: "Your new website live in 48–72 hours — designed to attract leads and prove ROI fast.",
    cta: "Start My Build →",
    href: "/get-started?plan=launch",
    accent: "from-amber-400 to-pink-500",
  },
  {
    name: "Grow",
    emoji: "🌱",
    price: "$900/mo",
    description: "Keep climbing the rankings. Ongoing SEO and content optimization that keeps leads coming in month after month.",
    cta: "Apply for Growth Plan →",
    href: "/get-started?plan=grow",
    accent: "from-sky-500 to-indigo-600",
    featured: true,
  },
  {
    name: "Scale",
    emoji: "📈",
    price: "from $1,500/mo",
    description: "For teams ready to dominate search and ads. Full funnel automation, analytics, and ad management to scale revenue — not just traffic.",
    cta: "Book Discovery Call →",
    href: "/get-started?plan=scale",
    accent: "from-emerald-400 to-teal-600",
  },
]

const features = [
  {
    title: "Launch smarter",
    description: "Built with AI plus human design reviews for pixel-perfect layouts and tuned SEO from day one.",
    icon: Sparkles,
  },
  {
    title: "Track everything",
    description: "GA4, Meta Pixel, and lead capture events wired in before you approve the build.",
    icon: BarChart3,
  },
  {
    title: "Go live effortlessly",
    description: "Domain, SSL, and forms handled for you so launch day literally takes one click.",
    icon: MonitorSmartphone,
  },
]

const faqs = [
  {
    question: "How long does the build take?",
    answer:
      "Launch projects ship in 48–72 hours. Grow and Scale timelines range from 5–10 days because we also layer in SEO, content, and analytics automation.",
  },
  {
    question: "Who owns the website?",
    answer:
      "You do. Prism transfers all design files, code, and assets after launch. We stay on retainer only if you want us to keep optimizing and publishing new content.",
  },
  {
    question: "Can I upgrade between plans?",
    answer:
      "Yes. Most teams start with Launch, then add Grow once they see early traction. Upgrades are prorated, and we treat them as sprint-style add-ons so you stay agile.",
  },
  {
    question: "Do you offer custom builds?",
    answer:
      "Absolutely. Scale engagements include paid media, automation, and analytics consulting. Tell us what you need inside the intake form and we'll shape a custom scope.",
  },
]

export default function PricingPageClient() {
  return (
    <div className="bg-white text-black" style={{ textTransform: "none" }}>
      <HeroSection />
      <PricingSection />
      <KickoffCTASection />
      <FeatureSection />
      <WebsiteUseCasesSection />
      <HandoffSection />
      <ClientsSection />
      <FAQSection />
      <FinalCTA />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="border-b border-black/10 bg-white text-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 sm:py-32">
        <RevealOnScroll delay={0.1}>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Forget the endless back-and-forth.
            </h1>
            <p className="text-lg text-black/70 sm:text-xl">
              No more chasing designers, rewriting copy, or waiting weeks. Prism ships AI-powered websites that drive real
              business—more leads, more conversions, and clients who can’t stop referring you.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full border border-black bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 sm:w-auto"
            >
              <a href="#plans">Get Your AI Site Started →</a>
            </Button>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black/80 shadow-sm">
              <span aria-hidden className="text-base">⏱️</span>
              Launch-ready in 60 hours
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="plans" className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">pricing tiers</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Pick your plan — we handle everything.</h2>
          <p className="mt-4 text-base text-black/70">
            Every site is tuned to convert and ready to grow from day one.
          </p>
        </RevealOnScroll>
        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <RevealOnScroll key={tier.name}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border border-black/20 bg-white p-6 shadow-[8px_8px_0_0_#00000010]",
                  tier.featured && "bg-black text-white"
                )}
              >
                <div className="space-y-3">
                  <p
                    className={cn(
                      "text-sm font-semibold uppercase tracking-[0.3em] text-black/60",
                      tier.featured && "text-white/70"
                    )}
                  >
                    <span className="mr-2 text-base" aria-hidden>
                      {tier.emoji}
                    </span>
                    {tier.name}
                  </p>
                  <p className={cn("text-3xl font-semibold", tier.featured && "text-white")}>{tier.price}</p>
                  <p className={cn("text-base text-black/70", tier.featured && "text-white/80")}>{tier.description}</p>
                </div>
                <div className="mt-8 flex flex-1 flex-col gap-5">
                  <Button
                    asChild
                    className={cn(
                      "w-full rounded-xl border text-base font-semibold transition",
                      tier.featured
                        ? "border-white bg-white text-black hover:bg-white/90"
                        : "border-black bg-black text-white hover:bg-black/90"
                    )}
                  >
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

function KickoffCTASection() {
  return (
    <section id="kickoff-call" className="border-y border-black/10 bg-white py-16 text-black sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 text-center">
        <RevealOnScroll>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/60">next steps</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="text-3xl font-semibold leading-snug sm:text-4xl">Ready to launch?</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="text-base text-black/70">Book a 15-minute kickoff call to align scope and timelines.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="w-full rounded-2xl border border-black bg-black px-8 py-6 text-base font-semibold text-white hover:bg-black/90 sm:w-auto"
            >
              <Link
                href="https://calendar.notion.so/meet/enzosison/sfux4ogo"
                target="_blank"
                rel="noreferrer"
                aria-label="Book Your 15-Minute Prism Site Kickoff Call"
              >
                Book Your 15-Minute Prism Site Kickoff Call
              </Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function FeatureSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">everything included</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">AI precision with white-glove delivery.</h2>
          <p className="mt-4 text-base text-black/70">
            Launch confident knowing the story, SEO signals, and analytics stack are ready the moment you hit publish.
          </p>
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 0.05}>
              <div className="h-full rounded-3xl border border-black/15 bg-white p-6 shadow-[6px_6px_0_0_#0000000A]">
                <feature.icon className="h-10 w-10 text-black" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-black/70">{feature.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteUseCasesSection() {
  const items = [
    { icon: "💬", label: "Service Website" },
    { icon: "🛍️", label: "E-commerce Store" },
    { icon: "🦷", label: "Local Business" },
    { icon: "📞", label: "Booking & Scheduling" },
    { icon: "📰", label: "Blog / Resource Hub" },
    { icon: "💼", label: "Careers & Hiring" },
    { icon: "🤖", label: "AI Chat Support" },
    { icon: "🎨", label: "Portfolio" },
    { icon: "🎤", label: "Event / Conference" },
    { icon: "🧠", label: "Founder Story" },
    { icon: "📣", label: "Landing Page" },
    { icon: "⏳", label: "Waitlist / Launch" },
  ]

  return (
    <section className="bg-zinc-50 py-24 text-black dark:bg-zinc-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            Website Use Cases
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Built for every kind of business.
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            Whether you’re booking clients, selling products, growing a team, or telling your story — Prism builds
            launch-ready websites that convert, automate, and scale your brand in days, not weeks.
          </p>
        </RevealOnScroll>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <RevealOnScroll key={item.label} delay={0.05}>
              <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white text-center text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:hover:shadow-zinc-900/20">
                <span aria-hidden className="text-3xl">
                  {item.icon}
                </span>
                <span className="mt-3 text-xs sm:text-sm">{item.label}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

function HandoffSection() {
  return (
    <section className="bg-neutral-950 py-16 text-white sm:py-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 text-center sm:gap-8">
        <RevealOnScroll>
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            ⚙️ The smoothest switch you'll ever make
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="text-3xl font-semibold sm:text-4xl">Switching shouldn’t feel like surgery.</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="text-base text-white/80">
            Leaving your old web agency shouldn’t mean lost logins, broken analytics, or mystery hosting invoices. Prism
            takes over everything—domains, hosting, analytics, DNS, forms, content—the whole backend mess.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-sm text-white/70">
            We handle the migration, optimization, and launch so you never touch the technical stuff (or need to know what
            DNS stands for).
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.25}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-base font-semibold text-white shadow-lg">
            💡 Your only job? Approve the design and watch the leads start coming in.
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">faq</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Still have questions?</h2>
          <p className="mt-4 text-base text-black/70">
            Here are the answers we share most often when teams compare plans or timelines.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <Accordion type="single" collapsible className="rounded-3xl border border-black/15 bg-white">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="px-6 text-left text-lg font-semibold text-black">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-base text-black/70">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="border-t border-black/10 bg-black py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 text-center">
        <RevealOnScroll>
          <p className="text-2xl font-semibold">🚀 Launch your new AI-powered site this week — starting at $400.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full border border-white bg-white px-8 py-6 text-base font-semibold text-black hover:bg-white/90 sm:w-auto"
            >
              <Link href="/get-started">Get started</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Award,
  BarChart3,
  Beaker,
  CalendarClock,
  Check,
  CheckCheck,
  Gauge,
  Leaf,
  MonitorSmartphone,
  Network,
  PieChart,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

import AnimatedGradient from "@/components/animations/animated-gradient"
import RippleHighlight from "@/components/animations/ripple-highlight"
import ClientsRail from "@/components/home/ClientsRail"
import PricingHero from "@/components/pricing/PricingHero"
import RevealOnScroll from "@/components/reveal-on-scroll"
import VideoPlayer from "@/components/video-player"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { FAQSchema, ServiceSchema } from "@/components/schema-markup"

type PricingBullet = {
  icon: LucideIcon
  text: string
  iconScale?: number
}

type PricingTier = {
  name: string
  emoji: string
  price: string
  tagline: string
  included: string[]
  bestFor: PricingBullet[]
  cta: string
  href: string
  accent: string
  featured: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    emoji: "🚀",
    price: "$400 one-time",
    tagline: "a sharp site in 48–72 hours.",
    included: [
      "conversion-ready website",
      "premium design + copy",
      "analytics + seo basics",
      "go-live setup (domain, ssl, forms, hosting)",
    ],
    bestFor: [
      { icon: CalendarClock, text: "one offer with a hard date (event, pop-up, waitlist)", iconScale: 0.92 },
      { icon: Sparkles, text: "founders who need a legit site this week" },
      { icon: CheckCheck, text: "validating an idea before spending on ads/dev" },
      { icon: Rocket, text: "a polished site without a long build" },
    ],
    cta: "apply for launch",
    href: "/checkout/launch",
    accent: "from-amber-400 to-pink-500",
    featured: false,
  },
  {
    name: "Grow",
    emoji: "🌱",
    price: "$900/mo",
    tagline: "publish consistently. rank. convert.",
    included: [
      "website + ongoing improvements",
      "content system (topics, writing, publishing)",
      "seo + conversion tweaks each month",
      "reporting so you know what’s working",
    ],
    bestFor: [
      { icon: Beaker, text: "steady lead growth from seo/content" },
      { icon: TrendingUp, text: "teams that want a partner, not a freelancer" },
      { icon: PieChart, text: "businesses tired of guessing what to write" },
      { icon: Leaf, text: "brands playing the long game" },
    ],
    cta: "apply for grow",
    href: "/checkout/grow",
    accent: "from-sky-500 to-indigo-600",
    featured: true,
  },
  {
    name: "Scale",
    emoji: "📈",
    price: "from $1,500/mo",
    tagline: "full-funnel growth (site + content + ads).",
    included: [
      "everything in grow",
      "paid ads management",
      "full-funnel tracking + call/lead tracking",
      "landing pages + funnels as you scale",
    ],
    bestFor: [
      { icon: Award, text: "businesses with product–market fit" },
      { icon: Gauge, text: "founders who want more lead volume" },
      { icon: Users, text: "multi-location or multi-offer growth" },
      { icon: Network, text: "one owner for the whole channel" },
    ],
    cta: "apply for scale",
    href: "/checkout/scale",
    accent: "from-emerald-400 to-teal-600",
    featured: false,
  },
]

const features = [
  {
    title: "Launch smarter",
    description: "we design pages to convert. we write clear copy. we bake in seo basics.",
    icon: Sparkles,
  },
  {
    title: "Track everything",
    description: "we set up ga4, pixels, and lead tracking so you can see what drives revenue.",
    icon: BarChart3,
  },
  {
    title: "Go live effortlessly",
    description: "we handle domains, ssl, forms, hosting, dns, migrations, and integrations.",
    icon: MonitorSmartphone,
  },
] as const

const useCaseItems = [
  { icon: "💬", label: "Service Website" },
  { icon: "🛍️", label: "E-commerce Store" },
  { icon: "🦷", label: "Local Business" },
  { icon: "📞", label: "Booking & Scheduling" },
  { icon: "📰", label: "Blog / Resource Hub" },
  { icon: "💼", label: "Careers & Hiring" },
  { icon: "🗨️", label: "Smart Chat Support" },
  { icon: "🎨", label: "Portfolio" },
  { icon: "🎤", label: "Event / Conference" },
  { icon: "🧠", label: "Founder Story" },
  { icon: "📣", label: "Landing Page" },
  { icon: "⏳", label: "Waitlist / Launch" },
] as const

const faqs = [
  {
    question: "How long does the build take?",
    answer:
      "launch is usually live in 48–72 hours. grow/scale depend on scope — we’ll confirm timing in our 24-hour reply.",
  },
  {
    question: "Who owns the website?",
    answer:
      "you do. your domain, your content, your assets. prism just runs the system.",
  },
  {
    question: "Can I upgrade between plans?",
    answer:
      "yes. start where you are, upgrade when you’re ready. we carry your work forward.",
  },
  {
    question: "Do you offer custom builds?",
    answer:
      "yes. if you need something custom, we’ll scope it and send a fixed plan.",
  },
] as const

export default function PricingPageClient() {
  return (
    <div className="bg-white text-black">
      <PricingHero />
      <PricingSection />
      <FeatureSection />
      <WebsiteUseCasesSection />
      <HandoffSection />
      <PricingClientsSection />
      <FAQSection />
      <FinalCTA />
      <PricingStructuredData />
    </div>
  )
}

function PricingSection() {
  return (
    <section id="plans" className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <RevealOnScroll className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">pick your plan</h2>
        </RevealOnScroll>
        <RevealOnScroll className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-zinc-50 p-6 text-left shadow-sm">
          <h3 className="text-lg font-semibold">not sure where to start?</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/70">
            <li>need a great site fast? choose launch.</li>
            <li>want inbound from content + seo? choose grow.</li>
            <li>ready for full-funnel growth (site + content + ads)? choose scale.</li>
            <li>still unsure? apply anyway — we’ll tell you the best fit.</li>
          </ul>
        </RevealOnScroll>
        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
        <RevealOnScroll className="text-center text-sm text-black/60">
          we reply within 24 hours with timing + next steps.
        </RevealOnScroll>
        <RevealOnScroll className="mx-auto max-w-3xl text-left">
          <h3 className="text-2xl font-semibold">what happens next</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-black/70">
            <li>apply (2 minutes).</li>
            <li>we reply in 24 hours with a timeline + next steps.</li>
            <li>we build. you approve the preview.</li>
            <li>we launch + track results. (and keep improving on grow/scale.)</li>
          </ol>
        </RevealOnScroll>
        <div className="mt-16">
          <div id="pricing-founder-vsl" className="mx-auto max-w-3xl text-left">
            <p className="text-center text-xs font-semibold tracking-[0.28em] text-black/60">
              hear from our founder
            </p>
            <VideoPlayer
              className="mt-4"
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763166554/pricing_ymfnqy.mp4"
              poster="https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/pricing_ymfnqy.jpg"
              title="Founder Enzo Sison on Prism pricing"
              caption="enzo explains the 3 options"
              schema={{
                id: "https://www.design-prism.com/pricing#founder-vsl",
                name: "Founder Enzo Sison on Prism pricing",
                description:
                  "Enzo Sison walks through Prism’s pricing, how Launch, Grow, and Scale deliver conversion-ready websites plus ongoing optimization, and why everything stays transparent from day one.",
                thumbnailUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/so_0/pricing_ymfnqy.jpg",
                uploadDate: "2025-01-24T00:00:00Z",
                duration: "PT60S",
                contentUrl: "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1763166554/pricing_ymfnqy.mp4",
                embedUrl: "https://www.design-prism.com/pricing#founder-vsl",
                width: 1920,
                height: 1080,
                creatorName: "Enzo Sison",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const hasArrow = tier.cta.includes("→")
  const ctaLabel = hasArrow ? tier.cta.replace("→", "").trim() : tier.cta

  const content = (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-3xl border border-black/20 bg-white/90 p-6 shadow-[8px_8px_0_0_#00000010] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#00000012]",
        tier.featured &&
          "bg-black text-white shadow-[12px_12px_0_0_#00000015] hover:shadow-[14px_14px_0_0_#00000020]"
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-base">
            {tier.emoji}
          </span>
          <p
            className={cn(
              "text-sm font-semibold tracking-[0.3em] text-black/60",
              tier.featured && "text-white/70"
            )}
          >
            {tier.name}
          </p>
          {tier.featured ? (
            <span
              className={cn(
                "rounded-full border border-black/20 px-2 py-0.5 text-[10px] font-semibold text-black/70",
                tier.featured && "border-white/30 text-white/80"
              )}
            >
              most popular
            </span>
          ) : null}
        </div>
        <p className={cn("text-3xl font-semibold", tier.featured && "text-white")}>{tier.price}</p>
        <p className={cn("text-sm text-black/70", tier.featured && "text-white/80")}>
          {tier.tagline}
        </p>
        <div className="pt-2">
          <p className={cn("mb-3 text-sm font-semibold", tier.featured && "text-white/90")}>
            What's included
          </p>
          <ul className={cn("space-y-2 text-sm text-black/70", tier.featured && "text-white/80")}>
            {tier.included.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check
                  strokeWidth={2}
                  className={cn("h-4 w-4 shrink-0 text-black/60", tier.featured && "text-white/70")}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={cn("mb-3 text-sm font-semibold", tier.featured && "text-white/90")}>
            Best For
          </p>
          <div className={cn("space-y-2.5 text-sm text-black/70", tier.featured && "text-white/80")}>
            {tier.bestFor.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-start gap-3">
                  <Icon
                    strokeWidth={1.6}
                    className={cn("mt-0.5 h-4 w-4 shrink-0 text-black/60", tier.featured && "text-white/70")}
                    style={
                      item.iconScale
                        ? { transform: `scale(${item.iconScale})`, transformOrigin: "center" }
                        : undefined
                    }
                    aria-hidden
                  />
                  <span>{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-1 flex-col gap-5">
        <Button
          asChild
          className={cn(
            "group w-full rounded-xl border text-base font-semibold transition",
            tier.featured
              ? "border-white bg-white text-black hover:bg-white/90"
              : "border-black bg-black text-white hover:bg-black/90"
          )}
        >
          <Link href={tier.href}>
            <span className="inline-flex items-center gap-2">
              {ctaLabel}
              {hasArrow && (
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              )}
            </span>
          </Link>
        </Button>
      </div>
    </article>
  )

  if (tier.featured) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 p-[2px] shadow-lg">
        {content}
      </div>
    )
  }

  return content
}

function FeatureSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            everything you need to go live — and grow.
          </h2>
          <p className="mt-4 text-lg text-black/80">
            premium design. real tracking. zero tech headaches.
          </p>
          <p className="mt-4 text-base text-black/70">
            we build the site, set up tracking, and launch it for you — so you can focus on customers.
          </p>
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 0.05}>
              <div className="h-full rounded-3xl border border-black/15 bg-white p-6 shadow-[6px_6px_0_0_#0000000A] transition-transform duration-200 hover:-translate-y-1">
                <div aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
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
  return (
    <section className="bg-zinc-50 py-24 text-black dark:bg-zinc-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">Website Use Cases</h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-300">
            Websites built to win business — not just sit online.
          </p>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            Whether you're booking clients, selling products, hiring talent, or building your personal brand, Prism builds websites that convert better, nurture trust faster, and position you as the top choice in your market.
          </p>
        </RevealOnScroll>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {useCaseItems.map((item, itemIndex) => (
            <RevealOnScroll key={item.label} delay={itemIndex * 0.02}>
              <div className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white text-center text-sm font-semibold text-zinc-800 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800 dark:text-white">
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
    <section className="relative overflow-hidden bg-neutral-950 py-16 text-white sm:py-24">
      <AnimatedGradient
        className="absolute inset-0"
        colors={["#0ea5e9", "#8b5cf6"]}
        opacity={0.25}
        blur={220}
        parallaxIntensity={6}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-6 text-center sm:gap-8">
        <RevealOnScroll>
          <h2 className="text-3xl font-semibold sm:text-4xl">switch without losing momentum</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="text-base text-white/80">
            we take over hosting, domains, analytics, dns, forms, and old logins — then rebuild
            everything into a clean, modern system built to convert.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="text-sm text-white/70">your only job: approve the preview.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div
            className="rounded-3xl border border-white/10 bg-white/10 p-5 text-base font-semibold text-white shadow-lg"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.15))",
              backgroundSize: "200% 200%",
            }}
          >
            approve the final preview — then watch qualified leads ramp up.
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function PricingClientsSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">our clients</h2>
        </div>
        <ClientsRail />
        <p className="text-center text-xs text-neutral-500">
          Swipe or scroll horizontally to view more clients
        </p>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-black/60">faq</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Still have questions?</h2>
          <p className="mt-4 text-base text-black/70">
            Here are the answers we share most often when teams compare plans or timelines.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <Accordion type="single" collapsible className="rounded-3xl border border-black/15 bg-white">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-black/10">
                <AccordionTrigger className="px-6 text-left text-lg font-semibold text-black transition-colors hover:text-black">
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
    <section className="relative overflow-hidden border-t border-black/10 bg-black py-16 text-white">
      <AnimatedGradient
        className="absolute inset-y-0 left-0 w-full"
        colors={["#facc15", "#34d399"]}
        opacity={0.18}
        blur={180}
        parallaxIntensity={5}
      />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-2xl font-semibold">
            🚀 launch a website that brings in customers — starting at $400.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <RippleHighlight fullWidth className="sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full border border-white bg-white px-8 py-6 text-base font-semibold text-black hover:bg-white/90 sm:w-auto"
              >
                <Link href="#plans">see plans + pricing</Link>
              </Button>
            </RippleHighlight>
          </div>
          <p className="mt-4 text-sm text-white/70">
            looking for a limited-time promo?{" "}
            <Link href="/offers" className="font-semibold text-white underline underline-offset-4">
              see current offers
            </Link>
            .
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function PricingStructuredData() {
  const faqItems = faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))

  // Define pricing details for each tier with proper billing context
  const tierPricing: Record<string, { price: string; billingPeriod?: string }> = {
    Launch: { price: "400" }, // One-time payment
    Grow: { price: "900", billingPeriod: "P1M" }, // Monthly
    Scale: { price: "1500", billingPeriod: "P1M" }, // Monthly (minimum)
  }

  return (
    <>
      {pricingTiers.map((tier) => {
        const pricing = tierPricing[tier.name]
        const bestForDescription = tier.bestFor.map((item) => item.text).join(" • ")
        const includesDescription = tier.included.join(" • ")
        const fullDescription = `${bestForDescription} • Includes: ${includesDescription}`

        return (
          <ServiceSchema
            key={`pricing-service-${tier.name.toLowerCase()}`}
            serviceId={`pricing-${tier.name.toLowerCase()}`}
            name={`${tier.name} Website Design Plan`}
            description={fullDescription}
            serviceType="WebDesign"
            areaServed="Worldwide"
            offerDetails={{
              name: `${tier.name} Plan`,
              description: fullDescription,
              businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
              price: pricing?.price,
              priceCurrency: "USD",
              billingPeriod: pricing?.billingPeriod,
              availability: "https://schema.org/InStock",
            }}
            aggregateRating={{
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "200",
              bestRating: "5",
              worstRating: "1",
            }}
          />
        )
      })}
      <FAQSchema questions={faqItems} />
    </>
  )
}

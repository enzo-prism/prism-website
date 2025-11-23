"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Award,
  BarChart3,
  Beaker,
  CalendarClock,
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
import ClientsSection from "@/components/home/Clients"
import RevealOnScroll from "@/components/reveal-on-scroll"
import VideoPlayer from "@/components/video-player"
import { useMotionPreferences } from "@/hooks/use-motion-preferences"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { floatLoop, hoverTilt } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { FAQSchema, ProductSchema } from "@/components/schema-markup"

const HERO_IMAGE = {
  src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1763918627/Generated_Image_November_23_2025_-_9_22AM_eobrfp.webp",
  alt: "Prism pricing hero preview",
}

type PricingBullet = {
  icon: LucideIcon
  text: string
  iconScale?: number
}

type PricingTier = {
  name: string
  emoji: string
  price: string
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
    bestFor: [
      { icon: CalendarClock, text: "One-time events, pop-up offers, or short-term campaigns with a hard date", iconScale: 0.92 },
      { icon: Sparkles, text: "Early-stage startups that need a sharp, legit site this week — not next quarter" },
      { icon: CheckCheck, text: "Founders validating a new offer before pouring money into dev or ads" },
      { icon: Rocket, text: "Anyone who wants a polished, conversion-ready site live within 48–72 hours" },
    ],
    cta: "Apply for launch",
    href: "/checkout/launch",
    accent: "from-amber-400 to-pink-500",
    featured: false,
  },
  {
    name: "Grow",
    emoji: "🌱",
    price: "$900/mo",
    bestFor: [
      { icon: Beaker, text: "Founders ready to publish consistently and see what actually ranks and converts" },
      { icon: TrendingUp, text: "Businesses that want steady lead growth from SEO and content — without spraying ad spend" },
      { icon: PieChart, text: "Teams that need ongoing testing, analytics, and conversion tweaks every month" },
      { icon: Leaf, text: "Brands focused on long-term organic traffic that compounds instead of resets every quarter" },
    ],
    cta: "Apply for growth",
    href: "/checkout/grow",
    accent: "from-sky-500 to-indigo-600",
    featured: true,
  },
  {
    name: "Scale",
    emoji: "📈",
    price: "from $1,500/mo",
    bestFor: [
      { icon: Award, text: "Established businesses with proven product–market fit and clear revenue targets" },
      { icon: Gauge, text: "Founders who want their site, funnels, and campaigns treated like a full growth channel" },
      { icon: Users, text: "Teams scaling leads, conversion rate, and lifetime value across multiple offers or locations" },
      { icon: Network, text: "Businesses that need full-funnel tracking, paid ads, and automation dialed in and maintained" },
    ],
    cta: "Apply for scale",
    href: "/checkout/scale",
    accent: "from-emerald-400 to-teal-600",
    featured: false,
  },
]

const features = [
  {
    title: "Launch smarter",
    description:
      "Built with intention, reviewed with precision. Every page is designed to convert with thoughtful layouts, compelling messaging, and SEO baked into the foundation so you rank faster and close stronger.",
    icon: Sparkles,
  },
  {
    title: "Track everything",
    description:
      "Know what’s working — down to the click. GA4, Meta Pixel, lead tracking, call tracking, and event data are wired in before launch so you can see exactly where revenue comes from.",
    icon: BarChart3,
  },
  {
    title: "Go live effortlessly",
    description:
      "Launch day should feel simple — and it will. We handle domains, SSL, forms, hosting, DNS, migrations, and integrations so you go live without touching a technical step.",
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
] as const

export default function PricingPageClient() {
  const { allowMotion } = useMotionPreferences()

  return (
    <div className="bg-white text-black" style={{ textTransform: "lowercase" }}>
      <HeroSection />
      <PricingSection allowMotion={allowMotion} />
      <FeatureSection allowMotion={allowMotion} />
      <WebsiteUseCasesSection allowMotion={allowMotion} />
      <HandoffSection />
      <ClientsSection />
      <FAQSection />
      <FinalCTA />
      <PricingStructuredData />
    </div>
  )
}

function HeroSection() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      <section className="border-b border-black/10 bg-white text-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 sm:py-32">
          <RevealOnScroll delay={0.1}>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your website should grow your business — not drain your time.
              </h1>
              <p className="text-lg text-black/70 sm:text-xl">
                No more redesign headaches, slow freelancers, or guessing what converts. Prism builds clean, high-performing websites designed to increase leads, boost conversions, and strengthen long-term customer value.
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
                <a href="#plans">Start Your Website →</a>
              </Button>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black/80 shadow-sm">
                <span aria-hidden className="text-base">⏱️</span>
                Launch-ready in 60 hours
              </span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.25}>
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-zinc-50 shadow-[10px_10px_0_0_#00000008] outline-none transition focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Open pricing hero image in fullscreen"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 960px, (min-width: 768px) 720px, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.01]"
                  priority
                />
              </div>
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {isFullscreen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Pricing hero image fullscreen"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-sm font-semibold text-white shadow-md transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setIsFullscreen(false)}
            >
              Close
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function PricingSection({ allowMotion }: { allowMotion: boolean }) {
  return (
    <section id="plans" className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-black/60">pricing tiers</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Pick your plan — we handle everything.</h2>
          <p className="mt-4 text-base text-black/70">
            Every site is tuned to convert and ready to grow from day one.
          </p>
        </RevealOnScroll>
        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} allowMotion={allowMotion} />
          ))}
        </div>
        <div className="mt-16">
          <div id="pricing-founder-vsl" className="mx-auto max-w-3xl text-left">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-black/60">
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
                  "Enzo Sison walks through Prism’s pricing tiers, how Launch, Grow, and Scale deliver conversion-ready websites plus ongoing optimization, and why everything stays transparent from day one.",
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

function PricingCard({ tier, index, allowMotion }: { tier: PricingTier; index: number; allowMotion: boolean }) {
  const hasArrow = tier.cta.includes("→")
  const ctaLabel = hasArrow ? tier.cta.replace("→", "").trim() : tier.cta

  const content = (
    <motion.article
      className={cn(
        "relative flex h-full flex-col rounded-3xl border border-black/20 bg-white/90 p-6 shadow-[8px_8px_0_0_#00000010] transition-shadow",
        tier.featured && "bg-black text-white shadow-[12px_12px_0_0_#00000015]"
      )}
      variants={allowMotion ? hoverTilt : undefined}
      initial={allowMotion ? "rest" : undefined}
      whileHover={allowMotion ? "hover" : undefined}
      whileTap={allowMotion ? "hover" : undefined}
    >
      {tier.name === "Scale" && (
        <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <span aria-hidden>🎯</span>
          <span>includes ads</span>
        </div>
      )}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <motion.span
            aria-hidden
            className="text-base"
            animate={allowMotion ? floatLoop(6, 5 + index * 0.3, index * 0.2) : undefined}
          >
            {tier.emoji}
          </motion.span>
          <p
            className={cn(
              "text-sm font-semibold tracking-[0.3em] text-black/60",
              tier.featured && "text-white/70"
            )}
          >
            {tier.name}
          </p>
        </div>
        <p className={cn("text-3xl font-semibold", tier.featured && "text-white")}>{tier.price}</p>
        <div className="pt-2">
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
            "w-full rounded-xl border text-base font-semibold transition",
            tier.featured
              ? "border-white bg-white text-black hover:bg-white/90"
              : "border-black bg-black text-white hover:bg-black/90"
          )}
        >
          <Link href={tier.href}>
            <span className="inline-flex items-center gap-2">
              {ctaLabel}
              {hasArrow && (
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              )}
            </span>
          </Link>
        </Button>
      </div>
    </motion.article>
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

function FeatureSection({ allowMotion }: { allowMotion: boolean }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-black/60">everything included</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Design that elevates your brand. Systems that grow it.</h2>
          <p className="mt-4 text-base text-black/70">
            Launch with confidence knowing your brand story, SEO signals, and analytics are dialed in — all with premium design and white-glove delivery from start to finish.
          </p>
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 0.05}>
              <motion.div
                className="h-full rounded-3xl border border-black/15 bg-white p-6 shadow-[6px_6px_0_0_#0000000A]"
                whileHover={allowMotion ? { y: -6 } : undefined}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <motion.div
                  aria-hidden
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5"
                  animate={allowMotion ? floatLoop(8, 7 + index * 0.4) : undefined}
                >
                  <feature.icon className="h-6 w-6 text-black" />
                </motion.div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-black/70">{feature.description}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteUseCasesSection({ allowMotion }: { allowMotion: boolean }) {
  return (
    <section className="bg-zinc-50 py-24 text-black dark:bg-zinc-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll className="text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
            Website Use Cases
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Websites built to win business — not just sit online.</h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-300">
            Whether you're booking clients, selling products, hiring talent, or building your personal brand, Prism builds websites that convert better, nurture trust faster, and position you as the top choice in your market.
          </p>
        </RevealOnScroll>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {useCaseItems.map((item, itemIndex) => (
            <RevealOnScroll key={item.label} delay={itemIndex * 0.02}>
              <motion.div
                className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white text-center text-sm font-semibold text-zinc-800 shadow-sm transition dark:border-zinc-800 dark:bg-zinc-800 dark:text-white"
                initial={allowMotion ? { opacity: 0, scale: 0.95 } : undefined}
                whileInView={allowMotion ? { opacity: 1, scale: 1 } : undefined}
                viewport={allowMotion ? { once: true, amount: 0.3 } : undefined}
                whileHover={
                  allowMotion ? { y: -6, boxShadow: "0px 12px 25px rgba(0,0,0,0.08)" } : undefined
                }
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <motion.span
                  aria-hidden
                  className="text-3xl"
                  animate={allowMotion ? floatLoop(4, 5 + itemIndex * 0.2) : undefined}
                >
                  {item.icon}
                </motion.span>
                <span className="mt-3 text-xs sm:text-sm">{item.label}</span>
              </motion.div>
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
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-white/70">
            ⚙️ The smoothest switch you'll ever make
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="text-3xl font-semibold sm:text-4xl">Switching shouldn’t cost you momentum.</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="text-base text-white/80">
            We take over everything — hosting, domains, content, analytics, DNS, forms, and old logins — and rebuild it into a clean, modern system designed for performance and growth.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-sm text-white/70">Your only job? Approve the design and watch the leads increase.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.25}>
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/10 p-5 text-base font-semibold text-white shadow-lg"
            animate={{ backgroundPositionX: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.15))",
              backgroundSize: "200% 200%",
            }}
          >
            💡 Approve the final preview and watch qualified leads ramp up.
          </motion.div>
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
          <p className="text-2xl font-semibold">🚀 Launch a website that grows your business — starting at $400.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <RippleHighlight fullWidth className="sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full border border-white bg-white px-8 py-6 text-base font-semibold text-black hover:bg-white/90 sm:w-auto"
              >
                <Link href="/pricing">Get started</Link>
              </Button>
            </RippleHighlight>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function PricingStructuredData() {
  const faqItems = faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
  return (
    <>
      {pricingTiers.map((tier) => {
        const numericPrice = tier.price.replace(/[^\d.]/g, "")
        const bestForDescription = tier.bestFor.map((item) => item.text).join(" • ")
        return (
          <ProductSchema
            key={`pricing-product-${tier.name.toLowerCase()}`}
            productId={`pricing-${tier.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            name={`${tier.name} website plan`}
            description={bestForDescription}
            url="https://www.design-prism.com/pricing"
            offer={{
              name: `${tier.name} plan`,
              description: bestForDescription,
              price: numericPrice.length ? numericPrice : undefined,
              priceCurrency: "USD",
              priceRange: tier.price,
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

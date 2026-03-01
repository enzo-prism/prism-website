import Link from "next/link"
import { ArrowRight, CheckCircle2, TrendingUp, Wrench } from "lucide-react"

import AnimatedGradient from "@/components/animations/animated-gradient"
import RippleHighlight from "@/components/animations/ripple-highlight"
import ClientsRail from "@/components/home/ClientsRail"
import PricingHero from "@/components/pricing/PricingHero"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { FAQSchema, ServiceSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CANONICAL_PRICING_OFFERS,
  FREE_AUDIT_PRICE_LABEL,
  GROWTH_PARTNERSHIP_PRICE_LABEL,
  WEBSITE_OVERHAUL_PRICE_LABEL,
} from "@/lib/pricing-model"

const pricingCards = [
  {
    key: "website_overhaul",
    icon: Wrench,
    title: CANONICAL_PRICING_OFFERS.website_overhaul.name,
    priceLabel: WEBSITE_OVERHAUL_PRICE_LABEL,
    subtitle: "For teams that need a complete rebuild fast.",
    bullets: [
      "Modern, conversion-first website architecture",
      "Technical SEO, schema, and analytics setup",
      "Launch support and team handoff",
    ],
    primaryCta: CANONICAL_PRICING_OFFERS.website_overhaul.primaryCta,
    secondaryCta: CANONICAL_PRICING_OFFERS.website_overhaul.secondaryCta,
    featured: false,
  },
  {
    key: "growth_partnership",
    icon: TrendingUp,
    title: CANONICAL_PRICING_OFFERS.growth_partnership.name,
    priceLabel: GROWTH_PARTNERSHIP_PRICE_LABEL,
    subtitle: "For teams ready for ongoing execution and growth.",
    bullets: [
      "Website, design, SEO, and ads managed together",
      "Dedicated team working 7 days a week",
      "Weekly optimization and plain-English reporting",
    ],
    primaryCta: CANONICAL_PRICING_OFFERS.growth_partnership.primaryCta,
    secondaryCta: CANONICAL_PRICING_OFFERS.growth_partnership.secondaryCta,
    featured: true,
  },
] as const

const faqs = [
  {
    question: "What is the exact pricing model?",
    answer:
      "Prism has two core paid paths: Website Overhaul at $1,000 one-time, and Growth Partnership at $2,000/month. If you want guidance first, you can start with a free expert audit at $0.",
  },
  {
    question: "Which option should I choose?",
    answer:
      "Choose Website Overhaul if you need a high-converting rebuild. Choose Growth Partnership if you want a long-term team handling website, SEO, ads, and design together.",
  },
  {
    question: "Can I start with one option and upgrade later?",
    answer:
      "Yes. Many teams start with the website overhaul and move into the growth partnership once they want ongoing execution and optimization.",
  },
  {
    question: "Is there a low-commitment way to start?",
    answer:
      "Yes. The free expert audit is $0 and gives you an actionable baseline before you commit to a paid path.",
  },
] as const

export default function PricingPageClient() {
  return (
    <div className="bg-transparent text-foreground">
      <PricingHero />
      <section id="plans" className="bg-transparent py-24 sm:py-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
          <RevealOnScroll className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold sm:text-5xl">choose your next step</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Clear pricing, clear outcomes, and a direct path to implementation.
            </p>
          </RevealOnScroll>

          <div className="grid gap-8 md:grid-cols-2">
            {pricingCards.map((card) => (
              <Card
                key={card.key}
                className={card.featured ? "border-primary/60 bg-card/60" : "border-border/60 bg-card/30"}
              >
                <CardHeader className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-muted/40">
                    <card.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl">{card.title}</CardTitle>
                    <p className="mt-2 text-3xl font-semibold font-pixel tracking-[0.06em]">{card.priceLabel}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{card.subtitle}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="rounded-md">
                      <Link href={card.primaryCta.href}>
                        {card.primaryCta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {card.secondaryCta ? (
                      <Button asChild size="lg" variant="outline" className="rounded-md">
                        <Link href={card.secondaryCta.href}>{card.secondaryCta.label}</Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <RevealOnScroll className="mx-auto max-w-4xl rounded-md border border-border/60 bg-card/30 p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground font-pixel">low-commitment option</p>
            <h3 className="mt-3 text-2xl font-semibold">Free Expert Audit</h3>
            <p className="mt-2 text-3xl font-semibold font-pixel tracking-[0.06em]">{FREE_AUDIT_PRICE_LABEL}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Get a focused website and visibility review with practical next steps before choosing a paid path.
            </p>
            <div className="mt-5">
              <Button asChild size="lg" variant="outline" className="rounded-md">
                <Link href={CANONICAL_PRICING_OFFERS.free_audit.primaryCta.href}>
                  {CANONICAL_PRICING_OFFERS.free_audit.primaryCta.label}
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-transparent py-16 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">our clients</h2>
          </div>
          <ClientsRail />
        </div>
      </section>

      <section className="bg-transparent py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">faq</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">pricing questions</h2>
          </div>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-md border border-border/60 bg-card/30 p-5">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/60 bg-background py-16 text-white">
        <AnimatedGradient
          className="absolute inset-y-0 left-0 w-full"
          colors={["#facc15", "#34d399"]}
          opacity={0.18}
          blur={180}
          parallaxIntensity={5}
        />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-semibold sm:text-4xl">Ready to choose your path?</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <RippleHighlight fullWidth className="sm:w-auto">
                <Button asChild size="lg" className="h-auto w-full rounded-md px-8 py-6 sm:w-auto">
                  <Link href="/get-started#book-call">Book a strategy call</Link>
                </Button>
              </RippleHighlight>
              <Button asChild size="lg" variant="outline" className="rounded-md border-white/40 text-white hover:bg-white/10">
                <Link href="/free-analysis">Get your free audit</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <PricingStructuredData />
    </div>
  )
}

function PricingStructuredData() {
  return (
    <>
      <ServiceSchema
        serviceId="pricing-website-overhaul"
        name="Website Overhaul"
        description={CANONICAL_PRICING_OFFERS.website_overhaul.description}
        serviceType="Web design"
        areaServed="United States"
        offerDetails={{
          name: "Website Overhaul",
          description: CANONICAL_PRICING_OFFERS.website_overhaul.description,
          businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
          price: String(CANONICAL_PRICING_OFFERS.website_overhaul.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.design-prism.com/pricing",
        }}
      />
      <ServiceSchema
        serviceId="pricing-growth-partnership"
        name="Growth Partnership"
        description={CANONICAL_PRICING_OFFERS.growth_partnership.description}
        serviceType="Growth marketing"
        areaServed="United States"
        offerDetails={{
          name: "Growth Partnership",
          description: CANONICAL_PRICING_OFFERS.growth_partnership.description,
          businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
          price: String(CANONICAL_PRICING_OFFERS.growth_partnership.price),
          priceCurrency: "USD",
          billingPeriod: "P1M",
          availability: "https://schema.org/InStock",
          url: "https://www.design-prism.com/pricing",
        }}
      />
      <FAQSchema questions={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
    </>
  )
}

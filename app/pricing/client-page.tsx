import Link from "next/link"

import PricingHero from "@/components/pricing/PricingHero"
import { FAQSchema, ServiceSchema } from "@/components/schema-markup"
import {
  CANONICAL_PRICING_OFFERS,
  FREE_AUDIT_PRICE_LABEL,
  GROWTH_PARTNERSHIP_PRICE_LABEL,
  WEBSITE_OVERHAUL_PRICE_LABEL,
} from "@/lib/pricing-model"

const pricingCards = [
  {
    key: "website_overhaul",
    title: CANONICAL_PRICING_OFFERS.website_overhaul.name,
    priceLabel: WEBSITE_OVERHAUL_PRICE_LABEL,
    summary: "A one-time rebuild for teams that need a sharper website and a stronger baseline fast.",
    bullets: [
      "Conversion-focused redesign and page structure",
      "Technical SEO, schema, and analytics setup",
      "Launch support and team handoff",
    ],
    primaryCta: CANONICAL_PRICING_OFFERS.website_overhaul.primaryCta,
    secondaryCta: CANONICAL_PRICING_OFFERS.website_overhaul.secondaryCta,
  },
  {
    key: "growth_partnership",
    title: CANONICAL_PRICING_OFFERS.growth_partnership.name,
    priceLabel: GROWTH_PARTNERSHIP_PRICE_LABEL,
    summary: "An ongoing execution layer for teams that want one partner running the whole growth system.",
    bullets: [
      "Website, SEO, design, and ads managed together",
      "Dedicated team moving every week",
      "Reporting that stays clear and actionable",
    ],
    primaryCta: CANONICAL_PRICING_OFFERS.growth_partnership.primaryCta,
    secondaryCta: CANONICAL_PRICING_OFFERS.growth_partnership.secondaryCta,
    featured: true,
  },
] as const

const faqs = [
  {
    question: "What are the core offers?",
    answer:
      "Prism has two core paid offers: Website Overhaul at $1,000 one-time and Growth Partnership at $2,000 per month. The free expert audit is the no-cost starting point.",
  },
  {
    question: "Which option should I choose?",
    answer:
      "Choose Website Overhaul if the main problem is the site itself. Choose Growth Partnership if you want a team to keep executing across website, SEO, ads, and design after the rebuild.",
  },
  {
    question: "Can I start smaller and upgrade later?",
    answer:
      "Yes. Many teams begin with the audit or the one-time overhaul, then move into the monthly partnership once they want ongoing execution.",
  },
  {
    question: "Do you offer custom pricing on this page?",
    answer:
      "No. This page stays intentionally simple and only shows Prism's canonical pricing. Anything outside these core offers would be scoped separately.",
  },
] as const

const primaryLinkClassName =
  "inline-flex items-center justify-center rounded-full border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const secondaryLinkClassName =
  "inline-flex items-center justify-center rounded-full border border-border/70 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-white/[0.04] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export default function PricingPageClient() {
  return (
    <div className="bg-transparent font-sans text-foreground">
      <PricingHero />

      <section id="plans" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {pricingCards.map((card) => (
              <article
                key={card.key}
                className={`rounded-[2rem] border p-8 ${
                  card.featured ? "border-border bg-muted/10" : "border-border/70 bg-background/40"
                }`}
              >
                <p className="text-sm font-medium text-muted-foreground">Core offer</p>
                <h2 className="mt-4 text-3xl font-sans font-medium !tracking-tight text-foreground sm:text-4xl">
                  {card.title}
                </h2>
                <p className="mt-3 text-2xl font-sans font-medium !tracking-tight text-foreground">{card.priceLabel}</p>
                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">{card.summary}</p>

                <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={card.primaryCta.href} className={primaryLinkClassName}>
                    {card.primaryCta.label}
                  </Link>
                  {card.secondaryCta ? (
                    <Link href={card.secondaryCta.href} className={secondaryLinkClassName}>
                      {card.secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-border/70 bg-background/40 p-8">
            <p className="text-sm font-medium text-muted-foreground">Free starting point</p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-sans font-medium !tracking-tight text-foreground sm:text-4xl">
                  Free Expert Audit
                </h2>
                <p className="mt-3 text-2xl font-sans font-medium !tracking-tight text-foreground">
                  {FREE_AUDIT_PRICE_LABEL}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {CANONICAL_PRICING_OFFERS.free_audit.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={CANONICAL_PRICING_OFFERS.free_audit.primaryCta.href} className={primaryLinkClassName}>
                  {CANONICAL_PRICING_OFFERS.free_audit.primaryCta.label}
                </Link>
                {CANONICAL_PRICING_OFFERS.free_audit.secondaryCta ? (
                  <Link
                    href={CANONICAL_PRICING_OFFERS.free_audit.secondaryCta.href}
                    className={secondaryLinkClassName}
                  >
                    {CANONICAL_PRICING_OFFERS.free_audit.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">FAQ</p>
            <h2 className="mt-3 text-3xl font-sans font-medium !tracking-tight text-foreground sm:text-4xl">
              Common pricing questions
            </h2>
          </div>

          <div className="mt-10 divide-y divide-border/70 rounded-[2rem] border border-border/70">
            {faqs.map((faq) => (
              <div key={faq.question} className="px-6 py-6 sm:px-8">
                <h3 className="text-lg font-sans font-medium !tracking-tight text-foreground">{faq.question}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 py-16 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">Need help deciding?</p>
            <h2 className="mt-3 text-3xl font-sans font-medium !tracking-tight text-foreground sm:text-4xl">
              We can point you to the right path quickly.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              If you are not sure whether you need the rebuild, the ongoing partnership, or just the audit first, a
              short strategy call will make the next step obvious.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/get-started#book-call" className={primaryLinkClassName}>
              Book a strategy call
            </Link>
            <Link href="/free-analysis" className={secondaryLinkClassName}>
              Start with the audit
            </Link>
          </div>
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

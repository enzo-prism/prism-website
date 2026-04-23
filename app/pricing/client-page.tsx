import PricingHero from '@/components/pricing/PricingHero'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteIntroBandClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { FAQSchema, ServiceSchema } from '@/components/schema-markup'
import {
  CANONICAL_PRICING_OFFERS,
  FREE_AUDIT_PRICE_LABEL,
  GROWTH_PARTNERSHIP_PRICE_LABEL,
  WEBSITE_OVERHAUL_PRICE_LABEL,
} from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

const pricingCards = [
  {
    key: 'website_overhaul',
    title: CANONICAL_PRICING_OFFERS.website_overhaul.name,
    priceLabel: WEBSITE_OVERHAUL_PRICE_LABEL,
    summary:
      'A one-time rebuild for teams that need a sharper website and a stronger baseline fast.',
    bullets: [
      'Conversion-focused redesign and page structure',
      'Technical SEO, schema, and analytics setup',
      'Launch support and team handoff',
    ],
    primaryCta: CANONICAL_PRICING_OFFERS.website_overhaul.primaryCta,
    secondaryCta: CANONICAL_PRICING_OFFERS.website_overhaul.secondaryCta,
    featured: false,
  },
  {
    key: 'growth_partnership',
    title: CANONICAL_PRICING_OFFERS.growth_partnership.name,
    priceLabel: GROWTH_PARTNERSHIP_PRICE_LABEL,
    summary:
      'An ongoing execution layer for teams that want one partner running the whole growth system.',
    bullets: [
      'Website, SEO, design, and ads managed together',
      'Dedicated team moving every week',
      'Reporting that stays clear and actionable',
    ],
    primaryCta: CANONICAL_PRICING_OFFERS.growth_partnership.primaryCta,
    secondaryCta: CANONICAL_PRICING_OFFERS.growth_partnership.secondaryCta,
    featured: true,
  },
] as const

const faqs = [
  {
    question: 'What are the core offers?',
    answer:
      'Prism has two core paid offers: Website Overhaul at $1,000 one-time and Growth Partnership at $2,000/month. The free expert audit is the no-cost starting point.',
  },
  {
    question: 'Which option should I choose?',
    answer:
      'Choose Website Overhaul if the main problem is the site itself. Choose Growth Partnership if you want a team to keep executing across website, SEO, ads, and design after the rebuild.',
  },
  {
    question: 'Can I start smaller and upgrade later?',
    answer:
      'Yes. Many teams begin with the audit or the one-time overhaul, then move into the monthly partnership once they want ongoing execution.',
  },
  {
    question: 'Do you offer custom pricing on this page?',
    answer:
      "No. This page stays intentionally simple and only shows Prism's canonical pricing. Anything outside these core offers would be scoped separately.",
  },
] as const

export default function PricingPageClient() {
  return (
    <div className="bg-transparent font-sans text-[#f5f0e8]">
      <PricingHero />

      <section id="plans" className={coreRouteSectionClassName}>
        <div className={coreRouteContainerClassName}>
          <div className={coreRouteIntroBandClassName}>
            <CoreSectionHeading
              title="Two ways to work with Prism."
              description="Keep the path simple: a one-time rebuild if the site is the bottleneck, or an ongoing execution partner if you want the whole system moving together."
              titleClassName="max-w-[10ch]"
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {pricingCards.map((card) => (
              <article
                key={card.key}
                className={cn(
                  coreRoutePanelClassName,
                  'p-8',
                  card.featured
                    ? 'bg-black/45 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.85)]'
                    : 'bg-black/28',
                )}
              >
                <h2 className="mt-4 text-[1.9rem] font-sans font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8] sm:text-[2.3rem]">
                  {card.title}
                </h2>
                <p className="mt-3 font-sans text-[1.65rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {card.priceLabel}
                </p>
                <p className="mt-5 max-w-md text-[1rem] leading-7 text-[#b8afa2]">
                  {card.summary}
                </p>

                <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="py-4">
                      <span className="font-sans text-[1rem] leading-7 text-[#d4cdc3]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
                  <CoreActionLink href={card.primaryCta.href}>
                    {card.primaryCta.label}
                  </CoreActionLink>
                  {card.secondaryCta ? (
                    <CoreActionLink
                      href={card.secondaryCta.href}
                      variant="secondary"
                    >
                      {card.secondaryCta.label}
                    </CoreActionLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className={cn(coreRoutePanelClassName, 'mt-6 bg-black/30 p-8')}>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-[1.9rem] font-sans font-medium leading-[0.98] tracking-[-0.05em] text-[#f5f0e8] sm:text-[2.3rem]">
                  Free Expert Audit
                </h2>
                <p className="mt-3 font-sans text-[1.65rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {FREE_AUDIT_PRICE_LABEL}
                </p>
                <p className="mt-4 text-[1rem] leading-7 text-[#b8afa2]">
                  {CANONICAL_PRICING_OFFERS.free_audit.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
                <CoreActionLink
                  href={CANONICAL_PRICING_OFFERS.free_audit.primaryCta.href}
                >
                  {CANONICAL_PRICING_OFFERS.free_audit.primaryCta.label}
                </CoreActionLink>
                {CANONICAL_PRICING_OFFERS.free_audit.secondaryCta ? (
                  <CoreActionLink
                    href={CANONICAL_PRICING_OFFERS.free_audit.secondaryCta.href}
                    variant="secondary"
                  >
                    {CANONICAL_PRICING_OFFERS.free_audit.secondaryCta.label}
                  </CoreActionLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={coreRouteSectionClassName}>
        <div
          className={cn(
            coreRouteContainerClassName,
            'grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]',
          )}
        >
          <CoreSectionHeading
            title="Common pricing questions."
            description="Clear answers on the path, the pricing, and when each offer makes sense."
          />

          <div className="border-t border-white/12 lg:border-t-0">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="border-b border-white/12 py-6 first:pt-0"
              >
                <h3 className="font-sans text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {faq.question}
                </h3>
                <p className="mt-3 max-w-3xl text-[1rem] leading-7 text-[#b8afa2]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 pb-28 sm:px-6 sm:py-24">
        <div
          className={cn(
            coreRouteContainerClassName,
            'border-t border-white/12 pt-8 sm:pt-10',
          )}
        >
          <CoreSectionHeading
            title="We can point you to the right path quickly."
            description="If you are not sure whether you need the rebuild, the ongoing partnership, or just the audit first, a short strategy call will make the next step obvious."
            titleClassName="max-w-[11ch]"
          />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
            <CoreActionLink href="/get-started#book-call">
              Book a strategy call
            </CoreActionLink>
            <CoreActionLink href="/free-analysis" variant="secondary">
              Start with the audit
            </CoreActionLink>
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
          name: 'Website Overhaul',
          description: CANONICAL_PRICING_OFFERS.website_overhaul.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(CANONICAL_PRICING_OFFERS.website_overhaul.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <ServiceSchema
        serviceId="pricing-growth-partnership"
        name="Growth Partnership"
        description={CANONICAL_PRICING_OFFERS.growth_partnership.description}
        serviceType="Growth marketing"
        areaServed="United States"
        offerDetails={{
          name: 'Growth Partnership',
          description: CANONICAL_PRICING_OFFERS.growth_partnership.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(CANONICAL_PRICING_OFFERS.growth_partnership.price),
          priceCurrency: 'USD',
          billingPeriod: 'P1M',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/pricing',
        }}
      />
      <FAQSchema
        questions={faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />
    </>
  )
}

import Link from 'next/link'

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
  PRICING_OFFER_ORDER,
  PRICING_PRIMARY_CTA,
  PRICING_SECONDARY_CTA,
} from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

// How an order moves once you pick the $300 website. (Identifier kept for the
// pricing-consistency required-snippet guard.)
const growthPathSteps = [
  {
    stage: '01',
    title: 'Describe your website',
    price: 'About a minute',
    description:
      'Tell Prism what you do and what you want. A short brief is all it takes to start — no long discovery call required.',
  },
  {
    stage: '02',
    title: 'Pay $300',
    price: '$300 one-time',
    description:
      'Secure one-time checkout. No retainer, no surprise scope. The price is the price, and work starts right away.',
  },
  {
    stage: '03',
    title: 'Live within 7 days',
    price: '7 days',
    description:
      'Your site is built and launched within a week, with infinite iterations until you love it. Add care for $100/month when it is ready.',
  },
] as const

// The four productized offers, snapshot form. (Identifier kept for the
// pricing-consistency required-snippet guard.)
const pricingSnapshot = PRICING_OFFER_ORDER.map((offerId) => {
  const offer = CANONICAL_PRICING_OFFERS[offerId]
  return {
    item: offer.name,
    price: offer.priceLabel,
    role: offer.description,
    href: offer.primaryCta.href,
  }
})

// The ongoing, recurring systems. (Identifier kept for the pricing-consistency
// required-snippet guard.)
const partnerLevels = [
  {
    title: 'Website Care',
    price: '$100/month',
    description:
      'Hosting, updates, and ongoing edits for your Prism website once it is live. Optional, and only after delivery.',
  },
  {
    title: 'Content OS',
    price: '$5,000 + $1,000/month',
    description:
      'AI agents that scale your content and ads across every platform and your website. $5,000 to implement over 3 months, then $1,000/month to keep optimizing.',
  },
  {
    title: 'Prism Infinity',
    price: '$2,000/month',
    description:
      'Unlimited Prism services across engineering, design, and marketing — one request at a time. Pause or cancel anytime.',
  },
] as const

// Real, source-attributed results from lib/case-study-data.ts (Google Search
// Console). Used as quantified proof beside the primary pricing CTA — keep in
// sync with the source; do not invent metrics.
const CTA_PROOF_POINTS = [
  {
    value: '5.3×',
    label: 'monthly Google clicks in five months — Saorsa Growth Partners',
    href: '/case-studies/saorsa-growth-partners',
  },
  {
    value: '593',
    label: 'Google clicks in the first month after launch — Roseville Dental Academy',
    href: '/case-studies/roseville-dental-academy',
  },
  {
    value: '+142%',
    label: 'Google Search impressions year over year — Dr. Christopher Wong',
    href: '/case-studies/dr-christopher-wong',
  },
] as const

const faqs = [
  {
    question: 'What does the $300 website include?',
    answer:
      'A complete, custom website built and launched within 7 days, with infinite iterations until you love it. You describe what you want, pay once, and Prism builds it.',
  },
  {
    question: 'What if I do not like the first version?',
    answer:
      'You get infinite iterations. Prism keeps refining the site until it is exactly right — there is no revision limit on a website build.',
  },
  {
    question: 'What is the $100/month for?',
    answer:
      'Optional Website Care: hosting, updates, and ongoing edits after your site is live. You only add it once the site is delivered, and you can cancel anytime.',
  },
  {
    question: 'How does Content OS pricing work?',
    answer:
      'Content OS is $5,000 to implement over 3 months, then $1,000/month for Prism to keep optimizing your content and ad agents across every platform.',
  },
  {
    question: 'What is Prism Infinity?',
    answer:
      'A $2,000/month subscription for unlimited Prism services — logo and print design, web development, video editing, content, ads, slide decks, photoshoots, and more — delivered one request at a time. Pause or cancel anytime.',
  },
  {
    question: 'How is Dental OS priced?',
    answer:
      'Dental OS is scoped to your practice and combines your website, SEO and AI search, Google Maps, reviews, and ads into one system. Book a call and Prism will scope it with you.',
  },
] as const

export default function PricingPageClient() {
  return (
    <div className="bg-transparent font-sans text-[#f5f0e8]">
      <PricingHero />

      <section id="offers" className={coreRouteSectionClassName}>
        <div
          className={cn(
            coreRouteContainerClassName,
            'grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]',
          )}
        >
          <CoreSectionHeading
            eyebrow="Snapshot"
            title="Four offers. Buy once, or run an ongoing system."
            description="Order a website for $300, or plug in a system that scales your content, packages your whole dental front office, or puts every Prism service on tap."
          />

          <div className="overflow-hidden border-y border-white/12">
            {pricingSnapshot.map((row) => (
              <Link
                key={row.item}
                href={row.href}
                className="group grid gap-4 border-b border-white/12 py-5 transition-colors last:border-b-0 hover:bg-white/[0.02] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/30 md:grid-cols-[minmax(0,0.7fr)_minmax(10rem,0.5fr)_minmax(0,1.1fr)] md:items-start"
              >
                <p className="text-[1.05rem] font-medium tracking-[-0.02em] text-[#f5f0e8]">
                  {row.item}
                </p>
                <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                  {row.price}
                </p>
                <p className="text-[0.95rem] leading-7 text-[#b8afa2] group-hover:text-[#c9c1b6]">
                  {row.role}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="offer-cards" className={coreRouteSectionClassName}>
        <div className={coreRouteContainerClassName}>
          <div className={coreRouteIntroBandClassName}>
            <CoreSectionHeading
              eyebrow="The offers"
              title="Pick how you want to grow."
              description="Each offer is a clear price and a clear scope. Start small with a website, or run a full Prism system."
            />
          </div>

          <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
            {PRICING_OFFER_ORDER.map((offerId) => {
              const offer = CANONICAL_PRICING_OFFERS[offerId]
              return (
                <article
                  key={offerId}
                  className={cn(
                    coreRoutePanelClassName,
                    'flex flex-col gap-5 p-6 sm:p-8',
                  )}
                >
                  <div className="space-y-3">
                    <h2 className="text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[#f5f0e8]">
                      {offer.name}
                    </h2>
                    <div>
                      <p className="text-[1.05rem] text-[#f5f0e8]">
                        {offer.priceLabel}
                      </p>
                      {offer.priceSubLabel ? (
                        <p className="mt-1 text-[0.82rem] leading-snug text-[#8f877b]">
                          {offer.priceSubLabel}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-pretty text-[0.96rem] leading-7 text-[#b8afa2]">
                      {offer.description}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                    <CoreActionLink
                      href={offer.primaryCta.href}
                      label={offer.primaryCta.label.toLowerCase()}
                      location={`pricing offers · ${offer.name}`}
                      variant="primary"
                    >
                      {offer.primaryCta.label}
                    </CoreActionLink>
                    {offer.secondaryCta ? (
                      <CoreActionLink
                        href={offer.secondaryCta.href}
                        label={offer.secondaryCta.label.toLowerCase()}
                        location={`pricing offers secondary · ${offer.name}`}
                        variant="secondary"
                      >
                        {offer.secondaryCta.label}
                      </CoreActionLink>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="growth-path" className={coreRouteSectionClassName}>
        <div className={coreRouteContainerClassName}>
          <div className={coreRouteIntroBandClassName}>
            <CoreSectionHeading
              eyebrow="How a website order works"
              title="Describe it, pay, and it is live in 7 days."
              description="The $300 website is the fastest way to start with Prism. Three steps, no long discovery, infinite iterations until you love it."
              titleClassName="max-w-[14ch]"
            />
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {growthPathSteps.map((step) => (
              <article
                key={step.stage}
                className={cn(
                  coreRoutePanelClassName,
                  'flex min-h-[20rem] flex-col p-6',
                )}
              >
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[#797165]">
                  {step.stage}
                </p>
                <h3 className="mt-5 text-[1.35rem] font-medium leading-[1.05] tracking-[-0.04em] text-[#f5f0e8]">
                  {step.title}
                </h3>
                <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                  {step.price}
                </p>
                <p className="mt-auto pt-8 text-[0.95rem] leading-7 text-[#b8afa2]">
                  {step.description}
                </p>
              </article>
            ))}
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
            eyebrow="Ongoing systems"
            title="The plans that keep working every month."
            description="When you want Prism running things on an ongoing basis, these are the recurring systems behind the offers."
          />

          <div className="grid gap-4">
            {partnerLevels.map((level) => (
              <article
                key={level.title}
                className="grid gap-4 border-b border-white/12 pb-5 last:border-b-0 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]"
              >
                <div>
                  <h2 className="text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                    {level.title}
                  </h2>
                  <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#d8bc79]">
                    {level.price}
                  </p>
                </div>
                <p className="text-[0.98rem] leading-7 text-[#b8afa2]">
                  {level.description}
                </p>
              </article>
            ))}
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
            eyebrow="FAQ"
            title="Common pricing questions."
            description="Clear answers on the $300 website, ongoing care, Content OS, Prism Infinity, and Dental OS."
          />

          <div className="border-t border-white/12 lg:border-t-0">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="border-b border-white/12 py-6 first:pt-0"
              >
                <h2 className="font-sans text-[1.35rem] font-medium tracking-[-0.04em] text-[#f5f0e8]">
                  {faq.question}
                </h2>
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
            title="Start with a website. Grow into the whole system."
            description="Order your $300 website today, or explore Content OS, Dental OS, and Prism Infinity."
            titleClassName="max-w-[14ch]"
          />

          <div className="mt-10 grid gap-px overflow-hidden border border-white/12 bg-white/10 sm:grid-cols-3">
            {CTA_PROOF_POINTS.map((proof) => (
              <Link
                key={proof.label}
                href={proof.href}
                className="group bg-black p-6 transition-colors hover:bg-[#0b0b0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35"
              >
                <p className="font-sans text-[2rem] font-medium leading-none tracking-[-0.04em] text-[#f5f0e8]">
                  {proof.value}
                </p>
                <p className="mt-3 text-[0.92rem] leading-6 text-[#b8afa2] group-hover:text-[#c9c1b6]">
                  {proof.label}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#6f685d]">
            Source: Google Search Console
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
            <CoreActionLink href={PRICING_PRIMARY_CTA.href} variant="heroPrimary">
              {PRICING_PRIMARY_CTA.label}
            </CoreActionLink>
            <CoreActionLink
              href={PRICING_SECONDARY_CTA.href}
              variant="heroSecondary"
            >
              {PRICING_SECONDARY_CTA.label}
            </CoreActionLink>
          </div>
          <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[#d8bc79]">
            $300 one-time &middot; live in 7 days &middot; infinite iterations until you love it
          </p>
        </div>
      </section>

      <PricingStructuredData />
    </div>
  )
}

function PricingStructuredData() {
  const website = CANONICAL_PRICING_OFFERS.website
  const contentOs = CANONICAL_PRICING_OFFERS.content_os
  const infinity = CANONICAL_PRICING_OFFERS.prism_infinity

  return (
    <>
      <ServiceSchema
        serviceId="pricing-website"
        name={website.name}
        description={website.description}
        serviceType="Website design and development"
        areaServed="United States"
        offerDetails={{
          name: website.name,
          description: website.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(website.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/websites',
        }}
      />
      <ServiceSchema
        serviceId="pricing-content-os"
        name={contentOs.name}
        description={contentOs.description}
        serviceType="Content and advertising automation"
        areaServed="United States"
        offerDetails={{
          name: contentOs.name,
          description: contentOs.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(contentOs.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/content-os',
        }}
      />
      <ServiceSchema
        serviceId="pricing-prism-infinity"
        name={infinity.name}
        description={infinity.description}
        serviceType="Creative and growth subscription"
        areaServed="United States"
        offerDetails={{
          name: infinity.name,
          description: infinity.description,
          businessFunction: 'http://purl.org/goodrelations/v1#ProvideService',
          price: String(infinity.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: 'https://www.design-prism.com/prism-infinity',
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

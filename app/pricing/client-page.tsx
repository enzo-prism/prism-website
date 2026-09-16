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
import { getCaseStudyMetric } from '@/lib/case-study-data'
import {
  CANONICAL_PRICING_OFFERS,
  PRICING_OFFER_ORDER,
  PRICING_PRIMARY_CTA,
  PRICING_SECONDARY_CTA,
} from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

// How any Prism engagement starts. (Identifier kept for the
// pricing-consistency required-snippet guard.)
const growthPathSteps = [
  {
    stage: '01',
    title: 'Join the waitlist',
    price: 'About two minutes',
    description:
      'Share your links, goals, and when you want to start. Prism is fully booked, so this is how every engagement begins right now.',
  },
  {
    stage: '02',
    title: 'We review and reach out',
    price: 'Clear scope and price',
    description:
      'For each monthly intake we review applications, reach out to the teams we can take on, and confirm what is included, what it costs, and how the work will run before you commit.',
  },
  {
    stage: '03',
    title: 'We build',
    price: 'Prism standard',
    description:
      'We build the agreed work, review it with you, and prepare it for launch. You know what is ready and what needs your input.',
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
    // Rows navigate to the offer page; the waitlist CTA lives on the offer
    // cards below.
    href: offer.secondaryCta?.href ?? offer.primaryCta.href,
  }
})

// The ongoing, recurring systems — all scoped together once we reach out.
// (Identifier kept for the pricing-consistency required-snippet guard.)
const partnerLevels = [
  {
    title: 'Website Care',
    price: 'Scoped with your build',
    description:
      'Hosting, updates, and ongoing edits for your Prism website once it is live. Optional, and only after delivery.',
  },
  {
    title: 'Content OS',
    price: 'Scoped from the waitlist',
    description:
      'A plan for consistent content across your website and selected social channels. We handle production, publishing, and ongoing improvements.',
  },
  {
    title: 'Prism Infinity',
    price: 'Scoped from the waitlist',
    description:
      'Ongoing landing pages, ad creative, websites, video, and photoshoots, delivered one request at a time. Pause or cancel anytime.',
  },
] as const

// Real, source-attributed results from lib/case-study-data.ts (Google Search
// Console). Used as quantified proof beside the primary pricing CTA — keep in
// sync with the source; do not invent metrics.
const saorsaClicks = getCaseStudyMetric('saorsa-growth-partners')
const rosevilleClicks = getCaseStudyMetric('roseville-dental-academy')
const wongImpressions = getCaseStudyMetric('dr-christopher-wong')

const CTA_PROOF_POINTS = [
  {
    value: saorsaClicks.value,
    label: `${saorsaClicks.label} (Saorsa Growth Partners)`,
    href: '/case-studies/saorsa-growth-partners',
  },
  {
    value: rosevilleClicks.value,
    label: `${rosevilleClicks.label} (Roseville Dental Academy)`,
    href: '/case-studies/roseville-dental-academy',
  },
  {
    value: wongImpressions.value,
    label: `${wongImpressions.label} (Dr. Christopher Wong)`,
    href: '/case-studies/dr-christopher-wong',
  },
] as const

const faqs = [
  {
    question: 'How does Prism pricing work?',
    answer:
      'Prism is fully booked right now, so every engagement starts on the waitlist. For each monthly intake we review applications, reach out, and confirm the scope, price, and next steps before work begins.',
  },
  {
    question: 'What does the PRO website include?',
    answer:
      'Custom design, engineering, analytics, and foundations for Google and AI search. We agree on the pages, features, and integrations with you before building. The finished site is yours.',
  },
  {
    question: 'What is Website Care?',
    answer:
      'Optional ongoing care: hosting, updates, and ongoing edits after your site is live. It is scoped with your build, added only once the site is delivered, and you can cancel anytime.',
  },
  {
    question: 'How does Content OS pricing work?',
    answer:
      'Pricing reflects the content, channels, and production your business needs. Join the waitlist and we will scope the setup and ongoing work together when we reach out.',
  },
  {
    question: 'What is Prism Infinity?',
    answer:
      'A monthly subscription for landing pages, ad creative, websites, video, and photoshoots, delivered one request at a time. Pause or cancel anytime. Join the waitlist and we will scope your plan when your intake opens.',
  },
  {
    question: 'How is Dental OS priced?',
    answer:
      'Dental OS brings together your practice website, search visibility, Google Maps, reviews, and ads. We scope the work around your practice goals once we reach out from the waitlist.',
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
            title="Choose the support your business needs."
            description="A custom website, consistent content, dental marketing, or ongoing creative support. Start with the work that matters most to your business."
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
              description="Prism is fully booked. Join the waitlist for the offer that fits and we will recommend a starting point and confirm scope and pricing when we reach out."
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
              eyebrow="How an engagement starts"
              title="Map it, scope it, then build it."
              description="Join the waitlist. When we reach out, agree on the scope and price, then give us the go-ahead to build."
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
            title="Support after launch."
            description="Keep your website maintained, your content consistent, or your next project moving with ongoing support."
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
            description="What is included, how ongoing care works, and how we scope your plan."
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
            title="Let’s find the right starting point."
            description="Prism is fully booked right now. Join the waitlist with your goals and questions, and we will help you choose a focused project or ongoing support when your intake opens."
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
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#8f877b]">
            Source: Google Search Console
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
            <CoreActionLink
              href={PRICING_PRIMARY_CTA.href}
              label={PRICING_PRIMARY_CTA.label.toLowerCase()}
              location="pricing final cta"
              variant="heroPrimary"
            >
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
            waitlist first &middot; built to the Prism standard
            &middot; scope and price confirmed before work begins
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
          availability: 'https://schema.org/InStock',
                          url: 'https://www.design-prism.com/content',
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

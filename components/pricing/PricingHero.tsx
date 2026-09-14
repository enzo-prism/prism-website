import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteHeroFrameClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  CANONICAL_PRICING_OFFERS,
  PRICING_PRIMARY_CTA,
  PRICING_SECONDARY_CTA,
} from '@/lib/pricing-model'
import CapacityNotice from '@/components/waitlist/CapacityNotice'

const heroSignals = [
  CANONICAL_PRICING_OFFERS.website,
  CANONICAL_PRICING_OFFERS.content_os,
  CANONICAL_PRICING_OFFERS.prism_infinity,
] as const

const heroDescriptions = {
  website: 'Custom design, clear copy, and a site built for your customers.',
  content_os: 'Consistent video, social posts, and website content.',
  prism_infinity: 'Ongoing creative work, one request at a time.',
} as const

export default function PricingHero() {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <div className={coreRouteHeroFrameClassName}>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.06),transparent_32%),linear-gradient(135deg,rgba(0,0,0,0.14),rgba(0,0,0,0.5))]"
          />

          <div className="relative z-10 grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-end lg:px-12 lg:py-16">
            <CoreSectionHeading
              eyebrow="Pricing"
              title="A clearer way to invest in growth."
              description="Start with a website, build a consistent content presence, or bring your marketing together with Dental OS or Prism Infinity. Prism is at capacity right now, so every offer starts on the waitlist and is scoped with you when space opens."
              as="h1"
              variant="hero"
              titleClassName="max-w-[9ch]"
              descriptionClassName="lg:max-w-[37rem]"
            />

            <div className="space-y-4 border-t border-white/12 pt-5 lg:border-t-0 lg:border-l lg:pl-10">
              {heroSignals.map((offer) => (
                <div
                  key={offer.offerId}
                  className="flex flex-col gap-2 border-b border-white/10 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-5"
                >
                  <div className="min-w-0">
                    <p className="font-sans text-[1rem] leading-7 text-[#f5f0e8]">
                      {offer.name}
                    </p>
                    <p className="mt-1 max-w-[24rem] text-pretty font-sans text-[0.92rem] leading-6 text-[#8f877b]">
                      {heroDescriptions[offer.offerId as keyof typeof heroDescriptions]}
                    </p>
                  </div>
                  <p className="text-pretty font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#b8afa2] sm:shrink-0 sm:pt-1 sm:text-right">
                    {offer.priceLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-t border-white/12 px-6 py-6 sm:px-10 lg:px-12">
            <CapacityNotice className="mb-5 max-w-[40rem]" />
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-5">
              <CoreActionLink
                href={PRICING_PRIMARY_CTA.href}
                label={PRICING_PRIMARY_CTA.label.toLowerCase()}
                location="pricing hero"
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
          </div>
        </div>
      </div>
    </section>
  )
}

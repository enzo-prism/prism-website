import {
  CoreActionLink,
  coreRouteContainerClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
  CoreSectionHeading,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeReveal from '@/components/home/HomeReveal'
import {
  CANONICAL_PRICING_OFFERS,
  PRICING_OFFER_ORDER,
} from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

const OFFER_INDEX_LABELS: Record<string, string> = {
  website: '01 · Order',
  content_os: '02 · Content',
  dental_os: '03 · Dental',
  prism_infinity: '04 · Infinity',
}

export default function HomeOffersSection() {
  return (
    <section id="offers" className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <HomeReveal>
          <CoreSectionHeading
            eyebrow="What you can order"
            title="Four ways to grow with Prism."
            description="Start with a website for $300, or plug in a system that runs your content, your whole dental front office, or every Prism service at once."
          />
        </HomeReveal>

        <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {PRICING_OFFER_ORDER.map((offerId, index) => {
            const offer = CANONICAL_PRICING_OFFERS[offerId]
            const isLead = offerId === 'website'

            return (
              <HomeReveal
                key={offerId}
                delay={80 + index * 60}
                className="h-full"
              >
                <div
                  className={cn(
                    coreRoutePanelClassName,
                    'flex h-full flex-col gap-5 p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#d8bc79]/35 hover:shadow-[0_28px_60px_-40px_rgba(216,188,121,0.5)] motion-reduce:transition-none sm:p-8',
                    isLead && 'border-white/20 bg-black/45',
                  )}
                >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d766a]">
                  {OFFER_INDEX_LABELS[offerId] ?? `0${index + 1}`}
                </p>

                <div className="space-y-3">
                  <h3 className="font-sans text-[1.6rem] font-medium leading-tight tracking-[-0.02em] text-[#f5f0e8]">
                    {offer.name}
                  </h3>
                  <div>
                    <p className="font-sans text-[1.05rem] text-[#f5f0e8]">
                      {offer.priceLabel}
                    </p>
                    {offer.priceSubLabel ? (
                      <p className="mt-1 font-sans text-[0.82rem] leading-snug text-[#8f877b]">
                        {offer.priceSubLabel}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-pretty font-sans text-[0.96rem] leading-7 text-[#b8afa2]">
                    {offer.description}
                  </p>
                </div>

                  <div className="mt-auto pt-2">
                    <CoreActionLink
                      href={offer.primaryCta.href}
                      label={offer.primaryCta.label.toLowerCase()}
                      location={`homepage offers · ${offer.name}`}
                      variant="primary"
                    >
                      {offer.primaryCta.label}
                    </CoreActionLink>
                  </div>
                </div>
              </HomeReveal>
            )
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty font-sans text-[0.96rem] leading-7 text-[#b8afa2]">
            Not ready to buy? Start free — create a Growth Dashboard and request
            a free deep audit from our team.
          </p>
          <CoreActionLink
            href="/get-started"
            label="get started free"
            location="homepage offers · start free"
            variant="primary"
          >
            Get started free
          </CoreActionLink>
        </div>
      </div>
    </section>
  )
}

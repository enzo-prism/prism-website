import {
  ArrowRight,
  Camera,
  Check,
  Infinity as InfinityIcon,
  LayoutTemplate,
  Smile,
  type LucideIcon,
} from 'lucide-react'

import { OfferIconTile } from '@/components/pricing/offer-kit'
import { Reveal } from '@/components/prism/reveal'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import TrackedLink from '@/components/tracked-link'
import { Badge } from '@/components/ui/badge'
import type { PricingOfferId } from '@/lib/pricing-model'
import { cn } from '@/lib/utils'

export type PricingPlan = {
  offerId: PricingOfferId
  name: string
  badge: string
  /** Who the plan is for, one sentence. */
  audience: string
  priceLabel: string
  priceSubLabel?: string
  includes: readonly string[]
  cta: { label: string; href: string }
  explore?: { label: string; href: string }
  featured?: boolean
}

export const PRICING_PLAN_ICONS: Record<PricingOfferId, LucideIcon> = {
  website: LayoutTemplate,
  content_os: Camera,
  dental_os: Smile,
  prism_infinity: InfinityIcon,
}

/** shadcn-style plan cards without prices. One featured card carries the beam. */
export function PricingPlans({ plans }: { plans: readonly PricingPlan[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan, index) => {
        const Icon = PRICING_PLAN_ICONS[plan.offerId]
        return (
          <li key={plan.offerId} className="min-w-0">
            <Reveal delay={index * 70} className="h-full">
              <SpotlightCard
                beam={plan.featured}
                className={cn(
                  'flex h-full flex-col p-6 sm:p-7',
                  // The beam ring sits on the 1px border, outside the clip box.
                  plan.featured && 'overflow-visible bg-popover',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <OfferIconTile>
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </OfferIconTile>
                  <Badge
                    variant="outline"
                    className={cn(
                      plan.featured && 'border-white/20 bg-white/[0.08] text-foreground',
                    )}
                  >
                    {plan.badge}
                  </Badge>
                </div>

                <h3 className="text-heading mt-6 text-foreground">{plan.name}</h3>
                <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground xl:min-h-[4.5rem]">
                  {plan.audience}
                </p>

                <div className="mt-6 border-t border-white/[0.08] pt-6">
                  <p className="text-[1.3rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                    {plan.priceLabel}
                  </p>
                  {plan.priceSubLabel ? (
                    <p className="mt-1.5 text-[13px] leading-5 text-subtle xl:min-h-10">
                      {plan.priceSubLabel}
                    </p>
                  ) : null}
                </div>

                <WaitlistButton
                  location={`pricing offers · ${plan.name}`}
                  href={plan.cta.href}
                  label={plan.cta.label}
                  variant={plan.featured ? 'default' : 'outline'}
                  className="mt-6 w-full"
                />

                <p className="text-eyebrow mt-8 text-subtle">What&apos;s included</p>
                <ul className="mt-4 space-y-3">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-foreground"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {plan.explore ? (
                  <div className="mt-auto pt-8">
                    <TrackedLink
                      href={plan.explore.href}
                      label={plan.explore.label.toLowerCase()}
                      location={`pricing offers secondary · ${plan.name}`}
                      className="group/explore inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {plan.explore.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover/explore:translate-x-0.5"
                      />
                    </TrackedLink>
                  </div>
                ) : null}
              </SpotlightCard>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

export default PricingPlans

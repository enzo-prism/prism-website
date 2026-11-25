import {
  ArrowRight,
  Camera,
  Check,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
  type LucideIcon,
} from 'lucide-react'

import { SERVICE_VISUALS } from '@/app/services/service-visuals'
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
  content: Camera,
  ads: Megaphone,
  aeo: MessageSquareQuote,
}

/** shadcn-style plan cards without prices. One featured card carries the beam. */
export function PricingPlans({ plans }: { plans: readonly PricingPlan[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {plans.map((plan, index) => {
        const Icon = PRICING_PLAN_ICONS[plan.offerId]
        const Visual = SERVICE_VISUALS[plan.offerId]
        return (
          <li key={plan.offerId} className="min-w-0">
            <Reveal delay={index * 70} className="h-full">
              <SpotlightCard
                beam={plan.featured}
                className={cn(
                  'group/service flex h-full flex-col overflow-hidden',
                  plan.featured && 'bg-popover',
                )}
              >
                <div
                  aria-hidden="true"
                  className="border-b border-white/[0.06] bg-background/40"
                >
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <OfferIconTile className="size-9 rounded-lg">
                      <Icon aria-hidden="true" className="size-4" />
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

                  <h3 className="text-heading mt-5 text-foreground">{plan.name}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-6 text-muted-foreground">
                    {plan.audience}
                  </p>

                  <div className="mt-5 border-t border-white/[0.08] pt-5">
                    <p className="text-[1.15rem] font-semibold leading-tight tracking-[-0.025em] text-foreground">
                      {plan.priceLabel}
                    </p>
                    {plan.priceSubLabel ? (
                      <p className="mt-1 text-[12px] leading-5 text-subtle">
                        {plan.priceSubLabel}
                      </p>
                    ) : null}
                  </div>

                  <WaitlistButton
                    location={`pricing offers · ${plan.name}`}
                    href={plan.cta.href}
                    label={plan.cta.label}
                    variant={plan.featured ? 'default' : 'outline'}
                    className="mt-5 w-full"
                  />

                  <ul className="mt-6 space-y-2">
                    {plan.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[13px] leading-5 text-muted-foreground"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-3.5 shrink-0 text-foreground"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.explore ? (
                    <div className="mt-auto pt-6">
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
                </div>
              </SpotlightCard>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

export default PricingPlans

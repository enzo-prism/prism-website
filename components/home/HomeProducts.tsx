import { ArrowUpRight, AudioLines, Gauge } from 'lucide-react'

import { HOMEPAGE_PRODUCTS } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader, SplitTitle } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import TrackedLink from '@/components/tracked-link'
import { PRISM_PRODUCTS } from '@/lib/products'

const PRODUCT_ICONS = { midas: Gauge, zread: AudioLines } as const
const PRODUCT_GLOWS = {
  midas:
    'bg-[radial-gradient(80%_80%_at_100%_0%,oklch(0.86_0.15_90/22%),transparent_60%)]',
  zread:
    'bg-[radial-gradient(80%_80%_at_100%_0%,oklch(0.66_0.16_258/26%),transparent_60%)]',
} as const

export default function HomeProducts() {
  return (
    <Section id="products" aria-labelledby="home-products-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeader
            id="home-products-title"
            eyebrow={HOMEPAGE_PRODUCTS.eyebrow}
            title={<SplitTitle text={HOMEPAGE_PRODUCTS.title} />}
            description={HOMEPAGE_PRODUCTS.description}
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRISM_PRODUCTS.map((product, index) => {
            const Icon = PRODUCT_ICONS[product.id]
            return (
              <Reveal key={product.id} delay={index * 100}>
                <SpotlightCard className="group/product relative h-full p-6 sm:p-7">
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 ${PRODUCT_GLOWS[product.id]}`}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-[14px] border border-white/12 bg-gradient-to-b from-white/[0.12] to-white/[0.02] shadow-[0_1px_0_0_oklch(1_0_0/12%)_inset]">
                      <Icon
                        aria-hidden="true"
                        className="size-5 text-foreground"
                      />
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-subtle">
                      Free · Open source
                    </span>
                  </div>
                  <h3 className="text-heading mt-6 text-foreground">
                    <TrackedLink
                      href={product.href}
                      label={`explore ${product.name.toLowerCase()}`}
                      location="homepage products"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-hidden focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
                    >
                      {product.name}
                    </TrackedLink>
                  </h3>
                  <p className="mt-1 text-[15px] font-medium text-foreground/80">
                    {product.navDescription}
                  </p>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
                    Explore {product.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover/product:-translate-y-0.5 group-hover/product:translate-x-0.5"
                    />
                  </span>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

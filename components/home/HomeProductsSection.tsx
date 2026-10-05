import { ArrowUpRight, BookOpen, Gauge } from 'lucide-react'

import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeReveal from '@/components/home/HomeReveal'
import { PRISM_PRODUCTS } from '@/lib/products'
import { cn } from '@/lib/utils'

export default function HomeProductsSection() {
  return (
    <section id="products" className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <HomeReveal>
          <CoreSectionHeading
            eyebrow="Products"
            title="Built for our team. Free for yours."
            description="We built these tools to help Prism work faster and better. Now they’re free and open source for anyone to use."
            titleClassName="max-w-xl xl:max-w-xl"
          />
        </HomeReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {PRISM_PRODUCTS.map((product, index) => {
            const Icon = product.id === 'midas' ? Gauge : BookOpen

            return (
              <HomeReveal key={product.id} delay={80 + index * 60} className="h-full">
                <article className={cn(coreRoutePanelClassName, 'flex h-full flex-col p-6 sm:p-8')}>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="flex size-16 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-[#f5f0e8]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8f877b]">
                      Free &amp; open source
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-[#f5f0e8]">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-pretty text-base leading-7 text-[#b8afa2]">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-8">
                    <CoreActionLink
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      label={`explore ${product.name}`}
                      location="homepage products"
                    >
                      Explore {product.name}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </CoreActionLink>
                  </div>
                </article>
              </HomeReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

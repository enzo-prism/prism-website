import Link from 'next/link'

import {
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRoutePanelClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import {
  PRISM_SERVICES,
  type PrismServiceId,
} from '@/lib/services'
import { cn } from '@/lib/utils'

export function ServiceSiblings({ current }: { current: PrismServiceId }) {
  return (
    <section className={coreRouteSectionClassName}>
      <div className={coreRouteContainerClassName}>
        <CoreSectionHeading
          eyebrow="Prism services"
          title="Website. Content. Ads."
          description="Three jobs. One team. Pick the next lever, or run the whole system."
          titleClassName="max-w-[18ch]"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PRISM_SERVICES.map((service) => {
            const isCurrent = service.id === current
            const className = cn(
              coreRoutePanelClassName,
              'flex h-full flex-col p-6',
              isCurrent && 'border-white/20 bg-black/45',
            )

            const body = (
              <>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d766a]">
                  {service.label}
                </p>
                <h3 className="mt-4 font-sans text-[1.35rem] font-medium tracking-[-0.03em] text-[#f5f0e8]">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-7 text-[#b8afa2]">
                  {service.navDescription}
                </p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9c1b6]">
                  {isCurrent ? 'You are here' : `${service.homeCta} →`}
                </p>
              </>
            )

            if (isCurrent) {
              return (
                <article key={service.id} className={className} aria-current="page">
                  {body}
                </article>
              )
            }

            return (
              <Link key={service.id} href={service.href} className={className}>
                {body}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

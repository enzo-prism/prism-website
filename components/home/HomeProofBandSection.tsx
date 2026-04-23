import {
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { HOMEPAGE_PROOF_METRICS } from '@/components/home/homepage-content'

export default function HomeProofBandSection() {
  return (
    <section className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03]">
          <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {HOMEPAGE_PROOF_METRICS.map((metric) => (
              <article
                key={metric.label}
                className="min-h-36 p-5 sm:p-6 lg:p-7"
              >
                <p className="font-sans text-[clamp(1.9rem,4vw,3rem)] font-medium leading-none tracking-[-0.055em] text-[#f5f0e8]">
                  {metric.value}
                </p>
                <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8bc79]/80">
                  {metric.label}
                </p>
                <p className="mt-3 max-w-[15rem] font-sans text-[0.92rem] leading-6 text-[#9f9689]">
                  {metric.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

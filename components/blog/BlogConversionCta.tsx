import { ArrowRight } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import { PRICING_PRIMARY_CTA } from '@/lib/pricing-model'

interface BlogConversionCtaProps {
  /** Used to disambiguate analytics events per post. */
  slug: string
}

/**
 * End-of-post conversion path for organic blog readers. Restrained, dark-themed
 * panel (Prism Black System) that invites readers into the free Growth
 * Dashboard at /get-started. Reuses the canonical primary CTA destination and
 * the shared TrackedLink analytics component.
 */
export default function BlogConversionCta({ slug }: BlogConversionCtaProps) {
  return (
    <section className="mt-16 overflow-hidden rounded-2xl border border-white/12 bg-neutral-950 p-6 text-[#f5f0e8] sm:p-8">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d8bc79]">
        Free to start
      </p>
      <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-[#f5f0e8] sm:text-[1.7rem]">
        See your biggest growth opportunities — free.
      </h2>
      <p className="mt-3 max-w-[60ch] text-sm leading-7 text-[#b8afa2]">
        Create your free Prism Growth Dashboard and get a focused Light Audit of
        what is holding your website, search, and local presence back. No card
        required.
      </p>
      <div className="mt-6">
        <TrackedLink
          href={PRICING_PRIMARY_CTA.href}
          label={PRICING_PRIMARY_CTA.label}
          location={`blog_post_cta_${slug}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#f5f0e8]/70 bg-[#f5f0e8] px-6 font-sans text-[0.95rem] font-medium tracking-[-0.01em] text-[#050505] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white hover:bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#f5f0e8]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 active:translate-y-px motion-reduce:transition-none"
        >
          {PRICING_PRIMARY_CTA.label}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </TrackedLink>
      </div>
    </section>
  )
}

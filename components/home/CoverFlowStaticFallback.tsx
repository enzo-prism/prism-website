import Image from 'next/image'
import Link from 'next/link'

import type { HomepageClientWinSlide } from '@/components/home/homepage-content'

/**
 * Static, server-renderable rail of the client-win cards.
 *
 * Used two ways:
 * - as the pre-hydration / pre-intersection state of the lazy cover-flow
 *   deck (`HomeClientCoverFlowLazy`), so every case-study link stays in the
 *   server HTML without shipping framer-motion in the homepage's first-load
 *   JS, and
 * - as the reduced-motion rendering inside `HomeClientCoverFlow` itself.
 */
export default function CoverFlowStaticFallback({
  slides,
}: {
  slides: readonly HomepageClientWinSlide[]
}) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-2 scrollbar-hide"
      role="list"
      aria-label="Client websites built with Prism"
    >
      {slides.map((slide) => (
        <Link
          key={`${slide.href}-${slide.company}`}
          href={slide.href}
          prefetch={false}
          role="listitem"
          aria-label={`Open the ${slide.company} case study`}
          className="group/cover relative block w-[62vw] max-w-[15rem] shrink-0 snap-start overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0c0c0b] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={slide.image}
              alt={`${slide.company} website built by Prism`}
              fill
              sizes="(max-width: 640px) 62vw, 240px"
              className="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.82))]"
            />
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <p className="font-sans text-[0.95rem] font-medium leading-tight text-[#f5f0e8]">
                {slide.company}
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b8afa2]">
                {slide.location}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

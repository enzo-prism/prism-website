'use client'

import Link from 'next/link'
import { useCallback, type PointerEvent as ReactPointerEvent } from 'react'

import BrandLogo, {
  type BrandLogoKey,
  type BrandLogoTheme,
} from '@/components/brand-logo'
import PixelishIcon from '@/components/pixelish/PixelishIcon'
import { cn } from '@/lib/utils'
import { trackCTAClick } from '@/utils/analytics'

export type HomeSystemGridItem = {
  title: string
  description: string
  iconSrc: string
  href?: string
  brandLogo?: BrandLogoKey
  brandLogoTheme?: BrandLogoTheme
}

type HomeSystemGridProps = {
  items: readonly HomeSystemGridItem[]
}

// Bento rhythm over a 6-column desktop grid: wide anchors on the first and
// last rows, a tight trio in the middle.
const CARD_SPANS = [
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-3',
] as const

export default function HomeSystemGrid({ items }: HomeSystemGridProps) {
  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const node = event.currentTarget
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    },
    [],
  )

  const cardClassName = (index: number) =>
    cn(
      'group relative isolate block overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#d8bc79]/35 hover:bg-white/[0.045] hover:shadow-[0_30px_90px_-65px_rgba(216,188,121,0.65)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-4 focus-visible:ring-offset-black active:translate-y-0 motion-reduce:transition-none sm:p-6',
      CARD_SPANS[index] ?? 'lg:col-span-2',
    )

  const renderCardBody = (item: HomeSystemGridItem, index: number) => (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 motion-reduce:transition-none"
        style={{
          background:
            'radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgba(216,188,121,0.13), transparent 65%)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#d8bc79]/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/40 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#d8bc79]/40 group-hover:shadow-[0_0_26px_-14px_rgba(216,188,121,0.9)] motion-reduce:transition-none">
          {item.brandLogo ? (
            <BrandLogo
              brand={item.brandLogo}
              theme={item.brandLogoTheme}
              decorative
              className="h-4 w-4 opacity-90"
            />
          ) : (
            <PixelishIcon
              src={item.iconSrc}
              alt=""
              size={18}
              aria-hidden="true"
              className="h-4 w-4 opacity-80"
            />
          )}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-[10px] font-semibold tracking-[0.22em] text-[#5f594f] transition-colors group-hover:text-[#d8bc79]/75"
        >
          {item.href ? (
            <span className="inline-flex items-center gap-1.5">
              {String(index + 1).padStart(2, '0')}
              <span className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 motion-reduce:transition-none">
                →
              </span>
            </span>
          ) : (
            String(index + 1).padStart(2, '0')
          )}
        </span>
      </div>

      <h3 className="text-ui-tight mt-5 font-sans text-[1.12rem] font-medium leading-[1.08] tracking-[-0.035em] text-[#f5f0e8]">
        {item.title}
      </h3>
      <p className="mt-2 max-w-[26rem] text-pretty font-sans text-[0.92rem] leading-6 text-[#a8a092]">
        {item.description}
      </p>
    </>
  )

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
      {items.map((item, index) =>
        item.href ? (
          <Link
            key={item.title}
            href={item.href}
            prefetch={false}
            data-home-service-card={item.title}
            aria-label={`${item.title} — ${item.description}`}
            onPointerMove={handlePointerMove}
            onClick={() =>
              trackCTAClick(
                `explore ${item.title.toLowerCase()}`,
                'homepage system grid',
              )
            }
            className={cardClassName(index)}
          >
            {renderCardBody(item, index)}
          </Link>
        ) : (
          <article
            key={item.title}
            data-home-service-card={item.title}
            onPointerMove={handlePointerMove}
            className={cardClassName(index)}
          >
            {renderCardBody(item, index)}
          </article>
        ),
      )}
    </div>
  )
}

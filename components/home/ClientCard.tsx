"use client"

import CoreImage from "@/components/core-image"
import Link from "next/link"
import type { ClientInfo } from "@/lib/clients"
import { trackNavigation, trackExternalLinkClick } from "@/utils/analytics"

type Props = ClientInfo & {
  interactive?: boolean
  priority?: boolean
}

export default function ClientCard({
  title,
  location,
  image,
  href,
  website,
  objectPosition,
  priority,
  interactive = true,
}: Props) {
  const url = href || website
  const content = (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/10 shadow-sm transition duration-200 ease-out group-hover/client:-translate-y-1 group-hover/client:shadow-md group-focus/client:-translate-y-1 group-focus/client:shadow-md"
      style={{ aspectRatio: "9/16" }}
      role="group"
      aria-label={`${title}${location ? ` — ${location}` : ""}`}
    >
      {/* Media and overlay wrapper inherits radius to guarantee matching corners on iOS */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden z-0">
        <CoreImage
          src={image}
          alt={`${title}${location ? ` — ${location}` : ""}`}
          width={360}
          height={640}
          className="w-full h-full object-cover"
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 260px"
          quality={80}
          priority={false}
          style={objectPosition ? { objectPosition } : undefined}
          fallbackSrc="/placeholder.svg?height=640&width=360&text=client"
          inheritRadius
          disableShadow
          showLoadingIndicator={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent z-10 transition duration-200 group-hover/client:from-black/70 group-hover/client:via-black/35 group-focus/client:from-black/70 group-focus/client:via-black/35" />
      </div>
      {/* Ensure text is always painted above media on mobile */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
        <div className="text-white text-[15px] sm:text-base font-semibold leading-tight truncate">
          {title}
        </div>
        {location ? (
          <div className="text-neutral-200 text-[12px] sm:text-[13px] leading-snug truncate">
            {location}
          </div>
        ) : null}
        <div className="mt-2 hidden text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-opacity duration-200 group-hover/client:opacity-100 group-focus/client:opacity-100">
          view site →
        </div>
      </div>
    </div>
  )

  if (url && interactive) {
    const isExternal = /^https?:\/\//i.test(url)
    return (
      <Link
        href={url}
        aria-label={`${title}${location ? ` — ${location}` : ""}`}
        onClick={() => {
          trackNavigation("client_card", url)
          if (isExternal) trackExternalLinkClick(url, title)
        }}
        className="group/client block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-2xl"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return content
}

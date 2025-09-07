"use client"

import CoreImage from "@/components/core-image"
import Link from "next/link"
import type { ClientInfo } from "@/lib/clients"
import { trackNavigation, trackExternalLinkClick } from "@/utils/analytics"

type Props = ClientInfo & {
  priority?: boolean
}

export default function ClientCard({ title, location, image, href, website, objectPosition, priority }: Props) {
  const url = website || href
  const content = (
    <div
      className="relative rounded-[22px] overflow-hidden border border-white/10 shadow-sm"
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
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 260px"
          quality={90}
          priority={priority}
          style={objectPosition ? { objectPosition } : undefined}
          fallbackSrc="/placeholder.svg?height=640&width=360&text=client"
          inheritRadius
          disableShadow
          showLoadingIndicator={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent z-10" />
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
      </div>
    </div>
  )

  if (url) {
    const isExternal = /^https?:\/\//i.test(url)
    return (
      <Link
        href={url}
        aria-label={`${title}${location ? ` — ${location}` : ""}`}
        onClick={() => {
          trackNavigation("client_card", url)
          if (isExternal) trackExternalLinkClick(url, title)
        }}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-[22px]"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return content
}

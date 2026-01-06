"use client"

import { useMemo, useState } from "react"

import { buildInstagramEmbedUrl } from "@/lib/library/utils"

type LibraryInstagramEmbedProps = {
  permalink: string
  title: string
  thumbnailUrl?: string | null
}

export default function LibraryInstagramEmbed({
  permalink,
  title,
  thumbnailUrl,
}: LibraryInstagramEmbedProps) {
  const [hasError, setHasError] = useState(false)
  const embedUrl = useMemo(() => buildInstagramEmbedUrl(permalink), [permalink])
  const usePosterFallback = Boolean(thumbnailUrl?.startsWith("/"))

  if (!embedUrl || hasError || usePosterFallback) {
    return (
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30 pt-[177.78%]">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Embed unavailable. Watch directly on Instagram.
            </div>
          )}
        </div>
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-foreground underline underline-offset-4"
        >
          Watch on Instagram
        </a>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-muted/30 pt-[177.78%]">
      <iframe
        title={title}
        src={embedUrl}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

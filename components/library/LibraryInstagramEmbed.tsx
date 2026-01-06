"use client"

import { useMemo, useState } from "react"

import { buildInstagramEmbedUrl } from "@/lib/library/utils"

type LibraryInstagramEmbedProps = {
  permalink: string
  title: string
}

export default function LibraryInstagramEmbed({
  permalink,
  title,
}: LibraryInstagramEmbedProps) {
  const [hasError, setHasError] = useState(false)
  const embedUrl = useMemo(() => buildInstagramEmbedUrl(permalink), [permalink])

  if (!embedUrl || hasError) {
    return (
      <div className="text-sm text-muted-foreground">
        Embed unavailable.{" "}
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-foreground underline underline-offset-4"
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

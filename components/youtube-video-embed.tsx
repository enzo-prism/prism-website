"use client"

import { useMemo } from "react"

interface YouTubeVideoEmbedProps {
  videoId: string
  title: string
  className?: string
}

const buildEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`

export default function YouTubeVideoEmbed({ videoId, title, className }: YouTubeVideoEmbedProps) {
  const src = useMemo(() => buildEmbedUrl(videoId), [videoId])

  return (
    <div className={className}>
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}

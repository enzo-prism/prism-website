"use client"

import { VideoSchema } from "@/components/schema-markup"

interface YouTubeVideoEmbedProps {
  videoId: string
  title: string
  description?: string
  uploadDate?: string
  className?: string
}

export default function YouTubeVideoEmbed({
  videoId,
  title,
  description = title,
  uploadDate = new Date().toISOString(),
  className = "",
}: YouTubeVideoEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`
  const contentUrl = `https://www.youtube.com/watch?v=${videoId}`
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md ${className}`}
      style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <VideoSchema
        name={title}
        description={description}
        thumbnailUrl={thumbnailUrl}
        uploadDate={uploadDate}
        contentUrl={contentUrl}
        embedUrl={embedUrl}
      />
    </div>
  )
}

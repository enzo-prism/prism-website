"use client"

interface YouTubeVideoEmbedProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeVideoEmbed({ videoId, title, className = "" }: YouTubeVideoEmbedProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md ${className}`}
      style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}

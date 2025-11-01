"use client"

import YouTubeVideoEmbed from "@/components/youtube-video-embed"

interface VideoItem {
  title: string
  videoId: string
  description?: string
}

interface VideoCarouselProps {
  items: VideoItem[]
  subtitle?: string
}

export default function VideoCarousel({ items, subtitle }: VideoCarouselProps) {
  return (
    <div className="relative space-y-4">
      {subtitle ? <p className="text-xs uppercase tracking-[0.32em] text-neutral-400">{subtitle}</p> : null}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/60 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/60 to-transparent"
          aria-hidden
        />
        <div
          className="flex gap-6 overflow-x-auto px-1 pb-6 [mask-image:linear-gradient(90deg,transparent,black 10%,black 90%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <article key={item.videoId} className="min-w-[280px] shrink-0 space-y-2">
              <YouTubeVideoEmbed videoId={item.videoId} title={item.title} />
              <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
              {item.description ? (
                <p className="text-xs leading-relaxed text-neutral-600">{item.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

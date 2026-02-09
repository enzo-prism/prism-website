"use client"

import PixelishIcon from "@/components/pixelish/PixelishIcon"

interface GradientCardProps {
  gradientType: "ai-seo" | "website-makeover"
  width?: number
  height?: number
  className?: string
  trackingId?: string
}

const mediaConfigs: Record<
  GradientCardProps["gradientType"],
  { title: string; iconSrc: string; iconAlt: string }
> = {
  "ai-seo": {
    title: "AI SEO Boost",
    iconSrc: "/pixelish/lens.svg",
    iconAlt: "Search optimization icon",
  },
  "website-makeover": {
    title: "Summer Website Makeover",
    iconSrc: "/pixelish/browser.svg",
    iconAlt: "Website makeover icon",
  },
}

export default function GradientCard({
  gradientType,
  // kept for compatibility with existing callers
  width = 600,
  height = 338,
  className = "",
  trackingId,
}: GradientCardProps) {
  void width
  void height
  const config = mediaConfigs[gradientType]

  return (
    <div
      className={[
        "relative h-full w-full overflow-hidden rounded-lg border border-border/70 bg-black",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        aspectRatio: "16/9",
      }}
      data-tracking-id={trackingId}
      role="img"
      aria-label={`${config.title} preview`}
    >
      {/* Subtle pixel-grid + vignette. */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <PixelishIcon
          src={config.iconSrc}
          alt={config.iconAlt}
          size={256}
          className="h-[68%] w-[68%] opacity-95"
        />
      </div>
    </div>
  )
}

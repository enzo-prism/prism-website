"use client"

import { useId, useState } from "react"
import { Facebook, Link2, Linkedin, Share2, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/utils/analytics"
import { cn } from "@/lib/utils"

interface BlogShareIconsProps {
  url: string
  title: string
  className?: string
}

const shareTargets = [
  {
    name: "twitter",
    label: "share on twitter",
    icon: Twitter,
    buildUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "linkedin",
    label: "share on linkedin",
    icon: Linkedin,
    buildUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "facebook",
    label: "share on facebook",
    icon: Facebook,
    buildUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
]

export default function BlogShareIcons({ url, title, className }: BlogShareIconsProps) {
  const [copied, setCopied] = useState(false)
  const tooltipId = useId()

  const openShareWindow = (href: string, platform: string) => {
    trackCTAClick(`blog share ${platform}`, title)
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      trackCTAClick("blog share copy", title)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[BlogShareIcons] failed to copy url", error)
    }
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-2 py-1 shadow-sm backdrop-blur", className)}>
      <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
        <Share2 className="h-3 w-3" aria-hidden />
        share
      </span>
      <div className="flex items-center gap-1.5">
        {shareTargets.map(target => (
          <Button
            key={target.name}
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-800"
            aria-label={target.label}
            onClick={() => openShareWindow(target.buildUrl(url, title), target.name)}
          >
            <target.icon className="h-3.5 w-3.5" aria-hidden />
          </Button>
        ))}
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-800",
              copied && "border-neutral-900 bg-neutral-900 text-white",
            )}
            aria-describedby={copied ? tooltipId : undefined}
            aria-label="copy link"
            onClick={handleCopy}
          >
            <Link2 className="h-3.5 w-3.5" aria-hidden />
          </Button>
          <span
            id={tooltipId}
            role="status"
            aria-live="polite"
            className={cn(
              "pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white opacity-0 transition-opacity",
              copied && "opacity-100",
            )}
          >
            link copied
          </span>
        </div>
      </div>
    </div>
  )
}

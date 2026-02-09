"use client"

import { useState } from "react"
import { Facebook, Link2, Linkedin, Share2, Twitter } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

  const openShareWindow = (href: string, platform: string) => {
    trackCTAClick(`blog share ${platform}`, title)
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("link copied")
      trackCTAClick("blog share copy", title)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[BlogShareIcons] failed to copy url", error)
      toast.error("couldn't copy link")
    }
  }

  return (
    <TooltipProvider delayDuration={250}>
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/50 px-1.5 py-1 shadow-sm shadow-black/40 backdrop-blur supports-[backdrop-filter]:bg-card/40",
          className,
        )}
      >
        <Share2 className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" aria-hidden />
        <div className="flex items-center gap-1.25">
          {shareTargets.map((target) => (
            <Tooltip key={target.name}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border/60 hover:bg-muted/40 hover:text-foreground sm:h-8 sm:w-8"
                  aria-label={target.label}
                  onClick={() => openShareWindow(target.buildUrl(url, title), target.name)}
                >
                  <target.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{target.label}</TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border/60 hover:bg-muted/40 hover:text-foreground sm:h-8 sm:w-8",
                  copied && "border-white/30 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                )}
                aria-label="copy link"
                onClick={handleCopy}
              >
                <Link2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{copied ? "link copied" : "copy link"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import PixelishIcon from "@/components/pixelish/PixelishIcon"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  imageUrl?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("link copied")
    } catch (err) {
      console.error("Failed to copy:", err)
      toast.error("couldn't copy link")
    }
  }

  return (
    <TooltipProvider delayDuration={250}>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border/60 bg-card/50 p-6">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] font-pixel text-muted-foreground">
          share this case study
        </h3>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border/60 bg-background/20 text-foreground hover:bg-muted/40"
                onClick={() => window.open(shareUrls.twitter, "_blank")}
                aria-label="Share on X"
              >
                <PixelishIcon src="/pixelish/socials-x.svg" alt="" size={20} className="h-5 w-5" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Share on X</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border/60 bg-background/20 text-foreground hover:bg-muted/40"
                onClick={() => window.open(shareUrls.linkedin, "_blank")}
                aria-label="Share on LinkedIn"
              >
                <PixelishIcon src="/pixelish/socials-linkedin.svg" alt="" size={20} className="h-5 w-5" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Share on LinkedIn</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border/60 bg-background/20 text-foreground hover:bg-muted/40"
                onClick={() => window.open(shareUrls.facebook, "_blank")}
                aria-label="Share on Facebook"
              >
                <PixelishIcon src="/pixelish/socials-facebook.svg" alt="" size={20} className="h-5 w-5" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Share on Facebook</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border/60 bg-background/20 text-foreground hover:bg-muted/40"
                onClick={copyToClipboard}
                aria-label="Copy link"
              >
                <PixelishIcon src="/pixelish/copy.svg" alt="" size={20} className="h-5 w-5" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Copy link</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

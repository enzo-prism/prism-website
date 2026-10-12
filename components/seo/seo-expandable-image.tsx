"use client"

import Image from "next/image"
import { Expand } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type SeoExpandableImageProps = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  sizes?: string
  dialogSizes?: string
  padding?: "none" | "default"
  className?: string
  imageClassName?: string
}

export function SeoExpandableImage({
  src,
  alt,
  width,
  height,
  caption,
  sizes,
  dialogSizes,
  padding = "default",
  className,
  imageClassName,
}: SeoExpandableImageProps) {
  const frameClasses =
    padding === "none"
      ? "overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-colors duration-300 group-hover:border-white/[0.16]"
      : "overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-2 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-colors duration-300 group-hover:border-white/[0.16] sm:p-2.5"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Expand image: ${caption ?? alt}`}
          className={cn(
            "group block w-full cursor-zoom-in appearance-none rounded-2xl border-0 bg-transparent p-0 text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            className
          )}
        >
          <div className={cn(frameClasses, "flex flex-col")}>
            <div
              className={cn(
                "overflow-hidden rounded-xl bg-popover",
                padding === "none" && "rounded-2xl"
              )}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes ?? "(min-width: 1024px) 512px, 100vw"}
                className={cn("h-auto w-full", imageClassName)}
              />
            </div>
            {caption ? (
              <div className="flex items-center justify-between gap-3 px-2 pb-1.5 pt-3 text-eyebrow text-subtle">
                <span>{caption}</span>
                <Expand aria-hidden="true" className="size-3.5 shrink-0 transition-colors group-hover:text-foreground" />
              </div>
            ) : null}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl p-4 sm:p-6">
        <DialogTitle className="sr-only">{caption ?? alt}</DialogTitle>
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl bg-popover">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={dialogSizes ?? "(min-width: 1024px) 1200px, 100vw"}
              className="h-auto w-full max-h-[70vh] object-contain"
            />
          </div>
          {caption ? (
            <p className="text-eyebrow text-subtle">{caption}</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

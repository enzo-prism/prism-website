"use client"

import Image from "next/image"

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
      ? "overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
      : "overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm sm:p-4"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Expand image: ${caption ?? alt}`}
          className={cn(
            "group block w-full cursor-zoom-in bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 border-0 appearance-none rounded-3xl",
            className
          )}
        >
          <div className={cn(frameClasses, "flex flex-col")}>
            <div
              className={cn(
                "overflow-hidden rounded-2xl bg-white",
                padding === "none" && "rounded-3xl"
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
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                {caption}
              </div>
            ) : null}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl p-4 sm:p-6">
        <DialogTitle className="sr-only">{caption ?? alt}</DialogTitle>
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl bg-white p-2 sm:p-3">
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              {caption}
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

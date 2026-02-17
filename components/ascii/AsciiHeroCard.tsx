"use client"

import type { ReactNode } from "react"

import AsciiAnimation from "@/components/ascii/AsciiAnimation"
import { cn } from "@/lib/utils"

type AsciiHeroCardProps = {
  animationName: string
  frameCount: number
  eyebrow: string
  title: string
  description: string
  fps?: number
  preEyebrow?: ReactNode
  children?: ReactNode
  className?: string
  contentClassName?: string
  ariaLabel?: string
  animationTextSize?: string
}

export default function AsciiHeroCard({
  animationName,
  frameCount,
  eyebrow,
  title,
  description,
  fps = 18,
  preEyebrow,
  children,
  className,
  contentClassName,
  ariaLabel,
  animationTextSize = "text-[1.8px] sm:text-[2.2px] md:text-[2.6px]",
}: AsciiHeroCardProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <AsciiAnimation
        frameFolder={`animations/${animationName}`}
        frameCount={frameCount}
        fps={fps}
        quality="high"
        ariaLabel={ariaLabel ?? `${title} ASCII animation`}
        textSize={animationTextSize}
        className="absolute inset-0 h-full w-full opacity-45 [image-rendering:pixelated]"
        color="hsl(var(--foreground) / 0.42)"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/52 via-background/74 to-background/90"
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[320px] max-w-4xl flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[360px] md:px-10 md:py-20",
          contentClassName
        )}
      >
        {preEyebrow ? <div className="mb-5">{preEyebrow}</div> : null}
        <p className="font-pixel text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  )
}

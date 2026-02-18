"use client"

import type { ReactNode } from "react"

import AsciiHeroBackdrop from '@/components/ascii/AsciiHeroBackdrop'
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
  animationTextSize = "text-[2.4px] sm:text-[2.9px] md:text-[3.5px]",
}: AsciiHeroCardProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <AsciiHeroBackdrop
        animationName={animationName}
        frameCount={frameCount}
        fps={fps}
        ariaLabel={ariaLabel ?? `${title} ASCII animation`}
        textSize={animationTextSize}
        quality="high"
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

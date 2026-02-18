'use client'

import AsciiAnimation from '@/components/ascii/AsciiAnimation'

type AsciiHeroBackdropProps = {
  animationName: string
  frameCount: number
  fps?: number
  quality?: 'low' | 'medium' | 'high'
  textSize?: string
  ariaLabel?: string
  className?: string
  loadStrategy?: 'batch' | 'all'
  batchSize?: number
  maxConcurrentFetches?: number
  continueOnFrameError?: boolean
}

export default function AsciiHeroBackdrop({
  animationName,
  frameCount,
  fps,
  quality = 'high',
  textSize = 'text-[2.4px] sm:text-[2.9px] md:text-[3.5px]',
  ariaLabel,
  className,
  loadStrategy = 'batch',
  batchSize = 24,
  maxConcurrentFetches = 6,
  continueOnFrameError = true,
}: AsciiHeroBackdropProps) {
  return (
    <>
      <AsciiAnimation
        frameFolder={`animations/${animationName}`}
        frameCount={frameCount}
        fps={fps}
        quality={quality}
        fit="cover"
        zoom={1}
        offsetY={0}
        ariaLabel={ariaLabel}
        textSize={textSize}
        className={`absolute inset-0 h-full w-full opacity-[0.39] sm:opacity-[0.64] md:opacity-68 lg:opacity-88 [image-rendering:pixelated] md:[-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_42%,black_88%)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_42%,black_88%)] ${className ?? ''}`}
        color="hsl(var(--foreground) / 0.95)"
        loadStrategy={loadStrategy}
        batchSize={batchSize}
        maxConcurrentFetches={maxConcurrentFetches}
        continueOnFrameError={continueOnFrameError}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/72 via-background/86 to-background/95 sm:from-background/56 sm:via-background/74 sm:to-background/88 md:from-background/42 md:via-background/62 md:to-background/78"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.94)_0%,hsl(var(--background)/0.88)_36%,hsl(var(--background)/0.62)_56%,hsl(var(--background)/0)_78%)] sm:bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.84)_0%,hsl(var(--background)/0.72)_34%,hsl(var(--background)/0.44)_56%,hsl(var(--background)/0)_78%)] md:bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.72)_0%,hsl(var(--background)/0.56)_34%,hsl(var(--background)/0.32)_56%,hsl(var(--background)/0)_78%)]"
      />
    </>
  )
}

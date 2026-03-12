"use client"

import { cn } from "@/lib/utils"

type ElevenLabsOrbMarkProps = {
  className?: string
}

export default function ElevenLabsOrbMark({ className }: ElevenLabsOrbMarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block overflow-hidden rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,#dff9f6_0deg,#7adddf_58deg,#165cd4_156deg,#73dbe0_224deg,#d9ffff_304deg,#1b56d1_360deg)]",
        className,
      )}
    >
      <span className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.5),transparent_34%),radial-gradient(circle_at_58%_64%,rgba(255,255,255,0.2),transparent_36%)]" />
    </span>
  )
}

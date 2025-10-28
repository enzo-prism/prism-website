import { cn } from "@/lib/utils"

const platformNames = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
} as const

type PlatformKey = keyof typeof platformNames

type HeroSupportPillProps = {
  platform: PlatformKey
  className?: string
}

const accentGradient: Record<PlatformKey, string> = {
  instagram: "from-[#f58529]/35 via-[#dd2a7b]/35 to-[#8134af]/35",
  tiktok: "from-[#69c9d0]/35 via-[#161823]/55 to-[#ee1d52]/35",
  youtube: "from-[#ff512f]/35 via-[#dd2476]/45 to-[#ff512f]/35",
}

export default function HeroSupportPill({ platform, className }: HeroSupportPillProps) {
  const platformLabel = platformNames[platform]

  return (
    <div className={cn("relative w-full max-w-xl self-start", className)}>
      <div className="absolute inset-0 rounded-2xl border border-white/15 bg-white/5 shadow-[0_24px_45px_-24px_rgba(0,0,0,0.6)] backdrop-blur">
        <div
          aria-hidden="true"
          className={cn("absolute inset-0 rounded-2xl bg-gradient-to-r opacity-70", accentGradient[platform])}
        />
        <div className="absolute inset-0 rounded-2xl border border-white/10 mix-blend-screen" aria-hidden="true" />
      </div>
      <div className="relative rounded-2xl px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-center gap-4 text-left text-sm leading-relaxed text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
            <span role="img" aria-label="Heart">
              ❤️
            </span>
          </span>
          <div className="min-w-[12rem] flex-1 space-y-1">
            <p className="text-base font-semibold text-white">{`Thanks for supporting us on ${platformLabel}!`}</p>
            <p className="text-sm text-white/85">
              Enjoy <span className="font-semibold text-white">20% off</span> your first order.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

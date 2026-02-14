"use client"

import { useMemo } from "react"
import UnicornScene from "unicornstudio-react/next"
import { getHeroRenderProfile, UNICORN_SDK_URL } from "@/lib/unicorn-hero-config"

const JSON_FILE_PATH = "/unicorn/hero-scene.json"

type UnicornHeroSceneProps = {
  className?: string
}

export default function UnicornHeroScene({ className }: UnicornHeroSceneProps) {
  const rootClassName = ["unicorn-hero-scene", className].filter(Boolean).join(" ")
  const renderProfile = useMemo(() => getHeroRenderProfile(), [])
  const shouldReduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    if (typeof window.matchMedia !== "function") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  return (
    <div className={rootClassName} aria-hidden="true">
      {shouldReduceMotion ? (
        <div
          className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_30%,rgba(34,197,94,0.10),transparent_60%),radial-gradient(60%_60%_at_20%_80%,rgba(0,0,0,0.10),transparent_65%)]"
          aria-hidden="true"
        />
      ) : (
        <UnicornScene
          jsonFilePath={JSON_FILE_PATH}
          sdkUrl={UNICORN_SDK_URL}
          width="100%"
          height="100%"
          fps={renderProfile.fps}
          dpi={renderProfile.dpi}
          lazyLoad={false}
          placeholderClassName="unicorn-hero-scene__placeholder"
        />
      )}
    </div>
  )
}

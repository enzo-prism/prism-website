"use client"

import UnicornScene from "unicornstudio-react/next"

const JSON_FILE_PATH = "/unicorn/get-started-hero.json"
const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"

type GetStartedHeroSceneProps = {
  className?: string
}

export default function GetStartedHeroScene({ className }: GetStartedHeroSceneProps) {
  const rootClassName = ["unicorn-hero-scene", className].filter(Boolean).join(" ")

  return (
    <div className={rootClassName} aria-hidden="true">
      <UnicornScene
        jsonFilePath={JSON_FILE_PATH}
        sdkUrl={SDK_URL}
        width="100%"
        height="100%"
      />
    </div>
  )
}

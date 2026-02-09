"use client"

import UnicornScene from "unicornstudio-react/next"

const JSON_FILE_PATH = "/unicorn/hero-scene.json"
const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"

type UnicornHeroSceneProps = {
  className?: string
}

export default function UnicornHeroScene({ className }: UnicornHeroSceneProps) {
  return (
    <div className={className} aria-hidden="true">
      <UnicornScene
        jsonFilePath={JSON_FILE_PATH}
        sdkUrl={SDK_URL}
        width="100%"
        height="100%"
      />
    </div>
  )
}

"use client"

import UnicornScene from "unicornstudio-react/next"

const JSON_FILE_PATH = "/unicorn/hero-scene.json"
const SDK_URL = "/unicorn/unicornStudio.umd.js"

type UnicornHeroSceneProps = {
  className?: string
}

export default function UnicornHeroScene({ className }: UnicornHeroSceneProps) {
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

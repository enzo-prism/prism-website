"use client"

import UnicornScene from "unicornstudio-react/next"

const PROJECT_ID = "IJcFJOBrS3f58k1ZR3JY"
const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"

type UnicornHeroSceneProps = {
  className?: string
}

export default function UnicornHeroScene({ className }: UnicornHeroSceneProps) {
  return (
    <div className={className} aria-hidden="true">
      <UnicornScene
        projectId={PROJECT_ID}
        sdkUrl={SDK_URL}
        width="100%"
        height="100%"
      />
    </div>
  )
}

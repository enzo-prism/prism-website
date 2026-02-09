"use client"

import { useEffect } from "react"

const PROJECT_ID = "IJcFJOBrS3f58k1ZR3JY"
const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
const SCRIPT_ID = "unicornstudio-sdk"

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void
    }
  }
}

type UnicornHeroSceneProps = {
  className?: string
}

const initUnicornStudio = () => {
  if (typeof window === "undefined") return
  window.UnicornStudio?.init?.()
}

const ensureUnicornScript = () => {
  if (typeof document === "undefined") return
  const existingScript = document.getElementById(SCRIPT_ID)

  if (existingScript) {
    initUnicornStudio()
    return
  }

  const script = document.createElement("script")
  script.id = SCRIPT_ID
  script.src = SDK_URL
  script.async = true
  script.onload = () => {
    initUnicornStudio()
  }

  document.head.appendChild(script)
}

export default function UnicornHeroScene({ className }: UnicornHeroSceneProps) {
  useEffect(() => {
    ensureUnicornScript()
  }, [])

  return (
    <div
      className={className}
      data-us-project={PROJECT_ID}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  )
}

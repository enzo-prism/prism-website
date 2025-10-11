"use client"

import { useEffect, useMemo } from "react"

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void
      }
    }
  }
}

type InstagramEmbedProps = {
  url: string
  className?: string
}

const SCRIPT_ID = "instagram-embed-script"

export default function InstagramEmbed({ url, className }: InstagramEmbedProps) {
  const permalink = useMemo(() => {
    try {
      const parsed = new URL(url)
      const trailingSlashPath = parsed.pathname.endsWith("/")
        ? parsed.pathname
        : `${parsed.pathname}/`
      return `${parsed.origin}${trailingSlashPath}`
    } catch (error) {
      console.error("[InstagramEmbed] invalid URL provided:", url, error)
      return url
    }
  }, [url])

  useEffect(() => {
    const processEmbeds = () => {
      try {
        window.instgrm?.Embeds?.process()
      } catch (error) {
        console.error("[InstagramEmbed] failed to process embeds", error)
      }
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        processEmbeds()
      } else {
        existingScript.addEventListener("load", processEmbeds, { once: true })
      }
      return
    }

    const script = document.createElement("script")
    script.id = SCRIPT_ID
    script.async = true
    script.src = "https://www.instagram.com/embed.js"
    script.setAttribute("data-loaded", "false")
    script.addEventListener("load", () => {
      script.setAttribute("data-loaded", "true")
      processEmbeds()
    }, { once: true })
    document.body.appendChild(script)
  }, [permalink])

  return (
    <div className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        style={{ background: "#fff", border: 0, margin: "0 auto", maxWidth: "540px", width: "100%" }}
      >
        <a href={url} rel="noopener noreferrer" target="_blank">
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  )
}

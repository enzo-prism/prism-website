"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const BOOK_DEMO_SRC = "https://calendar.notion.so/meet/enzosison/oj1fm4o2p"

// Measured scheduler heights to prevent inner iframe scrollbars at each width band.
const FRAME_HEIGHTS = [
  { minWidth: 1024, height: 776 },
  { minWidth: 770, height: 1027 },
  { minWidth: 0, height: 1925 },
]

const CHAT_FRAME_HEIGHTS = [
  { minWidth: 1024, height: 640 },
  { minWidth: 770, height: 700 },
  { minWidth: 0, height: 760 },
]

const HEIGHT_BUFFER = 8

const getFrameHeight = (width: number, variant: BookDemoEmbedVariant) => {
  const map = variant === "chat-inline" ? CHAT_FRAME_HEIGHTS : FRAME_HEIGHTS
  const match = map.find((entry) => width >= entry.minWidth)
  return (match?.height ?? map[map.length - 1].height) + HEIGHT_BUFFER
}

type BookDemoEmbedVariant = "default" | "chat-inline"

type BookDemoEmbedProps = {
  className?: string
  variant?: BookDemoEmbedVariant
}

export default function BookDemoEmbed({ className, variant = "default" }: BookDemoEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  // Keep the initial render deterministic between server and client to avoid hydration mismatches.
  const [frameHeight, setFrameHeight] = useState(() => getFrameHeight(0, variant))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateHeight = () => {
      const nextHeight = getFrameHeight(container.clientWidth, variant)
      setFrameHeight((current) => (current === nextHeight ? current : nextHeight))
    }

    updateHeight()

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight)
      return () => window.removeEventListener("resize", updateHeight)
    }

    const observer = new ResizeObserver(updateHeight)
    observer.observe(container)

    return () => observer.disconnect()
  }, [variant])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm",
        className
      )}
      style={{ height: `${frameHeight}px` }}
    >
      <iframe
        title="Prism demo scheduling"
        src={BOOK_DEMO_SRC}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
      />
    </div>
  )
}

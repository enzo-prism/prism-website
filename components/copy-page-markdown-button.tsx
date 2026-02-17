"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Copy, Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { buildPageMarkdownFromDocument } from "@/lib/page-markdown"
import { cn } from "@/lib/utils"
import { trackCTAClick } from "@/utils/analytics"

const BLOG_POST_PATH_PATTERN = /^\/blog\/[^/]+$/

async function copyTextToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard API is unavailable")
  }

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  textarea.style.pointerEvents = "none"
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  const copied = document.execCommand("copy")
  document.body.removeChild(textarea)

  if (!copied) {
    throw new Error("Fallback clipboard copy failed")
  }
}

export default function CopyPageMarkdownButton() {
  const pathname = usePathname()
  const [status, setStatus] = useState<"idle" | "copying" | "copied">("idle")
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  if (!pathname || pathname === "/" || BLOG_POST_PATH_PATTERN.test(pathname)) {
    return null
  }

  const handleCopy = async () => {
    if (status === "copying") return

    setStatus("copying")
    try {
      const markdown = await buildPageMarkdownFromDocument(document)
      if (!markdown.trim()) {
        toast.error("no page content found")
        setStatus("idle")
        return
      }

      await copyTextToClipboard(markdown)
      setStatus("copied")
      toast.success("page markdown copied")
      trackCTAClick("copy page markdown", pathname)

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
      resetTimerRef.current = setTimeout(() => setStatus("idle"), 2200)
    } catch (error) {
      console.error("[CopyPageMarkdownButton] failed to copy page markdown", error)
      toast.error("couldn't copy page markdown")
      setStatus("idle")
    }
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[90]"
      data-copy-markdown-control
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        disabled={status === "copying"}
        aria-label="Copy current page as markdown"
        className={cn(
          "h-11 rounded-md border-border/70 bg-card/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-card/75",
          status === "copied" && "border-primary/70 bg-primary/15 text-primary",
        )}
      >
        {status === "copying" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
        ) : status === "copied" ? (
          <Check className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden />
        )}
        <span className="hidden sm:inline">
          {status === "copying"
            ? "Preparing markdown"
            : status === "copied"
              ? "Markdown copied"
              : "Copy page markdown"}
        </span>
        <span className="sm:hidden">
          {status === "copying" ? "Loading" : status === "copied" ? "Copied" : "Copy"}
        </span>
      </Button>
    </div>
  )
}

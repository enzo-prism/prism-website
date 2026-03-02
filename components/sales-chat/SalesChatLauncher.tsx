"use client"

import type { RefObject } from "react"
import { MessageCircleMore } from "lucide-react"

import { SALES_CHAT_VISUAL_TOKENS } from "@/components/sales-chat/constants"
import type { SalesChatVisualStyle } from "@/components/sales-chat/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SalesChatLauncherProps = {
  buttonRef: RefObject<HTMLButtonElement | null>
  isOpen: boolean
  onOpen: () => void
  visualStyle: SalesChatVisualStyle
}

export default function SalesChatLauncher({
  buttonRef,
  isOpen,
  onOpen,
  visualStyle,
}: SalesChatLauncherProps) {
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-40 transition-all duration-200 sm:bottom-6 sm:right-6",
        "pb-[env(safe-area-inset-bottom)]",
        isOpen ? "pointer-events-none translate-y-2 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <Button
        ref={buttonRef}
        type="button"
        onClick={onOpen}
        aria-label="Open sales chat"
        className={tokens.launcherButton}
      >
        <span className="relative mr-2 inline-flex h-5 w-5 items-center justify-center">
          {!isOpen ? (
            <svg
              className="pointer-events-none absolute inset-[-6px] h-[calc(100%+12px)] w-[calc(100%+12px)] text-emerald-300/70 motion-safe:animate-slow-ping"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
            </svg>
          ) : null}
          <MessageCircleMore className="relative z-10 h-4 w-4 text-slate-100/90 transition-transform duration-200 group-hover:scale-110" aria-hidden />
        </span>
        <span className={tokens.launcherText}>Chat with Sales</span>
        <Badge variant="secondary" className={tokens.launcherStatus}>
          online
        </Badge>
      </Button>
    </div>
  )
}

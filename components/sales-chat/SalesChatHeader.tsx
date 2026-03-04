"use client"

import { Minimize2, X } from "lucide-react"

import { SALES_CHAT_VISUAL_TOKENS } from "@/components/sales-chat/constants"
import type { SalesChatVisualStyle } from "@/components/sales-chat/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SalesChatHeaderProps = {
  assistantStatusLabel?: "Online" | "Specialist ready"
  isFullscreen: boolean
  onClose: () => void
  visualStyle: SalesChatVisualStyle
}

export default function SalesChatHeader({
  assistantStatusLabel = "Online",
  isFullscreen,
  onClose,
  visualStyle,
}: SalesChatHeaderProps) {
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]
  const isOnline = assistantStatusLabel === "Online"

  return (
    <header className={cn("relative px-4 py-3 sm:px-5", tokens.headerBorder)}>
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={cn("relative", tokens.headerIconWrap)}>
            <span className="relative flex h-4.5 w-4.5 items-center justify-center" aria-hidden>
              {isOnline ? (
                <span className="pointer-events-none absolute inset-0 rounded-full bg-cyan-300/30 blur-[4px] motion-safe:animate-breathe" />
              ) : null}
              <svg
                className={cn(
                  "pointer-events-none absolute inset-[-3px] h-[calc(100%+6px)] w-[calc(100%+6px)] origin-center",
                  isOnline
                    ? "text-cyan-300/75 motion-safe:animate-[orbit_9s_linear_infinite]"
                    : "text-zinc-400/60",
                )}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 1.8a10.2 10.2 0 0 1 7.2 3m2.6 5.2A10.2 10.2 0 0 1 21 15.8m-4.8 5A10.2 10.2 0 0 1 8 21.4m-5.6-4.6A10.2 10.2 0 0 1 2.2 8.8m4.4-5.6A10.2 10.2 0 0 1 10.3 2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className={cn(
                  "pointer-events-none absolute inset-[-1px] h-[calc(100%+2px)] w-[calc(100%+2px)] origin-center",
                  isOnline
                    ? "text-emerald-300/70 motion-safe:animate-[orbit-reverse_6s_linear_infinite]"
                    : "text-zinc-400/50",
                )}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.8 12a7.8 7.8 0 0 1-7.8 7.8M4.2 12A7.8 7.8 0 0 1 12 4.2"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className={cn(
                  "relative z-10 h-full w-full",
                  isOnline
                    ? "text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.75)]"
                    : "text-zinc-300",
                )}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="6.1" stroke="currentColor" strokeWidth="1.25" opacity="0.85" />
                <path
                  d="M12 7.2v2.1m0 5.5v2.1M7.2 12h2.1m5.5 0h2.1M8.7 8.7l1.5 1.5m3.6 3.6 1.5 1.5m0-6.6-1.5 1.5m-3.6 3.6-1.5 1.5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.72"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="2.25"
                  className={cn(
                    "fill-current",
                    isOnline ? "motion-safe:animate-breathe opacity-95" : "opacity-80",
                  )}
                />
              </svg>
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#090b10]">
              {isOnline ? (
                <svg
                  className="h-2.5 w-2.5 text-emerald-300"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="3"
                    className="origin-center fill-current motion-safe:animate-breathe"
                  />
                  <circle
                    cx="6"
                    cy="6"
                    r="5"
                    className="origin-center stroke-current/70 stroke-[1.5] motion-safe:animate-slow-ping"
                  />
                </svg>
              ) : (
                <svg className="h-2.5 w-2.5 text-zinc-300" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                  <circle cx="5" cy="5" r="5" />
                </svg>
              )}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className={cn(tokens.headerTitle, "leading-tight")}>
              Prism Sales Assistant{" "}
              <span
                className={cn(
                  tokens.headerStatus,
                  assistantStatusLabel === "Specialist ready" ? "text-zinc-300" : undefined,
                )}
              >
                • {assistantStatusLabel}
              </span>
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onClose}
            className={cn("h-8 w-8 rounded-full p-0", tokens.headerActionButton)}
            aria-label={isFullscreen ? "Close sales chat" : "Minimize sales chat"}
          >
            {isFullscreen ? <X className="h-4 w-4" aria-hidden /> : <Minimize2 className="h-4 w-4" aria-hidden />}
          </Button>
        </div>
      </div>
    </header>
  )
}

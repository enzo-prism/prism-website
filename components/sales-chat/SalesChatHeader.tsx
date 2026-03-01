"use client"

import { Bot, Minimize2, X } from "lucide-react"

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

  return (
    <header className={cn("relative px-4 py-3 sm:px-5", tokens.headerBorder)}>
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={tokens.headerIconWrap}>
            <Bot className="h-4 w-4 text-slate-200/90" aria-hidden />
          </div>
          <div className="min-w-0">
            <h2 className={cn(tokens.headerTitle, "leading-tight")}>
              PRISM Sales Assistant{" "}
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

"use client"

import type { ReactNode } from "react"

import { SALES_CHAT_VISUAL_TOKENS } from "@/components/sales-chat/constants"
import type { SalesChatVisualStyle } from "@/components/sales-chat/types"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"

type SalesChatFullscreenProps = {
  open: boolean
  onOpenChange: (nextOpen: boolean) => void
  visualStyle: SalesChatVisualStyle
  children: ReactNode
}

export default function SalesChatFullscreen({
  open,
  onOpenChange,
  visualStyle,
  children,
}: SalesChatFullscreenProps) {
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className={tokens.fullscreenContent}>
        <SheetTitle className="sr-only">Chat with Sales</SheetTitle>
        <SheetDescription className="sr-only">
          Chat with Prism sales assistant and book a strategy call.
        </SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  )
}

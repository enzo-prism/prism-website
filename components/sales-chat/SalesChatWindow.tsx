"use client"

import type { ReactNode } from "react"

import { SALES_CHAT_VISUAL_TOKENS } from "@/components/sales-chat/constants"
import type { SalesChatVisualStyle } from "@/components/sales-chat/types"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

type SalesChatWindowProps = {
  open: boolean
  onOpenChange: (nextOpen: boolean) => void
  visualStyle: SalesChatVisualStyle
  children: ReactNode
}

export default function SalesChatWindow({ open, onOpenChange, visualStyle, children }: SalesChatWindowProps) {
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={tokens.windowContent}
        overlayClassName={tokens.windowOverlay}
        aria-label="Sales chat dialog"
      >
        <DialogTitle className="sr-only">Chat with Sales</DialogTitle>
        <DialogDescription className="sr-only">
          Chat with Prism sales assistant and book a strategy call.
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

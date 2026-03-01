"use client"

import SalesChatShell from "@/components/sales-chat/SalesChatShell"
import type { SalesChatVisualStyle } from "@/components/sales-chat/types"

export type SalesChatProps = {
  sourcePage: string
  bookingHref?: string
  fullscreenBreakpoint?: number
  desktopAutoOpenSessionKey?: string
  inlineBookingEnabled?: boolean
  visualStyle?: SalesChatVisualStyle
}

export default function SalesChat(props: SalesChatProps) {
  return <SalesChatShell {...props} />
}

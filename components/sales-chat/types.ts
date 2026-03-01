import type { ReactNode } from "react"
import type {
  LeadDispatchOutcome,
  QuickReply as SpecQuickReply,
  SalesChatConversationState,
} from "@/lib/sales-chat/spec-v1-types"

export type ChatRole = "user" | "assistant"
export type SalesChatVisualStyle = "default" | "minimal-glass" | "dark-minimal"
export type SalesPromptIcon = "calendar" | "target" | "tag" | "users" | "sparkles" | "clock" | "briefcase"

export type SalesChatMessage = {
  id: string
  role: ChatRole
  content: string
}

export type SalesChatQuickReply = SpecQuickReply

export type SalesChatApiResponse = {
  assistantMessage: string
  nodeId: SalesChatConversationState["nodeId"]
  quickReplies: SalesChatQuickReply[]
  memoryPatch: Record<string, string | boolean | null>
  recommendedOffer?: "free_audit" | "website_overhaul" | "growth_partnership"
  terminalAction?: "emit_free_audit" | "emit_website_overhaul" | "emit_growth_partnership" | "none"
  leadDispatchStatus?: LeadDispatchOutcome
  leadDispatchCode?: string
  fallbackToHuman?: boolean
  errorType?: string
  conversationState: SalesChatConversationState
}

export type RenderMessageContent = (content: string, keyPrefix: string) => ReactNode[]

export type SalesChatVisualTokens = {
  launcherButton: string
  launcherText: string
  launcherStatus: string
  windowContent: string
  windowOverlay: string
  fullscreenContent: string
  panelGlow: string
  headerBorder: string
  headerIconWrap: string
  headerTitle: string
  headerSubtext: string
  headerStatus: string
  headerActionButton: string
  welcomeBubble: string
  transcriptFrame: string
  promptChip: string
  assistantBubble: string
  userBubble: string
  composerFrame: string
  composerInput: string
  composerCount: string
  bookingText: string
}

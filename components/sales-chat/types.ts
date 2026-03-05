import type { ReactNode } from "react"
import type {
  SalesChatAiOrchestrationPath,
  SalesChatAiDecisionReason,
  SalesChatAiGuardrailCode,
  LeadDispatchOutcome,
  QuickReply as SpecQuickReply,
  SalesChatConversationState,
  SalesChatResponseMode,
} from "@/lib/sales-chat/spec-v1-types"

export type ChatRole = "user" | "assistant"
export type SalesChatVisualStyle = "default" | "minimal-glass" | "dark-minimal"
export type SalesPromptIcon = "calendar" | "target" | "tag" | "users" | "sparkles" | "clock" | "briefcase"

export type SalesChatMessage = {
  id: string
  role: ChatRole
  content: string
  isNew?: boolean
}

export type SalesChatQuickReply = SpecQuickReply

export type SalesChatApiResponse = {
  assistantMessage: string
  nodeId: SalesChatConversationState["nodeId"]
  quickReplies: SalesChatQuickReply[]
  memoryPatch: Record<string, string | boolean | null>
  responseMode: SalesChatResponseMode
  aiDecisionReason?: SalesChatAiDecisionReason
  aiGuardrailCode?: SalesChatAiGuardrailCode
  aiModelUsed?: string
  aiLatencyMs?: number
  aiLatencyBucket?: string
  aiPromptVersion?: string
  aiRepairAttempted?: boolean
  aiOrchestrationPath?: SalesChatAiOrchestrationPath
  aiFallbackReason?: string
  aiConfidence?: number
  aiIntentHint?: string
  recommendedOffer?: "free_audit" | "website_overhaul" | "growth_partnership"
  terminalAction?: "emit_free_audit" | "emit_website_overhaul" | "emit_growth_partnership" | "none"
  leadDispatchStatus?: LeadDispatchOutcome
  leadDispatchCode?: string
  fallbackToHuman?: boolean
  errorType?: string
  conversationState: SalesChatConversationState
  stateToken?: string
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

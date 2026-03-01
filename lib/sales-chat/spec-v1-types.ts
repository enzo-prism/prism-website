export type OfferRecommendation = "free_audit" | "website_overhaul" | "growth_partnership"

export type TerminalAction =
  | "emit_free_audit"
  | "emit_website_overhaul"
  | "emit_growth_partnership"
  | "none"

export type LeadDispatchOutcome = "none" | "attempted" | "succeeded" | "failed"

export type QuickReplyActionType = "reply" | "open_url" | "open_booking"

export type QuickReply = {
  id: string
  label: string
  actionType: QuickReplyActionType
  url?: string
}

export type SalesChatSpecNodeId =
  | "welcome"
  | "intent_a_start"
  | "intent_a_has_site_followup"
  | "intent_a_no_site_followup"
  | "intent_a_unsure_business_type"
  | "intent_b_pitch"
  | "intent_b_collect_business_type"
  | "intent_b_collect_pain"
  | "intent_b_collect_email"
  | "intent_b_confirm"
  | "intent_c_pitch"
  | "intent_c_examples"
  | "intent_c_qualification"
  | "intent_c_close"
  | "intent_c_pay_now"
  | "intent_c_waiting_payment"
  | "intent_d_pitch"
  | "intent_d_scope"
  | "intent_d_signup_choice"
  | "intent_d_direct_signup"
  | "intent_d_book_call"
  | "intent_d_collect_qualification"
  | "intent_d_big_commitment"
  | "intent_e_router"
  | "intent_f_router"
  | "intent_g_router"

export type SalesChatSpecMemory = {
  businessType?: string
  websiteUrl?: string
  painPoint?: string
  email?: string
  businessName?: string
  brandAssets?: string
  hasExistingSite?: boolean
  existingUrl?: string
  estimatedPages?: string
  primaryGoal?: string
  timeline?: string
  alsoBookedCall?: boolean
  actionTaken?: "booked_call" | "direct_signup" | "pay_now"
  askedQuestionIds?: string[]
}

export type SalesChatConversationState = {
  nodeId: SalesChatSpecNodeId
  exchangeCount: number
  memory: SalesChatSpecMemory
  convertedAction?: OfferRecommendation
}

export type SalesChatRequestV2 = {
  sessionId: string
  sourcePage: string
  inputType: "text" | "button"
  inputValue: string
  buttonId?: string
  conversationState?: SalesChatConversationState
}

export type SalesChatResponseV2 = {
  assistantMessage: string
  nodeId: SalesChatSpecNodeId
  quickReplies: QuickReply[]
  memoryPatch: Record<string, string | boolean | null>
  recommendedOffer?: OfferRecommendation
  terminalAction?: TerminalAction
  leadDispatchStatus?: LeadDispatchOutcome
  leadDispatchCode?: string
  fallbackToHuman?: boolean
  errorType?: string
  conversationState: SalesChatConversationState
}

export type SalesChatSpecRuntimeLinks = {
  bookingUrl: string
  websiteOverhaulCheckoutUrl: string
  growthPartnershipSignupUrl: string
}

export type SalesChatEngineInput = {
  request: SalesChatRequestV2
  state: SalesChatConversationState
  runtimeLinks: SalesChatSpecRuntimeLinks
  nowIso: string
}

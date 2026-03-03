export type LeadProfile = {
  name?: string
  email?: string
  company?: string
  role?: string
  businessType?: string
  goal?: string
  timeline?: string
  budgetBand?: string
}

export type ConversationIntent = "sales" | "not_sales" | "unknown"

export type ConversationState = {
  fitFlowStarted?: boolean
  fitFlowCompleted?: boolean
  turns?: number
  lastIntent?: ConversationIntent
}

export type RequestedAction = "faq" | "fit_check" | "pricing" | "booking" | "case_study"

export type SalesChatState =
  | "MEETING_BOOKED"
  | "MEETING_REQUESTED"
  | "CALLBACK_REQUESTED"
  | "WARM_NURTURE"
  | "NOT_SALES"

export type SalesChatEventName =
  | "sales_chat_open"
  | "sales_chat_launcher_click"
  | "sales_chat_open_mode"
  | "sales_chat_message_sent"
  | "sales_chat_error"
  | "sales_chat_welcome_seen"
  | "sales_chat_fit_flow_started"
  | "sales_chat_fit_flow_step_answered"
  | "sales_chat_fit_flow_completed"
  | "sales_chat_demo_cta_shown"
  | "sales_chat_demo_cta_clicked"
  | "sales_chat_calendar_opened"
  | "sales_chat_demo_booked"
  | "sales_chat_state_changed"
  | "sales_chat_faq_answered"
  | "sales_chat_csat_submitted"
  | "sales_chat_quick_reply_clicked"
  | "sales_chat_spec_node_entered"
  | "sales_chat_offer_recommended"
  | "sales_chat_ai_response_used"
  | "sales_chat_ai_response_rejected"
  | "sales_chat_lead_payload_attempted"
  | "sales_chat_lead_payload_emitted"
  | "sales_chat_lead_payload_failed"
  | "sales_chat_dead_end_prevented"

export type QualificationSnapshot = {
  summary: string
  leadProfile: LeadProfile
}

export type SalesChatEventEnvelope = {
  sessionId: string
  sourcePage: string
  eventName: SalesChatEventName
  eventTs?: string
  leadProfilePatch?: Partial<LeadProfile>
  stateTransition?: SalesChatState
  transcriptSnippet?: string
  metadata?: Record<string, unknown>
}

import type { ConversationIntent, RequestedAction } from "@/lib/sales-chat/types"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type PolicyInput = {
  turns: number
  requestedAction?: RequestedAction
  intent: ConversationIntent
  highIntentSignals: boolean
  ctaMinTurns: number
  fitFlowCompleted?: boolean
  nonSalesDeflectionEnabled: boolean
}

const HIGH_INTENT_PATTERNS = [
  /\b(budget|price|pricing|cost)\b/i,
  /\b(timeline|asap|this month|next month|start soon|launch)\b/i,
  /\b(ready|start|book|schedule|demo|call)\b/i,
]

const NON_SALES_PATTERNS = [
  /\b(support|bug|issue|login|invoice)\b/i,
  /\b(career|job|hiring|resume|cv)\b/i,
  /\b(press|media|podcast request|sponsorship)\b/i,
  /\b(vendor|partnership request|affiliate payout)\b/i,
]

export function detectConversationIntent(
  messages: ChatMessage[],
  fallback: ConversationIntent = "unknown",
): ConversationIntent {
  const userCorpus = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ")

  if (!userCorpus.trim()) {
    return fallback
  }

  if (NON_SALES_PATTERNS.some((pattern) => pattern.test(userCorpus))) {
    return "not_sales"
  }

  return "sales"
}

export function hasHighIntentSignals(messages: ChatMessage[]): boolean {
  const userCorpus = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ")

  return HIGH_INTENT_PATTERNS.some((pattern) => pattern.test(userCorpus))
}

export function shouldIncludeDemoCta({
  turns,
  requestedAction,
  intent,
  highIntentSignals,
  ctaMinTurns,
  fitFlowCompleted,
}: PolicyInput): boolean {
  if (intent !== "sales") {
    return false
  }

  if (requestedAction === "booking" || requestedAction === "fit_check") {
    return true
  }

  if (fitFlowCompleted) {
    return true
  }

  if (highIntentSignals) {
    return true
  }

  return turns >= ctaMinTurns
}

export function buildPolicyDirectives(input: PolicyInput): string {
  const demoCtaRequired = shouldIncludeDemoCta(input)

  if (input.intent === "not_sales" && input.nonSalesDeflectionEnabled) {
    return [
      "Intent policy:",
      "1) This user appears to be non-sales. Respond politely, state this chat is for pre-sales only, and route them to the relevant support/contact path.",
      "2) Do not hard-sell or push a demo in this case.",
      "3) Keep the reply under 4 sentences and ask one clarifying question only if needed.",
    ].join("\n")
  }

  if (!demoCtaRequired) {
    return [
      "Intent policy:",
      "1) Keep this response pre-sales helpful and concise.",
      "2) Ask at most one short follow-up question if needed.",
      "3) Optional CTA only, do not force the booking ask yet.",
    ].join("\n")
  }

  return [
    "Intent policy:",
    "1) Include one explicit booking CTA in this response.",
    "2) Use concise conversion phrasing: \"Fastest way to confirm fit is a 30-min demo. Want to grab a time?\"",
    "3) Include the exact booking link markdown: [Book a 30-min demo](#book-call).",
  ].join("\n")
}

import { createGateway, generateObject } from "ai"
import { z } from "zod"

import { faqCopy, fallbackRephraseCopy } from "@/lib/sales-chat/spec-v1-copy"
import type {
  SalesChatAiGuardrailCode,
  OfferRecommendation,
  SalesChatConversationState,
  SalesChatResponseV2,
  SalesChatSpecNodeId,
  SalesChatTranscriptTurn,
} from "@/lib/sales-chat/spec-v1-types"
import type { SalesChatAiResponseMode } from "@/lib/sales-chat/runtime-config"

const aiLongTailSchema = z.object({
  assistantMessage: z.string().trim().min(40).max(1200),
  recommendedOffer: z.enum(["free_audit", "website_overhaul", "growth_partnership"]).nullable(),
  shouldHandoff: z.boolean().nullable(),
})

const AI_TRIGGER_MESSAGES = new Set([
  fallbackRephraseCopy().assistantMessage,
  faqCopy("unknown").assistantMessage,
])

const AI_PROMPT_VERSION = "v3_node_context_history"
const CANONICAL_PRICE_VALUES = new Set([0, 1000, 2000])
const DISALLOWED_PRICE_LANGUAGE = /(starting at|from\s+\$|per\s+week|\/week|under\s+\$)/i
const OTHER_WRITTEN_PRICE_PATTERN = /\b(?:three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty)\s+(?:hundred|thousand|grand)\b/i
const WEBSITE_CONTEXT_PATTERN = /\b(website overhaul|site rebuild|new website|rebuild)\b/i
const GROWTH_CONTEXT_PATTERN = /\b(growth partnership|retainer|ongoing growth)\b/i
const MONTHLY_MARKER_PATTERN = /(?:\/\s*mo(?:nth)?\b|per\s+month\b|monthly\b)/i
const ONE_TIME_MARKER_PATTERN = /\b(one[\s-]?time|single payment|pay once|one-off)\b/i
const COMPLEX_QUERY_PATTERN = /\b(strategy|prioriti[sz]e|roadmap|framework|funnel|attribution|instrumentation|architecture|migration|integrat(?:e|ion)|multi[\s-]?step|kpi|experiment|positioning|sequencing)\b/i
const DEFAULT_FAST_MODEL_MAX_CHARS = 190

export type AiDecisionReason =
  | "broad_mode"
  | "long_tail_trigger"
  | "guardrail_reject"
  | "gateway_error"
  | "disabled"

export type MaybeAiFallbackInput = {
  enabled: boolean
  mode: SalesChatAiResponseMode
  gatewayConfigured: boolean
  gatewayFallbackModels: string[]
  gatewayProviderOrder: string[]
  env: NodeJS.ProcessEnv
  inputType: "text" | "button"
  buttonId?: string
  requestInput: string
  sourcePage: string
  state: SalesChatConversationState
  deterministicResponse: SalesChatResponseV2
  conversationHistory?: SalesChatTranscriptTurn[]
}

export type MaybeAiFallbackResult = {
  used: boolean
  assistantMessage?: string
  recommendedOffer?: OfferRecommendation
  fallbackToHuman?: boolean
  reason?: AiDecisionReason
  guardrailCode?: SalesChatAiGuardrailCode
  modelUsed?: string
  latencyMs?: number
  promptVersion?: string
  repairAttempted?: boolean
}

function shouldUseLongTailMode(input: MaybeAiFallbackInput): boolean {
  const responseMessage = input.deterministicResponse.assistantMessage.trim()
  return Array.from(AI_TRIGGER_MESSAGES).some(
    (candidate) => responseMessage === candidate || responseMessage.startsWith(`${candidate}\n\n`),
  )
}

function isInitTurn(input: MaybeAiFallbackInput): boolean {
  return (
    input.inputType === "button"
    && input.buttonId === "__init__"
    && !input.requestInput.trim()
  )
}

function shouldAttemptAiFallback(input: MaybeAiFallbackInput): {
  shouldRun: boolean
  reason?: AiDecisionReason
} {
  if (!input.enabled) {
    return { shouldRun: false }
  }

  if (input.mode === "off") {
    return { shouldRun: false, reason: "disabled" }
  }

  if (input.deterministicResponse.terminalAction && input.deterministicResponse.terminalAction !== "none") {
    return { shouldRun: false }
  }

  if (isInitTurn(input)) {
    return { shouldRun: false }
  }

  if (input.mode === "broad") {
    return { shouldRun: true, reason: "broad_mode" }
  }

  if (input.inputType === "text" && input.requestInput.trim()) {
    return { shouldRun: true, reason: "long_tail_trigger" }
  }

  if (shouldUseLongTailMode(input)) {
    return { shouldRun: true, reason: "long_tail_trigger" }
  }

  return { shouldRun: false }
}

function normalizePriceNumber(rawMatch: string): number {
  return Number.parseInt(rawMatch.replace(/[^0-9]/g, ""), 10)
}

function hasAnyPattern(message: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(message))
}

function mentionsWebsitePrice(message: string): boolean {
  return hasAnyPattern(message, [
    /\$?\s*1,?000\b/i,
    /\b1k\b/i,
    /\bone\s+(?:thousand|grand)\b/i,
  ])
}

function mentionsGrowthPrice(message: string): boolean {
  return hasAnyPattern(message, [
    /\$?\s*2,?000\b/i,
    /\b2k\b/i,
    /\btwo\s+(?:thousand|grand)\b/i,
  ])
}

function hasDisallowedPricing(message: string): boolean {
  const normalized = message.toLowerCase()
  if (DISALLOWED_PRICE_LANGUAGE.test(message)) {
    return true
  }

  const dollarMatches = message.match(/\$[\s]*[\d,]+(?:\.\d+)?/g) ?? []
  if (dollarMatches.some((token) => {
    const numeric = normalizePriceNumber(token)
    return Number.isFinite(numeric) && !CANONICAL_PRICE_VALUES.has(numeric)
  })) {
    return true
  }

  const kMatches = normalized.match(/\b(\d+(?:\.\d+)?)\s*k\b/g) ?? []
  if (kMatches.some((token) => {
    const numeric = Number.parseFloat(token.replace(/[^0-9.]/g, "")) * 1000
    return Number.isFinite(numeric) && !CANONICAL_PRICE_VALUES.has(numeric)
  })) {
    return true
  }

  if (OTHER_WRITTEN_PRICE_PATTERN.test(normalized)) {
    return true
  }

  const hasWebsitePrice = mentionsWebsitePrice(normalized)
  const hasGrowthPrice = mentionsGrowthPrice(normalized)
  const hasMonthlyMarker = MONTHLY_MARKER_PATTERN.test(normalized)
  const hasOneTimeMarker = ONE_TIME_MARKER_PATTERN.test(normalized)

  if (hasWebsitePrice && !hasGrowthPrice && hasMonthlyMarker) {
    return true
  }

  if (hasGrowthPrice && !hasWebsitePrice && hasOneTimeMarker) {
    return true
  }

  if (WEBSITE_CONTEXT_PATTERN.test(normalized) && hasWebsitePrice && !hasOneTimeMarker) {
    return true
  }

  if (GROWTH_CONTEXT_PATTERN.test(normalized) && hasGrowthPrice && !hasMonthlyMarker) {
    return true
  }

  return false
}

function expectedOfferForNode(nodeId: SalesChatSpecNodeId): OfferRecommendation | undefined {
  if (nodeId.startsWith("intent_b_")) return "free_audit"
  if (nodeId.startsWith("intent_c_")) return "website_overhaul"
  if (nodeId.startsWith("intent_d_")) return "growth_partnership"
  return undefined
}

function detectMentionedOffer(message: string): OfferRecommendation | "multiple" | undefined {
  const normalized = message.toLowerCase()
  const mentioned: OfferRecommendation[] = []

  if (/\b(free audit|free expert audit|\$0|zero[-\s]?cost)\b/i.test(normalized)) {
    mentioned.push("free_audit")
  }
  if (mentionsWebsitePrice(normalized) || WEBSITE_CONTEXT_PATTERN.test(normalized)) {
    mentioned.push("website_overhaul")
  }
  if (mentionsGrowthPrice(normalized) || GROWTH_CONTEXT_PATTERN.test(normalized)) {
    mentioned.push("growth_partnership")
  }

  const unique = Array.from(new Set(mentioned))
  if (unique.length > 1) return "multiple"
  return unique[0]
}

function hasSemanticMismatch(input: MaybeAiFallbackInput, assistantMessage: string, recommendedOffer?: OfferRecommendation): boolean {
  const expectedOffer = expectedOfferForNode(input.state.nodeId) ?? input.deterministicResponse.recommendedOffer
  if (!expectedOffer) {
    return false
  }

  if (recommendedOffer && recommendedOffer !== expectedOffer) {
    return true
  }

  const mentionedOffer = detectMentionedOffer(assistantMessage)
  if (mentionedOffer === "multiple") {
    return true
  }

  return Boolean(mentionedOffer && mentionedOffer !== expectedOffer)
}

function evaluateGuardrails(
  input: MaybeAiFallbackInput,
  assistantMessage: string,
  recommendedOffer?: OfferRecommendation,
): SalesChatAiGuardrailCode | undefined {
  if (hasDisallowedPricing(assistantMessage)) {
    return "pricing_drift"
  }

  if (hasSemanticMismatch(input, assistantMessage, recommendedOffer)) {
    return "semantic_mismatch"
  }

  return undefined
}

function formatMemoryFacts(state: SalesChatConversationState): string {
  const facts: string[] = []
  if (state.memory.businessType) facts.push(`Business type: ${state.memory.businessType}`)
  if (state.memory.websiteUrl) facts.push(`Website URL: ${state.memory.websiteUrl}`)
  if (state.memory.primaryGoal) facts.push(`Primary goal: ${state.memory.primaryGoal}`)
  if (state.memory.painPoint) facts.push(`Pain point: ${state.memory.painPoint}`)
  return facts.length > 0 ? facts.join("\n") : "No prior memory captured yet."
}

function buildNodeStrategy(nodeId: SalesChatSpecNodeId): string {
  if (nodeId.startsWith("intent_b_")) {
    return "Node goal: free-audit qualification. Be concise and confidence-building, then guide to audit completion."
  }
  if (nodeId.startsWith("intent_c_")) {
    return "Node goal: website-overhaul qualification. Clarify scope and next steps without sounding pushy."
  }
  if (nodeId.startsWith("intent_d_")) {
    return "Node goal: growth-partnership qualification. Emphasize strategic partnership outcomes and fit."
  }
  if (nodeId.startsWith("intent_e_")) {
    return "Node goal: FAQ support. Answer clearly, then route to the most relevant next conversion step."
  }
  if (nodeId.startsWith("intent_f_")) {
    return "Node goal: objection handling. Validate concerns, reduce friction, and provide one practical next step."
  }
  if (nodeId.startsWith("intent_g_")) {
    return "Node goal: edge-case or human handoff. Keep tone calm, clear, and route safely."
  }
  if (nodeId.startsWith("intent_a_") || nodeId === "welcome") {
    return "Node goal: discovery and offer-fit routing. Ask one clear, natural question to move forward."
  }
  return "Node goal: keep momentum and provide one clear next step."
}

function formatConversationHistory(history: SalesChatTranscriptTurn[] | undefined): string {
  if (!history || history.length === 0) {
    return "No transcript history provided."
  }

  return history
    .slice(-6)
    .map((turn, index) => {
      const role = turn.role === "user" ? "User" : "Assistant"
      const content = turn.content.trim().replace(/\s+/g, " ").slice(0, 280)
      return `${index + 1}. ${role}: ${content}`
    })
    .join("\n")
}

function buildSystemPrompt(): string {
  return [
    "You are Prism's sales assistant for design-prism.com.",
    "Stay conversational, helpful, and direct in plain English.",
    "Sound like a human advisor: natural cadence, contractions, and varied sentence rhythm.",
    "Output valid JSON only using the provided schema.",
    "Keep response to 2-5 concise sentences.",
    "Prefer ending with one clear next-step question when it feels natural.",
    "Do not use markdown lists or bullet characters.",
    "Canonical pricing is fixed and must never drift:",
    "- Free Expert Audit: $0",
    "- Website Overhaul: $1,000 one-time",
    "- Growth Partnership: $2,000/month",
    "Never mention any other pricing values.",
    "If the user asks for something outside Prism's scope, politely offer a human handoff.",
    "Prefer recommending one of: free_audit, website_overhaul, growth_partnership when appropriate.",
  ].join("\n")
}

function buildUserPrompt(input: MaybeAiFallbackInput): string {
  const quickReplyContext = input.deterministicResponse.quickReplies.length > 0
    ? input.deterministicResponse.quickReplies.map((reply) => reply.label).join(" | ")
    : "No quick replies for this turn."

  return [
    `User message: ${input.requestInput.trim()}`,
    `Source page: ${input.sourcePage}`,
    `Input type: ${input.inputType}${input.buttonId ? ` (${input.buttonId})` : ""}`,
    `Conversation node: ${input.state.nodeId}`,
    "Known session memory:",
    formatMemoryFacts(input.state),
    "Recent transcript window:",
    formatConversationHistory(input.conversationHistory),
    `Deterministic message currently shown: ${input.deterministicResponse.assistantMessage}`,
    `Deterministic quick reply options: ${quickReplyContext}`,
    buildNodeStrategy(input.state.nodeId),
    "Provide a better response while keeping canonical pricing and conversion focus.",
  ].join("\n")
}

function buildGuardrailRepairPrompt(
  input: MaybeAiFallbackInput,
  rejectedMessage: string,
  guardrailCode: SalesChatAiGuardrailCode,
): string {
  const expectedOffer = expectedOfferForNode(input.state.nodeId) ?? input.deterministicResponse.recommendedOffer

  const guardrailInstruction = guardrailCode === "pricing_drift"
    ? "Your previous candidate violated pricing policy."
    : `Your previous candidate conflicted with this node's semantic intent.${expectedOffer ? ` Expected offer focus: ${expectedOffer}.` : ""}`

  return [
    guardrailInstruction,
    `Rejected candidate: ${rejectedMessage}`,
    `Deterministic safe response: ${input.deterministicResponse.assistantMessage}`,
    "Rewrite a natural response that preserves deterministic intent and quick-reply path.",
    "Keep canonical conversion focus for this node.",
    "If an offer is mentioned, keep it consistent with the deterministic node context.",
    "Use a natural, human tone and end with one clear next step.",
    "No markdown bullets.",
    "Allowed pricing only: $0, $1,000 one-time, $2,000/month.",
    "Do not mention any other numbers as prices.",
  ].join("\n")
}

function parseCsvEnv(value: string | undefined): string[] {
  if (!value?.trim()) {
    return []
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseBooleanEnv(value: string | undefined, fallback = false): boolean {
  if (!value) return fallback
  const normalized = value.trim().toLowerCase()
  if (["1", "true", "yes", "on"].includes(normalized)) return true
  if (["0", "false", "no", "off"].includes(normalized)) return false
  return fallback
}

function parsePositiveIntegerEnv(value: string | undefined, fallback: number): number {
  if (!value?.trim()) return fallback
  const parsed = Number.parseInt(value.trim(), 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback
  return parsed
}

function shouldPreferFastModel(input: MaybeAiFallbackInput, maxChars: number): boolean {
  if (input.inputType !== "text") {
    return false
  }

  const message = input.requestInput.trim()
  if (!message) {
    return false
  }

  if (message.length > maxChars) {
    return false
  }

  if (COMPLEX_QUERY_PATTERN.test(message.toLowerCase())) {
    return false
  }

  const historyDepth = input.conversationHistory?.length ?? 0
  if (historyDepth >= 4) {
    return false
  }

  return true
}

function resolveGatewayModelId(input: MaybeAiFallbackInput, primaryModelId: string): string {
  const fastModel = input.env.AI_GATEWAY_FAST_MODEL?.trim()
  if (!fastModel) {
    return primaryModelId
  }

  if (parseBooleanEnv(input.env.AI_GATEWAY_FORCE_FAST_MODEL, false)) {
    return fastModel
  }

  const maxChars = parsePositiveIntegerEnv(
    input.env.AI_GATEWAY_FAST_MODEL_MAX_CHARS,
    DEFAULT_FAST_MODEL_MAX_CHARS,
  )

  return shouldPreferFastModel(input, maxChars) ? fastModel : primaryModelId
}

function buildGatewayProviderOptions(input: MaybeAiFallbackInput) {
  const fallbackModels = input.gatewayFallbackModels.length > 0
    ? input.gatewayFallbackModels
    : parseCsvEnv(input.env.AI_GATEWAY_FALLBACK_MODELS)

  const providerOrder = input.gatewayProviderOrder.length > 0
    ? input.gatewayProviderOrder
    : parseCsvEnv(input.env.AI_GATEWAY_PROVIDER_ORDER)

  const gatewayOptions: {
    models?: string[]
    order?: string[]
  } = {}
  if (fallbackModels.length > 0) {
    gatewayOptions.models = fallbackModels
  }
  if (providerOrder.length > 0) {
    gatewayOptions.order = providerOrder
  }

  if (Object.keys(gatewayOptions).length === 0) {
    return undefined
  }

  return {
    gateway: gatewayOptions,
  }
}

function getPrimaryGenerationTemperature(input: MaybeAiFallbackInput): number {
  if (input.mode === "broad") {
    return input.inputType === "text" ? 0.68 : 0.62
  }
  return 0.52
}

function maybeLogGatewayDebug(
  input: MaybeAiFallbackInput,
  phase: "generate" | "repair",
  error: unknown,
  modelId: string,
) {
  if (!parseBooleanEnv(input.env.AI_GATEWAY_DEBUG, false)) {
    return
  }

  const statusCode = (error as { statusCode?: number; cause?: { statusCode?: number } })?.statusCode
    ?? (error as { cause?: { statusCode?: number } })?.cause?.statusCode
  const message = (error as { message?: string })?.message ?? "unknown_error"

  console.warn("[sales-chat][ai-gateway] fallback_error", {
    phase,
    modelId,
    statusCode,
    message,
    sourcePage: input.sourcePage,
    nodeId: input.state.nodeId,
    inputType: input.inputType,
  })
}

export async function maybeGenerateAiFallbackResponse(
  input: MaybeAiFallbackInput,
): Promise<MaybeAiFallbackResult> {
  const decision = shouldAttemptAiFallback(input)
  if (!decision.shouldRun) {
    return { used: false, reason: decision.reason, promptVersion: AI_PROMPT_VERSION }
  }

  const baseURL = input.env.AI_GATEWAY_BASE_URL?.trim()
  const apiKey = input.env.AI_GATEWAY_API_KEY?.trim()
  const primaryModelId = input.env.AI_GATEWAY_MODEL?.trim()

  if (!input.gatewayConfigured || !baseURL || !apiKey || !primaryModelId) {
    return { used: false, reason: "disabled", promptVersion: AI_PROMPT_VERSION }
  }

  const selectedModelId = resolveGatewayModelId(input, primaryModelId)
  const startedAt = Date.now()

  try {
    const gateway = createGateway({
      baseURL,
      apiKey,
    })

    const result = await generateObject({
      model: gateway(selectedModelId),
      schema: aiLongTailSchema,
      temperature: getPrimaryGenerationTemperature(input),
      maxOutputTokens: 420,
      system: buildSystemPrompt(),
      prompt: buildUserPrompt(input),
      providerOptions: buildGatewayProviderOptions(input),
    })

    const latencyMs = Date.now() - startedAt
    let assistantMessage = result.object.assistantMessage.trim()
    let recommendedOffer = result.object.recommendedOffer ?? undefined
    let fallbackToHuman = result.object.shouldHandoff ?? false
    let repairAttempted = false

    let guardrailCode = evaluateGuardrails(input, assistantMessage, recommendedOffer)

    if (guardrailCode) {
      repairAttempted = true
      try {
        const repaired = await generateObject({
          model: gateway(selectedModelId),
          schema: aiLongTailSchema,
          temperature: 0.15,
          maxOutputTokens: 420,
          system: buildSystemPrompt(),
          prompt: buildGuardrailRepairPrompt(input, assistantMessage, guardrailCode),
          providerOptions: buildGatewayProviderOptions(input),
        })
        assistantMessage = repaired.object.assistantMessage.trim()
        recommendedOffer = repaired.object.recommendedOffer ?? recommendedOffer
        fallbackToHuman = repaired.object.shouldHandoff ?? fallbackToHuman
      } catch (error) {
        maybeLogGatewayDebug(input, "repair", error, selectedModelId)
        return {
          used: false,
          reason: "guardrail_reject",
          guardrailCode,
          modelUsed: selectedModelId,
          latencyMs,
          promptVersion: AI_PROMPT_VERSION,
          repairAttempted,
        }
      }
    }

    guardrailCode = evaluateGuardrails(input, assistantMessage, recommendedOffer)

    if (guardrailCode) {
      return {
        used: false,
        reason: "guardrail_reject",
        guardrailCode,
        modelUsed: selectedModelId,
        latencyMs,
        promptVersion: AI_PROMPT_VERSION,
        repairAttempted,
      }
    }

    return {
      used: true,
      assistantMessage,
      recommendedOffer,
      fallbackToHuman,
      reason: decision.reason,
      modelUsed: selectedModelId,
      latencyMs,
      promptVersion: AI_PROMPT_VERSION,
      repairAttempted,
    }
  } catch (error) {
    maybeLogGatewayDebug(input, "generate", error, selectedModelId)
    return {
      used: false,
      reason: "gateway_error",
      modelUsed: selectedModelId,
      latencyMs: Date.now() - startedAt,
      promptVersion: AI_PROMPT_VERSION,
    }
  }
}

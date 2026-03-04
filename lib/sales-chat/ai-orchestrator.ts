import { createHash } from "node:crypto"

import { createGateway, generateText, Output } from "ai"
import { z } from "zod"

import { faqCopy, fallbackRephraseCopy } from "@/lib/sales-chat/spec-v1-copy"
import type {
  SalesChatAiDecisionReason,
  SalesChatAiGuardrailCode,
  SalesChatAiOrchestrationPath,
  OfferRecommendation,
  SalesChatConversationState,
  SalesChatResponseV2,
  SalesChatSpecNodeId,
  SalesChatTranscriptTurn,
} from "@/lib/sales-chat/spec-v1-types"
import type { SalesChatAiResponseMode } from "@/lib/sales-chat/runtime-config"

const aiResponseSchema = z.object({
  assistantMessage: z.string().trim().min(20).max(1200),
  recommendedOffer: z.enum(["free_audit", "website_overhaul", "growth_partnership"]).nullable(),
  fallbackToHuman: z.boolean().nullable(),
  intentHint: z
    .enum([
      "free_audit",
      "website_overhaul",
      "growth_partnership",
      "help_choose",
      "general_question",
      "faq",
      "objection",
      "edge_case",
      "unknown",
    ])
    .nullable(),
  nextStepQuestion: z.string().trim().max(220).nullable(),
  confidence: z.number().min(0).max(1).nullable(),
})

const AI_TRIGGER_MESSAGES = new Set([
  fallbackRephraseCopy().assistantMessage,
  faqCopy("unknown").assistantMessage,
])

const AI_PROMPT_VERSION = "v4_orchestrated_primary_guarded"
const CANONICAL_PRICE_VALUES = new Set([0, 1000, 2000])
const DISALLOWED_PRICE_LANGUAGE = /(starting at|from\s+\$|per\s+week|\/week|under\s+\$)/i
const OTHER_WRITTEN_PRICE_PATTERN = /\b(?:three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty)\s+(?:hundred|thousand|grand)\b/i
const WEBSITE_CONTEXT_PATTERN = /\b(website overhaul|site rebuild|new website|rebuild)\b/i
const GROWTH_CONTEXT_PATTERN = /\b(growth partnership|retainer|ongoing growth)\b/i
const MONTHLY_MARKER_PATTERN = /(?:\/\s*mo(?:nth)?\b|per\s+month\b|monthly\b)/i
const ONE_TIME_MARKER_PATTERN = /\b(one[\s-]?time|single payment|pay once|one-off)\b/i
const COMPLEX_QUERY_PATTERN = /\b(strategy|prioriti[sz]e|roadmap|framework|funnel|attribution|instrumentation|architecture|migration|integrat(?:e|ion)|multi[\s-]?step|kpi|experiment|positioning|sequencing)\b/i
const DEFAULT_FAST_MODEL_MAX_CHARS = 190
const DEFAULT_TIMEOUT_MS = 7000

const BANNED_PHRASE_PATTERNS = [
  "i'm not sure i caught that",
  "could you rephrase it",
  "if you'd prefer, i can connect you with the team directly",
  "if you'd rather, i can connect you with the team directly",
]

export type MaybeAiOrchestrationInput = {
  enabled: boolean
  mode: SalesChatAiResponseMode
  gatewayConfigured: boolean
  gatewayFallbackModels: string[]
  gatewayProviderOrder: string[]
  env: NodeJS.ProcessEnv
  sessionId: string
  sourcePage: string
  inputType: "text" | "button"
  buttonId?: string
  requestInput: string
  state: SalesChatConversationState
  deterministicResponse: SalesChatResponseV2
  conversationHistory?: SalesChatTranscriptTurn[]
  orchestrationEnabled: boolean
  orchestrationPercent: number
  orchestrationCohort: string
}

export type MaybeAiOrchestrationResult = {
  used: boolean
  assistantMessage?: string
  recommendedOffer?: OfferRecommendation
  fallbackToHuman?: boolean
  reason?: SalesChatAiDecisionReason
  guardrailCode?: SalesChatAiGuardrailCode
  modelUsed?: string
  latencyMs?: number
  latencyBucket?: string
  promptVersion?: string
  repairAttempted?: boolean
  orchestrationPath: SalesChatAiOrchestrationPath
  fallbackReason?: string
  confidence?: number
  intentHint?: string
}

function normalizeForPolicy(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function hashSessionBucket(sessionId: string): number {
  const digest = createHash("sha256").update(sessionId).digest("hex")
  const sample = Number.parseInt(digest.slice(0, 8), 16)
  if (!Number.isFinite(sample)) {
    return 99
  }
  return sample % 100
}

function isBannedPhraseMessage(message: string): boolean {
  const normalized = normalizeForPolicy(message)
  return BANNED_PHRASE_PATTERNS.some((pattern) => normalized.includes(normalizeForPolicy(pattern)))
}

function shouldUseLongTailMode(input: MaybeAiOrchestrationInput): boolean {
  const responseMessage = input.deterministicResponse.assistantMessage.trim()
  return Array.from(AI_TRIGGER_MESSAGES).some(
    (candidate) => responseMessage === candidate || responseMessage.startsWith(`${candidate}\n\n`),
  )
}

function isInitTurn(input: MaybeAiOrchestrationInput): boolean {
  return (
    input.inputType === "button"
    && input.buttonId === "__init__"
    && !input.requestInput.trim()
  )
}

function shouldAttemptOrchestration(input: MaybeAiOrchestrationInput): {
  shouldRun: boolean
  reason?: SalesChatAiDecisionReason
  fallbackReason?: string
} {
  if (!input.enabled) {
    return { shouldRun: false, reason: "disabled", fallbackReason: "ai_response_disabled" }
  }

  if (input.mode === "off") {
    return { shouldRun: false, reason: "disabled", fallbackReason: "ai_mode_off" }
  }

  if (!input.orchestrationEnabled) {
    return { shouldRun: false, reason: "canary_skip", fallbackReason: "orchestration_flag_disabled" }
  }

  const bucket = hashSessionBucket(input.sessionId)
  if (bucket >= input.orchestrationPercent) {
    return { shouldRun: false, reason: "canary_skip", fallbackReason: "orchestration_percent_gate" }
  }

  if (input.deterministicResponse.terminalAction && input.deterministicResponse.terminalAction !== "none") {
    return { shouldRun: false, fallbackReason: "terminal_action_locked" }
  }

  if (isInitTurn(input)) {
    return { shouldRun: false, fallbackReason: "init_bootstrap" }
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

  return { shouldRun: false, fallbackReason: "long_tail_no_trigger" }
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

function hasSemanticMismatch(
  input: MaybeAiOrchestrationInput,
  assistantMessage: string,
  recommendedOffer?: OfferRecommendation,
): boolean {
  if (
    input.mode === "broad"
    && (
      input.state.nodeId === "welcome"
      || input.state.nodeId.startsWith("intent_a_")
      || input.state.nodeId.startsWith("intent_e_")
      || input.state.nodeId.startsWith("intent_f_")
      || input.state.nodeId.startsWith("intent_g_")
    )
  ) {
    return false
  }

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
  input: MaybeAiOrchestrationInput,
  assistantMessage: string,
  recommendedOffer?: OfferRecommendation,
): SalesChatAiGuardrailCode | undefined {
  if (isBannedPhraseMessage(assistantMessage)) {
    return "banned_phrase_blocked"
  }

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
  if (state.memory.email) facts.push(`Email captured: ${state.memory.email}`)
  return facts.length > 0 ? facts.join("\n") : "No prior memory captured yet."
}

function buildNodeStrategy(nodeId: SalesChatSpecNodeId): string {
  if (nodeId.startsWith("intent_b_")) {
    return "Node goal: free-audit qualification. Be specific, confidence-building, and move toward the audit action without pressure."
  }
  if (nodeId.startsWith("intent_c_")) {
    return "Node goal: website-overhaul qualification. Clarify scope and outcomes, then guide to decisive next steps."
  }
  if (nodeId.startsWith("intent_d_")) {
    return "Node goal: growth-partnership qualification. Emphasize strategic leverage, fit, and practical next action."
  }
  if (nodeId.startsWith("intent_e_")) {
    return "Node goal: FAQ support. Answer clearly, then bridge to the highest-likelihood conversion path."
  }
  if (nodeId.startsWith("intent_f_")) {
    return "Node goal: objection handling. Validate concern, reduce friction, and provide one low-risk next move."
  }
  if (nodeId.startsWith("intent_g_")) {
    return "Node goal: edge-case/handoff safety. Keep calm, direct, and useful with clear path forward."
  }
  if (nodeId.startsWith("intent_a_") || nodeId === "welcome") {
    return "Node goal: discovery and fit-routing. Ask one concrete follow-up tied to what user already shared."
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
      const content = turn.content.trim().replace(/\s+/g, " ").slice(0, 320)
      return `${index + 1}. ${role}: ${content}`
    })
    .join("\n")
}

function buildSystemPrompt(): string {
  return [
    "You are Prism's sales assistant for design-prism.com.",
    "You generate concise, tailored responses that progress the conversation naturally.",
    "Output valid JSON only using the provided schema.",
    "Style contract:",
    "- 2-5 concise sentences",
    "- one clear next-step question when natural",
    "- no markdown lists or bullet characters",
    "- no repetitive apology loops",
    "- acknowledge context, personalize advice, progress the conversation",
    "Pricing policy:",
    "- Free Expert Audit: $0",
    "- Website Overhaul: $1,000 one-time",
    "- Growth Partnership: $2,000/month",
    "- mention pricing only when user asks about pricing, budget, cost, or packages",
    "- never mention any other pricing values",
    "Banned language:",
    "- never say: I'm not sure I caught that. Could you rephrase it?",
    "- never use generic dead-end rephrase prompts",
    "If uncertain, ask a targeted clarifying question tied to user context.",
    "For off-topic prompts, briefly answer and bridge back to Prism outcomes in one sentence.",
  ].join("\n")
}

function buildUserPrompt(input: MaybeAiOrchestrationInput): string {
  const quickReplyContext = input.deterministicResponse.quickReplies.length > 0
    ? input.deterministicResponse.quickReplies.map((reply) => `${reply.label} (${reply.id})`).join(" | ")
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
    `Deterministic baseline response: ${input.deterministicResponse.assistantMessage}`,
    `Deterministic quick reply options: ${quickReplyContext}`,
    buildNodeStrategy(input.state.nodeId),
    "Generate a stronger, context-aware response that keeps conversion momentum and policy compliance.",
  ].join("\n")
}

function buildGuardrailRepairPrompt(
  input: MaybeAiOrchestrationInput,
  rejectedMessage: string,
  guardrailCode: SalesChatAiGuardrailCode,
): string {
  const expectedOffer = expectedOfferForNode(input.state.nodeId) ?? input.deterministicResponse.recommendedOffer

  const reasonInstruction =
    guardrailCode === "pricing_drift"
      ? "The candidate violated pricing policy."
      : guardrailCode === "banned_phrase_blocked"
        ? "The candidate used banned dead-end fallback language."
        : `The candidate conflicted with node intent.${expectedOffer ? ` Expected offer focus: ${expectedOffer}.` : ""}`

  return [
    reasonInstruction,
    `Rejected candidate: ${rejectedMessage}`,
    `Deterministic safe baseline: ${input.deterministicResponse.assistantMessage}`,
    "Rewrite with a natural advisor tone and one concrete next step.",
    "No markdown bullets.",
    "Never use generic rephrase language.",
    "Allowed pricing only: $0, $1,000 one-time, $2,000/month.",
    "Never mention other pricing values.",
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

function shouldPreferFastModel(input: MaybeAiOrchestrationInput, maxChars: number): boolean {
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

function resolveGatewayModelId(input: MaybeAiOrchestrationInput, primaryModelId: string): string {
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

function getLatencyBucket(latencyMs: number | undefined): string {
  if (latencyMs === undefined || !Number.isFinite(latencyMs)) {
    return "unknown"
  }
  if (latencyMs < 500) return "lt_500ms"
  if (latencyMs < 1500) return "500ms_1500ms"
  if (latencyMs < 3000) return "1500ms_3000ms"
  return "gte_3000ms"
}

function buildGatewayProviderOptions(input: MaybeAiOrchestrationInput, sessionHash: string) {
  const fallbackModels = input.gatewayFallbackModels.length > 0
    ? input.gatewayFallbackModels
    : parseCsvEnv(input.env.AI_GATEWAY_FALLBACK_MODELS)

  const providerOrder = input.gatewayProviderOrder.length > 0
    ? input.gatewayProviderOrder
    : parseCsvEnv(input.env.AI_GATEWAY_PROVIDER_ORDER)

  const gatewayOptions: {
    models?: string[]
    order?: string[]
    user?: string
    tags?: string[]
  } = {
    user: `sales-chat:${sessionHash}`,
    tags: [
      "sales-chat",
      `mode:${input.mode}`,
      `node:${input.state.nodeId}`,
      `source:${input.sourcePage}`,
      `cohort:${input.orchestrationCohort}`,
    ],
  }

  if (fallbackModels.length > 0) {
    gatewayOptions.models = fallbackModels
  }
  if (providerOrder.length > 0) {
    gatewayOptions.order = providerOrder
  }

  return {
    gateway: gatewayOptions,
  }
}

function getPrimaryGenerationTemperature(input: MaybeAiOrchestrationInput): number {
  if (input.mode === "broad") {
    return input.inputType === "text" ? 0.62 : 0.58
  }
  return 0.5
}

function maybeLogGatewayDebug(
  input: MaybeAiOrchestrationInput,
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

  console.warn("[sales-chat][ai-orchestrator] fallback_error", {
    phase,
    modelId,
    statusCode,
    message,
    sourcePage: input.sourcePage,
    nodeId: input.state.nodeId,
    inputType: input.inputType,
  })
}

function shouldKeepRecommendedOffer(confidence: number | null | undefined): boolean {
  if (confidence === null || confidence === undefined) {
    return true
  }

  return confidence >= 0.55
}

export async function maybeOrchestrateSalesChatResponse(
  input: MaybeAiOrchestrationInput,
): Promise<MaybeAiOrchestrationResult> {
  const decision = shouldAttemptOrchestration(input)
  if (!decision.shouldRun) {
    return {
      used: false,
      reason: decision.reason,
      promptVersion: AI_PROMPT_VERSION,
      orchestrationPath: "deterministic_fallback",
      fallbackReason: decision.fallbackReason,
    }
  }

  const baseURL = input.env.AI_GATEWAY_BASE_URL?.trim()
  const apiKey = input.env.AI_GATEWAY_API_KEY?.trim()
  const primaryModelId = input.env.AI_GATEWAY_MODEL?.trim()

  if (!input.gatewayConfigured || !baseURL || !apiKey || !primaryModelId) {
    return {
      used: false,
      reason: "disabled",
      promptVersion: AI_PROMPT_VERSION,
      orchestrationPath: "deterministic_fallback",
      fallbackReason: "gateway_not_configured",
    }
  }

  const selectedModelId = resolveGatewayModelId(input, primaryModelId)
  const timeoutMs = parsePositiveIntegerEnv(input.env.AI_GATEWAY_TIMEOUT_MS, DEFAULT_TIMEOUT_MS)
  const startedAt = Date.now()
  const sessionHash = createHash("sha256").update(input.sessionId).digest("hex").slice(0, 16)

  try {
    const gateway = createGateway({
      baseURL,
      apiKey,
    })

    const result = await generateText({
      model: gateway(selectedModelId),
      output: Output.object({
        schema: aiResponseSchema,
        name: "sales_chat_response",
        description: "Tailored sales-chat assistant response",
      }),
      temperature: getPrimaryGenerationTemperature(input),
      maxOutputTokens: 420,
      maxRetries: 2,
      timeout: timeoutMs,
      system: buildSystemPrompt(),
      prompt: buildUserPrompt(input),
      providerOptions: buildGatewayProviderOptions(input, sessionHash),
    })

    const latencyMs = Date.now() - startedAt
    const firstPass = result.output
    let assistantMessage = firstPass.assistantMessage.trim()
    let recommendedOffer = shouldKeepRecommendedOffer(firstPass.confidence)
      ? firstPass.recommendedOffer ?? undefined
      : undefined
    let fallbackToHuman = firstPass.fallbackToHuman ?? false
    const confidence = firstPass.confidence ?? undefined
    const intentHint = firstPass.intentHint ?? undefined
    let repairAttempted = false

    let guardrailCode = evaluateGuardrails(input, assistantMessage, recommendedOffer)

    if (guardrailCode) {
      repairAttempted = true
      try {
        const repaired = await generateText({
          model: gateway(selectedModelId),
          output: Output.object({
            schema: aiResponseSchema,
            name: "sales_chat_response_repair",
            description: "Guardrail-safe repaired sales-chat response",
          }),
          temperature: 0.15,
          maxOutputTokens: 420,
          maxRetries: 1,
          timeout: timeoutMs,
          system: buildSystemPrompt(),
          prompt: buildGuardrailRepairPrompt(input, assistantMessage, guardrailCode),
          providerOptions: buildGatewayProviderOptions(input, sessionHash),
        })

        assistantMessage = repaired.output.assistantMessage.trim()
        recommendedOffer = shouldKeepRecommendedOffer(repaired.output.confidence)
          ? repaired.output.recommendedOffer ?? recommendedOffer
          : recommendedOffer
        fallbackToHuman = repaired.output.fallbackToHuman ?? fallbackToHuman
      } catch (error) {
        maybeLogGatewayDebug(input, "repair", error, selectedModelId)
        return {
          used: false,
          reason: guardrailCode === "banned_phrase_blocked" ? "banned_phrase_blocked" : "guardrail_reject",
          guardrailCode,
          modelUsed: selectedModelId,
          latencyMs,
          latencyBucket: getLatencyBucket(latencyMs),
          promptVersion: AI_PROMPT_VERSION,
          repairAttempted,
          orchestrationPath: "deterministic_fallback",
          fallbackReason: "repair_call_failed",
        }
      }
    }

    guardrailCode = evaluateGuardrails(input, assistantMessage, recommendedOffer)

    if (guardrailCode) {
      return {
        used: false,
        reason: guardrailCode === "banned_phrase_blocked" ? "banned_phrase_blocked" : "guardrail_reject",
        guardrailCode,
        modelUsed: selectedModelId,
        latencyMs,
        latencyBucket: getLatencyBucket(latencyMs),
        promptVersion: AI_PROMPT_VERSION,
        repairAttempted,
        orchestrationPath: "deterministic_fallback",
        fallbackReason: "guardrail_rejected",
      }
    }

    return {
      used: true,
      assistantMessage,
      recommendedOffer,
      fallbackToHuman,
      reason: repairAttempted ? "repair_success" : decision.reason,
      modelUsed: selectedModelId,
      latencyMs,
      latencyBucket: getLatencyBucket(latencyMs),
      promptVersion: AI_PROMPT_VERSION,
      repairAttempted,
      orchestrationPath: repairAttempted ? "orchestrated_repair" : "orchestrated_primary",
      confidence,
      intentHint,
    }
  } catch (error) {
    maybeLogGatewayDebug(input, "generate", error, selectedModelId)
    const latencyMs = Date.now() - startedAt
    return {
      used: false,
      reason: "gateway_error",
      modelUsed: selectedModelId,
      latencyMs,
      latencyBucket: getLatencyBucket(latencyMs),
      promptVersion: AI_PROMPT_VERSION,
      orchestrationPath: "deterministic_fallback",
      fallbackReason: "gateway_generate_failed",
    }
  }
}

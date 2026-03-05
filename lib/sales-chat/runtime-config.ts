import { getSalesChatStateSecret } from "@/lib/sales-chat/state-token"

export type SalesChatAiResponseMode = "off" | "long_tail" | "broad"

export type SalesChatRuntimeConfig = {
  enabled: boolean
  aiFallbackEnabled: boolean
  aiResponseMode: SalesChatAiResponseMode
  aiResponseEnabled: boolean
  aiOrchestrationEnabled: boolean
  aiOrchestrationPercent: number
  aiOrchestrationCohort: string
  hasGatewayBaseUrl: boolean
  hasGatewayApiKey: boolean
  hasGatewayModel: boolean
  gatewayFallbackModels: string[]
  gatewayProviderOrder: string[]
  gatewayConfigured: boolean
  hasBookingUrl: boolean
  hasWebsiteOverhaulCheckoutUrl: boolean
  hasGrowthPartnershipSignupUrl: boolean
  ctaUrlsConfigured: boolean
  hasLeadsWebhookUrl: boolean
  hasLeadsWebhookSecret: boolean
  leadsWebhookConfigured: boolean
  stateSigningConfigured: boolean
  uiAvailable: boolean
  missingRequiredKeys: string[]
}

const REQUIRED_GATEWAY_KEYS = [
  "AI_GATEWAY_BASE_URL",
  "AI_GATEWAY_API_KEY",
  "AI_GATEWAY_MODEL",
] as const
const REQUIRED_CTA_KEYS = [
  "SALES_CHAT_BOOKING_URL",
  "SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL",
  "SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL",
] as const
const REQUIRED_LEAD_KEYS = [
  "SALES_CHAT_LEADS_WEBHOOK_URL",
  "SALES_CHAT_LEADS_WEBHOOK_SECRET",
] as const

export function parseBooleanEnv(value: string | undefined, fallback: boolean): boolean {
  if (!value) return fallback
  const normalized = value.trim().toLowerCase()
  if (["1", "true", "yes", "on"].includes(normalized)) return true
  if (["0", "false", "no", "off"].includes(normalized)) return false
  return fallback
}

function isConfigured(value: string | undefined): boolean {
  return Boolean(value?.trim())
}

function parseAiResponseMode(
  value: string | undefined,
  aiFallbackEnabled: boolean,
): SalesChatAiResponseMode {
  const normalized = value?.trim().toLowerCase()
  if (normalized === "off") return "off"
  if (normalized === "broad") return "broad"
  if (normalized === "long_tail") return "long_tail"
  return aiFallbackEnabled ? "broad" : "long_tail"
}

function parseCsvEnv(value: string | undefined): string[] {
  if (!value?.trim()) {
    return []
  }

  const unique = new Set<string>()
  for (const item of value.split(",")) {
    const cleaned = item.trim()
    if (cleaned) {
      unique.add(cleaned)
    }
  }
  return Array.from(unique)
}

function parsePercentageEnv(value: string | undefined, fallback: number): number {
  if (!value?.trim()) {
    return fallback
  }

  const parsed = Number.parseInt(value.trim(), 10)
  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return Math.max(0, Math.min(100, parsed))
}

function isFormspreeEndpoint(url: string | undefined): boolean {
  if (!url?.trim()) {
    return false
  }

  try {
    const parsed = new URL(url)
    const isFormspreeHost = /(^|\.)formspree\.io$/i.test(parsed.hostname)
    const isFormEndpoint = /^\/f\/[a-z0-9]+/i.test(parsed.pathname)
    return isFormspreeHost && isFormEndpoint
  } catch {
    return false
  }
}

export function getSalesChatRuntimeConfig(env: NodeJS.ProcessEnv): SalesChatRuntimeConfig {
  // Keep enabled default explicit because this controls whether the chat launcher is mounted.
  const enabled = parseBooleanEnv(env.SALES_CHAT_ENABLED, true)
  const aiFallbackEnabled = parseBooleanEnv(env.SALES_CHAT_AI_FALLBACK_ENABLED, false)
  const aiResponseMode = parseAiResponseMode(env.SALES_CHAT_AI_RESPONSE_MODE, aiFallbackEnabled)
  const aiResponseEnabled = aiFallbackEnabled && aiResponseMode !== "off"
  const aiOrchestrationEnabled = parseBooleanEnv(env.SALES_CHAT_AI_ORCHESTRATION_ENABLED, true)
  const aiOrchestrationPercent = parsePercentageEnv(env.SALES_CHAT_AI_ORCHESTRATION_PERCENT, 100)
  const aiOrchestrationCohort = env.SALES_CHAT_AI_ORCHESTRATION_COHORT?.trim() || "default"
  const hasGatewayBaseUrl = isConfigured(env.AI_GATEWAY_BASE_URL)
  const hasGatewayApiKey = isConfigured(env.AI_GATEWAY_API_KEY)
  const hasGatewayModel = isConfigured(env.AI_GATEWAY_MODEL)
  const gatewayFallbackModels = parseCsvEnv(env.AI_GATEWAY_FALLBACK_MODELS)
  const gatewayProviderOrder = parseCsvEnv(env.AI_GATEWAY_PROVIDER_ORDER)
  const gatewayConfigured = hasGatewayBaseUrl && hasGatewayApiKey && hasGatewayModel
  const hasBookingUrl = isConfigured(env.SALES_CHAT_BOOKING_URL)
  const hasWebsiteOverhaulCheckoutUrl = isConfigured(env.SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL)
  const hasGrowthPartnershipSignupUrl = isConfigured(env.SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL)
  const ctaUrlsConfigured = hasBookingUrl && hasWebsiteOverhaulCheckoutUrl && hasGrowthPartnershipSignupUrl
  const hasLeadsWebhookUrl = isConfigured(env.SALES_CHAT_LEADS_WEBHOOK_URL)
  const hasLeadsWebhookSecret = isConfigured(env.SALES_CHAT_LEADS_WEBHOOK_SECRET)
  const formspreeLeadsEndpoint = isFormspreeEndpoint(env.SALES_CHAT_LEADS_WEBHOOK_URL)
  const leadsWebhookConfigured = hasLeadsWebhookUrl && (formspreeLeadsEndpoint || hasLeadsWebhookSecret)
  const stateSigningConfigured = Boolean(getSalesChatStateSecret(env))

  const missingRequiredKeys: string[] = []
  if (enabled) {
    for (const key of REQUIRED_CTA_KEYS) {
      if (!isConfigured(env[key])) {
        missingRequiredKeys.push(key)
      }
    }

    if (!hasLeadsWebhookUrl) {
      missingRequiredKeys.push(REQUIRED_LEAD_KEYS[0])
    }
    if (!formspreeLeadsEndpoint && !hasLeadsWebhookSecret) {
      missingRequiredKeys.push(REQUIRED_LEAD_KEYS[1])
    }

    if (aiResponseEnabled) {
      for (const key of REQUIRED_GATEWAY_KEYS) {
        if (!isConfigured(env[key])) {
          missingRequiredKeys.push(key)
        }
      }
    }

    if (!stateSigningConfigured) {
      missingRequiredKeys.push("SALES_CHAT_STATE_SECRET")
    }
  }

  return {
    enabled,
    aiFallbackEnabled,
    aiResponseMode,
    aiResponseEnabled,
    aiOrchestrationEnabled,
    aiOrchestrationPercent,
    aiOrchestrationCohort,
    hasGatewayBaseUrl,
    hasGatewayApiKey,
    hasGatewayModel,
    gatewayFallbackModels,
    gatewayProviderOrder,
    gatewayConfigured,
    hasBookingUrl,
    hasWebsiteOverhaulCheckoutUrl,
    hasGrowthPartnershipSignupUrl,
    ctaUrlsConfigured,
    hasLeadsWebhookUrl,
    hasLeadsWebhookSecret,
    leadsWebhookConfigured,
    stateSigningConfigured,
    uiAvailable: enabled && ctaUrlsConfigured && stateSigningConfigured,
    missingRequiredKeys,
  }
}

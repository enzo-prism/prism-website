import fs from "node:fs"
import path from "node:path"

const PRODUCTION_ENV_FILE = path.join(process.cwd(), ".vercel", ".env.production.local")
const REQUIRED_GATEWAY_KEYS = ["AI_GATEWAY_BASE_URL", "AI_GATEWAY_API_KEY", "AI_GATEWAY_MODEL"] as const
const REQUIRED_CTA_KEYS = [
  "SALES_CHAT_BOOKING_URL",
  "SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL",
  "SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL",
] as const
const REQUIRED_LEAD_KEYS = [
  "SALES_CHAT_LEADS_WEBHOOK_URL",
  "SALES_CHAT_LEADS_WEBHOOK_SECRET",
] as const

function parseBooleanEnv(value: string | undefined, fallback: boolean): boolean {
  if (!value) return fallback
  const normalized = value.trim().toLowerCase()
  if (["1", "true", "yes", "on"].includes(normalized)) return true
  if (["0", "false", "no", "off"].includes(normalized)) return false
  return fallback
}

function parseAiResponseMode(
  value: string | undefined,
  aiFallbackEnabled: boolean,
): "off" | "long_tail" | "broad" {
  const normalized = value?.trim().toLowerCase()
  if (normalized === "off") return "off"
  if (normalized === "broad") return "broad"
  if (normalized === "long_tail") return "long_tail"
  return aiFallbackEnabled ? "broad" : "long_tail"
}

function parseEnvFile(content: string): Record<string, string> {
  const parsed: Record<string, string> = {}

  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) {
      continue
    }

    const separatorIndex = trimmed.indexOf("=")
    if (separatorIndex <= 0) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()
    const value = rawValue.replace(/^['"]|['"]$/g, "")
    parsed[key] = value
  }

  return parsed
}

function isFormspreeEndpoint(url: string | undefined): boolean {
  if (!url?.trim()) return false
  try {
    const parsed = new URL(url)
    const isFormspreeHost = /(^|\.)formspree\.io$/i.test(parsed.hostname)
    const isFormEndpoint = /^\/f\/[a-z0-9]+/i.test(parsed.pathname)
    return isFormspreeHost && isFormEndpoint
  } catch {
    return false
  }
}

function fail(message: string): never {
  console.error(`\n❌ ${message}\n`)
  process.exit(1)
}

function main() {
  console.log("🔎 Verifying production sales chat configuration...")

  if (!fs.existsSync(PRODUCTION_ENV_FILE)) {
    fail(
      `Missing ${PRODUCTION_ENV_FILE}. Run "vercel pull --yes --environment=production" before this check.`,
    )
  }

  const envContent = fs.readFileSync(PRODUCTION_ENV_FILE, "utf8")
  const env = parseEnvFile(envContent)
  const chatEnabled = parseBooleanEnv(env.SALES_CHAT_ENABLED, true)
  const aiFallbackEnabled = parseBooleanEnv(env.SALES_CHAT_AI_FALLBACK_ENABLED, false)
  const aiResponseMode = parseAiResponseMode(env.SALES_CHAT_AI_RESPONSE_MODE, aiFallbackEnabled)
  const aiResponseEnabled = aiFallbackEnabled && aiResponseMode !== "off"

  if (!chatEnabled) {
    console.log("✅ Sales chat is disabled for production. No gateway checks required.")
    return
  }

  const leadWebhookUrl = env.SALES_CHAT_LEADS_WEBHOOK_URL?.trim()
  const formspreeLeadsEndpoint = isFormspreeEndpoint(leadWebhookUrl)

  const requiredLeadKeys = [
    REQUIRED_LEAD_KEYS[0],
    ...(!formspreeLeadsEndpoint ? [REQUIRED_LEAD_KEYS[1]] : []),
  ]

  const requiredKeys = [
    ...REQUIRED_CTA_KEYS,
    ...requiredLeadKeys,
    ...(aiResponseEnabled ? [...REQUIRED_GATEWAY_KEYS] : []),
  ]
  const missingKeys = requiredKeys.filter((key) => !env[key]?.trim())
  if (missingKeys.length > 0) {
    console.error("Sales chat is enabled but required keys are missing:")
    for (const key of missingKeys) {
      console.error(`- ${key}`)
    }
    fail(
      "Add missing keys in Vercel env (production), run `vercel pull --yes --environment=production`, and retry.",
    )
  }

  if (!aiResponseEnabled) {
    console.log("ℹ️ AI response mode is effectively disabled; gateway variables are optional for deterministic mode.")
  }
  if (formspreeLeadsEndpoint) {
    console.log("ℹ️ Formspree lead endpoint detected; webhook secret is optional.")
  }
  console.log("✅ Sales chat config is production-ready.")
}

main()

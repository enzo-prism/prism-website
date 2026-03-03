import { getSalesChatRuntimeConfig, parseBooleanEnv } from "@/lib/sales-chat/runtime-config"

function createEnv(overrides: Partial<NodeJS.ProcessEnv>): NodeJS.ProcessEnv {
  return {
    NODE_ENV: "test",
    ...overrides,
  } as NodeJS.ProcessEnv
}

describe("sales chat runtime config", () => {
  it("returns uiAvailable=true when chat is enabled and deterministic CTA config is complete", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
    }))

    expect(runtime.enabled).toBe(true)
    expect(runtime.aiResponseMode).toBe("long_tail")
    expect(runtime.aiResponseEnabled).toBe(false)
    expect(runtime.ctaUrlsConfigured).toBe(true)
    expect(runtime.leadsWebhookConfigured).toBe(true)
    expect(runtime.uiAvailable).toBe(true)
    expect(runtime.missingRequiredKeys).toEqual([])
  })

  it("returns uiAvailable=false and missing keys when chat is enabled but CTA env is incomplete", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: " ",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
    }))

    expect(runtime.enabled).toBe(true)
    expect(runtime.ctaUrlsConfigured).toBe(false)
    expect(runtime.uiAvailable).toBe(false)
    expect(runtime.missingRequiredKeys).toEqual([
      "SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL",
      "SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL",
    ])
  })

  it("returns uiAvailable=false when chat is disabled even if CTA env exists", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "false",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
    }))

    expect(runtime.enabled).toBe(false)
    expect(runtime.ctaUrlsConfigured).toBe(true)
    expect(runtime.uiAvailable).toBe(false)
    expect(runtime.missingRequiredKeys).toEqual([])
  })

  it("requires gateway vars only when AI fallback is explicitly enabled", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_AI_FALLBACK_ENABLED: "true",
      SALES_CHAT_AI_RESPONSE_MODE: "broad",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
      AI_GATEWAY_BASE_URL: "",
      AI_GATEWAY_API_KEY: "",
      AI_GATEWAY_MODEL: "",
    }))

    expect(runtime.aiFallbackEnabled).toBe(true)
    expect(runtime.aiResponseMode).toBe("broad")
    expect(runtime.aiResponseEnabled).toBe(true)
    expect(runtime.missingRequiredKeys).toEqual([
      "AI_GATEWAY_BASE_URL",
      "AI_GATEWAY_API_KEY",
      "AI_GATEWAY_MODEL",
    ])
  })

  it("defaults to broad mode when AI fallback is enabled and mode is unset", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_AI_FALLBACK_ENABLED: "true",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
      AI_GATEWAY_BASE_URL: "https://gateway.vercel.ai/v1",
      AI_GATEWAY_API_KEY: "gateway-secret",
      AI_GATEWAY_MODEL: "openai/gpt-5-mini",
    }))

    expect(runtime.aiFallbackEnabled).toBe(true)
    expect(runtime.aiResponseMode).toBe("broad")
    expect(runtime.aiResponseEnabled).toBe(true)
  })

  it("allows forcing AI response mode off even when fallback flag is true", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_AI_FALLBACK_ENABLED: "true",
      SALES_CHAT_AI_RESPONSE_MODE: "off",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
    }))

    expect(runtime.aiFallbackEnabled).toBe(true)
    expect(runtime.aiResponseMode).toBe("off")
    expect(runtime.aiResponseEnabled).toBe(false)
    expect(runtime.missingRequiredKeys).toEqual([])
  })

  it("parses gateway fallback models and provider order lists", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_AI_FALLBACK_ENABLED: "true",
      SALES_CHAT_AI_RESPONSE_MODE: "long_tail",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "secret",
      AI_GATEWAY_BASE_URL: "https://gateway.vercel.ai/v1",
      AI_GATEWAY_API_KEY: "gateway-secret",
      AI_GATEWAY_MODEL: "openai/gpt-5-mini",
      AI_GATEWAY_FALLBACK_MODELS: "openai/gpt-5, openai/gpt-4.1-mini,openai/gpt-5",
      AI_GATEWAY_PROVIDER_ORDER: "openai, anthropic,openai",
    }))

    expect(runtime.aiResponseMode).toBe("long_tail")
    expect(runtime.gatewayFallbackModels).toEqual([
      "openai/gpt-5",
      "openai/gpt-4.1-mini",
    ])
    expect(runtime.gatewayProviderOrder).toEqual(["openai", "anthropic"])
  })

  it("allows Formspree lead endpoint without webhook secret", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://formspree.io/f/mvzbnydz",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "",
    }))

    expect(runtime.leadsWebhookConfigured).toBe(true)
    expect(runtime.missingRequiredKeys).toEqual([])
  })

  it("still requires webhook secret for non-Formspree lead endpoints", () => {
    const runtime = getSalesChatRuntimeConfig(createEnv({
      SALES_CHAT_ENABLED: "true",
      SALES_CHAT_BOOKING_URL: "https://cal.com/demo",
      SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL: "https://checkout.example.com/website",
      SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL: "https://checkout.example.com/growth",
      SALES_CHAT_LEADS_WEBHOOK_URL: "https://hooks.example.com/sales",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "",
    }))

    expect(runtime.leadsWebhookConfigured).toBe(false)
    expect(runtime.missingRequiredKeys).toEqual(["SALES_CHAT_LEADS_WEBHOOK_SECRET"])
  })

  it("keeps boolean parsing stable for common truthy/falsey values", () => {
    expect(parseBooleanEnv("YES", false)).toBe(true)
    expect(parseBooleanEnv("off", true)).toBe(false)
    expect(parseBooleanEnv(undefined, true)).toBe(true)
    expect(parseBooleanEnv("unknown", true)).toBe(true)
  })
})

import { createHmac, timingSafeEqual } from "node:crypto"

import type { SalesChatConversationState } from "@/lib/sales-chat/spec-v1-types"

const STATE_TOKEN_VERSION = 1
const STATE_TOKEN_MAX_AGE_MS = 1000 * 60 * 60 * 12

type SalesChatStateTokenEnvelope = {
  v: number
  iat: number
  sessionId: string
  state: SalesChatConversationState
}

export type SalesChatStateTokenValidationResult =
  | {
    ok: true
    state: SalesChatConversationState
  }
  | {
    ok: false
    reason:
      | "missing_secret"
      | "malformed_token"
      | "invalid_signature"
      | "invalid_payload"
      | "session_mismatch"
      | "expired"
  }

function encodeBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url")
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8")
}

function signTokenBody(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url")
}

function signaturesMatch(expected: string, provided: string): boolean {
  const expectedBuffer = Buffer.from(expected)
  const providedBuffer = Buffer.from(provided)

  if (expectedBuffer.length !== providedBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, providedBuffer)
}

export function getSalesChatStateSecret(env: NodeJS.ProcessEnv): string | null {
  const candidates = [
    env.SALES_CHAT_STATE_SECRET,
    env.SALES_CHAT_LEADS_WEBHOOK_SECRET,
    env.SALES_CHAT_EVENTS_WEBHOOK_SECRET,
    env.AI_GATEWAY_API_KEY,
    env.SUPABASE_SERVICE_ROLE_KEY,
    env.RESEND_API_KEY,
  ]

  for (const candidate of candidates) {
    const normalized = candidate?.trim()
    if (normalized) {
      return normalized
    }
  }

  return null
}

export function createSalesChatStateToken(args: {
  env: NodeJS.ProcessEnv
  sessionId: string
  state: SalesChatConversationState
}): string | null {
  const secret = getSalesChatStateSecret(args.env)
  if (!secret) {
    return null
  }

  const envelope: SalesChatStateTokenEnvelope = {
    v: STATE_TOKEN_VERSION,
    iat: Date.now(),
    sessionId: args.sessionId,
    state: args.state,
  }

  const body = encodeBase64Url(JSON.stringify(envelope))
  const signature = signTokenBody(body, secret)

  return `${body}.${signature}`
}

export function readSalesChatStateToken(args: {
  env: NodeJS.ProcessEnv
  sessionId: string
  token?: string
}): SalesChatStateTokenValidationResult {
  const token = args.token?.trim()
  const secret = getSalesChatStateSecret(args.env)

  if (!secret) {
    return { ok: false, reason: "missing_secret" }
  }

  if (!token) {
    return { ok: false, reason: "malformed_token" }
  }

  const [body, signature] = token.split(".")
  if (!body || !signature) {
    return { ok: false, reason: "malformed_token" }
  }

  const expectedSignature = signTokenBody(body, secret)
  if (!signaturesMatch(expectedSignature, signature)) {
    return { ok: false, reason: "invalid_signature" }
  }

  let envelope: SalesChatStateTokenEnvelope
  try {
    envelope = JSON.parse(decodeBase64Url(body)) as SalesChatStateTokenEnvelope
  } catch {
    return { ok: false, reason: "invalid_payload" }
  }

  if (
    envelope.v !== STATE_TOKEN_VERSION
    || typeof envelope.iat !== "number"
    || !envelope.sessionId
    || !envelope.state
  ) {
    return { ok: false, reason: "invalid_payload" }
  }

  if (envelope.sessionId !== args.sessionId) {
    return { ok: false, reason: "session_mismatch" }
  }

  if (Date.now() - envelope.iat > STATE_TOKEN_MAX_AGE_MS) {
    return { ok: false, reason: "expired" }
  }

  return {
    ok: true,
    state: envelope.state,
  }
}

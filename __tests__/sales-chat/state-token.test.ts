import { createInitialConversationState } from "@/lib/sales-chat/spec-v1-engine"
import {
  createSalesChatStateToken,
  getSalesChatStateSecret,
  readSalesChatStateToken,
} from "@/lib/sales-chat/state-token"

function createEnv(overrides: Partial<NodeJS.ProcessEnv> = {}): NodeJS.ProcessEnv {
  return {
    SALES_CHAT_STATE_SECRET: "state-secret",
    ...overrides,
  } as NodeJS.ProcessEnv
}

describe("sales chat state token", () => {
  it("round-trips a signed state token for the same session", () => {
    const state = createInitialConversationState()
    const token = createSalesChatStateToken({
      env: createEnv(),
      sessionId: "session-12345678",
      state,
    })

    expect(token).toBeTruthy()

    const parsed = readSalesChatStateToken({
      env: createEnv(),
      sessionId: "session-12345678",
      token: token ?? undefined,
    })

    expect(parsed).toEqual({
      ok: true,
      state,
    })
  })

  it("rejects tampered tokens", () => {
    const state = createInitialConversationState()
    const token = createSalesChatStateToken({
      env: createEnv(),
      sessionId: "session-12345678",
      state,
    }) as string

    const parsed = readSalesChatStateToken({
      env: createEnv(),
      sessionId: "session-12345678",
      token: `${token.slice(0, -1)}x`,
    })

    expect(parsed).toEqual({
      ok: false,
      reason: "invalid_signature",
    })
  })

  it("rejects tokens when session ids do not match", () => {
    const state = createInitialConversationState()
    const token = createSalesChatStateToken({
      env: createEnv(),
      sessionId: "session-12345678",
      state,
    })

    const parsed = readSalesChatStateToken({
      env: createEnv(),
      sessionId: "different-session",
      token: token ?? undefined,
    })

    expect(parsed).toEqual({
      ok: false,
      reason: "session_mismatch",
    })
  })

  it("falls back through existing server secrets when explicit chat state secret is absent", () => {
    expect(getSalesChatStateSecret(createEnv({
      SALES_CHAT_STATE_SECRET: "",
      SALES_CHAT_LEADS_WEBHOOK_SECRET: "lead-secret",
    }))).toBe("lead-secret")
  })
})

import { dispatchSalesChatLead } from "@/lib/sales-chat/lead-dispatch"
import type { SalesChatLeadPayload } from "@/lib/sales-chat/lead-payloads"

const originalEnv = process.env

function makeFreeAuditPayload(): SalesChatLeadPayload {
  return {
    lead_type: "free_audit",
    source_page: "/get-started",
    timestamp: new Date().toISOString(),
    routing: {
      slackChannel: "#sales-leads",
      notionCategory: "free_audit",
      priority: "low",
      emailTarget: "team@design-prism.com",
    },
    website_url: "https://example.com",
    business_type: "Dental / medical",
    pain_point: "Low lead volume",
    email: "owner@example.com",
    also_booked_call: false,
    chat_transcript_summary: "website=https://example.com",
  }
}

describe("dispatchSalesChatLead", () => {
  const fetchMock = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    process.env = { ...originalEnv }
    global.fetch = fetchMock as unknown as typeof fetch
    fetchMock.mockResolvedValue({
      ok: true,
    } as Response)
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it("sends flattened JSON payload to Formspree without requiring webhook secret", async () => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_URL = "https://formspree.io/f/mvzbnydz"
    delete process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET

    await dispatchSalesChatLead(makeFreeAuditPayload())

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe("https://formspree.io/f/mvzbnydz")
    expect(init.method).toBe("POST")
    expect(init.headers).toMatchObject({
      "Content-Type": "application/json",
      Accept: "application/json",
    })

    const body = JSON.parse(String(init.body))
    expect(body.lead_type).toBe("free_audit")
    expect(body.website_url).toBe("https://example.com")
    expect(body.email).toBe("owner@example.com")
    expect(body._replyto).toBe("owner@example.com")
    expect(body._subject).toBe("Sales chat lead: free_audit")
  })

  it("requires webhook secret for non-Formspree endpoints", async () => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_URL = "https://hooks.example.com/sales"
    delete process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET

    await expect(dispatchSalesChatLead(makeFreeAuditPayload()))
      .rejects
      .toThrow("Sales chat lead webhook secret is missing for non-Formspree endpoint.")
  })
})

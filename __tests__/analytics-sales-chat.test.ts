describe("Sales chat analytics events", () => {
  it("maps sales chat lifecycle and funnel events to analytics payloads", async () => {
    jest.resetModules()
    const originalNodeEnv = process.env.NODE_ENV
    const mutableEnv = process.env as Record<string, string | undefined>
    mutableEnv.NODE_ENV = "production"

    try {
      const analytics = await import("@/utils/analytics")

      window.history.pushState({}, "", "/get-started")
      document.title = "Get started | Prism"
      window.dataLayer = []
      window.gtag = jest.fn()

      analytics.trackSalesChatOpen({ sourcePage: "/get-started" })
      analytics.trackSalesChatLauncherClick({ sourcePage: "/get-started", mode: "desktop-popup" })
      analytics.trackSalesChatOpenMode({ sourcePage: "/get-started", mode: "desktop-popup" })
      analytics.trackSalesChatWelcomeSeen({ sourcePage: "/get-started" })
      analytics.trackSalesChatMessageSent({
        sourcePage: "/get-started",
        messageLength: 42,
        sessionId: "session-1",
      })
      analytics.trackSalesChatFitFlowStarted({
        sourcePage: "/get-started",
        sessionId: "session-1",
      })
      analytics.trackSalesChatFitFlowStepAnswered({
        sourcePage: "/get-started",
        sessionId: "session-1",
        stepId: "timeline",
        answer: "ASAP",
      })
      analytics.trackSalesChatFitFlowCompleted({
        sourcePage: "/get-started",
        sessionId: "session-1",
        qualificationSnapshot: "Owner, dental practice, timeline ASAP",
      })
      analytics.trackSalesChatDemoCtaShown({
        sourcePage: "/get-started",
        sessionId: "session-1",
      })
      analytics.trackSalesChatDemoCtaClicked({
        sourcePage: "/get-started",
        sessionId: "session-1",
        trigger: "cta",
      })
      analytics.trackSalesChatCalendarOpened({
        sourcePage: "/get-started",
        sessionId: "session-1",
        trigger: "cta",
      })
      analytics.trackSalesChatDemoBooked({
        sourcePage: "/get-started",
        sessionId: "session-1",
      })
      analytics.trackSalesChatStateChanged({
        sourcePage: "/get-started",
        sessionId: "session-1",
        stateTransition: "MEETING_BOOKED",
        qualificationSnapshot: "Owner, dental practice, timeline ASAP",
      })
      analytics.trackSalesChatFaqAnswered({
        sourcePage: "/get-started",
        sessionId: "session-1",
      })
      analytics.trackSalesChatCsatSubmitted({
        sourcePage: "/get-started",
        sessionId: "session-1",
        value: "up",
      })
      analytics.trackSalesChatQuickReplyClicked({
        sourcePage: "/get-started",
        sessionId: "session-1",
        replyId: "starter_free_audit",
        replyLabel: "Get a free audit of my website",
        actionType: "reply",
        nodeId: "welcome",
      })
      analytics.trackSalesChatSpecNodeEntered({
        sourcePage: "/get-started",
        sessionId: "session-1",
        nodeId: "intent_b_pitch",
        exchangeCount: 1,
      })
      analytics.trackSalesChatOfferRecommended({
        sourcePage: "/get-started",
        sessionId: "session-1",
        nodeId: "intent_b_pitch",
        recommendedOffer: "free_audit",
      })
      analytics.trackSalesChatAiResponseUsed({
        sourcePage: "/get-started",
        sessionId: "session-1",
        nodeId: "intent_b_pitch",
        responseMode: "ai_assisted",
        aiDecisionReason: "broad_mode",
        aiModelUsed: "openai/gpt-5-mini",
        aiLatencyMs: 321,
      })
      analytics.trackSalesChatAiResponseRejected({
        sourcePage: "/get-started",
        sessionId: "session-1",
        nodeId: "intent_b_pitch",
        responseMode: "deterministic",
        aiDecisionReason: "guardrail_reject",
        aiModelUsed: "openai/gpt-5-mini",
        aiLatencyMs: 412,
      })
      analytics.trackSalesChatLeadPayloadAttempted({
        sourcePage: "/get-started",
        sessionId: "session-1",
        terminalAction: "emit_free_audit",
        leadDispatchStatus: "failed",
        leadDispatchCode: "webhook_http_error",
      })
      analytics.trackSalesChatLeadPayloadFailed({
        sourcePage: "/get-started",
        sessionId: "session-1",
        terminalAction: "emit_free_audit",
        leadDispatchCode: "webhook_http_error",
      })
      analytics.trackSalesChatError({
        sourcePage: "/get-started",
        errorType: "provider_fail",
        sessionId: "session-1",
        details: { status: 503 },
      })

      const events = (window.dataLayer ?? []).map((entry) => String(entry.event))

      expect(events).toContain("sales_chat_open")
      expect(events).toContain("sales_chat_fit_flow_completed")
      expect(events).toContain("sales_chat_state_changed")
      expect(events).toContain("sales_chat_csat_submitted")
      expect(events).toContain("sales_chat_quick_reply_clicked")
      expect(events).toContain("sales_chat_spec_node_entered")
      expect(events).toContain("sales_chat_offer_recommended")
      expect(events).toContain("sales_chat_ai_response_used")
      expect(events).toContain("sales_chat_ai_response_rejected")
      expect(events).toContain("sales_chat_lead_payload_attempted")
      expect(events).toContain("sales_chat_lead_payload_failed")
      expect(events).toContain("sales_chat_error")
    } finally {
      mutableEnv.NODE_ENV = originalNodeEnv
    }
  })
})

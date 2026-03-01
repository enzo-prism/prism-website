describe("Sales chat analytics events", () => {
  it("maps sales chat lifecycle and funnel events to analytics payloads", async () => {
    jest.resetModules()
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "production"

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
      expect(events).toContain("sales_chat_error")
    } finally {
      process.env.NODE_ENV = originalNodeEnv
    }
  })
})

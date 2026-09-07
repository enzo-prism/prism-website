import { act, renderHook } from '@testing-library/react'
import { useIntakeWebMCP } from '@/hooks/use-intake-webmcp'

const valid = {
  why: 'more_customers',
  timeline: 'next_week',
  hasWebsite: 'yes',
  siteLink: 'example.com',
  contactMethod: 'email',
  email: 'owner@example.com',
}
const goals = ['more_customers', 'better_design']

describe('useIntakeWebMCP', () => {
  const registerTool = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: { registerTool },
    })
  })
  afterEach(() => {
    delete (document as Document & { modelContext?: unknown }).modelContext
    delete (navigator as Navigator & { modelContext?: unknown }).modelContext
  })

  it.each(['website', 'content', 'ads'] as const)(
    'prepares %s for review without submitting',
    async (service) => {
      const onPrepare = jest.fn()
      const fetchSpy = jest.spyOn(global, 'fetch')
      renderHook(() => useIntakeWebMCP({ service, goals, onPrepare }))
      const tool = registerTool.mock.calls[0][0]
      expect(tool.name).toBe(`prepare_${service}_intake`)
      expect(tool.inputSchema.properties.why.enum).toEqual(goals)
      let result
      await act(async () => {
        result = await tool.execute(valid)
      })
      expect(result).toMatchObject({
        status: 'ready_for_review',
        submitted: false,
      })
      expect(onPrepare).toHaveBeenCalledWith(
        expect.objectContaining({
          siteLink: 'https://example.com/',
          email: valid.email,
          phone: '',
        }),
      )
      expect(fetchSpy).not.toHaveBeenCalled()
      fetchSpy.mockRestore()
    },
  )

  it.each([
    { why: 'invalid' },
    { timeline: 'tomorrow' },
    { hasWebsite: true },
    { contactMethod: 'call' },
    { siteLink: 'javascript:alert(1)' },
    { siteLink: 'https://user:password@example.com' },
    { siteLink: 'a'.repeat(501) },
    { email: 'invalid' },
    { email: 'a'.repeat(255) },
    { contactMethod: 'text', phone: '123' },
    { source: 'unknown' },
    { arbitrary: 'value' },
  ])(
    'rejects invalid input without changing the form: %o',
    async (override) => {
      const onPrepare = jest.fn()
      renderHook(() =>
        useIntakeWebMCP({ service: 'website', goals, onPrepare }),
      )
      const result = await registerTool.mock.calls[0][0].execute({
        ...valid,
        ...override,
      })
      expect(result).toMatchObject({ status: 'error', submitted: false })
      expect(onPrepare).not.toHaveBeenCalled()
    },
  )

  it('uses latest callback and aborts registration on unmount', async () => {
    const initial = jest.fn()
    const latest = jest.fn()
    const { rerender, unmount } = renderHook(
      ({ onPrepare }) =>
        useIntakeWebMCP({ service: 'website', goals, onPrepare }),
      { initialProps: { onPrepare: initial } },
    )
    const [tool, { signal }] = registerTool.mock.calls[0]
    rerender({ onPrepare: latest })
    await act(async () => {
      await tool.execute(valid)
    })
    expect(registerTool).toHaveBeenCalledTimes(1)
    expect(initial).not.toHaveBeenCalled()
    expect(latest).toHaveBeenCalledTimes(1)
    unmount()
    expect(signal.aborted).toBe(true)
    expect(await tool.execute(valid)).toMatchObject({ status: 'cancelled' })
    expect(latest).toHaveBeenCalledTimes(1)
  })

  it('falls back to early navigator builds and unregisters on cleanup', () => {
    delete (document as Document & { modelContext?: unknown }).modelContext
    const unregisterTool = jest.fn()
    Object.defineProperty(navigator, 'modelContext', {
      configurable: true,
      value: { registerTool, unregisterTool },
    })
    const { unmount } = renderHook(() =>
      useIntakeWebMCP({ service: 'ads', goals, onPrepare: jest.fn() }),
    )
    expect(registerTool).toHaveBeenCalledTimes(1)
    unmount()
    expect(unregisterTool).toHaveBeenCalledWith('prepare_ads_intake')
  })

  it('does not register when disabled or unsupported', () => {
    const { unmount } = renderHook(() =>
      useIntakeWebMCP({
        service: 'website',
        goals,
        onPrepare: jest.fn(),
        enabled: false,
      }),
    )
    expect(registerTool).not.toHaveBeenCalled()
    unmount()
    delete (document as Document & { modelContext?: unknown }).modelContext
    expect(() =>
      renderHook(() =>
        useIntakeWebMCP({ service: 'website', goals, onPrepare: jest.fn() }),
      ),
    ).not.toThrow()
  })

  it('gracefully handles rejected registration and cancelled execution', async () => {
    registerTool.mockRejectedValueOnce(new Error('unsupported'))
    renderHook(() =>
      useIntakeWebMCP({ service: 'website', goals, onPrepare: jest.fn() }),
    )
    const controller = new AbortController()
    controller.abort()
    expect(
      await registerTool.mock.calls[0][0].execute(valid, {
        signal: controller.signal,
      }),
    ).toMatchObject({ status: 'cancelled', submitted: false })
  })
})

import { fireEvent, render, screen } from '@testing-library/react'

import ChatGptAdsAccess from '@/components/chatgpt-ads/ChatGptAdsAccess'

const searchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
}))

const trackEvent = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackEvent: (...args: unknown[]) => trackEvent(...args),
  trackLinkInteraction: jest.fn(),
}))

describe('ChatGptAdsAccess', () => {
  beforeEach(() => {
    searchParams.delete('code')
    window.sessionStorage.clear()
    document.cookie = 'prism_chatgpt_ads_invite=; max-age=0; path=/'
    trackEvent.mockReset()
  })

  it('keeps booking hidden until a valid code is entered', async () => {
    render(<ChatGptAdsAccess />)

    expect(
      screen.getByRole('heading', { name: /this program is invite only/i }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/invite code/i)).toHaveAttribute('name', 'code')
    expect(
      screen.queryByRole('link', { name: /book your setup call/i }),
    ).not.toBeInTheDocument()

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'That code is not recognized.' }),
    }) as unknown as typeof fetch

    fireEvent.change(screen.getByLabelText(/invite code/i), {
      target: { value: 'wrong' },
    })
    fireEvent.click(screen.getByRole('button', { name: /unlock/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /not recognized/i,
    )
    expect(
      screen.queryByRole('link', { name: /book your setup call/i }),
    ).not.toBeInTheDocument()
  })

  it('unlocks booking after a valid code', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        invite: { partnerId: 'michael', invitedBy: 'Dr. Michael Njo' },
      }),
    }) as unknown as typeof fetch

    render(<ChatGptAdsAccess />)

    fireEvent.change(screen.getByLabelText(/invite code/i), {
      target: { value: 'michael' },
    })
    fireEvent.click(screen.getByRole('button', { name: /unlock/i }))

    expect(
      await screen.findByRole('heading', { name: /you're in/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/invited by dr. michael njo/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /book your setup call/i }),
    ).toHaveAttribute('href', expect.stringContaining('calendar.notion.so'))
  })

  it('auto-unlocks from the code query param', async () => {
    searchParams.set('code', 'michael')
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        invite: { partnerId: 'michael', invitedBy: 'Dr. Michael Njo' },
      }),
    }) as unknown as typeof fetch

    render(<ChatGptAdsAccess />)

    expect(
      await screen.findByRole('heading', { name: /you're in/i }),
    ).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/chatgpt-ads/unlock',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ code: 'michael' }),
      }),
    )
  })
})

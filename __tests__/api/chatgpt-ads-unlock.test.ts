import { POST } from '@/app/api/chatgpt-ads/unlock/route'
import { CHATGPT_ADS_COOKIE } from '@/lib/chatgpt-ads'

function requestWithCode(code: unknown, ip = '203.0.113.10') {
  return new Request('https://www.design-prism.com/api/chatgpt-ads/unlock', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify({ code }),
  })
}

describe('POST /api/chatgpt-ads/unlock', () => {
  it('unlocks a valid partner code', async () => {
    const response = await POST(requestWithCode('michael'))
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload).toEqual({
      ok: true,
      invite: { partnerId: 'michael', invitedBy: 'Dr. Michael Njo' },
    })
    expect(response.headers.get('set-cookie')).toContain(CHATGPT_ADS_COOKIE)
  })

  it('rejects an invalid code', async () => {
    const response = await POST(requestWithCode('nope', '203.0.113.11'))
    const payload = await response.json()

    expect(response.status).toBe(401)
    expect(payload.ok).toBe(false)
  })
})

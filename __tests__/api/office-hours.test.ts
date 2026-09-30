/** @jest-environment node */
import {
  GET,
  POST as unlock,
  DELETE as signOut,
} from '@/app/api/office-hours/access/route'
import { POST as register } from '@/app/api/office-hours/register/route'
import {
  createOfficeHoursSession,
  OFFICE_HOURS_COOKIE,
  verifyOfficeHoursRegistration,
} from '@/lib/office-hours-access'

const origin = 'https://www.design-prism.com'
const code = 'test-approved-office-hours'
const savedEnv = { ...process.env }
let ip = 100
const fetchMock = jest.fn()

function request(
  path: string,
  body?: unknown,
  options: {
    origin?: string | null
    cookie?: string
    method?: string
    headers?: Record<string, string>
  } = {},
) {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-forwarded-for': `203.0.113.${ip++}`,
    ...options.headers,
  }
  if (options.origin !== null) headers.origin = options.origin ?? origin
  if (options.cookie) headers.cookie = options.cookie
  return new Request(`${origin}/api/office-hours/${path}`, {
    method: options.method ?? 'POST',
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}
function cookie() {
  return `${OFFICE_HOURS_COOKIE}=${createOfficeHoursSession()}`
}
function attendee(sessionId = '2026-10-04') {
  return {
    firstName: 'Zoë',
    lastName: 'O’Connor',
    email: 'zoe@example.com',
    sessionId,
    message: 'Review my project\nand growth plan.',
  }
}

beforeEach(() => {
  process.env.OFFICE_HOURS_ACCESS_CODE = code
  process.env.OFFICE_HOURS_SESSION_SECRET =
    'unit-test-secret-only-012345678901234567890123456789'
  delete process.env.OFFICE_HOURS_REGISTRATION_ENDPOINT
  delete process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT
  fetchMock.mockReset().mockResolvedValue(new Response('{}', { status: 200 }))
  global.fetch = fetchMock
  jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-09-30T21:00:00Z'))
  // The schedule defaults to new Date(), so freeze Date with fake timers too.
  jest
    .useFakeTimers({ doNotFake: ['nextTick', 'setImmediate', 'setTimeout'] })
    .setSystemTime(new Date('2026-09-30T21:00:00Z'))
})
afterEach(() => {
  jest.useRealTimers()
  jest.restoreAllMocks()
})
afterAll(() => {
  process.env = savedEnv
})

describe('approval access API', () => {
  it('unlocks privately and issues an HttpOnly signed cookie', async () => {
    const response = await unlock(request('access', { code }))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, approved: true })
    const setCookie = response.headers.get('set-cookie')!
    expect(setCookie).toContain('HttpOnly; SameSite=Strict')
    expect(setCookie).toContain('Path=/api/office-hours')
    expect(setCookie).not.toContain(code)
    const status = await GET(
      request('access', undefined, {
        method: 'GET',
        cookie: setCookie.split(';')[0],
      }),
    )
    expect(await status.json()).toEqual({ ok: true, approved: true })
    expect(status.headers.get('cache-control')).toBe('no-store')
  })
  it('rejects wrong codes, missing configuration, and external or missing origins', async () => {
    expect((await unlock(request('access', { code: 'wrong' }))).status).toBe(
      401,
    )
    expect(
      (
        await unlock(
          request('access', { code }, { origin: 'https://evil.example' }),
        )
      ).status,
    ).toBe(403)
    expect(
      (await unlock(request('access', { code }, { origin: null }))).status,
    ).toBe(403)
    delete process.env.OFFICE_HOURS_SESSION_SECRET
    expect((await unlock(request('access', { code }))).status).toBe(503)
    expect(
      await (
        await GET(
          request('access', undefined, { method: 'GET', cookie: cookie() }),
        )
      ).json(),
    ).toEqual({ ok: true, approved: false })
  })
  it('invalidates local access and rejects cross-origin sign-out', async () => {
    const response = await signOut(
      request('access', undefined, { method: 'DELETE' }),
    )
    expect(response.headers.get('set-cookie')).toContain('Max-Age=0')
    expect(await response.json()).toEqual({ ok: true, approved: false })
    expect(
      (
        await signOut(
          request('access', undefined, {
            method: 'DELETE',
            origin: 'https://evil.example',
          }),
        )
      ).status,
    ).toBe(403)
  })
  it('limits body size even when no content length was sent', async () => {
    expect(
      (await unlock(request('access', { code: 'x'.repeat(9000) }))).status,
    ).toBe(413)
    expect(
      (
        await unlock(
          request(
            'access',
            { code },
            { headers: { 'content-length': '9000' } },
          ),
        )
      ).status,
    ).toBe(413)
    expect(
      (
        await unlock(
          request(
            'access',
            { code },
            { headers: { 'content-type': 'text/plain' } },
          ),
        )
      ).status,
    ).toBe(415)
  })
  it('limits repeated code guesses from one client', async () => {
    for (let attempt = 0; attempt < 12; attempt += 1)
      expect(
        (
          await unlock(
            request(
              'access',
              { code: 'wrong' },
              { headers: { 'x-forwarded-for': '198.51.100.250' } },
            ),
          )
        ).status,
      ).toBe(401)
    expect(
      (
        await unlock(
          request(
            'access',
            { code },
            { headers: { 'x-forwarded-for': '198.51.100.250' } },
          ),
        )
      ).status,
    ).toBe(429)
  })
})

describe('approved registration API', () => {
  it('requires valid approval and same origin before contacting Formspree', async () => {
    expect((await register(request('register', attendee()))).status).toBe(401)
    expect(
      (
        await register(
          request('register', attendee(), {
            cookie: `${OFFICE_HOURS_COOKIE}=forged`,
          }),
        )
      ).status,
    ).toBe(401)
    expect(
      (
        await register(
          request('register', attendee(), {
            cookie: cookie(),
            origin: 'https://evil.example',
          }),
        )
      ).status,
    ).toBe(403)
    const expired = createOfficeHoursSession(Date.parse('2026-08-01T00:00:00Z'))
    expect(
      (
        await register(
          request('register', attendee(), {
            cookie: `${OFFICE_HOURS_COOKIE}=${expired}`,
          }),
        )
      ).status,
    ).toBe(401)
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('forwards only validated contact and server-owned schedule metadata', async () => {
    const response = await register(
      request(
        'register',
        {
          ...attendee(),
          approvedAttendee: 'forged',
          sessionStartUtc: 'forged',
        },
        { cookie: cookie() },
      ),
    )
    expect(response.status).toBe(200)
    const result = await response.json()
    expect(result.session.id).toBe('2026-10-04')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [endpoint, init] = fetchMock.mock.calls[0]
    expect(endpoint).toBe('https://formspree.io/f/xjkjbpdb')
    expect(JSON.parse(init.body)).toMatchObject({
      firstName: 'Zoë',
      lastName: 'O’Connor',
      sessionDate: '2026-10-04',
      sessionStartUtc: '2026-10-04T17:00:00.000Z',
      sessionEndUtc: '2026-10-04T18:00:00.000Z',
      timeZone: 'America/Los_Angeles',
      approvedAttendee: 'yes',
    })
    const providerRecord = JSON.parse(init.body)
    expect(providerRecord.registrationIssuedAt).toBe('2026-09-30T21:00:00.000Z')
    const verificationRecord = {
      firstName: providerRecord.firstName,
      lastName: providerRecord.lastName,
      email: providerRecord.email,
      sessionId: providerRecord.sessionDate,
      issuedAt: providerRecord.registrationIssuedAt,
    }
    expect(
      verifyOfficeHoursRegistration(
        verificationRecord,
        providerRecord.registrationSignature,
      ),
    ).toBe(true)
    expect(
      verifyOfficeHoursRegistration(
        { ...verificationRecord, email: 'forged@example.com' },
        providerRecord.registrationSignature,
      ),
    ).toBe(false)
    expect(result).not.toHaveProperty('registrationSignature')
    expect(init.body).not.toContain(code)
  })
  it('rejects past, non-Sunday, distant, and just-started sessions', async () => {
    for (const sessionId of ['2026-09-27', '2026-10-05', '2027-10-03'])
      expect(
        (
          await register(
            request('register', attendee(sessionId), { cookie: cookie() }),
          )
        ).status,
      ).toBe(400)
    jest.setSystemTime(new Date('2026-10-04T17:00:00Z'))
    const response = await register(
      request('register', attendee(), { cookie: cookie() }),
    )
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ code: 'session_unavailable' })
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('rejects malformed input and unsafe endpoint configuration', async () => {
    for (const body of [
      { ...attendee(), email: 'bad' },
      { ...attendee(), firstName: '' },
      { ...attendee(), lastName: 'x'.repeat(81) },
      { ...attendee(), firstName: 'Name\r\nSubject: injected' },
      { ...attendee(), message: 'x'.repeat(2001) },
    ])
      expect(
        (await register(request('register', body, { cookie: cookie() })))
          .status,
      ).toBe(400)
    for (const endpoint of [
      'https://evil.example/f/test',
      'http://formspree.io/f/test',
      'https://user:pass@formspree.io/f/test',
    ]) {
      process.env.OFFICE_HOURS_REGISTRATION_ENDPOINT = endpoint
      expect(
        (await register(request('register', attendee(), { cookie: cookie() })))
          .status,
      ).toBe(503)
    }
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('reports provider errors so the form can retry without pretending success', async () => {
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 429 }))
    expect(
      (await register(request('register', attendee(), { cookie: cookie() })))
        .status,
    ).toBe(502)
    fetchMock.mockRejectedValueOnce(new Error('network timeout'))
    expect(
      (await register(request('register', attendee(), { cookie: cookie() })))
        .status,
    ).toBe(502)
    expect(
      (await register(request('register', attendee(), { cookie: cookie() })))
        .status,
    ).toBe(200)
  })
})

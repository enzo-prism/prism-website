/** @jest-environment node */
import {
  createOfficeHoursSession,
  getOfficeHoursConfig,
  verifyOfficeHoursCode,
  verifyOfficeHoursSession,
  OFFICE_HOURS_SESSION_MAX_AGE,
} from '@/lib/office-hours-access'

const code = 'test-approved-office-hours'
const secret = 'unit-test-secret-only-012345678901234567890123456789'
const savedEnv = { ...process.env }

beforeEach(() => {
  process.env.OFFICE_HOURS_ACCESS_CODE = code
  process.env.OFFICE_HOURS_SESSION_SECRET = secret
})
afterAll(() => {
  process.env = savedEnv
})

describe('office hours approval session', () => {
  it('checks the private code without case-insensitive guessability', () => {
    expect(verifyOfficeHoursCode(code)).toBe(true)
    expect(verifyOfficeHoursCode(` ${code} `)).toBe(true)
    expect(verifyOfficeHoursCode(code.toUpperCase())).toBe(false)
    expect(verifyOfficeHoursCode('wrong')).toBe(false)
  })
  it('requires sufficiently strong server configuration', () => {
    delete process.env.OFFICE_HOURS_SESSION_SECRET
    expect(getOfficeHoursConfig()).toBeNull()
    expect(createOfficeHoursSession()).toBeNull()
    process.env.OFFICE_HOURS_SESSION_SECRET = 'short'
    expect(verifyOfficeHoursCode(code)).toBe(false)
    process.env.OFFICE_HOURS_SESSION_SECRET = secret
    process.env.OFFICE_HOURS_ACCESS_CODE = 'short'
    expect(getOfficeHoursConfig()).toBeNull()
  })
  it('accepts a signed current session and expires it exactly at thirty days', () => {
    const now = Date.parse('2026-10-01T00:00:00Z')
    const token = createOfficeHoursSession(now)
    expect(verifyOfficeHoursSession(token, now)).toBe(true)
    expect(
      verifyOfficeHoursSession(
        token,
        now + OFFICE_HOURS_SESSION_MAX_AGE * 1000 - 1,
      ),
    ).toBe(true)
    expect(
      verifyOfficeHoursSession(
        token,
        now + OFFICE_HOURS_SESSION_MAX_AGE * 1000,
      ),
    ).toBe(false)
    expect(verifyOfficeHoursSession(token, now - 1000)).toBe(false)
  })
  it('rejects tampering, malformed values, and credentials rotated after approval', () => {
    const token = createOfficeHoursSession()!
    const [payload, signature] = token.split('.')
    expect(
      verifyOfficeHoursSession(
        `${payload[0] === 'A' ? 'B' : 'A'}${payload.slice(1)}.${signature}`,
      ),
    ).toBe(false)
    expect(
      verifyOfficeHoursSession(
        `${payload}.${signature[0] === 'A' ? 'B' : 'A'}${signature.slice(1)}`,
      ),
    ).toBe(false)
    expect(verifyOfficeHoursSession('eyJhcHByb3ZlZCI6dHJ1ZX0')).toBe(false)
    expect(verifyOfficeHoursSession(`${token}.extra`)).toBe(false)
    process.env.OFFICE_HOURS_ACCESS_CODE = 'new-approved-office-code'
    expect(verifyOfficeHoursSession(token)).toBe(false)
    process.env.OFFICE_HOURS_ACCESS_CODE = code
    process.env.OFFICE_HOURS_SESSION_SECRET = `${secret}-rotated`
    expect(verifyOfficeHoursSession(token)).toBe(false)
  })
})

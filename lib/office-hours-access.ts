import 'server-only'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import {
  createRegistrationSignature,
  verifyRegistrationSignature,
  type OfficeHoursRegistrationRecord,
} from './office-hours-registration'

export const OFFICE_HOURS_COOKIE = 'prism_office_hours_access'
export const OFFICE_HOURS_SESSION_MAX_AGE = 30 * 24 * 60 * 60
const MAX_BODY_BYTES = 8192
const WINDOW_MS = 10 * 60 * 1000
// Process-local abuse protection. This is not a distributed identity/rate-limit store.
const attempts = new Map<string, { count: number; resetAt: number }>()

export function getOfficeHoursConfig() {
  const code = process.env.OFFICE_HOURS_ACCESS_CODE?.trim()
  const secret = process.env.OFFICE_HOURS_SESSION_SECRET?.trim()
  if (
    !code ||
    code.length < 8 ||
    code.length > 128 ||
    !secret ||
    secret.length < 32
  )
    return null
  return { code, secret }
}

function equalStrings(left: string, right: string) {
  return timingSafeEqual(
    createHash('sha256').update(left).digest(),
    createHash('sha256').update(right).digest(),
  )
}

export function verifyOfficeHoursCode(code: string) {
  const config = getOfficeHoursConfig()
  return Boolean(config && equalStrings(code.trim(), config.code))
}

function codeVersion(code: string) {
  return createHash('sha256').update(code).digest('hex').slice(0, 32)
}

export function createOfficeHoursSession(now = Date.now()) {
  const config = getOfficeHoursConfig()
  if (!config) return null
  const payload = Buffer.from(
    JSON.stringify({
      v: 1,
      exp: Math.floor(now / 1000) + OFFICE_HOURS_SESSION_MAX_AGE,
      codeVersion: codeVersion(config.code),
    }),
  ).toString('base64url')
  const signature = createHmac('sha256', config.secret)
    .update(payload)
    .digest('base64url')
  return `${payload}.${signature}`
}

export function verifyOfficeHoursSession(
  value: string | null | undefined,
  now = Date.now(),
) {
  const config = getOfficeHoursConfig()
  if (!config || !value || value.length > 1024) return false
  const pieces = value.split('.')
  if (
    pieces.length !== 2 ||
    !pieces.every((part) => /^[A-Za-z0-9_-]+$/.test(part))
  )
    return false
  const [payload, signature] = pieces
  const expected = createHmac('sha256', config.secret)
    .update(payload)
    .digest('base64url')
  if (!equalStrings(signature, expected)) return false
  try {
    const session = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    )
    const currentSeconds = Math.floor(now / 1000)
    return (
      session.v === 1 &&
      Number.isInteger(session.exp) &&
      session.exp > currentSeconds &&
      session.exp <= currentSeconds + OFFICE_HOURS_SESSION_MAX_AGE &&
      session.codeVersion === codeVersion(config.code)
    )
  } catch {
    return false
  }
}

export function requestHasOfficeHoursAccess(request: Request) {
  const cookie = request.headers
    .get('cookie')
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${OFFICE_HOURS_COOKIE}=`))
  return verifyOfficeHoursSession(cookie?.slice(OFFICE_HOURS_COOKIE.length + 1))
}

export function officeHoursCookie(
  value: string,
  maxAge = OFFICE_HOURS_SESSION_MAX_AGE,
) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${OFFICE_HOURS_COOKIE}=${value}; Path=/api/office-hours; Max-Age=${maxAge}; HttpOnly; SameSite=Strict${secure}`
}

export function officeHoursJson(body: unknown, status = 200, cookie?: string) {
  const headers = new Headers({
    'content-type': 'application/json',
    'cache-control': 'no-store',
  })
  if (cookie) headers.set('set-cookie', cookie)
  return new Response(JSON.stringify(body), { status, headers })
}

export function isOfficeHoursSameOrigin(request: Request) {
  try {
    const origin = request.headers.get('origin')
    if (!origin || request.headers.get('sec-fetch-site') === 'cross-site')
      return false
    return new URL(origin).origin === new URL(request.url).origin
  } catch {
    return false
  }
}

export function officeHoursRateLimited(
  request: Request,
  scope: 'access' | 'register',
) {
  const now = Date.now()
  // Expire old entries and bound memory even under many spoofed/local IP keys.
  for (const [key, entry] of attempts)
    if (entry.resetAt <= now) attempts.delete(key)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'local'
  const key = `${scope}:${ip.slice(0, 128)}`
  if (!attempts.has(key) && attempts.size >= 5000) return true
  const current = attempts.get(key) || { count: 0, resetAt: now + WINDOW_MS }
  current.count += 1
  attempts.set(key, current)
  return current.count > (scope === 'access' ? 12 : 6)
}

export class OfficeHoursRequestError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message)
  }
}

export async function readOfficeHoursJson(
  request: Request,
): Promise<Record<string, unknown>> {
  if (
    request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() !==
    'application/json'
  )
    throw new OfficeHoursRequestError('Send this form as JSON.', 415)
  const length = Number(request.headers.get('content-length') || '0')
  if (!Number.isFinite(length) || length < 0 || length > MAX_BODY_BYTES)
    throw new OfficeHoursRequestError('That request is too large.', 413)
  if (!request.body)
    throw new OfficeHoursRequestError('Complete the form and try again.')
  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new OfficeHoursRequestError('That request is too large.', 413)
      }
      chunks.push(value)
    }
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (!body || typeof body !== 'object' || Array.isArray(body))
      throw new Error('Invalid object')
    return body as Record<string, unknown>
  } catch (error) {
    if (error instanceof OfficeHoursRequestError) throw error
    throw new OfficeHoursRequestError('Complete the form and try again.')
  } finally {
    reader.releaseLock()
  }
}

export function signOfficeHoursRegistration(
  record: OfficeHoursRegistrationRecord,
) {
  const config = getOfficeHoursConfig()
  return config ? createRegistrationSignature(record, config.secret) : null
}

export function verifyOfficeHoursRegistration(
  record: OfficeHoursRegistrationRecord,
  signature: unknown,
) {
  const config = getOfficeHoursConfig()
  return Boolean(
    config && verifyRegistrationSignature(record, signature, config.secret),
  )
}

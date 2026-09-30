import { createHmac, timingSafeEqual } from 'node:crypto'

/** Signed provider records can be verified without exposing the session secret. */
export type OfficeHoursRegistrationRecord = {
  firstName: string
  lastName: string
  email: string
  sessionId: string
  issuedAt: string
}

function validRecord(record: OfficeHoursRegistrationRecord) {
  if (!record || typeof record !== 'object') return false
  const name = (value: unknown) =>
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 80 &&
    value === value.trim() &&
    !/[\u0000-\u001f\u007f]/.test(value)
  if (!name(record.firstName) || !name(record.lastName)) return false
  if (
    typeof record.email !== 'string' ||
    record.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.email) ||
    /[\u0000-\u001f\u007f]/.test(record.email)
  )
    return false
  if (
    typeof record.sessionId !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(record.sessionId) ||
    typeof record.issuedAt !== 'string' ||
    record.issuedAt.length > 24
  )
    return false
  try {
    return (
      new Date(`${record.sessionId}T00:00:00.000Z`)
        .toISOString()
        .slice(0, 10) === record.sessionId &&
      new Date(record.issuedAt).toISOString() === record.issuedAt
    )
  } catch {
    return false
  }
}

/** Fixed field order is part of the version-one signature contract. */
function canonicalRecord(record: OfficeHoursRegistrationRecord) {
  return JSON.stringify({
    firstName: record.firstName,
    lastName: record.lastName,
    email: record.email,
    sessionId: record.sessionId,
    issuedAt: record.issuedAt,
  })
}

export function createRegistrationSignature(
  record: OfficeHoursRegistrationRecord,
  secret: string,
): string | null {
  if (
    typeof secret !== 'string' ||
    secret.trim().length < 32 ||
    !validRecord(record)
  )
    return null
  return `v1.${createHmac('sha256', secret.trim()).update(canonicalRecord(record), 'utf8').digest('hex')}`
}

export function verifyRegistrationSignature(
  record: OfficeHoursRegistrationRecord,
  signature: unknown,
  secret: string,
): boolean {
  if (typeof signature !== 'string' || !/^v1\.[a-f0-9]{64}$/.test(signature))
    return false
  const expected = createRegistrationSignature(record, secret)
  return Boolean(
    expected &&
    timingSafeEqual(
      Buffer.from(signature, 'utf8'),
      Buffer.from(expected, 'utf8'),
    ),
  )
}

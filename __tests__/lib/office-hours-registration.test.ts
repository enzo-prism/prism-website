/** @jest-environment node */
import {
  createRegistrationSignature,
  verifyRegistrationSignature,
  type OfficeHoursRegistrationRecord,
} from '@/lib/office-hours-registration'

const secret = 'registration-test-secret-012345678901234567890123456'
const record: OfficeHoursRegistrationRecord = {
  firstName: 'Zoë',
  lastName: 'O’Connor',
  email: 'zoe@example.com',
  sessionId: '2026-10-04',
  issuedAt: '2026-09-30T21:00:00.000Z',
}

describe('authenticated office-hours provider record', () => {
  it('validates an authentic record, independent of input object key order', () => {
    const signature = createRegistrationSignature(record, secret)
    expect(signature).toMatch(/^v1\.[a-f0-9]{64}$/)
    expect(
      verifyRegistrationSignature(
        {
          issuedAt: record.issuedAt,
          sessionId: record.sessionId,
          email: record.email,
          lastName: record.lastName,
          firstName: record.firstName,
        },
        signature,
        secret,
      ),
    ).toBe(true)
  })
  it('rejects fake signatures and changes to every signed field', () => {
    const signature = createRegistrationSignature(record, secret)
    expect(
      verifyRegistrationSignature(record, `v1.${'0'.repeat(64)}`, secret),
    ).toBe(false)
    for (const modified of [
      { firstName: 'Alice' },
      { lastName: 'Smith' },
      { email: 'other@example.com' },
      { sessionId: '2026-10-11' },
      { issuedAt: '2026-09-30T22:00:00.000Z' },
    ])
      expect(
        verifyRegistrationSignature(
          { ...record, ...modified },
          signature,
          secret,
        ),
      ).toBe(false)
    expect(
      verifyRegistrationSignature(record, signature, `${secret}-rotated`),
    ).toBe(false)
  })
  it('rejects oversized/malformed fields and unsupported signatures', () => {
    for (const modified of [
      { firstName: 'x'.repeat(81) },
      { email: 'not-an-email' },
      { sessionId: '2026-02-31' },
      { issuedAt: '2026-09-30' },
      { firstName: '\u0000' },
      { issuedAt: 'x'.repeat(10000) },
    ])
      expect(
        createRegistrationSignature({ ...record, ...modified }, secret),
      ).toBeNull()
    expect(createRegistrationSignature(record, 'short')).toBeNull()
    expect(verifyRegistrationSignature(record, undefined, secret)).toBe(false)
    expect(verifyRegistrationSignature(record, 'v2.fake', secret)).toBe(false)
  })
})

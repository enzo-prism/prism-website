import { readFileSync } from 'node:fs'
import { verifyRegistrationSignature } from '../lib/office-hours-registration'

// Usage: pnpm exec ts-node --compiler-options '{"module":"CommonJS"}' scripts/verify-office-hours-registration.ts /path/to/provider-record.json
// The private signing secret must be supplied through the environment, never the command line.
function verifyFile() {
  const path = process.argv[2]
  const secret = process.env.OFFICE_HOURS_SESSION_SECRET
  if (!path || !secret || secret.trim().length < 32) return false
  try {
    const raw = readFileSync(path)
    if (raw.byteLength > 65536) return false
    const record = JSON.parse(raw.toString('utf8'))
    return verifyRegistrationSignature(
      {
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        sessionId: record.sessionDate,
        issuedAt: record.registrationIssuedAt,
      },
      record.registrationSignature,
      secret,
    )
  } catch {
    return false
  }
}
const valid = verifyFile()
console.log(valid ? 'valid' : 'invalid')
process.exitCode = valid ? 0 : 1

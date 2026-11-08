import { readFileSync } from 'node:fs'
import { parseArgs } from 'node:util'
import { reconcileWaitlist } from '../lib/waitlist-reconciliation'

try {
  const { values } = parseArgs({
    options: { submissions: { type: 'string' }, events: { type: 'string' } },
  })
  if (!values.submissions || !values.events) {
    throw new Error(
      'Usage: pnpm analytics:reconcile-waitlist --submissions <receipts.json> --events <events.json>',
    )
  }
  const read = (file: string) => {
    try {
      return JSON.parse(readFileSync(file, 'utf8'))
    } catch {
      throw new Error(
        'Unable to read a valid JSON export; source contents were not logged',
      )
    }
  }
  console.log(
    JSON.stringify(
      reconcileWaitlist(read(values.submissions), read(values.events)),
      null,
      2,
    ),
  )
} catch (error) {
  console.error(
    error instanceof Error ? error.message : 'Reconciliation failed',
  )
  process.exitCode = 1
}

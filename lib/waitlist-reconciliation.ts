const RECEIPT_ID = /^waitlist-[a-f0-9-]{36}$/

type Row = Record<string, unknown>

function rows(input: unknown): Row[] {
  if (
    !Array.isArray(input) ||
    input.some((row) => !row || typeof row !== 'object' || Array.isArray(row))
  ) {
    throw new Error('Expected a JSON array of projected records')
  }
  return input
}

function receiptId(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value !== 'string' || !RECEIPT_ID.test(value)) {
    // Never echo invalid input: an accidental email must not reach the report.
    throw new Error(
      'Invalid receipt identifier; project only waitlist submission IDs',
    )
  }
  return value
}

/** Read-only comparison. Source exports must cover the same completed period. */
export function reconcileWaitlist(submissions: unknown, events: unknown) {
  const receipts = new Map<string, number>()
  const leads = new Map<string, number>()
  let excludedReceipts = 0
  let unidentifiedReceipts = 0
  let unidentifiedLeadEvents = 0
  for (const row of rows(submissions)) {
    const classification = row.classification ?? 'accepted'
    if (
      !['accepted', 'spam', 'test', 'rejected'].includes(String(classification))
    ) {
      throw new Error('Unknown submission classification')
    }
    if (classification !== 'accepted') {
      excludedReceipts++
      continue
    }
    const id = receiptId(row.submission_id)
    if (id) receipts.set(id, (receipts.get(id) ?? 0) + 1)
    else unidentifiedReceipts++
  }
  for (const row of rows(events)) {
    if (row.event_name !== 'generate_lead') continue
    const count = row.event_count ?? 1
    if (
      typeof count !== 'number' ||
      !Number.isSafeInteger(count) ||
      count < 1
    ) {
      throw new Error('Lead event counts must be positive integers')
    }
    const id = receiptId(row.transaction_id)
    if (id) leads.set(id, (leads.get(id) ?? 0) + count)
    else unidentifiedLeadEvents += count
  }
  const matched = [...receipts.keys()].filter((id) => leads.has(id))
  return {
    acceptedReceiptRows:
      [...receipts.values()].reduce((sum, count) => sum + count, 0) +
      unidentifiedReceipts,
    uniqueIdentifiedReceipts: receipts.size,
    excludedReceipts,
    unidentifiedReceipts,
    unidentifiedLeadEvents,
    matchedReceipts: matched.length,
    duplicateReceiptIds: [...receipts]
      .filter(([, count]) => count > 1)
      .map(([id]) => id)
      .sort(),
    duplicateLeadEventIds: [...leads]
      .filter(([, count]) => count > 1)
      .map(([id]) => id)
      .sort(),
    receiptsWithoutLeadEvent: [...receipts.keys()]
      .filter((id) => !leads.has(id))
      .sort(),
    leadEventsWithoutReceipt: [...leads.keys()]
      .filter((id) => !receipts.has(id))
      .sort(),
  }
}

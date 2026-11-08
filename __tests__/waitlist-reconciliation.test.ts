import { reconcileWaitlist } from '@/lib/waitlist-reconciliation'

const first = 'waitlist-00000000-0000-4000-8000-000000000001'
const second = 'waitlist-00000000-0000-4000-8000-000000000002'
const other = 'waitlist-00000000-0000-4000-8000-000000000003'

it('separates receipt retries, tracking duplicates, missing coverage, and legacy records', () => {
  const result = reconcileWaitlist(
    [
      { submission_id: first, email: 'private@example.com' },
      { submission_id: first },
      { submission_id: second },
      {},
      { submission_id: other, classification: 'test' },
    ],
    [
      { event_name: 'generate_lead', transaction_id: first, event_count: 2 },
      { event_name: 'generate_lead', transaction_id: other },
      { event_name: 'generate_lead' },
      { event_name: 'page_view', transaction_id: 'irrelevant' },
    ],
  )
  expect(result).toEqual({
    acceptedReceiptRows: 4,
    uniqueIdentifiedReceipts: 2,
    excludedReceipts: 1,
    unidentifiedReceipts: 1,
    unidentifiedLeadEvents: 1,
    matchedReceipts: 1,
    duplicateReceiptIds: [first],
    duplicateLeadEventIds: [first],
    receiptsWithoutLeadEvent: [second],
    leadEventsWithoutReceipt: [other],
  })
  expect(JSON.stringify(result)).not.toContain('private@example.com')
})

it('handles an actually empty period without manufacturing a rate', () => {
  expect(reconcileWaitlist([], [])).toMatchObject({
    acceptedReceiptRows: 0,
    matchedReceipts: 0,
  })
})

it.each([
  [[{ submission_id: 'private@example.com' }], []],
  [[{ classification: 'unknown' }], []],
  [[], [{ event_name: 'generate_lead', event_count: -1 }]],
  [[], [{ event_name: 'generate_lead', event_count: '1' }]],
  [{}, []],
])(
  'rejects ambiguous or unsafe exports without logging their contents',
  (submissions, events) => {
    expect(() => reconcileWaitlist(submissions, events)).toThrow()
  },
)

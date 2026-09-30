import { getScholarshipRound } from '@/lib/scholarships'

describe('quarterly scholarships in Pacific Time', () => {
  it('starts with Q4 2026, even before that quarter opens', () => {
    expect(getScholarshipRound(new Date('2026-09-30T23:00:00Z'))).toEqual({
      id: '2026-Q4',
      label: 'Q4 2026',
      selectionDateLabel: 'December 31, 2026',
      deadlineLabel: 'December 31, 2026, Pacific Time',
    })
  })

  it('does not advance at UTC midnight before the Pacific quarter ends', () => {
    expect(getScholarshipRound(new Date('2027-01-01T07:59:59Z')).id).toBe(
      '2026-Q4',
    )
    expect(getScholarshipRound(new Date('2027-01-01T08:00:00Z')).id).toBe(
      '2027-Q1',
    )
  })

  it.each([
    ['2027-04-01T07:00:00Z', '2027-Q2', 'June 30, 2027'],
    ['2027-07-01T07:00:00Z', '2027-Q3', 'September 30, 2027'],
    ['2027-10-01T07:00:00Z', '2027-Q4', 'December 31, 2027'],
  ])(
    'advances for each business quarter: %s',
    (date, id, selectionDateLabel) => {
      expect(getScholarshipRound(new Date(date))).toMatchObject({
        id,
        selectionDateLabel,
      })
    },
  )
})

import { CAPACITY_MESSAGE, getWaitlistIntakeMonth } from '@/lib/waitlist'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

describe('getWaitlistIntakeMonth', () => {
  it('names the next calendar month', () => {
    expect(getWaitlistIntakeMonth(new Date(2026, 8, 15))).toEqual({
      month: 'October',
      year: 2026,
    })
    expect(getWaitlistIntakeMonth(new Date(2026, 0, 1))).toEqual({
      month: 'February',
      year: 2026,
    })
  })

  it('rolls December over to January of the next year', () => {
    expect(getWaitlistIntakeMonth(new Date(2026, 11, 1))).toEqual({
      month: 'January',
      year: 2027,
    })
    expect(getWaitlistIntakeMonth(new Date(2026, 11, 31, 23, 59, 59))).toEqual(
      {
        month: 'January',
        year: 2027,
      },
    )
  })

  it('maps every month of the year to its successor', () => {
    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      const intake = getWaitlistIntakeMonth(new Date(2026, monthIndex, 10))
      expect(intake.month).toBe(MONTH_NAMES[(monthIndex + 1) % 12])
      expect(intake.year).toBe(monthIndex === 11 ? 2027 : 2026)
    }
  })

  it('defaults to the current date', () => {
    const now = new Date()
    const expected = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    expect(getWaitlistIntakeMonth()).toEqual({
      month: MONTH_NAMES[expected.getMonth()],
      year: expected.getFullYear(),
    })
  })
})

describe('CAPACITY_MESSAGE', () => {
  it('keeps the demand headline terminated and the intake leads open for the live month', () => {
    expect(CAPACITY_MESSAGE.eyebrow).toBe('In high demand')
    expect(CAPACITY_MESSAGE.headline).toMatch(/\.$/)
    // The leads end where `<WaitlistIntakeMonth />` begins; a stray period
    // here would print before the month ("in . October").
    expect(CAPACITY_MESSAGE.intakeLead).not.toMatch(/[.!?]$/)
    expect(CAPACITY_MESSAGE.nextIntakeLead).not.toMatch(/[.!?]$/)
    expect(CAPACITY_MESSAGE.intakeTail).toMatch(/\.$/)
  })
})

import { getOfficeHoursSessions } from '@/lib/office-hours'

describe('Pacific office hours schedule', () => {
  it('returns six upcoming Sundays at 10–11 am Pacific', () => {
    const sessions = getOfficeHoursSessions(new Date('2026-09-30T21:00:00Z'))
    expect(sessions).toHaveLength(6)
    expect(sessions[0]).toEqual({
      id: '2026-10-04',
      label: 'Sunday, October 4, 2026',
      startAt: '2026-10-04T17:00:00.000Z',
      endAt: '2026-10-04T18:00:00.000Z',
    })
    expect(sessions[5].id).toBe('2026-11-08')
  })
  it('changes UTC hours correctly when daylight saving ends', () => {
    const sessions = getOfficeHoursSessions(new Date('2026-10-25T00:00:00Z'))
    expect(sessions[0].startAt).toBe('2026-10-25T17:00:00.000Z')
    expect(sessions[1].startAt).toBe('2026-11-01T18:00:00.000Z')
    expect(sessions[1].endAt).toBe('2026-11-01T19:00:00.000Z')
  })
  it('changes UTC hours correctly when daylight saving begins', () => {
    const sessions = getOfficeHoursSessions(new Date('2027-03-07T00:00:00Z'))
    expect(sessions[0].startAt).toBe('2027-03-07T18:00:00.000Z')
    expect(sessions[1].startAt).toBe('2027-03-14T17:00:00.000Z')
  })
  it('allows the current Sunday only before its start', () => {
    expect(getOfficeHoursSessions(new Date('2026-10-04T16:59:59Z'))[0].id).toBe(
      '2026-10-04',
    )
    expect(getOfficeHoursSessions(new Date('2026-10-04T17:00:00Z'))[0].id).toBe(
      '2026-10-11',
    )
    expect(getOfficeHoursSessions(new Date('2026-10-04T17:30:00Z'))[0].id).toBe(
      '2026-10-11',
    )
  })
  it('uses Pacific calendar near UTC midnight and supports year rollovers', () => {
    expect(getOfficeHoursSessions(new Date('2026-10-05T00:01:00Z'))[0].id).toBe(
      '2026-10-11',
    )
    expect(getOfficeHoursSessions(new Date('2026-12-31T23:00:00Z'))[0].id).toBe(
      '2027-01-03',
    )
    expect(getOfficeHoursSessions(new Date('invalid'))).toEqual([])
  })
})

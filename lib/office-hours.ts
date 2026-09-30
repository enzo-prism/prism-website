/** Public schedule data. Keep approval credentials in office-hours-access.ts. */
export const OFFICE_HOURS_TIME_ZONE = 'America/Los_Angeles'
export const OFFICE_HOURS_TIME_LABEL = '10–11 am Pacific'

export type OfficeHoursSession = {
  id: string
  label: string
  startAt: string
  endAt: string
}

function pacificDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: OFFICE_HOURS_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const value = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value)
  return {
    year: value('year'),
    month: value('month'),
    day: value('day'),
    hour: value('hour'),
    minute: value('minute'),
    second: value('second'),
  }
}

/** Resolve a wall-clock hour in Pacific time, including daylight-saving changes. */
function pacificHour(year: number, month: number, day: number, hour: number) {
  const target = Date.UTC(year, month - 1, day, hour)
  let timestamp = target
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const parts = pacificDateParts(new Date(timestamp))
    const represented = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    )
    timestamp += target - represented
  }
  return new Date(timestamp)
}

/** Only sessions whose 10 am start is still in the future are available. */
export function getOfficeHoursSessions(now = new Date()): OfficeHoursSession[] {
  if (!Number.isFinite(now.getTime())) return []
  const local = pacificDateParts(now)
  const calendar = new Date(Date.UTC(local.year, local.month - 1, local.day))
  const sessions: OfficeHoursSession[] = []
  for (let offset = 0; offset < 50 && sessions.length < 6; offset += 1) {
    const day = new Date(calendar.getTime() + offset * 86400000)
    if (day.getUTCDay() !== 0) continue
    const year = day.getUTCFullYear()
    const month = day.getUTCMonth() + 1
    const date = day.getUTCDate()
    const start = pacificHour(year, month, date, 10)
    if (start.getTime() <= now.getTime()) continue
    const end = pacificHour(year, month, date, 11)
    sessions.push({
      id: `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`,
      label: new Intl.DateTimeFormat('en-US', {
        timeZone: OFFICE_HOURS_TIME_ZONE,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(start),
      startAt: start.toISOString(),
      endAt: end.toISOString(),
    })
  }
  return sessions
}

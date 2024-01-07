import { dayMilliseconds, hourMilliseconds } from './constants'
import { ensureTimestampFormat } from './ensureTimestampFormat'

/**
 * Returns millisecond-timestamps.
 */
export function getDayTimestampBoundaries(
  timestamp: number,
  /** UTC`+x` or UTC`-x`; `x` being `timezoneOffsetHours`. @default new Date(timestamp).getTimezoneOffset() / 60  */
  timezoneOffsetHours: number=0,
): [number, number] {
  const ts = ensureTimestampFormat('millisecond', timestamp)
  if (Date != null) timezoneOffsetHours = -1 * new Date(timestamp).getTimezoneOffset() / 60
  const tzOffsetTs = ts + timezoneOffsetHours * hourMilliseconds // convert to ms

  let currentDayMs = tzOffsetTs % dayMilliseconds
  const dayBeginTs = ts - currentDayMs
  const dayEndTs = dayBeginTs + dayMilliseconds

  return [dayBeginTs, dayEndTs]
}

import { dayMilliseconds, hourMilliseconds } from './constants'
import { ensureTimestampFormat } from './ensureTimestampFormat'

/**
 * Returns millisecond-timestamps.
 */
export function getDayTimestampBoundaries(
  timestamp: number,
  /** UTC`+x` or UTC`-x`; `x` being `timezoneOffsetHours`. @default new Date(timestamp).getTimezoneOffset() / 60  */
  timezoneOffsetHours?: number,
): [number, number] {
  timestamp = ensureTimestampFormat('millisecond', timestamp)
  if (Date != null) timezoneOffsetHours ??= -1 * new Date(timestamp).getTimezoneOffset() / 60
  else timezoneOffsetHours = 0

  let tzOffsetTs = timestamp + timezoneOffsetHours * hourMilliseconds // convert to ms
  let currentDayMs = tzOffsetTs % dayMilliseconds
  
  const dayBeginTs = timestamp - currentDayMs
  const dayEndTs = dayBeginTs + dayMilliseconds

  return [dayBeginTs, dayEndTs]
}

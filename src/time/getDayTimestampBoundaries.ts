import { dayMilliseconds } from './constants'
import { ensureTimestampFormat } from './ensureTimestampFormat'

/**
 * Returns millisecond-timestamps.
 */
export function getDayTimestampBoundaries(
  timestamp: number,
): [number, number] {
  timestamp = ensureTimestampFormat('millisecond', timestamp)
  const fullDays = Math.floor(timestamp / dayMilliseconds)
  const dayBeginTs = fullDays * dayMilliseconds
  const dayEndTs = dayBeginTs + dayMilliseconds
  return [dayBeginTs, dayEndTs]
}

import {hourMilliseconds, minuteMilliseconds, secondMilliseconds} from './constants'
import {getMonth, isMonthIndex} from './GregorianMonths'

/**
 * Returns extensive information about the day
 * on which the timestamp occured,
 * based on local time or UTC.
 */
export function analyzeTimestamp(
  timestamp: number,
  isUTC: boolean=false,
): Day {
  const date = new Date(timestamp)
  let
    year = 0,
    monthIndex = 0,
    day = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    totalDayMilliseconds = 0

  if (isUTC) {
    year = date.getUTCFullYear()
    monthIndex = date.getUTCMonth()
    day = date.getUTCDate()
    hours = date.getUTCHours()
    minutes = date.getUTCMinutes()
    seconds = date.getUTCSeconds()
    milliseconds = date.getUTCMilliseconds()
  } else {
    year = date.getFullYear()
    monthIndex = date.getMonth()
    day = date.getDate()
    hours = date.getHours()
    minutes = date.getMinutes()
    seconds = date.getSeconds()
    milliseconds = date.getMilliseconds()
  }

  totalDayMilliseconds += milliseconds
    + seconds * secondMilliseconds
    + minutes * minuteMilliseconds
    + hours * hourMilliseconds

  let beginTime = timestamp - totalDayMilliseconds

  let shortDateText, longDateText
  if (!isMonthIndex(monthIndex)) {
    shortDateText = '–'
    longDateText = '–'
  } else {
    shortDateText = `${getMonth(monthIndex).abbr} ${day}`
    longDateText = `${getMonth(monthIndex).name} ${day}`
  }

  return {
    beginTime,
    endTime: beginTime + 86400000,
    year,
    monthIndex,
    day,
    shortDateText,
    longDateText,
    isUTC,
  }
}

export interface Day {
  beginTime: number
  /** Non-inclusive last timestamp of the day. */
  endTime: number
  year: number
  monthIndex: number
  day: number
  /** e.g. "Jan 16". */
  shortDateText: string
  /** e.g. "January 16, 2022". */
  longDateText: string
  /** Whether is in UTC. */
  isUTC: boolean
}

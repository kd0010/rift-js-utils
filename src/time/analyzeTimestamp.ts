import {MonthNames, isMonthNum} from './MonthNames'
import {MonthShortNames} from './MonthShortNames'

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
    month = 0,
    day = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
    totalDayMilliseconds = 0

  if (isUTC) {
    year = date.getUTCFullYear()
    month = date.getUTCMonth()
    day = date.getUTCDate()
    hours = date.getUTCHours()
    minutes = date.getUTCMinutes()
    seconds = date.getUTCSeconds()
    milliseconds = date.getUTCMilliseconds()
  } else {
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
    hours = date.getHours()
    minutes = date.getMinutes()
    seconds = date.getSeconds()
    milliseconds = date.getMilliseconds()
  }

  totalDayMilliseconds += milliseconds
    + seconds * 1000
    + minutes * 60000
    + hours * 3600000

  let beginTime = timestamp - totalDayMilliseconds

  let shortDateText, longDateText
  if (!isMonthNum(month)) {
    shortDateText = '–'
    longDateText = '–'
  } else {
    shortDateText = `${MonthShortNames[month]} ${day}`
    longDateText = `${MonthNames[month]} ${day}`
  }

  return {
    beginTime,
    endTime: beginTime + 86400000,
    year,
    month,
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
  /** Indexed, starting from `0`. */
  month: number
  day: number
  /** e.g. "Jan 16". */
  shortDateText: string
  /** e.g. "January 16, 2022". */
  longDateText: string
  /** Whether is in UTC. */
  isUTC: boolean
}

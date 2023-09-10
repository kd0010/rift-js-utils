import { isMonthNum, MonthName, MonthNames } from './MonthNames'
import { MonthShortName, MonthShortNames } from './MonthShortNames'
import { ensureTimestampFormat, hourMilliseconds } from 'rift-js-utils/number'
import { isWeekdayNum, WeekdayName, WeekdayNames } from './WeekdayNames'

export class TimeClass {
  #config: TimeConfig | null
  #timezoneOffsetHours: number = 0
  #timezoneOffsetMs: number = 0
  #ms = 0
  #isValid: boolean
  date: Date
  defaultValue = '–'

  constructor(
    value: string | number | Date,
    config?: TimeConfig,
  ) {
    if (typeof value == 'number') value = ensureTimestampFormat('millisecond', value)
    const date = new Date(value)
    this.date = date

    if (date.toString() == 'Invalid Date') {
      this.#isValid = false
    } else {
      this.#ms = date.getTime()
      this.#isValid = true
    }

    this.#config = config ?? null
    this.#timezoneOffsetHours = config?.timezoneOffsetHours ?? 0
    this.#timezoneOffsetMs = this.#timezoneOffsetHours * hourMilliseconds
  }

  getDate(): string {
    if (!this.#isValid) return this.defaultValue

    const month = this.#getMonthRepr()
    if (month == null) return this.defaultValue

    const day = this.#getDayRepr()
    const year = this.#getYearRepr()
  
    const date = `${month} ${day}, ${year}`
  
    return date
  }

  getTime(): string {
    if (!this.#isValid) return this.defaultValue

    const hours = this.#getHoursRepr()
    const minutes = this.#getMinutesRepr(true)
    const ampm = this.#getAMPM() ?? ''

    const time = `${hours}:${minutes}${ampm}`
  
    return time
  }

  getDateTime(): string {
    if (!this.#isValid) return this.defaultValue

    const dateSt = this.getDate()
    const timeSt = this.getTime()
  
    const dateTime = `${dateSt} ${timeSt}`

    return dateTime
  }

  getMonth(): string {
    const month = this.#getMonthRepr()
    if (month == null) return this.defaultValue
    return month
  }

  getWeekday(): WeekdayName | null {
    if (!this.#isValid) return null

    const tzOffsetDate = this.#getTzOffsetDate()
    const utcDay = tzOffsetDate.getUTCDay()
    if (!isWeekdayNum(utcDay)) throw '"utcDay" was out of bounds or non-existent'

    const weekday = WeekdayNames[utcDay]
    return weekday
  }

  getRelativeTime(): string {
    if (this.#isValid) return this.defaultValue

    const msDiff = Date.now() - this.#ms
    const msDiffDate = new Date(msDiff)
  
    // If ts in the past
    if (msDiff > 0) {
      // If within last minute return seconds
      if (msDiff < 60_000) {
        const s = msDiffDate.getSeconds()
        if (s == 1) return `a second ago`
        return `${s} seconds ago`
      }
  
      // If within last hour return minutes
      if (msDiff < 3_600_000) {
        const m = msDiffDate.getMinutes()
        if (m == 1) return `a minute ago`
        return `${m} minutes ago`
      }
  
      // If within last 24h return hours
      if (msDiff < 86_400_000) {
        const h = msDiffDate.getHours()
        if (h == 1) return `an hour ago`
        return `${h} hours ago`
      }
  
      // If within last month return days
      if (msDiff < 2_678_400_000) {
        const d = msDiffDate.getDate()
        if (d == 1) return `a day ago`
        return `${d} days ago`
      }
  
      // If within last year return months
      if (msDiff < 31_622_400_000) {
        const m = msDiffDate.getMonth()
        if (m == 1) return `a month ago`
        return `${m} months ago`
      }
  
      // Otherwise return years
      const y = Math.floor(msDiff / 31_622_400_000)
      if (y == 1) return `a year ago`
      return `${y} years ago`
    }
  
    // No future dates as of right now
    return '—'
  }

  isValid(): boolean {
    return this.#isValid
  }

  #getYearRepr(): string {
    const year = String(this.date.getFullYear())

    return year
  }

  #getMonthRepr(): MonthName | MonthShortName | null {
    const monthNum = this.date.getMonth()
    if (!isMonthNum(monthNum)) return null

    const monthName = this.#config?.useShortMonthNames
      ? MonthShortNames[monthNum]
      : MonthNames[monthNum]
    
    return monthName
  }

  #getDayRepr(): string {
    return this.#formatNumber(this.date.getDate())
  }

  #getHoursRepr(): string {
    let hours = this.date.getHours()

    if (!this.#config?.use24hClock) {
      if (hours == 0) hours = 12
      if (hours > 12) hours -= 12
    }

    return this.#formatNumber(hours)
  }

  #getMinutesRepr(
    useDoubleDigits?: boolean,
  ): string {
    return this.#formatNumber(this.date.getMinutes(), useDoubleDigits)
  }

  #getAMPM(): string | null {
    if (this.#config?.use24hClock) return null
    if (this.date.getHours() >= 12) return 'pm'
    else return 'am'
  }

  #formatNumber(
    num: number,
    useDoubleDigits?: boolean,
  ): string {
    let st = String(num)

    if (
      (useDoubleDigits || this.#config?.useDoubleDigitsAlways) &&
      st.length == 1
    ) {
      st = `0${st}`
    }

    return st
  }

  #getTzOffsetDate(): Date {
    const tzOffsetTimestamp = this.date.getTime() + this.#timezoneOffsetMs
    return new Date(tzOffsetTimestamp)
  }
}

export function time(
  value: string | number | Date,
  config?: TimeConfig,
): TimeClass {
  return new TimeClass(value, config)
}

export interface TimeConfig {
  timezoneOffsetHours?: number
  useShortMonthNames?: boolean
  useDoubleDigitsAlways?: boolean
  use24hClock?: boolean
}

// @ts-ignore tests disabled
import { describe, it, expect } from 'vitest'
import { formatDuration, FormatDurationOptions } from './formatDuration'
import {
  dayMilliseconds,
  hourMilliseconds,
  minuteMilliseconds,
  secondMilliseconds,
  weekMilliseconds,
} from './constants'

const weeks = weekMilliseconds
const days = dayMilliseconds
const hours = hourMilliseconds
const minutes = minuteMilliseconds
const seconds = secondMilliseconds

describe('formatDuration', () => {
  it('Returns correctly intuitively-formatted time passed', () => {
    const number = 14_400_000 + 2_640_000 + 56_000
    const string = 'Jan 01 1970 4:44:56 GMT'
    const date = new Date(Date.UTC(1970, 0, 1, 4, 44, 56))
    const dateWithMs = new Date(Date.UTC(1970, 0, 1, 4, 44, 56, 999))

    const outcome = '4h 44m 56s'

    expect(formatDuration(number)).toBe(outcome)
    expect(formatDuration(string)).toBe(outcome)
    expect(formatDuration(date)).toBe(outcome)
    expect(formatDuration(dateWithMs)).toBe(outcome)

    // Over 24h
    // 6d 4h 44m 56s
    const durationWithDaysMs = 518_400_000 + 14_400_000 + 2_640_000 + 56_000
    expect(formatDuration(durationWithDaysMs)).toBe('6d 4h 44m 56s')

    // Over 7d
    // 3wk 6d 4h 44m 56s
    const durationWithWeeksMs = 3 * weeks + 518_400_000 + 14_400_000 + 2_640_000 + 56_000
    expect(formatDuration(durationWithWeeksMs)).toBe('3wk 6d 4h 44m 56s')
  })

  it('Returns placeholder in case of Invalid Date', () => {
    const placeholder = '–'

    expect(formatDuration(9999999999999999999)).toBe(placeholder)
    expect(formatDuration('abcdefg')).toBe(placeholder)
    expect(formatDuration(new Date('abcdefg'))).toBe(placeholder)
  })

  it('Correctly utilizes option `highestMeasurement`', () => {
    const daysOption: FormatDurationOptions = { highestMeasurement: 'days' }
    const hoursOption: FormatDurationOptions = { highestMeasurement: 'hours' }
    const minutesOption: FormatDurationOptions = { highestMeasurement: 'minutes' }
    const secondsOption: FormatDurationOptions = { highestMeasurement: 'seconds' }

    // 6d 4h 44m 56s
    const durationMs = 518_400_000 + 14_400_000 + 2_640_000 + 56_000

    expect(formatDuration(durationMs, daysOption)).toBe('6d 4h 44m 56s')
    expect(formatDuration(durationMs, hoursOption)).toBe('148h 44m 56s')
    expect(formatDuration(durationMs, minutesOption)).toBe('8924m 56s')
    expect(formatDuration(durationMs, secondsOption)).toBe('535496s')
  })

  it('Correctly utilizes option `useDoubleDigitsHMS`', () => {
    const outcome = '04h 04m 04s'
    const outcomeWithDays = '2d 04h 04m 04s'

    const durationMs = 4 * hours + 4 * minutes + 4 * seconds
    const durationMsWithDays = 2 * days + durationMs

    const options: FormatDurationOptions = { useDoubleDigitsHMS: true }

    expect(formatDuration(durationMs, options)).toBe(outcome)
    expect(formatDuration(durationMsWithDays, options)).toBe(outcomeWithDays)
  })
})

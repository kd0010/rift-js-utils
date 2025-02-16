import {
  dayMilliseconds,
  hourMilliseconds,
  minuteMilliseconds,
  secondMilliseconds,
  weekMilliseconds,
} from './constants'

/**
 * Formats a milliseconds value to formatted duration,
 * in the format: "576d 23h 59m 59s".
 */
export function formatDuration(
  value: string | number | Date,
  {
    highestMeasurement='weeks',
    lowestMeasurement='seconds',
    useDoubleDigitsHMS=false,
    useNoWhitespace=false,
    keepTrailingZeroUnits=false,
  }: FormatDurationOptions={},
): string {
  const repr = {
    weeks: 'wk',
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's',
  }

  const date = new Date(value)

  if (date.toString() == 'Invalid Date') return '–'

  const durationMs = date.getTime()

  // Determine how much of what
  let wk = 0
  let d = 0
  let h = 0
  let m = 0
  let s = 0
  let remainingTimeMs = durationMs

  if (remainingTimeMs >= weekMilliseconds) {
    wk = Math.floor(remainingTimeMs / weekMilliseconds)
    remainingTimeMs -= wk * weekMilliseconds
  }
  if (remainingTimeMs >= dayMilliseconds) {
    d = Math.floor(remainingTimeMs / dayMilliseconds)
    remainingTimeMs -= d * dayMilliseconds
  }
  if (remainingTimeMs >= hourMilliseconds) {
    h = Math.floor(remainingTimeMs / hourMilliseconds)
    remainingTimeMs -= h * hourMilliseconds
  }
  if (remainingTimeMs >= minuteMilliseconds) {
    m = Math.floor(remainingTimeMs / minuteMilliseconds)
    remainingTimeMs -= m * minuteMilliseconds
  }
  if (remainingTimeMs >= secondMilliseconds) {
    s = Math.floor(remainingTimeMs / secondMilliseconds)
    remainingTimeMs -= s * secondMilliseconds
  }

  // Convert values depending on `highestMeasurement`
  switch (highestMeasurement) {
    case 'weeks':
    case 'days':
    case 'hours':
    case 'minutes':
    case 'seconds':
      if (highestMeasurement == 'weeks') break

      d += wk * 7
      wk = 0
      if (highestMeasurement == 'days') break

      h += d * 24
      d = 0
      if (highestMeasurement == 'hours') break

      m += h * 60
      h = 0
      if (highestMeasurement == 'minutes') break

      s += m * 60
      m = 0
      if (highestMeasurement == 'seconds') break
  }

  // Stitch together values into final string
  let product = ''
  const getZeroHMS = (val: number, measurement: Measurement) => ((typeof useDoubleDigitsHMS == 'boolean' ? useDoubleDigitsHMS : useDoubleDigitsHMS[measurement]) && val < 10) ? '0' : ''
  const getSpace = (prevVal: number) => (!useNoWhitespace && prevVal) ? ' ' : ''

  let highestUnit: Measurement =
    wk ? 'weeks' :
    d ? 'days' :
    h ? 'hours' :
    m ? 'minutes' :
    s ? 'seconds' :
    'seconds'

  if (
    (wk || (keepTrailingZeroUnits && MeasurementEnum.weeks < MeasurementEnum[highestUnit])) &&
    MeasurementEnum[lowestMeasurement] <= MeasurementEnum.weeks
  ) product += wk + repr.weeks

  if (
    (d || (keepTrailingZeroUnits && MeasurementEnum.days < MeasurementEnum[highestUnit])) &&
    MeasurementEnum[lowestMeasurement] <= MeasurementEnum.days
  ) product += getSpace(wk) + d + repr.days

  if (
    (h || (keepTrailingZeroUnits && MeasurementEnum.hours < MeasurementEnum[highestUnit])) &&
    MeasurementEnum[lowestMeasurement] <= MeasurementEnum.hours
  ) product += getSpace(d) + getZeroHMS(h, 'hours') + h + repr.hours

  if (
    (m || (keepTrailingZeroUnits && MeasurementEnum.minutes < MeasurementEnum[highestUnit])) &&
    MeasurementEnum[lowestMeasurement] <= MeasurementEnum.minutes
  ) product += getSpace(h) + getZeroHMS(m, 'minutes') + m + repr.minutes

  if (
    (s || (keepTrailingZeroUnits && MeasurementEnum.seconds < MeasurementEnum[highestUnit])) &&
    MeasurementEnum[lowestMeasurement] <= MeasurementEnum.seconds
  ) product += getSpace(m) + getZeroHMS(s, 'seconds') + s + repr.seconds

  return product
}

export interface FormatDurationOptions {
  /** @default 'weeks' */
  highestMeasurement?: Measurement
  /** @default 'seconds' */
  lowestMeasurement?: Measurement
  useDoubleDigitsHMS?: boolean | Partial<{[measurement in Measurement]: true}>
  useNoWhitespace?: boolean
  keepTrailingZeroUnits?: boolean
}

type Measurement =
  | 'weeks'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'

const MeasurementEnum = {
  'weeks': 90,
  'days': 80,
  'hours': 70,
  'minutes': 60,
  'seconds': 50,
} as const

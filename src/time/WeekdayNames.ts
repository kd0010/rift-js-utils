export const WeekdayNames = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
} as const
export const WeekdayNums = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
} as const

export type WeekdayName = typeof WeekdayNames[keyof typeof WeekdayNames]
export type WeekdayNum = typeof WeekdayNums[keyof typeof WeekdayNums]

export function isWeekdayName(value: string | null | undefined): value is WeekdayName {
  return typeof value == 'string' && value in WeekdayNums
}
export function isWeekdayNum(value: number | null | undefined): value is WeekdayNum {
  return typeof value == 'number' && value in WeekdayNames
}

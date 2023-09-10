export const MonthShortNames = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
} as const
export const MonthNumsShort = {
  'Jan': 0,
  'Feb': 1,
  'Mar': 2,
  'Apr': 3,
  'May': 4,
  'Jun': 5,
  'Jul': 6,
  'Aug': 7,
  'Sep': 8,
  'Oct': 9,
  'Nov': 10,
  'Dec': 11,
} as const

export type MonthShortName = keyof typeof MonthNumsShort
export type MonthNumShort = keyof typeof MonthShortNames

export function isMonthShortName(
  value: any,
): value is MonthShortName {
  return typeof value == 'string' && value in MonthNumsShort
}
export function isMonthNumShort(
  value: any,
): value is MonthNumShort {
  return typeof value == 'number' && value in MonthShortNames
}

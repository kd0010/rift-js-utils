export const MonthNames = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
} as const
export const MonthNums = {
  'January': 0,
  'February': 1,
  'March': 2,
  'April': 3,
  'May': 4,
  'June': 5,
  'July': 6,
  'August': 7,
  'September': 8,
  'October': 9,
  'November': 10,
  'December': 11,
} as const

export type MonthName = keyof typeof MonthNums
export type MonthNum = keyof typeof MonthNames

export function isMonthName(
  value: any,
): value is MonthName {
  return typeof value == 'string' && value in MonthNums
}
export function isMonthNum(
  value: any,
): value is MonthNum {
  return typeof value == 'number' && value in MonthNames
}

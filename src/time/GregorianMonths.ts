export const GregorianMonths = {
  'January': {
    name: 'January',
    abbr: 'Jan',
    days: 31,
    leapYearDays: 31,
    nr: 1,
    index: 0,
  },
  'February': {
    name: 'February',
    abbr: 'Feb',
    days: 28,
    leapYearDays: 29,
    nr: 2,
    index: 1,
  },
  'March': {
    name: 'March',
    abbr: 'Mar',
    days: 31,
    leapYearDays: 31,
    nr: 3,
    index: 2,
  },
  'April': {
    name: 'April',
    abbr: 'Apr',
    days: 30,
    leapYearDays: 30,
    nr: 4,
    index: 3,
  },
  'May': {
    name: 'May',
    abbr: 'May',
    days: 31,
    leapYearDays: 31,
    nr: 5,
    index: 4,
  },
  'June': {
    name: 'June',
    abbr: 'Jun',
    days: 30,
    leapYearDays: 30,
    nr: 6,
    index: 5,
  },
  'July': {
    name: 'July',
    abbr: 'Jul',
    days: 31,
    leapYearDays: 31,
    nr: 7,
    index: 6,
  },
  'August': {
    name: 'August',
    abbr: 'Aug',
    days: 31,
    leapYearDays: 31,
    nr: 8,
    index: 7,
  },
  'September': {
    name: 'September',
    abbr: 'Sep',
    days: 30,
    leapYearDays: 30,
    nr: 9,
    index: 8,
  },
  'October': {
    name: 'October',
    abbr: 'Oct',
    days: 31,
    leapYearDays: 31,
    nr: 10,
    index: 9,
  },
  'November': {
    name: 'November',
    abbr: 'Nov',
    days: 30,
    leapYearDays: 30,
    nr: 11,
    index: 10,
  },
  'December': {
    name: 'December',
    abbr: 'Dec',
    days: 31,
    leapYearDays: 31,
    nr: 12,
    index: 11,
  },
} as const

export const GregorianMonthsArr = Object.values(GregorianMonths)
export type MonthName = typeof GregorianMonthsArr[number]['name']
export type MonthAbbr = typeof GregorianMonthsArr[number]['abbr']
export type MonthIndex = typeof GregorianMonthsArr[number]['index']

const abbreviations = {
  'Jan': 'January',
  'Feb': 'February',
  'Mar': 'March',
  'Apr': 'April',
  'May': 'May',
  'Jun': 'June',
  'Jul': 'July',
  'Aug': 'August',
  'Sep': 'September',
  'Oct': 'October',
  'Nov': 'November',
  'Dec': 'December',
} as const
const monthIndices = {
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

export function isMonthName(name: string | null | undefined): name is MonthName {
  return typeof name == 'string' && name in GregorianMonths
}
export function isMonthAbbr(abbreviation: string | null | undefined): abbreviation is MonthAbbr {
  return typeof abbreviation == 'string' && abbreviation in abbreviations
}
export function isMonthIndex(index: number | null | undefined): index is MonthIndex {
  return typeof index == 'number' && index in monthIndices
}

export function getMonth(
  name_abbr_index: MonthName | MonthAbbr | MonthIndex,
): typeof GregorianMonths[keyof typeof GregorianMonths] {
  if (typeof name_abbr_index == 'number') return GregorianMonths[monthIndices[name_abbr_index]]
  if (isMonthName(name_abbr_index)) return GregorianMonths[name_abbr_index]
  return GregorianMonths[abbreviations[name_abbr_index]]
}

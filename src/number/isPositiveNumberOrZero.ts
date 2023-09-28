import { isValidNumber } from './isValidNumber'

export function isPositiveNumberOrZero(num: any): num is number {
  return isValidNumber(num) && num >= 0
}

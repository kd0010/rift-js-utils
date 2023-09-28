import { isValidNumber } from './isValidNumber'

export function isPositiveNumber(num: any): num is number {
  return isValidNumber(num) && num > 0
}

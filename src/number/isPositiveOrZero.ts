import {isNumeric} from './isNumeric'

export function isPositiveOrZero(
  number: number | null | undefined,
): number is number {
  return isNumeric(number) && number >= 0
}

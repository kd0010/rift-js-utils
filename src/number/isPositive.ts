import {isNumeric} from './isNumeric'

export function isPositive(
  number: number | null | undefined,
): number is number {
  return isNumeric(number) && number > 0
}

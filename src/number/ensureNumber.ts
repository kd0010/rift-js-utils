import {isNumeric} from './isNumeric'

export function ensureNumber(
  value: number | null | undefined,
): number {
  return isNumeric(value) ? value : 0
}

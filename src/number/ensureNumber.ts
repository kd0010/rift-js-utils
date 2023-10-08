import { isValidNumber } from './isValidNumber'

export function ensureNumber(
  value: any,
): number {
  if (!isValidNumber(value)) return 0
  return value
}

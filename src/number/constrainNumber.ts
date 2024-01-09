/**
 * Returns a number that is in the bounds of `[minValue, maxValue]`.
 */
export function constrainNumber(
  minValue: number,
  targetNumber: number,
  maxValue: number,
): number {
  return Math.min(Math.max(minValue, targetNumber), maxValue)
}

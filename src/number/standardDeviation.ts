import { variance } from './variance'

export function standardDeviation(
  numbers: readonly number[],
): number {
  return Math.sqrt(variance(numbers))
}

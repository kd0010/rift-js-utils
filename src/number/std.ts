import { variance } from './variance'

/**
 * Standard deviation.
 */
export function std(
  numbers: readonly number[],
): number {
  return Math.sqrt(variance(numbers))
}

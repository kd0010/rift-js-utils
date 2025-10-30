import {variance} from './variance'

/**
 * Standard deviation.
 */
export function std(
  numbers: ReadonlyArray<number>,
): number {
  return Math.sqrt(variance(numbers))
}

import {max} from './max'
import {min} from './min'

export function range(
  numbers: readonly number[],
): number {
  return max(numbers) - min(numbers)
}

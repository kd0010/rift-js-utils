import {max} from './max'
import {min} from './min'

export function range(
  numbers: ReadonlyArray<number>,
): number {
  return max(numbers) - min(numbers)
}

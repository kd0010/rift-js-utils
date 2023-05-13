import { mean } from './mean'

export function variance(
  numbers: readonly number[],
): number {
  let meanValue = mean(numbers)
  let squareDiffs = numbers.map(number => {
    let diff = number - meanValue
    return diff * diff
  })

  return mean(squareDiffs)
}

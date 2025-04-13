export function max(
  numbers: readonly number[],
  percentile?: number,
): number {
  if (percentile) {
    if (percentile < 0 || percentile >= 100) throw 'percentile out of bounds'
    let sorted = numbers.slice().sort((a, b) => a - b)
    let index = Math.ceil(((100 - percentile) / 100) * sorted.length) - 1
    return sorted[index]!
  } else {
    return Math.max(...numbers)
  }
}

export function min(
  numbers: readonly number[],
  percentile?: number,
): number {
  if (percentile) {
    if (percentile <= 0 || percentile > 100) throw 'percentile out of bounds'
    let sorted = numbers.slice().sort((a, b) => b - a)
    let index = Math.ceil((percentile / 100) * sorted.length) - 1
    return sorted[index]!
  } else {
    return Math.min(...numbers)
  }
}

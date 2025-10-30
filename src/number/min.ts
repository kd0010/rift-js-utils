export function min(
  numbers: ReadonlyArray<number>,
  percentile?: number,
): number {
  if (percentile) {
    if (percentile < 0 || percentile >= 100) throw 'percentile out of bounds'
    let sorted = numbers.slice().sort((a, b) => b - a)
    let index = Math.max(0, Math.floor((percentile / 100) * sorted.length) - 1)
    return sorted[index]!
  } else {
    return Math.min(...numbers)
  }
}

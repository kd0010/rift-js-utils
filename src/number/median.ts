export function median(
  numbers: readonly number[],
): number {
  let sorted = [...numbers].sort((a, b) => a - b)
  let n = sorted.length
  let mid = Math.floor(n / 2)

  return n % 2 != 0 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2
}

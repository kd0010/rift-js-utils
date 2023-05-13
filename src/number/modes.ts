export function modes(
  numbers: readonly number[],
): number[] {
  const map = new Map()
  let maxCount = 0
  let modes: number[] = []
  let len = numbers.length

  for (let i = 0; i < len; ++i) {
    let num = numbers[i]!
    let count = map.has(num) ? map.get(num) + 1 : 1
    map.set(num, count)

    if (count > maxCount) {
      maxCount = count
      modes = [num]
    } else if (count == maxCount) {
      modes.push(num)
    }
  }

  return modes
}

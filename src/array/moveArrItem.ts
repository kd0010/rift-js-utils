/**
 * Moves an item in target index to another desired index.
 * Does not modify existing array.
 * Returns the new array.
 * 
 * Out of bounds indices will be ignored,
 * and the initial array will be returned.
 */
export function moveArrItem(
  indexA: number,
  indexB: number,
  arr: Array<any>
): Array<any> {
  // Safeguards for when provided indices are bogus
  const isIndexValid = (index: number): boolean => {
    if (
      index >= 0 &&
      index < arr.length
    ) return true
    return false
  }
  if (!isIndexValid(indexA) || !isIndexValid(indexB)) return arr
  if (indexA == indexB) return arr

  let transformedArr = [...arr]
  const itemToMove = arr[indexA]
  // Remove the field that is about to be moved
  transformedArr.splice(indexA, 1)

  transformedArr = [
    ...transformedArr.slice(0, indexB),
    itemToMove,
    ...transformedArr.slice(indexB),
  ]

  return transformedArr
}

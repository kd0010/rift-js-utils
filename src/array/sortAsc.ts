/**
 * Sorts an `Array` of mapped `Object`s
 * based on a property that every object has.
 */
export function sortAsc<T>(
  arr: Array<T>,
  propertyName: keyof T,
): void {
  arr.sort(
    (a, b) => +a[propertyName] - +b[propertyName]
  )
}

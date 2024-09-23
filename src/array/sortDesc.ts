/**
 * Sorts an `Array` of mapped `Object`s
 * based on a property that every object has.
 */
export function sortDesc<T>(
  arr: T[],
  propertyName: keyof T,
): void {
  arr.sort(
    (a, b) => +b[propertyName] - +a[propertyName]
  )
}

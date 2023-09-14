/**
 * Solves an eternal problem of needing to check whether
 * an array exists in the object property's value
 * before pushing an item in the array.
 */
export function push<T extends {[k: string]: any}>(
  obj: T,
  property: keyof T,
  value: T[keyof T][number],
): void {
  if (!Array.isArray(obj[property])) obj[property] = [] as any
  obj[property].push(value)
}

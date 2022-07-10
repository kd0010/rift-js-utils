/**
 * Solves an eternal problem of needing to check whether
 * an array exists in the object property's value
 * before pushing an item in the array,
 * by abstracting this logic behind a function call.
 */
export function push<T>(
  obj: T,
  property: keyof T,
  value: T[keyof T][keyof T[keyof T]],
): void {
  if (!Array.isArray(obj[property])) obj[property] = [] as any
  // @ts-ignore 'push' literally will exist one way or the other
  //            due to the above statement.
  obj[property].push(value)
}

/**
 * ```ts
 * const arr = [{name: 'John', age: 36}, {name: 'Matt', age: 24}]
 * const transposed = transposeArray(arr) // {name: ['John', 'Matt'], age: [36, 24]}
 * 
 * // Replaces inconsistent/missing values with `null`
 * ```
 */
export function transposeArray<T extends {[k: string]: any}>(
  arr: T[],
): {[k: string]: (T[keyof T] | null)[]} {
  const product: {[k: string]: (T[keyof T] | null)[]} = {}

  for (const obj of arr) {
    // Initialize product object
    for (let key in obj) {
      product[key] = []
    }
  }

  for (const obj of arr) {
    for (let key in product) {
      const value = obj[key] ?? null
      product[key]!.push(value)
    }
  }

  return product
}

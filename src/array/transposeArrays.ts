/**
 * ```ts
 * const obj = {name: ['John', 'Matt'], age: [36, 24]}
 * const transposed = transposeArrays(obj) // [{name: 'John', age: 36}, {name: 'Matt', age: 24}]
 * ```
 */
export function transposeArrays<T extends {[k: string]: Array<any>}>(
  obj: T,
): Array<{[k in keyof T]: T[keyof T][number] | null}> {
  const product: Array<{[k in keyof T]: T[keyof T][number] | null}> = []

  const longestArrLength = Object.values(obj).reduce((length, arr) => {
    return arr.length > length ? arr.length : length
  }, 0)

  for (let i = 0; i < longestArrLength; ++i) {
    let key: keyof typeof obj
    for (key in obj) {
      const arr = obj[key]!
      const value = arr[i] ?? null
      if (product[i] == null) product[i] = {} as any
      product[i]![key] = value
    }
  }

  return product
}

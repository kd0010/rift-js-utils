export function arrToObj<T, V>(
  arr: T[],
  value?: V,
): {[k: string]: V extends (string | number | boolean | undefined | null | object) ? V : T} {
  const product: {[k: string]: V extends (string | number | boolean | undefined | null | object) ? V : T} = {}

  for (const item of arr) {
    // Accept only strings or numbers as keys
    if (!(
      typeof item == 'number' ||
      typeof item == 'string'
    )) continue

    // @ts-ignore All scenarios are valid for assignment
    product[item] = value === undefined ? item : value
  }

  return product
}

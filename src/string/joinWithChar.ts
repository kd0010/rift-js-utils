/**
 * Concatenates all strings provided into one string,
 * separated by the desired character.
 * 
 * Ignores nullish values and empty strings.
 */
export function joinWithChar(
  char: string,
  ...args: (string | number | false | undefined | null)[]
): string {
  let productSt = ''

  for (let i = 0; i < args.length; ++i) {
    let st = args[i]
    if (st === false || st == null || st === '') continue
    if (i != 0) productSt += char
    productSt += st
  }

  return productSt
}

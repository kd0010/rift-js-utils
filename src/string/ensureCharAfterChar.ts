/**
 * Ensures that there will be a desired character
 * after every `targetChar` in `string`.
 */
export function ensureCharAfterChar(
  string: string,
  targetChar: string,
  desiredChar: string,
) {
  let stringParts = string.split(targetChar)
  let newStringParts: string[] = []
  let skipFirst = true
  for (let st of stringParts) {
    if (skipFirst) {
      newStringParts.push(st)
      skipFirst = false
      continue
    }
    if (st[0] != desiredChar) newStringParts.push(desiredChar + st)
    else newStringParts.push(st)
  }
  return newStringParts.join(targetChar)
}

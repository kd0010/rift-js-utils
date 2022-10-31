/**
 * Ensures that there will be a desired character
 * after every target character in a string.
 */
export function ensureCharAfterChar(
  st: string,
  targetChar: string,
  desiredChar: string,
) {
  let stringParts = st.split(targetChar)
  let newStringParts: string[] = []
  let skipFirst = true
  for (let st of stringParts) {
    if (skipFirst) {
      newStringParts.push(st)
      skipFirst = false
      continue
    }
    if (st[ 0 ] != desiredChar) newStringParts.push(desiredChar + st)
    else newStringParts.push(st)
  }
  return newStringParts.join(targetChar)
}

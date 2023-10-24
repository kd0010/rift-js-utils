/**
 * The randomized ID returned consists of 18 randomized characters
 * with no special meaning followed by a dash (`-`), followed by the
 * millisecond timestamp that has been converted to a string of
 * radix 36.
 */
export function getUniqueId(): string {
  const random = () => Math.random().toString(36).substring(2, 11)

  let st = random() + random()
  let st2 = ''
  let decider = ''

  // Make `decider` with least possible calls of `Math.random()`
  while (decider.length < st.length) {
    decider += Math.random().toString().substring(2)
  }

  // Randomize upper-case / lower-case
  for (let i = 0; i < 18; ++i) {
    let char = st[i]!
    if (decider[i]! >= '5') st2 += char.toUpperCase()
    else st2 += char
  }

  let id = st2 + '-' + Date.now().toString(36)
  return id
}

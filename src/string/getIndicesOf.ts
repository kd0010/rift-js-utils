/**
 * Gets indices of where the string matches in `text`.
 */
export function getIndicesOf(
  text: string,
  search: string | RegExp,
): number[] {
  const indices: number[] = []
  if (!(search instanceof RegExp)) search = new RegExp(search, 'g')
  let match

  while ((match = search.exec(text)) != null) {
    indices.push(match.index)
  }

  return indices
}

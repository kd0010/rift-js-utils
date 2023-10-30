export function flipObj(
  obj: {[k: string]: string | number},
): {[k: string]: string} {
  const newObj: {[k: string]: string} = {}
  for (const key in obj) {
    const value = obj[key]!
    newObj[value] = key
  }
  return newObj
}

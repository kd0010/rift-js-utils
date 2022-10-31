/**
 * Determines whether the provided value is a mapped key–value pair object.
 */
export function isMappedObject(
  obj: any,
): obj is {[k: string]: any} {
  return (
    typeof obj == 'object' &&
    obj !== null &&
    !Array.isArray(obj)
  )
}

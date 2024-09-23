import {isMappedObject} from './isMappedObject'

/**
 * Ensures provided string contains a mapped object or an array.
 */
export function ensureObj(
  string: string,
): {[k: string]: any} | null {
  try {
    const data = JSON.parse(string)
    if (isMappedObject(data)) return data
    return null
  } catch (err) {
    return null
  }
}

import { isArray } from '../array/isArray'
import { isMappedObject } from './isMappedObject'

/**
 * Ensures provided string contains a mapped object or an array.
 */
export default function ensureJSON(
  string: string,
): {[k: string]: any} | any[] | null {
  try {
    const data = JSON.parse(string)
    if (
      isMappedObject(data) ||
      isArray(data)
    ) {
      return data
    }
    return null
  } catch(e) {
    return null
  }
}

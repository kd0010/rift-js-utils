import {isArray} from './isArray'

/**
 * Ensures provided string contains an array.
 */
export function ensureArray<T=any>(
  string: string,
): Array<T> | null {
  try {
    const data = JSON.parse(string)
    if (isArray(data)) return data
    return null
  } catch (err) {
    return null
  }
}

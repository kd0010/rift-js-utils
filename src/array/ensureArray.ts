import { isArray } from './isArray'

/**
 * Ensures provided string contains an array.
 */
export function ensureObj<T=any>(
  string: string,
): T[] | null {
  try {
    const data = JSON.parse(string)
    if (isArray(data)) return data
    return null
  } catch(e) {
    return null
  }
}

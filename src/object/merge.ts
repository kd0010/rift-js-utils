import { isMappedObject } from './isMappedObject'

/**
 * Merge two mapped objects with potential nested values and objects
 * while keeping properties on all depth levels.
 * 
 * Mutates `target`.
 */
export function merge(
  target: {[k: string]: any},
  source: {[k: string]: any},
): {[k: string]: any} {
  for (let key in source) {
    let sourceValue = source[key]
    let existingValue = target[key]

    // Ignore any explicit `undefined`s
    if (sourceValue === undefined) continue

    if (Array.isArray(sourceValue)) {
      target[key] = [
        ...(Array.isArray(existingValue) ? existingValue : []),
        sourceValue,
      ]
    } else if (isMappedObject(sourceValue)) {
      if (!isMappedObject(existingValue)) target[key] = {}
      merge(target[key], sourceValue)
    } else {
      // Booleans, numbers, strings etc.
      target[key] = sourceValue
    }
  }

  return target
}

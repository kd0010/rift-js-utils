import { isMappedObject } from './isMappedObject'

/**
 * Returns an object containing the missing fields from `target`
 * based on provided `structure`, or `null`.
 * 
 * Only keys matter in `structure`, value can be anything.
 */
export function getMissingFields(
  target: {[k: string]: any},
  structure: {[k: string]: any},
): {[k: string]: any} | null {
  const missingFields: {[k: string]: any} = {}

  for (const key in structure) {
    const structureValue = structure[key]
    const targetValue = target[key]

    if (isMappedObject(structureValue)) {
      if (!isMappedObject(targetValue)) {
        missingFields[key] = 'missing'
      } else {
        const nestedMissingFields = getMissingFields(targetValue, structureValue)
        if (nestedMissingFields) missingFields[key] = nestedMissingFields
      }
    } else {
      if (!Object.keys(target).includes(key)) missingFields[key] = 'missing'
    }
  }

  if (Object.keys(missingFields).length) return missingFields
  return null
}

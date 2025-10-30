import {isMappedObject} from './isMappedObject'

/**
 * Validates a `target` object against a defined `structure`.
 * 
 * A structure can have keys and nested objects inside them,
 * all properties will be checked against `target` object.
 * 
 * In `structure`, a key's value can be 'string', 'number' etc.
 * It can be regex.
 * It can be an array that contains specific values.
 */
export function validate(
  target: {[k: string]: any},
  structure: ValidationStructure,
): ValidateResponse {
  function validateValue(
    value: any,
    validator: ValidationDataType,
  ): boolean {
    switch (validator) {
      case 'array':
        return Array.isArray(value)
      case 'object':
        return isMappedObject(value)
      case 'undefined':
        return value === undefined
      case 'null':
        return value === null
      default:
        return typeof value == validator
    }
  }

  function validateValueAgainstMany(
    value: any,
    validators: Array<ValidationDataType> | Array<any>,
  ): boolean {
    for (let validator of validators) {
      if (isValidationDataType(validator) && validateValue(value, validator)) {
        return true
      } else if (value === validator) {
        return true
      }
    }

    return false
  }

  let isObjectValid = true
  const incorrectFields: Array<string> = []
  let currentBase: string = ''
  function _validate(
    target: {[k: string]: any},
    structure: ValidationStructure,
  ): ValidateResponse {
    for (let key in structure) {
      const validator = structure[key]
      const value = target[key]
      const isPropertyOptional = key.endsWith('_')
      let isValid = false

      if (isPropertyOptional && value === undefined) continue

      // Single data type
      if (typeof validator == 'string' && isValidationDataType(validator)) {
        isValid = validateValue(value, validator)
      // Multiple data types and/or specific values
      } else if (Array.isArray(validator)) {
        isValid = validateValueAgainstMany(value, validator)
      // Regex validation type
      } else if (validator instanceof RegExp) {
        isValid = typeof value == 'string' && value.match(validator) != null
      // Going deeper & continuing
      } else if (isMappedObject(validator) && isMappedObject(value)) {
        isValid = true
        currentBase += currentBase.length ? `.${key}` : key
        _validate(value, validator)
        currentBase = ''
      }

      // Do stuff based on validity of property
      if (!isValid) {
        isObjectValid = false // takes one property for entire object to be invalid

        let path = currentBase.length ? `${currentBase}.${key}` : key
        incorrectFields.push(path)
      }
    }

    return {
      isValid: isObjectValid,
      incorrectFields,
    }
  }

  return _validate(target, structure)
}

export interface ValidationStructure {
  [k: string]: (
    | ValidationDataType
    | Array<ValidationDataType>
    | Array<any>
    | RegExp
    | ValidationStructure // nested object / continuation
  )
}

export interface ValidateResponse {
  isValid: boolean
  incorrectFields: Array<string>
}

const ValidateDataTypes = {
  'string': 'string',
  'number': 'number',
  'boolean': 'boolean',
  'object': 'object',
  'array': 'array',
  'null': 'null',
  'undefined': 'undefined',
  'function': 'function',
} as const

export type ValidationDataType = keyof typeof ValidateDataTypes

export function isValidationDataType(value: string | null | undefined): value is ValidationDataType {
  return typeof value == 'string' && value in ValidateDataTypes
}

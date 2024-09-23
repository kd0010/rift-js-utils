import {joinWithChar} from './joinWithChar'

/**
 * Concatenates all strings provided into one string,
 * separated by the space character.
 * 
 * Ignores nullish values and empty strings.
 */
export function joinWithSpaces(
  ...args: (string | number | false | undefined | null)[]
) {
  return joinWithChar(' ', ...args)
}

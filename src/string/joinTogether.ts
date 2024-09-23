import {joinWithChar} from './joinWithChar'

/**
 * Concatenates all strings provided into one string.
 * 
 * Ignores nullish values and empty strings.
 */
export function joinTogether(
  ...args: (string | number | false | undefined | null)[]
) {
  return joinWithChar('', ...args)
}

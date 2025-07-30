import {mkdirSync, writeFileSync} from 'fs'
import * as path from 'path'

/**
 * Creates the `out` function.
 * @default directory 'tmp'
 */
export function createOut(
  directory: string='tmp',
) {
  directory ||= 'tmp' // Empty string case
  
  /**
   * Serves as a useful development tool with which to output data structures to a file.
   * @default title 'out'
   * @default fileExtension 'json'
   */
  const out = function out(
    data: any,
    title: string='out',
    fileExtension: string='json',
  ) {
    title ||= 'out' // Empty string case
    const dotChar = fileExtension ? '.' : ''
    const filePath = path.join(directory, `${title}${dotChar}${fileExtension}`)
    const dir = path.dirname(filePath)
    mkdirSync(dir, {recursive: true})
    writeFileSync(filePath, typeof data == 'string' ? data : JSON.stringify(data), {encoding: 'utf-8'})
  }

  return out
}

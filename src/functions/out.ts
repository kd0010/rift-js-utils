import {writeFileSync} from 'fs'

export function out(
  data: any,
  title: string='out',
  fileExtension: string='json',
) {
  writeFileSync(`tmp/${title}.${fileExtension}`, typeof data == 'string' ? data : JSON.stringify(data), {encoding: 'utf-8'})
}

export function isValidNumber(
  num: any,
): num is number {
  return typeof num == 'number' && !isNaN(num)
}

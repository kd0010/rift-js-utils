export function isNumeric(
  number: number | null | undefined,
): number is number {
  return typeof number == 'number' && !Number.isNaN(number)
}

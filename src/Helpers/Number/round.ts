/**
 * Rounds a number to `precision`-digits decimal positions.
 */
export function round(
  targetNum: number,
  precision: number,
): number {
  if (precision < 0 || precision > 33) {
    throw new Error(`Precision not in bounds [0:33], was: ${precision}`)
  }

  const coefficient = 10 ** precision
  return Math.round(targetNum * coefficient) / coefficient
}

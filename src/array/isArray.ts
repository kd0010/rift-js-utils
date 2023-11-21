export function isArray(
  variable: any,
): variable is any[] {
  return Array.isArray(variable)
}

export function isArray(
  variable: any,
): variable is Array<any> {
  return Array.isArray(variable)
}

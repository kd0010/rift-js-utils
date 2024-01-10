/**
 * If the provided timestamp is not a valid millisecond- or second-timestamp
 * (it isn't 10 or 13 characters long),
 * then it is returned without any process taking place.
 */
export function ensureTimestampFormat(
  format: 'millisecond' | 'second',
  timestamp: number,
): number {
  let timestampLength = timestamp.toString().length
  let timestampType: 'millisecond' | 'second' | 'neither' = 'neither'

  if (timestampLength == 10) timestampType = 'second'
  if (timestampLength == 13) timestampType = 'millisecond'

  if (timestampType == 'neither') return timestamp

  // If the existing format does not match the desired format,
  // convert it to the other.
  if (timestampType != format) {
    if (format == 'millisecond') return timestamp * 1000
    else return Math.floor(timestamp / 1000)
  } else {
    return timestamp
  }
}

export function reduceNumber(
  number: number,
): number[] {
  if (number < 0) number = -number // make positive

  let accum: number = number
  let chain: number[] = [accum]

  while (accum > 9) {
    let nextAccum = 0
    for (let num of accum.toString()) {
      nextAccum += Number(num)
    }
    chain.push(nextAccum)
    accum = nextAccum
  }

  chain.reverse()

  return chain
}

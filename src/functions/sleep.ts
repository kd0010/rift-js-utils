/**
 * `Date`-based equivalent to `setTimeout`.
 */
export function sleep(
  durationMs: number,
) {
  const checkIntervalMs = 2592
  const releaseTs = Date.now() + durationMs

  return new Promise<void>(async release => {
    let nowTs: number
    while ((nowTs = Date.now()) < releaseTs) {
      // Wait before checking again
      const remainingWaitMs = releaseTs - nowTs
      if (remainingWaitMs > checkIntervalMs) {
        await new Promise(_ => setTimeout(_, checkIntervalMs))
      } else {
        const bufferMs = 1
        await new Promise(_ => setTimeout(_, remainingWaitMs + bufferMs))
      }
    }
    release()
  })
}

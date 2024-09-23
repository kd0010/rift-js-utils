import {sleep} from './sleep'

/**
 * `Date`-based equivalent to `setInterval`.
 */
export function repeat(
  fnToRepeat: () => void,
  intervalMs: number,
) {
  let continueLooping: boolean = true
  function clear() {
    continueLooping = false
  }

  const beginTs = Date.now()
  const state = {
    targetTs: beginTs + intervalMs,
    diffMs: 0,
  }

  ;(async () => {
    while (continueLooping) {
      fnToRepeat()
      
      await sleep(intervalMs + state.diffMs)
  
      const nowTs = Date.now()
      state.diffMs = state.targetTs - nowTs // negative – too late; positive – too early
      state.targetTs += intervalMs
    }
  })()

  return clear
}

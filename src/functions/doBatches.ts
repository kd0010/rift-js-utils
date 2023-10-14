import { sleep } from './sleep'

/**
 * Execute multiple asynchronous functions at once, in batches.
 */
export async function doBatches<T>(
  data: T[],
  onItem: DoBatchesOnItem<T>,
  {
    batchSize=4,
    betweenBatchesWaitTime=264,
    onBetweenBatches=function(){},
    perItemWaitTime=0,
    perItemWaitTimePlusOrMinus,
    limit,
  }: DoBatchesOptions={},
) {
  if (perItemWaitTimePlusOrMinus == null) {
    perItemWaitTimePlusOrMinus = 0.5 * perItemWaitTime
  }

  let perItemWaitTimeBase = Math.max(
    0,
    perItemWaitTime - perItemWaitTimePlusOrMinus,
  )

  let perItemWaitTimeFullRange =
    perItemWaitTimePlusOrMinus * 2
    // Subtract, if too much
    + Math.min(0, perItemWaitTime - perItemWaitTimePlusOrMinus)

  const getPerItemWaitTime = () => {
    return perItemWaitTimeBase + Math.floor(Math.random() * perItemWaitTimeFullRange)
  }

  let currentIdx = 0
  while (currentIdx < data.length) {
    let batchPromises: Promise<void>[] = []
    for (let i = 0; (i < batchSize) && (currentIdx < data.length); ++i) {
      // Wait if halted
      await batchesHalt.checkAndWait()

      // Wait if limit is reached
      let currentItemCount = currentIdx + 1
      let previousItemCount = currentItemCount - 1
      if (
        limit &&
        previousItemCount != 0 &&
        previousItemCount % limit.itemAmount == 0
      ) {
        // console.log('waiting on this limit...') // TEMPDEV
        await sleep(limit.duration)
      }

      let itemIdx = currentIdx++
      batchPromises.push(new Promise(async resolve => {
        if (perItemWaitTime) {
          await sleep(getPerItemWaitTime())
        }
        await onItem(data[itemIdx]!)
        resolve()
      }))
    }

    await Promise.all(batchPromises)
    
    // Wait before next batch
    if (betweenBatchesWaitTime) {
      onBetweenBatches()
      await sleep(betweenBatchesWaitTime)
    }
  }

  // Clean up after all batches by resetting a potentially pending halt.
  batchesHalt.resetPendingHalt()
}

export type DoBatchesOnItem<T> = (item: T) => Promise<void>

export interface DoBatchesOptions {
  /**
   * Amount of items to do at once.
   * 
   * Default: `4`
   */
  batchSize?: number
  /**
   * Milliseconds.
   * 
   * Default: `264`
   */
  betweenBatchesWaitTime?: number
  onBetweenBatches?: () => void
  /**
   * Set a base wait time (milliseconds) for each item
   * that then gets randomly increased or decreased slightly
   * based on `perItemWaitTimePlusOrMinus`.
   * This will make it wait before executing on the item
   * in its current batch.
   * It is useful if it is needed to disperse function calls
   * rather than allowing them to start immediately and at once in batch.
   * This will not slow down any batch by much
   * as it is awaited in parallel inside batch;
   * it simply shifts function starting points.
   * 
   * Default: `0`
   */
  perItemWaitTime?: number
  /**
   * Default is 50% of `perItemWaitTime`.
   */
  perItemWaitTimePlusOrMinus?: number
  limit?: {
    /**
     * Amount of items allowed to be executed within `duration`.
     */
    itemAmount: number
    /** Milliseconds. */
    duration: number
  }
}

/**
 * Halts batches for a provided milliseconds duration.
 */
export const haltBatches: typeof batchesHalt.halt = function(
  durationMs,
  haltAfter,
) {
  batchesHalt.halt(durationMs, haltAfter)
}

const batchesHalt = {
  state: {
    halted: false,
    /** Milliseconds. */
    haltDuration: 0,
    /** Item count. */
    haltAfter: 0,
  },
  halt(
    durationMs: number,
    /** Item amount to halt after. */
    haltAfter: number=0,
  ) {
    this.state.halted = true
    this.state.haltDuration = durationMs
    this.state.haltAfter = haltAfter
  },
  async checkAndWait() {
    if (!this.state.halted) return
    if (this.state.haltAfter--) return
    
    await sleep(this.state.haltDuration)

    this.resetPendingHalt()
  },
  resetPendingHalt() {
    this.state.halted = false
    this.state.haltDuration = 0
    this.state.haltAfter = 0
  },
}

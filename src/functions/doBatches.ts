/**
 * Execute multiple asynchronous functions at once, in batches.
 */
export async function doBatches<T>(
  data: T[],
  onItem: (item: T) => Promise<void>,
  {
    batchSize=4,
    betweenBatchesWaitTime=264,
    perItemWaitTime=0,
    perItemWaitTimePlusOrMinus,
  }: {
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
    /**
     * Set a base wait time for each item
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
  }={},
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
      let itemIdx = currentIdx++
      batchPromises.push(new Promise(async resolve => {
        if (perItemWaitTime) {
          await new Promise(r => setTimeout(r, getPerItemWaitTime()))
        }
        await onItem(data[itemIdx]!)
        resolve()
      }))
    }

    await Promise.all(batchPromises)
    
    // Wait before next batch
    if (betweenBatchesWaitTime) {
      await new Promise(r => setTimeout(r, betweenBatchesWaitTime))
    }
  }
}

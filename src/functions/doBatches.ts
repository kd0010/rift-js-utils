/**
 * Execute multiple asynchronous functions at once, in batches.
 */
export async function doBatches<T>(
  data: T[],
  onItem: (item: T) => Promise<void>,
  {
    batchSize=4,
    betweenBatchesWaitTime=0,
    perItemWaitTime=0,
    perItemWaitTimePlusOrMinus,
  }: {
    /**
     * Amount of batches to do at once.
     * 
     * Default: `4`
     */
    batchSize?: number
    /**
     * Milliseconds.
     * 
     * Default: `0`
     */
    betweenBatchesWaitTime?: number
    /**
     * Set a base wait time for each item
     * that then gets randomly increased or decreased slightly
     * based on `perItemWaitTimePlusOrMinus`.
     * This will make it wait before executing on the item
     * in its current batch.
     * It is useful if it is needed to disperse function calls
     * rather than allowing the whole batch to be executed at once.
     * 
     * Default: `0`
     */
    perItemWaitTime?: number
    /**
     * Default is 50% of `perItemWaitTime`.
     */
    perItemWaitTimePlusOrMinus?: number
  },
) {
  if (perItemWaitTimePlusOrMinus == null) {
    perItemWaitTimePlusOrMinus = 0.5 * perItemWaitTime
  }

  let perItemWaitTimeBase = Math.max(
    0,
    perItemWaitTime - perItemWaitTimePlusOrMinus,
  )

  let perItemWaitTimeFullRange = perItemWaitTimePlusOrMinus * 2

  const getPerItemWaitTime = () => {
    return perItemWaitTimeBase + Math.floor(Math.random() * perItemWaitTimeFullRange)
  }

  // TEMP
  for (let i = 0; i < 100; ++i) {
    console.log(getPerItemWaitTime()) // TEMP
  }
  throw 'stop' // TEMP

  let currentIdx = 0
  while (currentIdx < data.length) {
    let batchPromises: Promise<void>[] = []
    for (let i = 0; (i < batchSize) && (currentIdx < data.length); ++i) {
      batchPromises.push(new Promise(async resolve => {
        if (perItemWaitTime) {
          await new Promise(r => setTimeout(r, perItemWaitTime))
        }
        await onItem(data[currentIdx]!)
        resolve()
      }))
      ++currentIdx
    }

    await Promise.all(batchPromises)
    
    // Wait before next batch
    if (betweenBatchesWaitTime) {
      await new Promise(r => setTimeout(r, betweenBatchesWaitTime))
    }
  }

  // TEMP stay
  while (currentIdx < data.length) {
    break
    let promisesBatch: Promise<void>[] = []
    for (let i = 0; i < batchSize && currentIdx < data.length; ++i) {
      promisesBatch.push(onItem(data[ currentIdx ]!))
      ++currentIdx
    }
    await Promise.all(promisesBatch)

    // Wait some time before processing the next batch
    await new Promise(r => setTimeout(r, betweenBatchesWaitTime))
  }
}

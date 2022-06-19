import { useState } from 'preact/hooks'
import { useCounter } from './useCounter'

export function useStateObject<T>(
  defaultState: T
): [T, () => void] {
  const [refreshCount, refresh] = useCounter()
  const [StateObject] = useState(defaultState)

  return [StateObject, refresh]
}

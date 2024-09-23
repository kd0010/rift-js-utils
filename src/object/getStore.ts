import {isMappedObject} from './isMappedObject'

const globalStores: {[k: string]: any} = {}

export function getStore(
  storeName: string,
  query: string,
) {
  // Initialize a new store
  if (!(storeName in globalStores)) {
    globalStores[storeName] = {
      _listeners: {},
    }
  }

  const store = globalStores[storeName]

  // Initialize listeners
  if (!Array.isArray(store._listeners[query])) store._listeners[query] = []

  const listeners: StoreListener[] = store._listeners[query]
  const properties = query.split('/')
  const lastPropertyName = properties[properties.length - 1] ?? ''

  // Iterate through the properties found in `query`.
  // Initialize each property's value with a new mapped object,
  // if there isn't one, except the last property.
  // Save the last property's value and its base object onto variables.
  let queriedValue: any
  let queriedValueBase = store
  for (const propertyName of properties) {
    if (propertyName == '_listeners') throw new Error('Query can\'t include "_listeners"')

    if (propertyName != lastPropertyName) {
      let nextBase = queriedValueBase[propertyName]
      if (!isMappedObject(nextBase)) queriedValueBase[propertyName] = {}

      queriedValueBase = queriedValueBase[propertyName]
    }

    queriedValue = queriedValueBase[propertyName]
  }

  return {
    get() {
      return queriedValueBase[lastPropertyName]
    },
    set(
      newValue: any,
    ) {
      let oldValue = queriedValue
      queriedValueBase[lastPropertyName] = newValue

      // Call listeners
      listeners.forEach(fn => fn(newValue, oldValue))
    },
    /**
     * Deletes field.
     */
    delete() {
      delete queriedValueBase[lastPropertyName]
    },
    addListener(
      callback: StoreListener,
    ) {
      listeners.push(callback)
    },
    removeListener(
      callback: StoreListener,
    ) {
      for (let i = 0; listeners.length; ++i) {
        const cb = listeners[i]
        if (cb === callback) listeners[i] = () => {}
      }
    },
    ref(
      path: string,
    ) {
      return getStore(storeName, `${query}/${path}`)
    },
    /**
     * Clears all data from this store.
     */
    clearData() {
      globalStores[storeName] = {
        _listeners: {},
      }
    },
    /**
     * Gets all of this store's data, for debug purposes.
     */
    _getData() {
      return globalStores[storeName]
    },
  }
}

export type StoreListener = (
  newValue: any,
  oldValue: any,
) => void

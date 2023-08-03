/**
 * Puts a value in object at specified index in another object or array.
 * Value of `targetProperty` must be an object or an array
 * or it will be overwritten.
 * 
 * Ensures an easy time assigning a value
 * by initializing the object value in case it is not there yet.
 */
export function put<T extends {[k: string]: any}>(
  targetObj: T,
  targetProperty: keyof T,
  key: keyof T[keyof T],
  value: T[keyof T][keyof T[keyof T]],
): void {
  if (typeof targetObj[targetProperty] != 'object') {
    if (typeof key == 'number') targetObj[targetProperty] = [] as T[keyof T]
    else targetObj[targetProperty] = {} as T[keyof T]
  }

  targetObj[targetProperty][key] = value
}

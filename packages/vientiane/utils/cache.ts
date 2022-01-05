import { deepCopy } from './utils'

const cache: unknown[] = []

export function getCache() {
  return deepCopy(cache)
}

export function addCache<T>(data: T) {
  cache.push(data)
}

export function clearCache() {
  cache.length = 0
}

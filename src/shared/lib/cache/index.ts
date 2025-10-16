/**
 * Cache utilities
 *
 * Exports enhanced cache system with Facts patterns.
 */

export { Cache, CacheEntry } from './Cache'
export { CachedApiCall } from './CachedApiCall'
export { QueryCacheFacade, createQueryCacheFacade } from './QueryCacheFacade'
export type { QueryKey, ItemPredicate, ItemUpdater } from './QueryCacheFacade'

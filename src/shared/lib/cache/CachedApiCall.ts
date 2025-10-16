import { apiClient } from '@/shared/api/client'
import { Cache } from './Cache'

type UrlProvider<TCacheKey> = (key: TCacheKey) => string
type DataFilter<T, TCacheKey> = (data: T[], key: TCacheKey) => T[]
type OnDataLoaded<TCacheKey> = (key: TCacheKey) => void

export class CachedApiCall<T, TCacheKey> {
  public name: string
  public cache: Cache<T, TCacheKey>
  private urlProvider: UrlProvider<TCacheKey>
  private dataFilter: DataFilter<T, TCacheKey> | null
  private onDataLoaded: OnDataLoaded<TCacheKey> | null

  constructor(
    name: string,
    urlProvider: UrlProvider<TCacheKey>,
    dataFilter: DataFilter<T, TCacheKey> | null = null,
    onDataLoaded: OnDataLoaded<TCacheKey> | null = null,
  ) {
    this.name = name
    this.cache = new Cache<T, TCacheKey>(this.name)
    this.urlProvider = urlProvider
    this.dataFilter = dataFilter
    this.onDataLoaded = onDataLoaded
  }

  public clearCache() {
    this.cache.clear()
  }

  public async refresh(key: TCacheKey): Promise<T[]> {
    return this.loadData(key)
  }

  public async getData(key: TCacheKey): Promise<T[]> {
    const entry = this.cache.isReset ? null : this.cache.getCacheEntry(key)
    if (entry && !entry.stale) {
      return entry.items
    }
    return this.loadData(key)
  }

  private async loadData(key: TCacheKey): Promise<T[]> {
    const url = this.urlProvider(key)
    if (!url) throw new Error('URL was not provided')

    const response = await apiClient.get<T[]>(url)
    let data = response.data

    if (this.dataFilter) {
      data = this.dataFilter(data, key)
    }

    this.cache.setCacheEntry(key, data)

    if (this.onDataLoaded) {
      this.onDataLoaded(key)
    }

    return data
  }
}

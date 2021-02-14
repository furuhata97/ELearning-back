import ICacheProvider from '../models/ICacheProvider';

export default class FakeCacheProvider implements ICacheProvider {
  private cache = new Map<string, any>();

  public async save(key: string, value: any): Promise<void> {
    this.cache.set(key, value);
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const cacheRecover = this.cache.get(key);

    return cacheRecover;
  }

  public async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
  }
}

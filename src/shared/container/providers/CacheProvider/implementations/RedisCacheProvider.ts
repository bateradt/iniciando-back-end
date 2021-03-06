/* eslint-disable @typescript-eslint/no-explicit-any */
import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProviderNew';
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);
        const pipeline = this.client.pipeline();

        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec();

        // console.log('invalidatePrefix');
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async save(key: string, value: any): Promise<void> {
        this.client.set(key, JSON.stringify(value));
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async recover<T>(key: string): Promise<T | undefined> {
        const data = await this.client.get(key);
        if (!data) {
            return undefined;
        }
        const parseData = JSON.parse(data);
        return parseData;
    }
}

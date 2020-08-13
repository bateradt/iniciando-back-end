/* eslint-disable @typescript-eslint/no-explicit-any */
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProviderNew';

interface ICacheData {
    [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
    private client: ICacheData = {};

    async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.client).filter(key =>
            key.startsWith(`${prefix}:`),
        );

        keys.forEach(key => {
            delete this.client[key];
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async save(key: string, value: any): Promise<void> {
        this.client[key] = JSON.stringify(value);
    }

    public async invalidate(key: string): Promise<void> {
        delete this.client[key];
    }

    public async recover<T>(key: string): Promise<T | undefined> {
        const data = this.client[key];
        if (!data) {
            return undefined;
        }
        const parseData = JSON.parse(data) as T;
        return parseData;
    }
}

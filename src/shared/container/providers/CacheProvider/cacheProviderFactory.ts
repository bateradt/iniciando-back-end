import { container } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

const cacheProviderFactory = {
    redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    cacheProviderFactory.redis,
);

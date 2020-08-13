import { container } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProviderNew';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

const cacheProviderFactory = {
    redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    RedisCacheProvider,
);

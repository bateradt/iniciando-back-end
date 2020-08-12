import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import GetUsersService from '@modules/users/services/GetUsersService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fake/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fake/FakeCacheProvider';

describe('GetUser', () => {
    it('should be able to get all users', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const fakeCacheProvider = new FakeCacheProvider();
        const createUser = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );

        await createUser.execute({
            name: 'Jonh Doe',
            email: 'jonhdoe@gmail.com',
            password: '123456',
        });

        await createUser.execute({
            name: 'Jonh Doe Duo',
            email: 'jonhdoeduo@gmail.com',
            password: '123456',
        });

        const getUsers = new GetUsersService(fakeUsersRepository);

        const users = await getUsers.execute();

        expect(users).toHaveLength(2);
    });
});

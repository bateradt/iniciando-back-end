import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import CreateUsersService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fake/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fake/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new users with the same email that another user', async () => {
        await createUser.execute({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await expect(
            createUser.execute({
                email: 'jonhdoe@gmail.com',
                name: 'Jonh Doe',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

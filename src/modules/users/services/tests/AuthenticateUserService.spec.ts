import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import AuthenticateUsersService from '@modules/users/services/AuthenticateUserService';
import CreateUsersService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUsersService;
let createUser: CreateUsersService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        authenticateUser = new AuthenticateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        createUser = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should not be able to authenticate user that do not exist', async () => {
        await expect(
            authenticateUser.execute({
                email: 'jonhdoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to authenticate user', async () => {
        await createUser.execute({
            name: 'Jonh Doe',
            email: 'jonhdoe@gmail.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'jonhdoe@gmail.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });

    it('should not be able to authenticate user that password is invalid', async () => {
        await createUser.execute({
            name: 'Jonh Doe',
            email: 'jonhdoe@gmail.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'jonhdoe@gmail.com',
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

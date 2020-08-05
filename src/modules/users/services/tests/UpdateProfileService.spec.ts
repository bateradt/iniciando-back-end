import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fake/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile of user', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const upUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Jonh Doe da Silva',
            email: 'jds@gmail.com',
        });

        expect(upUser.name).toBe('Jonh Doe da Silva');
        expect(upUser.email).toBe('jds@gmail.com');
    });

    it('should not be able to change to another user email it been used', async () => {
        await fakeUsersRepository.create({
            email: 'jds@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            email: 'testando@gmail.com',
            name: 'Testando',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Jonh Doe da Silva',
                email: 'jds@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const upUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Jonh Doe da Silva',
            email: 'jds@gmail.com',
            password: '123123',
            old_password: '123456',
        });

        expect(upUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Jonh Doe da Silva',
                email: 'jds@gmail.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Jonh Doe da Silva',
                email: 'jds@gmail.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the profile of non-existing user', async () => {
        await expect(
            updateProfileService.execute({
                user_id: 'non-id',
                email: 'jonhdoe@gmail.com',
                name: 'Jonh Doe',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

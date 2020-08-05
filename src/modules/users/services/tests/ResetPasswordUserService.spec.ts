import ResetPasswordUserService from '@modules/users/services/ResetPasswordUserService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fake/FakeUsersTokenRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPasswordUserService: ResetPasswordUserService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPasswordUserService = new ResetPasswordUserService(
            fakeUsersRepository,
            fakeUsersTokenRepository,
            fakeHashProvider,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const { token } = await fakeUsersTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordUserService.execute(token, '123123');

        const userChanged = await fakeUsersRepository.findByID(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(userChanged?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPasswordUserService.execute('token', '123123'),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUsersTokenRepository.generate(
            'non-existing-user',
        );

        await expect(
            resetPasswordUserService.execute(token, '123123'),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password if passed more than 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const { token } = await fakeUsersTokenRepository.generate(user.id);

        // função para interceptar o retorno de um função, pode ser qualquer coisa
        //
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordUserService.execute(token, '123123'),
        ).rejects.toBeInstanceOf(AppError);
    });
});

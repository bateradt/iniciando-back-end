import SendForgotPasswordEmailUserService from '@modules/users/services/SendForgotPasswordEmailUserService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fake/FakeUsersTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmailUserService: SendForgotPasswordEmailUserService;

describe('SendForgotPasswordEmailUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        sendForgotPasswordEmailUserService = new SendForgotPasswordEmailUserService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUsersTokenRepository,
        );
    });

    it('should be able to recover a password from a valid user with his email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await sendForgotPasswordEmailUserService.execute('jonhdoe@gmail.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a password from a non existing user', async () => {
        await expect(
            sendForgotPasswordEmailUserService.execute('jonhdoe@gmail.com'),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a forgot password token', async () => {
        // const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await sendForgotPasswordEmailUserService.execute('jonhdoe@gmail.com');

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});

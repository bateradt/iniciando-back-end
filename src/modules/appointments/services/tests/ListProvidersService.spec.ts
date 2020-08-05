import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to show the providers less the user logged', async () => {
        const user1 = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            email: 'jonhtre@gmail.com',
            name: 'Jonh tre',
            password: '123456',
        });

        const userLogged = await fakeUsersRepository.create({
            email: 'jonhqua@gmail.com',
            name: 'Jonh qua',
            password: '123456',
        });

        const list = await listProvidersService.execute({
            user_id: userLogged.id,
        });

        expect(list).toEqual([user1, user2]);
    });

    it('should not be able to show the providers whith empty providers', async () => {
        await expect(
            listProvidersService.execute({ user_id: 'non-id' }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

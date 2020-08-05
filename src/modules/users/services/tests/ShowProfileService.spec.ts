import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfileService = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile of user', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        const profile = await showProfileService.execute({ user_id: user.id });

        expect(profile.name).toBe('Jonh Doe');
        expect(profile.email).toBe('jonhdoe@gmail.com');
    });

    it('should not be able to show the profile of non-existing user', async () => {
        await expect(
            showProfileService.execute({ user_id: 'non-id' }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

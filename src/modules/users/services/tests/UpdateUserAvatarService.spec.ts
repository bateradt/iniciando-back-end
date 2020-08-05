import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeStoragedProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStoragedProvider: FakeStoragedProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStoragedProvider = new FakeStoragedProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStoragedProvider,
        );
    });
    it('should be able to update avatar from user', async () => {
        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non exist user', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: '123',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating a user with new avatar', async () => {
        const deleteFile = jest.spyOn(fakeStoragedProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            email: 'jonhdoe@gmail.com',
            name: 'Jonh Doe',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});

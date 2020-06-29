import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface RequestDTO {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    public async Execute({
        user_id,
        avatarFileName,
    }: RequestDTO): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated user can change your avatar',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            let userAvatarFileExists;
            try {
                userAvatarFileExists = await fs.promises.stat(
                    userAvatarFilePath,
                );
            } catch {
                userAvatarFileExists = undefined;
            }

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;

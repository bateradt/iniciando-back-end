import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities//User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashNProvider';

interface IRequestDTO {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
        // console.log(usersRepository);
    }

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequestDTO): Promise<User> {
        const user = await this.usersRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userEmailAlreadyInUse = await this.usersRepository.findByEmail(
            email,
        );

        if (userEmailAlreadyInUse && userEmailAlreadyInUse.id !== user_id) {
            throw new AppError('This e-mail already in use');
        }

        if (password && !old_password) {
            throw new AppError(
                'You must have to inform the old password to change to a new password',
            );
        }

        user.name = name;
        user.email = email;
        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                user.password,
                old_password,
            );

            if (!checkOldPassword) {
                throw new AppError('Your old password is wrong');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;

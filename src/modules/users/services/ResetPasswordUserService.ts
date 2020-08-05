import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashNProvider';

@injectable()
class ResetPasswordUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokenRepository')
        private userTokenRepository: IUsersTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
        // console.log(usersRepository);
    }

    public async execute(token: string, password: string): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Token does not exists');
        }

        const user = await this.usersRepository.findByID(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreateAt = userToken.created_at;
        const compareDate = addHours(tokenCreateAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expires');
        }

        // if (differenceInHours(tokenCreateAt, Date.now()) > 2) {
        //     throw new AppError('Token expires');
        // }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordUserService;

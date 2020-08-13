import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities//User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProviderNew';

interface IRequestDTO {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {
        // console.log(usersRepository);
    }

    public async execute({ user_id }: IRequestDTO): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `provider-list:${user_id}`,
        );

        if (!users) {
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id,
            });

            if (!users || users.length === 0) {
                throw new AppError('Users not found');
            }

            await this.cacheProvider.save(`providers-list:${user_id}`, users);
            // console.log('Salvou o cache');
        }

        return users;
    }
}

export default ListProvidersService;

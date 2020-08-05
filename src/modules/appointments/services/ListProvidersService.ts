import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities//User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        // console.log(usersRepository);
    }

    public async execute({ user_id }: IRequestDTO): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({
            except_user_id: user_id,
        });

        if (users?.length === 0 || !users) {
            throw new AppError('Users not found');
        }

        return users;
    }
}

export default ListProvidersService;

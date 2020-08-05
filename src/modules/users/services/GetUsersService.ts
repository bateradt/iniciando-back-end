import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class GetUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        // console.log(usersRepository);
    }

    public async execute(): Promise<User[] | undefined> {
        const users = await this.usersRepository.findAll();

        return users;
    }
}

export default GetUsersService;

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashNProvider';

interface IRequestDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
        // console.log(usersRepository);
    }

    public async execute({
        name,
        email,
        password,
    }: IRequestDTO): Promise<User> {
        const emailExists = await this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.', 400);
        }

        const cryptedPass = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: cryptedPass,
        });

        return user;
    }
}

export default CreateUserService;

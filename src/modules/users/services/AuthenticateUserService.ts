import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashNProvider';
import authConfig from '@config/authJwt';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {
        // console.log(usersRepository);
    }

    public async execute({
        email,
        password,
    }: IRequestDTO): Promise<{ user: User; token: string }> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email or password.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email or password.', 401);
        }

        // primeiro parâmetro do token é o payload
        // segundo parâmetro é a chave secreta - Dica: Gerar uma string em md5

        const { secret, expiresIn } = authConfig.jwt;

        // console.log(secret, expiresIn);

        // console.log('oi teste');

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;

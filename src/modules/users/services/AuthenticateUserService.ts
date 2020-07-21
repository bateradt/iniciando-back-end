import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
    email: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({
        email,
        password,
    }: RequestDTO): Promise<{ user: User; token: string }> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email or password.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email or password.', 401);
        }

        // primeiro parâmetro do token é o payload
        // segundo parâmetro é a chave secreta - Dica: Gerar uma string em md5

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;

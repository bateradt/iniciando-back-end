import { Repository, getRepository } from 'typeorm';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

class UserTokensRepository implements IUsersTokenRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const findUserToken = await this.ormRepository.findOne({
            where: { token },
        });

        return findUserToken;
    }
}

export default UserTokensRepository;

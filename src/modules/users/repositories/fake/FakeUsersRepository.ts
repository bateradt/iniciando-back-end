import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IProvidersDTO from '@modules/users/dtos/IProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async save(user: User): Promise<User> {
        const userIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[userIndex] = user;

        return this.users[userIndex];
    }

    public async findByID(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);
        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async findAll(): Promise<User[] | undefined> {
        return this.users;
    }

    public async findAllProviders({
        except_user_id,
    }: IProvidersDTO): Promise<User[] | undefined> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid() }, userData);
        this.users.push(user);
        return user;
    }
}

export default FakeUsersRepository;

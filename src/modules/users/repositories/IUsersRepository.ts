import User from '@modules/users/infra/typeorm/entities/User';
import ICreateAppointmentDTO from '@modules/users/dtos/ICreateUserDTO';
import IProvidersDTO from '@modules/users/dtos/IProvidersDTO';

export default interface IUsersRepository {
    create(data: ICreateAppointmentDTO): Promise<User>;
    save(data: User): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findByID(id: string): Promise<User | undefined>;
    findAll(): Promise<User[] | undefined>;
    findAllProviders({
        except_user_id,
    }: IProvidersDTO): Promise<User[] | undefined>;
}

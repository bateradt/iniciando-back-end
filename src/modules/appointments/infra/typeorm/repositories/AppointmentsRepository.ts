import { Repository, getRepository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayProviderDTO from '@modules/appointments/dtos/IFindAllInDayProviderDTO';

class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return findAppointment;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        // para comparar o valor da data no banco usando typeorm temos que fazer da forma abaixo ele captura o campo gerado pelo typeorm
        // e usa a função do Postgres chamada to_char para comparar os valores recebidos no parametro
        // na documentação ele compara a string exemplo 01-2020, então temos que formatar iniciando com 0 a variavel month
        const findAppointment = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dataFieldName =>
                        `to_char(${dataFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return findAppointment;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');

        // para comparar o valor da data no banco usando typeorm temos que fazer da forma abaixo ele captura o campo gerado pelo typeorm
        // e usa a função do Postgres chamada to_char para comparar os valores recebidos no parametro
        // na documentação ele compara a string exemplo 01-2020, então temos que formatar iniciando com 0 a variavel month
        const findAppointment = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dataFieldName =>
                        `to_char(${dataFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });

        return findAppointment;
    }
}

export default AppointmentRepository;

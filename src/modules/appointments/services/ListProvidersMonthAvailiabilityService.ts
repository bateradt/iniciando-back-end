import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// import AppError from '@shared/errors/AppError';

interface IRequestDTO {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProvidersMonthAvailiabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {
        // console.log(usersRepository);
    }

    public async execute({
        provider_id,
        month,
        year,
    }: IRequestDTO): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                month,
                year,
            },
        );
        // console.log(appointments);

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1)); // captura a quantidade de dias existentes no mês

        // cria um array começando do 1 até o total de dias do mês
        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const compareDate = new Date(year, month - 1, day, 23, 59, 59); // pega o último horário do dia, no month tem que ter -1 pois o javascript inicia a contagem do mes do 0

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available:
                    isAfter(compareDate, new Date()) &&
                    appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProvidersMonthAvailiabilityService;

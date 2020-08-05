import { injectable, inject } from 'tsyringe';
import { getDate, getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// import AppError from '@shared/errors/AppError';

interface IRequestDTO {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProvidersDayAvailiabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {
        // console.log(usersRepository);
    }

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequestDTO): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                day,
                month,
                year,
            },
        );

        const hourStart = 8;

        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => index + hourStart,
        );

        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hourInDay = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available: !hourInDay && isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default ListProvidersDayAvailiabilityService;

import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {
        // console.log(appointmentsRepository);
    }

    public async execute({
        provider_id,
        user_id,
        date,
    }: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        // console.log(getHours(appointmentDate));
        // console.log(isBefore(appointmentDate, Date.now()));

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointment on a past date.",
                400,
            );
        }

        if (provider_id === user_id) {
            throw new AppError(
                "You can't create an appointment to the same user that is logged",
                400,
            );
        }

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                "You can't create an appointment before 8:00 am and after 17:00pm.",
                400,
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked', 400);
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;

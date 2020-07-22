import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppontimentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
}

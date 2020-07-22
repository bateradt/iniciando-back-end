import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppontimentsRepository from '@modules/appointments/infra/repositories/IAppontimentsRepository';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>
    implements IAppontimentsRepository {
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment;
    }
}

export default AppointmentRepository;

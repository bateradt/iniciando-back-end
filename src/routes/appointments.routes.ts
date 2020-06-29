import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
// const appointmentRepository = new AppointmentsRepository();

// SoC - separete of concerns

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

// como estamos usando um middleware para chamar a rota, não precisamos mais colocar o nome completo no endereço
// somente uma /
appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return response.status(200).json(appointment);
});

export default appointmentsRouter;

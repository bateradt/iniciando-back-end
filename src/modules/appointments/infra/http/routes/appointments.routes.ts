import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// SoC - separete of concerns

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentRepository.find({
//         relations: ['categories'],
//     });

//     return response.json(appointments);
// });

// como estamos usando um middleware para chamar a rota, não precisamos mais colocar o nome completo no endereço
// somente uma /
appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date().required(),
        },
    }),
    appointmentsController.create,
);

appointmentsRouter.get('/myschedule', providerAppointmentsController.index);

export default appointmentsRouter;

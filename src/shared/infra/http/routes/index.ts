import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

// configurando desta forma, o express vai identificar que quando uma rota conter o caminho
// appointments ele irá direcionar para a função do arquivo ./appointments.routes
routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

// routes.post('/users', (request, response) => {
//     const { name, email } = request.body;
//     const user = { name, email };
//     return response.json({
//         message: 'Hello my first project GoStack RocketSeat ',
//         user,
//     });
// });

export default routes;

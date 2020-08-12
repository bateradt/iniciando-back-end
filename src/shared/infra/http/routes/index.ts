import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

// configurando desta forma, o express vai identificar que quando uma rota conter o caminho
// appointments ele irá direcionar para a função do arquivo ./appointments.routes
routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
routes.use('/providers', ensureAuthenticated, providersRouter);

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

// routes.post('/users', (request, response) => {
//     const { name, email } = request.body;
//     const user = { name, email };
//     return response.json({
//         message: 'Hello my first project GoStack RocketSeat ',
//         user,
//     });
// });

export default routes;

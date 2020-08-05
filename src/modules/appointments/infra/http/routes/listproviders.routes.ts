import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProvidersController from '@modules/appointments/infra/http/controllers/ListProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const listProvidersRouter = Router();

const listProvidersController = new ListProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

listProvidersRouter.use(ensureAuthenticated);

// como estamos usando um middleware para chamar a rota, não precisamos mais colocar o nome completo no endereço
// somente uma /
listProvidersRouter.get('/', listProvidersController.index);

listProvidersRouter.get(
    '/:provider_id/month-availiability',
    providerMonthAvailabilityController.index,
);

listProvidersRouter.get(
    '/:provider_id/day-availiability',
    providerDayAvailabilityController.index,
);

export default listProvidersRouter;

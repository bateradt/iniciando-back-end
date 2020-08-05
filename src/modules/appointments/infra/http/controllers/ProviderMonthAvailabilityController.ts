import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersMonthAvailiabilityService from '@modules/appointments/services/ListProvidersMonthAvailiabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.body;

        const listProvidersMonthAvailiabilityService = container.resolve(
            ListProvidersMonthAvailiabilityService,
        );

        const providers = await listProvidersMonthAvailiabilityService.execute({
            month,
            provider_id,
            year,
        });

        return response.status(200).json(providers);
    }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersMonthAvailiabilityService from '@modules/appointments/services/ListProvidersMonthAvailiabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.query;

        const listProvidersMonthAvailiabilityService = container.resolve(
            ListProvidersMonthAvailiabilityService,
        );

        const providers = await listProvidersMonthAvailiabilityService.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.status(200).json(providers);
    }
}

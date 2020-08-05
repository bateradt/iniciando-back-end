import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersDayAvailiabilityService from '@modules/appointments/services/ListProvidersDayAvailiabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { day, month, year } = request.body;

        const listProvidersDayAvailiabilityService = container.resolve(
            ListProvidersDayAvailiabilityService,
        );

        const providers = await listProvidersDayAvailiabilityService.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.status(200).json(providers);
    }
}

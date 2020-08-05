import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailUserService from '@modules/users/services/SendForgotPasswordEmailUserService';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmailUser = container.resolve(
            SendForgotPasswordEmailUserService,
        );

        await sendForgotPasswordEmailUser.execute(email);

        return response.status(204).json();
    }
}

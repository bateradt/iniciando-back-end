import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordUserService from '@modules/users/services/ResetPasswordUserService';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { token, password } = request.body;

        const resetPasswordUser = container.resolve(ResetPasswordUserService);

        await resetPasswordUser.execute(token, password);

        return response.status(204).json();
    }
}

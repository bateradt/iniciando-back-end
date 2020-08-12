import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import GetUserService from '@modules/users/services/GetUsersService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUsertService = container.resolve(CreateUserService);

        const user = await createUsertService.execute({
            name,
            email,
            password,
        });

        // delete user.password;

        return response.status(200).json(classToClass(user));
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const getUsertService = container.resolve(GetUserService);

        const users = await getUsertService.execute();

        return response.json(users);
    }
}

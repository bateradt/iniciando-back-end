import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// SoC - separete of concerns

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    return response.json(users);
});

// como estamos usando um middleware para chamar a rota, não precisamos mais colocar o nome completo no endereço
// somente uma /
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUsertService = new CreateUserService();

    const user = await createUsertService.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.status(200).json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.Execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        delete user.password;

        return response.status(200).json(user);
    },
);

export default usersRouter;

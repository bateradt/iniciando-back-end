import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository,
);

container.registerSingleton<INotificationRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);

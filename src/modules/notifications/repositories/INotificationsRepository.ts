import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

interface INotificationRepository {
    create(data: ICreateNotificationDTO): Promise<Notification>;
}

export default INotificationRepository;

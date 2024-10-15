// backend\src\domain\repositories\interfaces\INotificationRepository.ts
import { Notification } from '../../entities/Notification'; 
import { NotificationDocument } from '../../../infrastructure/models/NotificationModel';

export interface INotificationRepository {
    create(notification: Notification): Promise<NotificationDocument>;
    findById(notificationId: string): Promise<NotificationDocument | null>;
    findByUserId(userId: string): Promise<NotificationDocument[]>;
    markAsRead(notificationId: string): Promise<NotificationDocument | null>;
    delete(notificationId: string): Promise<boolean>;
}

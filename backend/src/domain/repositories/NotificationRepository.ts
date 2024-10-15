// backend\src\domain\repositories\NotificationRepository.ts
import { INotificationRepository } from './interfaces/INotificationRepository';
import NotificationModel, { NotificationDocument } from '../../infrastructure/models/NotificationModel';
import { Notification } from '../../domain/entities/Notification'; 

export class NotificationRepository implements INotificationRepository {
    async create(notification: Notification): Promise<NotificationDocument> {
        const newNotification = new NotificationModel(notification);
        return newNotification.save();
    }

    async findById(notificationId: string): Promise<NotificationDocument | null> {
        return NotificationModel.findById(notificationId).exec();
    }

    async findByUserId(userId: string): Promise<NotificationDocument[]> {
        return NotificationModel.find({ receiverUser: userId }).exec();
    }

    async markAsRead(notificationId: string): Promise<NotificationDocument | null> {
        return NotificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true }).exec();
    }

    async delete(notificationId: string): Promise<boolean> {
        const result = await NotificationModel.findByIdAndDelete(notificationId).exec();
        return result !== null;
    }
}

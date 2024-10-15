//backend\src\types\Notification.ts
export interface INotification {
    senderUser: string;
    receiverUser: string;
    message: string;
    type: string;
}
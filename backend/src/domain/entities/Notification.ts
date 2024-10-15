// backend\src\domain\entities\Notification.ts
export interface Notification {
    id: string;  
    senderUser: string; 
    receiverUser: string; 
    post?: string; 
    message: string; 
    createdAt: Date; 
    type?: string; 
    read: boolean;
}

// backend\src\infrastructure\models\NotificationModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Notification } from '../../domain/entities/Notification';

export interface NotificationDocument extends Document, Omit<Notification, 'id'> {
    _id: string;
}

const notifySchema: Schema = new Schema(
    {
        senderUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users', // Reference to the user who did the action which created a notification
            required: true
        },
        receiverUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users', // Reference to the user who receives the notification
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
        message: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const NotificationModel = mongoose.model<NotificationDocument>('notifications', notifySchema);

export default NotificationModel;

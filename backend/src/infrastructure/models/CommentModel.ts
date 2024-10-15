// backend\src\infrastructure\models\CommentModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Comment } from '../../domain/entities/Comment';

export interface CommentDocument extends Document, Omit<Comment, 'id'> {
    _id: string; 
  }
const commentSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'companies',
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);


const CommentModel = mongoose.model<CommentDocument>('comments', commentSchema);

export default CommentModel;

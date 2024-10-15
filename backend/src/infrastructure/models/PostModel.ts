// backend\src\infrastructure\models\PostModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import { Post, Report } from '../../domain/entities/Post';

export interface PostDocument extends Document, Omit<Post, 'id'> {
    _id: string; 
  }
const reportSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    reason: {
        type: String,
    },
});

// Define the Post schema
const postSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'companies',
        },
        description: {
            type: String,
            required: true,
        },
        media: [
            {
                type: String,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comments',
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
        reports: [reportSchema],
    },
    { timestamps: true }
);


const PostModel = mongoose.model<PostDocument>('posts', postSchema);

export default PostModel;

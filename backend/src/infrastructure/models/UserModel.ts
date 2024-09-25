//backend\src\infrastructure\models\UserModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../domain/entities/User';

// Omit the 'id' property from User to avoid conflict with Mongoose's Document
interface UserDocument extends Omit<User, 'id'>, Document {}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['Candidate', 'Company'] },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    location: String,
    headline: String,
    skills: String,
    profileImage: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png' },
    education: [
        {
            institute: String,
            fieldOfStudy: String,
            location: String,
            from: Date,
            to: Date
        }
    ],
    profession: [
        {
            companyName: String,
            location: String,
            role: String
        }
    ],
    resume: {
        data: Buffer,
        contentType: String
    },
    savedPosts: [
        {
            postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
            addedAt: { type: Date, default: Date.now }
        }
    ],

    // Add OTP fields to the schema
    otp: { type: String }, // The OTP code
    otpExpires: { type: Date } // OTP expiration time
});

// Export User model with UserDocument interface
export const UserModel = mongoose.model<UserDocument>('User', UserSchema);

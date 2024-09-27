//backend\src\domain\repositories\UserRepository.ts
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserModel } from '../../infrastructure/models/UserModel';
import { User } from '../../domain/entities/User';
import mongoose from 'mongoose';

export class UserRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        const createdUser = new UserModel(user);
        await createdUser.save();
        return createdUser.toObject();
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id).lean();
        if (user) {
            return { ...user, id: (user._id as mongoose.Types.ObjectId).toString() }; // Casting _id to string
        }
        return null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).lean();
        if (user) {
            return { ...user, id: (user._id as mongoose.Types.ObjectId).toString() }; // Casting _id to string
        }
        return null;
    }

    async blockUser(userId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, { isBlocked: true });
    }

    async unblockUser(userId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, { isBlocked: false });
    }
    public async saveOtp(userId: string, otp: string, otpExpires: Date): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, {
            otp: otp,
            otpExpires: otpExpires
        });
    }

    public async findByOtp(otp: string): Promise<User | null> {
        return UserModel.findOne({ otp });
    }
}

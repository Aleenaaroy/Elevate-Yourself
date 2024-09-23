//backend\src\domain\repositories\UserRepository.ts
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserModel } from '../../infrastructure/models/UserModel';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
    async createUser(user: User): Promise<User> {
        const createdUser = new UserModel(user);
        await createdUser.save();
        return createdUser.toObject();
    }

    async findUserById(id: string): Promise<User | null> {
        return UserModel.findById(id).lean();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({ email }).lean();
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

//backend\src\domain\repositories\IUserRepository.ts
import { User } from '../entities/User';

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    blockUser(userId: string): Promise<void>;
    unblockUser(userId: string): Promise<void>;
    saveOtp(userId: string, otp: string, otpExpires: Date): Promise<void>;
    findByOtp(otp: string): Promise<User | null>;
    
}

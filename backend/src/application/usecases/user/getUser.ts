//backend\src\application\usecases\user\getUser.ts
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

const userRepository = new UserRepository();

export const getUser = async (userId: string): Promise<User | null> => {
    try {
        return await userRepository.findById(userId);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

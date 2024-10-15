import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/entities/User';

const userRepository = new UserRepository();

export const updateUser = async (userId: string, updatedData: Partial<User>): Promise<User | null> => {
    try {
        return await userRepository.updateUser(userId, updatedData);
    } catch (error) {
        throw new Error('Error updating user');
    }
};

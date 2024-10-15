import { UserRepository } from '../../../domain/repositories/UserRepository';

const userRepository = new UserRepository();

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await userRepository.deleteUser(userId);
    } catch (error) {
        throw new Error('Error deleting user');
    }
};

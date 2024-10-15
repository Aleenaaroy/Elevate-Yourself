import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/entities/User';

const userRepository = new UserRepository();

export const createUser = async (userData: User): Promise<User | null> => {
    try {
        return await userRepository.createUser(userData);
    } catch (error) {
        throw new Error('Error creating user');
    }
};

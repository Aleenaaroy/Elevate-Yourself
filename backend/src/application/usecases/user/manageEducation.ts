//backend\src\application\usecases\user\manageEducation.ts
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { IEducation } from '../../../domain/entities/User';

const userRepository = new UserRepository();

export const addEducation = async (userId: string, educationData: IEducation): Promise<void> => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        user.education?.push(educationData);
        await userRepository.updateUser(userId, { education: user.education });
    } catch (error) {
        throw new Error('Error adding education');
    }
};

export const removeEducation = async (userId: string, educationId: string): Promise<void> => {
    try {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        user.education = user.education?.filter((edu) => edu._id === educationId);
        await userRepository.updateUser(userId, { education: user.education });
    } catch (error) {
        throw new Error('Error removing education');
    }
};

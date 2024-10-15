import  UserModel   from '../../../infrastructure/models/UserModel';
import { IProfession } from '../../../domain/entities/User';

export const addProfession = async (userId: string, professionData: IProfession): Promise<void> => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.profession?.push(professionData);
        await user.save();
    } catch (error) {
        throw new Error('Error adding profession');
    }
};

export const removeProfession = async (userId: string, professionId: string): Promise<void> => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.profession = user.profession?.filter((prof) => prof._id?.toString() === professionId);
        await user.save();
    } catch (error) {
        throw new Error('Error removing profession');
    }
};

import { Request, Response, NextFunction } from 'express';
import { createUser } from '../../application/usecases/user/createUser';
import { getUser } from '../../application/usecases/user/getUser';
import { updateUser } from '../../application/usecases/user/updateUser';
import { deleteUser } from '../../application/usecases/user/deleteUser';
import { addEducation, removeEducation } from '../../application/usecases/user/manageEducation';
import { addProfession, removeProfession } from '../../application/usecases/user/manageProfession';


// Create a new user
export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};

// Get a user by ID
export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUser(req.params.userId);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

// Update a user by ID
export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateUser(req.params.userId, req.body);
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID
export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteUser(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Add education to a user
export const addEducationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addEducation(req.params.userId, req.body);
        res.status(200).json({ message: 'Education added successfully' });
    } catch (error) {
        next(error);
    }
};

// Remove education from a user
export const removeEducationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeEducation(req.params.userId, req.params.educationId);
        res.status(200).json({ message: 'Education removed successfully' });
    } catch (error) {
        next(error);
    }
};

// Add profession to a user
export const addProfessionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addProfession(req.params.userId, req.body);
        res.status(200).json({ message: 'Profession added successfully' });
    } catch (error) {
        next(error);
    }
};

// Remove profession from a user
export const removeProfessionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await removeProfession(req.params.userId, req.params.professionId);
        res.status(200).json({ message: 'Profession removed successfully' });
    } catch (error) {
        next(error);
    }
};

// backend\src\infrastructure\middlewares\AdminAuth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/AdminModel'; 

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        let token = req.header('authorization')?.split(' ')[1];

        if (!token) {         
            return res.status(401).json({ message: 'Unauthorized! No token found' });
        }

        token = token.replace(/"/g, "");

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

        const adminId = (decodedToken as { adminId: string }).adminId;

        const admin = await AdminModel.findById(adminId);

        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Admin not found' });
        }

        req.admin = admin;
        next(); 

    } catch (error) {
        console.error(error, 'Middleware error');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

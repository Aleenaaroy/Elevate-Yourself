// backend\src\infrastructure\middleware\roleMiddleware.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/ExpressRequest';

export const roleMiddleware = (role: 'Candidate' | 'Company') => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || (req.user as any).role !== role) {
            return res.status(403).json({ message: 'Forbidden: Insufficient Role Privileges' });
        }
        next();
    };
};

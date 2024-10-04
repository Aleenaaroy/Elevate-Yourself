// backend\src\infrastructure\middlewares\userAuth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel';
import companyModel from '../models/CompanyModel';

// Extend the Express request object to include the `user` property
interface AuthenticatedRequest extends Request {
  user?: any; // Modify according to your user model types
}

export const verify = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Extract token from authorization header
    let token = req.header('authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized! No token found' });
    }

    // Clean token from potential quotes
    token = token.replace(/"/g, '');

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const userId = decoded.userId;

    // Look for the user in the userModel
    let user = await userModel.findById(userId);

    if (!user) {
      // If no user is found, check the companyModel
      const company = await companyModel.findById(userId);

      if (!company) {
        return res.status(401).json({ message: 'Unauthorized - User not found' });
      }

      if (company.isBlocked) {
        return res.status(401).json({ message: 'Account is blocked' });
      }

      user = company; // Assign company to user if found
    }

    if (user.isBlocked) {
      return res.status(401).json({ message: 'Account is blocked' });
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

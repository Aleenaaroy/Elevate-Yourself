//backend\src\infrastructure\controllers\UserController.ts
import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../../application/usecases/RegisterUser';
import { AuthService } from '../../application/services/AuthService';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { OtpService } from '../../application/services/OtpService';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../../infrastructure/models/UserModel';
import { CompanyModel } from '../../infrastructure/models/CompanyModel';
import { AuthenticatedRequest } from '../../types/ExpressRequest';
import { CompanyRepository } from '../../domain/repositories/CompanyRepository';

const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository, companyRepository);

// Create instances of services
const authService = new AuthService(userRepository);  // AuthService depends on the UserRepository
const otpService = new OtpService(userRepository);    // OtpService depends on the UserRepository

interface DecodedData extends JwtPayload {
    name: string;
    email: string;
    picture: string;
    jti: string; // JWT ID
}

export const register = async (req: Request, res: Response) => {
    try {
        const { role } = req.body;

        if (role === 'Company') {
            const company = await registerUserUseCase.execute(req.body);
            return res.status(201).json(company);
        }

        const user = await registerUserUseCase.execute(req.body);
        res.status(201).json({ message: 'Proceed for Otp Verification', redirect: '/send-otp' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        res.status(200).json({ token, redirect: '/send-otp' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const sendOtp = async (req: Request, res: Response) => {
    try {
        const otp = await otpService.sendOtp(req.body.email);
        res.status(200).json({ message: 'OTP sent to email' , redirect: '/verify-otp' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const isValid = await otpService.verifyOtp(req.body.userId, req.body.otp);
        if (isValid) {
            res.status(200).json({ message: 'OTP verified successfully', redirect: '/user-portal' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Google Signup
export const googleSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.body.credential;

        // Decode the token
        const decodedData = jwt.decode(token) as DecodedData;
        if (!decodedData) {
            res.status(400).json({ error: 'Invalid token' });
            return;
        }

        const { name, email, picture, jti,role } = decodedData;

        const user = await userRepository.findUserByEmail(email);
        if (user) {
            res.status(401).json({ error: 'User Already Exists' });
            return;
        }

        // Create a new user
        const newUser = await registerUserUseCase.execute({
            name,
            email,
            profileImage: picture,
            password: jti, // Use the JWT ID as a password (temporary)
            role,
	    isBlocked: false
        });

        if (role === 'Candidate') {
            await UserModel.create(newUser);
        } else if (role === 'Company') {
            await CompanyModel.create(newUser);
        }

        res.status(201).json({ message: 'User saved successfully', redirect: '/login' });
    } catch (error) {
        next(error);
    }
};

// Google Login
export const googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.body.credential;

        // Decode the token
        const decodedData = jwt.decode(token) as DecodedData;
        if (!decodedData) {
            res.status(400).json({ error: 'Invalid token' });
            return;
        }

        const { email, picture: profileImage } = decodedData;

        // Find the user by email
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        else{
        if (user.isBlocked) {
            res.status(401).json({ error: 'Account is blocked' });
            return;
        }

            // Generate a JWT token
            const userToken = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET  || 'secretKey',
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login Successful',
                token: userToken,
                userData: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    userId: user.id,
                    profileImage,
                }, redirect: '/user-portal' 
            });
        } 
    } catch (error) {
        next(error);
    }
};

export const profile = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const tokenData = req.user;
    // Handle the logic here, for example, fetch user data based on token info

    res.status(200).json({ message: 'Profile data', data: tokenData });
};

//backend\src\infrastructure\controllers\UserController.ts
import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../../application/usecases/RegisterUser';
import { AuthService } from '../../application/services/AuthService';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { OtpService } from '../../application/services/OtpService';
import jwt, { JwtPayload } from 'jsonwebtoken';

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authService = new AuthService(userRepository);
const otpService = new OtpService(userRepository);

interface DecodedData extends JwtPayload {
    name: string;
    email: string;
    picture: string;
    jti: string; // JWT ID
}

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUserUseCase.execute(req.body);
        res.status(201).json(user);
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
        res.status(200).json({ token });
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
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const isValid = await otpService.verifyOtp(req.body.userId, req.body.otp);
        if (isValid) {
            res.status(200).json({ message: 'OTP verified successfully' });
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

        const { name, email, picture, jti } = decodedData;

        // Check if the user already exists
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
            role: 'Candidate',isBlocked: false
        });

        res.status(201).json({ message: 'User saved successfully' });
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
        if (user) {
            if (user.isBlocked) {
                res.status(401).json({ error: 'Account is blocked' });
                return;
            }

            // Generate a JWT token
            const userToken = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login Successful',
                token: userToken,
                userData: {
                    username: user.name,
                    useremail: user.email,
                    role: user.role,
                    userId: user.id,
                    profileImage,
                },
            });
        } else {
            res.status(401).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/usecases/RegisterUser';
import { AuthService } from '../../application/services/AuthService';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { OtpService } from '../../application/services/OtpService';

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authService = new AuthService(userRepository);
const otpService = new OtpService(userRepository);

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

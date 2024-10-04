// backend\src\infrastructure\controllers\AuthController.ts
import { Request, Response, NextFunction } from 'express';
import { AuthUseCases } from '../../application/usecases/auth/AuthUseCases';
import { IUserRepository } from '../../domain/repositories/interfaces/IUserRepository';
import { ICompanyRepository } from '../../domain/repositories/interfaces/ICompanyRepository';
import jwt from 'jsonwebtoken';

export class AuthController {
  private authUseCases: AuthUseCases;

  constructor(userRepo: IUserRepository, companyRepo: ICompanyRepository) {
    this.authUseCases = new AuthUseCases(userRepo, companyRepo);
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await this.authUseCases.register(req.body.userData);
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async otpRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body.userData;
      const otp = Number(req.body.otp);
      const entity = await this.authUseCases.otpRegister(userData, otp);
      res.status(201).json({ entity, message: 'Verification success!' });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body.userData;
      const token = await this.authUseCases.login(email, password);
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      next(error);
    }
  }

  async googleSignup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.body.credential;
      const decodedData = jwt.decode(token) as any;
      const { name, email, picture, jti } = decodedData;

      const newUser = await this.authUseCases.googleSignup(name, email, picture, jti);
      res.status(201).json({ message: 'User saved successfully', user: newUser });
    } catch (error) {
      next(error);
    }
  }

  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.body.credential;
      const decodedData = jwt.decode(token) as any;
      const { email } = decodedData;

      const { token: authToken, user } = await this.authUseCases.googleLogin(email);
      res.status(200).json({ message: 'Login successful', token: authToken, userData: user });
    } catch (error) {
      next(error);
    }
  }
}

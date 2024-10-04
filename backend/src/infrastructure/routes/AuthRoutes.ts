//backend\src\infrastructure\routes\AuthRoutes.ts
import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserRepository } from '../../domain/repositories/UserRepository'; 
import { CompanyRepository } from '../../domain/repositories/CompanyRepository'; 

const router = express.Router();

const userRepo = new UserRepository(); 
const companyRepo = new CompanyRepository();  

const authController = new AuthController(userRepo, companyRepo);

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/otpregister', (req, res, next) => authController.otpRegister(req, res, next));
router.post('/resend', (req, res, next) => authController.register(req, res, next)); 
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/google', (req, res, next) => authController.googleSignup(req, res, next));
router.post('/google/login', (req, res, next) => authController.googleLogin(req, res, next));

export default router;

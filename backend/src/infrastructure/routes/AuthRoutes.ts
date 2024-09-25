//backend\src\infrastructure\routes\AuthRoutes.ts
import express from 'express';
import { register, login,sendOtp, verifyOtp ,googleSignup ,googleLogin} from '../controllers/UserController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google', googleSignup);
router.post('/google/login' , googleLogin);

export default router;

//backend\src\infrastructure\routes\AuthRoutes.ts
import express from 'express';
import { register, login,sendOtp, verifyOtp ,googleSignup ,googleLogin} from '../controllers/UserController';
import { getProtectedData } from '../controllers/ProtectedController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { getCandidateData, getCompanyData } from '../controllers/RoleBasedController';

const router = express.Router();

router.post('/register', register);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/google', googleSignup);
router.post('/google/login' , googleLogin);


router.get('/protected', authMiddleware, getProtectedData);
router.get('/candidate-data', authMiddleware, roleMiddleware('Candidate'), getCandidateData);
router.get('/company-data', authMiddleware, roleMiddleware('Company'), getCompanyData);


export default router;

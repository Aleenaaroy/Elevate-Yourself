//backend\src\infrastructure\routes\ProtectedRoutes.ts
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userPortal, adminPortal } from '../controllers/ProtectedController';

const router = express.Router();

router.get('/user-portal', authMiddleware, userPortal);
router.get('/admin-portal', authMiddleware, adminPortal);

export default router;

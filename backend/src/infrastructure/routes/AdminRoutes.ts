import { Router } from 'express';
import { verifyAdmin } from '../middlewares/AdminAuth';
import { adminController } from '../controllers/AdminController';

const router = Router();

router.post('/login', verifyAdmin, (req, res, next) => adminController.adminLogin(req, res, next));
router.get('/dashboard', verifyAdmin, (req, res, next) => adminController.dashboardValues(req, res, next));
router.post('/block-user/:id', verifyAdmin, (req, res, next) => adminController.blockUser(req, res, next));
router.post('/unblock-user/:id', verifyAdmin, (req, res, next) => adminController.unblockUser(req, res, next));
router.post('/block-company/:id', verifyAdmin, (req, res, next) => adminController.blockCompany(req, res, next));
router.post('/unblock-company/:id', verifyAdmin, (req, res, next) => adminController.unblockCompany(req, res, next));
router.post('/verify-company/:companyId', verifyAdmin, (req, res, next) => adminController.verifyCompany(req, res, next));
router.get('/companies', verifyAdmin, (req, res, next) => adminController.getCompanies(req, res, next));
router.get('/users', verifyAdmin, (req, res, next) => adminController.getUsers(req, res, next));
router.post('/add-category', verifyAdmin, (req, res, next) => adminController.addCategory(req, res, next));
router.delete('/delete-industry/:industryId', verifyAdmin, (req, res, next) => adminController.deleteIndustry(req, res, next));
router.get('/industries', verifyAdmin, (req, res, next) => adminController.getIndustries(req, res, next));
router.get('/all-posts', verifyAdmin, (req, res, next) => adminController.getAllPosts(req, res, next));
router.delete('/post-delete/:postId', verifyAdmin, (req, res, next) => adminController.postDelete(req, res, next));

export default router;

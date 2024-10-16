import { Router } from 'express';
//import { verifyAdmin } from '../middlewares/AdminAuth';
import { adminController } from '../controllers/AdminController';

const router = Router();

router.post('/',  (req, res, next) => adminController.adminLogin(req, res, next));
router.get('/dashboard',  (req, res, next) => adminController.dashboardValues(req, res, next));
router.post('/block/:id',  (req, res, next) => adminController.blockUser(req, res, next));
router.post('/unblock/:id',  (req, res, next) => adminController.unblockUser(req, res, next));
router.post('/blockcompany/:id',  (req, res, next) => adminController.blockCompany(req, res, next));
router.post('/unblockcompany/:id',  (req, res, next) => adminController.unblockCompany(req, res, next));
router.post('/verify/:id',  (req, res, next) => adminController.verifyCompany(req, res, next));
router.get('/companies',  (req, res, next) => adminController.getCompanies(req, res, next));
router.get('/users',  (req, res, next) => adminController.getUsers(req, res, next));
router.post('/add-category',  (req, res, next) => adminController.addCategory(req, res, next));
router.delete('/delete-industry/:industryId',  (req, res, next) => adminController.deleteIndustry(req, res, next));
router.get('/getIndustries',  (req, res, next) => adminController.getIndustries(req, res, next));
router.get('/posts',  (req, res, next) => adminController.getAllPosts(req, res, next));
router.delete('/adminpostDelete/:postId',  (req, res, next) => adminController.postDelete(req, res, next));

export default router;

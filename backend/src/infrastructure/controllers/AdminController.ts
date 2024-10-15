//backend\src\infrastructure\controllers\AdminController.ts
import { Request, Response, NextFunction } from 'express';
import { 
    AdminLoginUseCase, DashboardValuesUseCase, BlockUserUseCase, UnblockUserUseCase, 
    BlockCompanyUseCase, UnblockCompanyUseCase, VerifyCompanyUseCase, 
    GetCompaniesUseCase, GetUsersUseCase, AddCategoryUseCase, DeleteIndustryUseCase, 
    GetIndustriesUseCase, GetAllPostsUseCase, PostDeleteUseCase 
} from '../../application/usecases/admin';
import { 
    IAdminRepository, IUserRepository, ICompanyRepository, IJobRepository, 
    IPostRepository, ICategoryRepository 
} from '../../domain/repositories/interfaces';
import { AdminRepository, UserRepository, CompanyRepository, JobRepository, PostRepository, CategoryRepository } from '../../domain/repositories';

export class AdminController {
    constructor(
        private adminLoginUseCase: AdminLoginUseCase,
        private dashboardValuesUseCase: DashboardValuesUseCase,
        private blockUserUseCase: BlockUserUseCase,
        private unblockUserUseCase: UnblockUserUseCase,
        private blockCompanyUseCase: BlockCompanyUseCase,
        private unblockCompanyUseCase: UnblockCompanyUseCase,
        private verifyCompanyUseCase: VerifyCompanyUseCase,
        private getCompaniesUseCase: GetCompaniesUseCase,
        private getUsersUseCase: GetUsersUseCase,
        private addCategoryUseCase: AddCategoryUseCase,
        private deleteIndustryUseCase: DeleteIndustryUseCase,
        private getIndustriesUseCase: GetIndustriesUseCase,
        private getAllPostsUseCase: GetAllPostsUseCase,
        private postDeleteUseCase: PostDeleteUseCase,
    ) {}

    private async handleRequest(req: Request, res: Response, next: NextFunction, useCaseMethod: Function, ...params: any[]): Promise<void> {
        try {
            const result = await useCaseMethod(...params);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    adminLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;
        return this.handleRequest(req, res, next, this.adminLoginUseCase.execute.bind(this.adminLoginUseCase), email, password);
    }

    dashboardValues(req: Request, res: Response, next: NextFunction): Promise<void> {
        return this.handleRequest(req, res, next, this.dashboardValuesUseCase.execute.bind(this.dashboardValuesUseCase));
    }

    blockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        return this.handleRequest(req, res, next, this.blockUserUseCase.execute.bind(this.blockUserUseCase), userId);
    }

    unblockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        return this.handleRequest(req, res, next, this.unblockUserUseCase.execute.bind(this.unblockUserUseCase), userId);
    }

    blockCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
        const companyId = req.params.id;
        return this.handleRequest(req, res, next, this.blockCompanyUseCase.execute.bind(this.blockCompanyUseCase), companyId);
    }

    unblockCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
        const companyId = req.params.id;
        return this.handleRequest(req, res, next, this.unblockCompanyUseCase.execute.bind(this.unblockCompanyUseCase), companyId);
    }

    verifyCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
        const companyId = req.params.companyId;
        return this.handleRequest(req, res, next, this.verifyCompanyUseCase.execute.bind(this.verifyCompanyUseCase), companyId);
    }

    getCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
        return this.handleRequest(req, res, next, this.getCompaniesUseCase.execute.bind(this.getCompaniesUseCase));
    }

    getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        return this.handleRequest(req, res, next, this.getUsersUseCase.execute.bind(this.getUsersUseCase));
    }

    addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const industry = req.body.industry;
        return this.handleRequest(req, res, next, this.addCategoryUseCase.execute.bind(this.addCategoryUseCase), industry);
    }

    deleteIndustry(req: Request, res: Response, next: NextFunction): Promise<void> {
        const industryId = req.params.industryId;
        return this.handleRequest(req, res, next, this.deleteIndustryUseCase.execute.bind(this.deleteIndustryUseCase), industryId);
    }

    getIndustries(req: Request, res: Response, next: NextFunction): Promise<void> {
        return this.handleRequest(req, res, next, this.getIndustriesUseCase.execute.bind(this.getIndustriesUseCase));
    }

    getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        return this.handleRequest(req, res, next, this.getAllPostsUseCase.execute.bind(this.getAllPostsUseCase));
    }

    postDelete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const postId = req.params.postId;
        return this.handleRequest(req, res, next, this.postDeleteUseCase.execute.bind(this.postDeleteUseCase), postId);
    }
}

// Dependency injection in the router file.
const adminRepo: IAdminRepository = new AdminRepository();
const userRepo: IUserRepository = new UserRepository();
const companyRepo: ICompanyRepository = new CompanyRepository();
const jobRepo: IJobRepository = new JobRepository();
const postRepo: IPostRepository = new PostRepository();
const categoryRepo: ICategoryRepository = new CategoryRepository();

export const adminController = new AdminController(
    new AdminLoginUseCase(adminRepo),
    new DashboardValuesUseCase(userRepo, companyRepo, jobRepo, postRepo),
    new BlockUserUseCase(userRepo),
    new UnblockUserUseCase(userRepo),
    new BlockCompanyUseCase(companyRepo),
    new UnblockCompanyUseCase(companyRepo),
    new VerifyCompanyUseCase(companyRepo),
    new GetCompaniesUseCase(companyRepo),
    new GetUsersUseCase(userRepo),
    new AddCategoryUseCase(categoryRepo),
    new DeleteIndustryUseCase(categoryRepo),
    new GetIndustriesUseCase(categoryRepo),
    new GetAllPostsUseCase(postRepo),
    new PostDeleteUseCase(postRepo),
);

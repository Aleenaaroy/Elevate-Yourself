import { Request, Response, NextFunction } from 'express';
import { OwnProfileUseCase } from '../../application/usecases/user/OwnProfileUsecase';
import { GetProfileUseCase } from '../../application/usecases/user/GetProfileUseCase';
import { ListAllUsersUseCase } from '../../application/usecases/user/ListAllUsersUseCase';
import { ListCompaniesUseCase } from '../../application/usecases/company/ListCompaniesUseCase';
import { SendConnectionRequestUseCase } from '../../application/usecases/user/SendConnectionRequestUseCase';
import { AcceptConnectionRequestUseCase } from '../../application/usecases/user/AcceptConnectionRequestUseCase';
import { RejectConnectionRequestUseCase } from '../../application/usecases/user/RejectConnectionRequestUseCase';
import { FollowAndUnfollowCompanyUseCase } from '../../application/usecases/company/FollowAndUnFollowUseCase';
import { IUserRepository } from '../../domain/repositories/interfaces/IUserRepository';
import { ICompanyRepository } from '../../domain/repositories/interfaces/ICompanyRepository';

export class UserController {
  private ownProfileUseCase: OwnProfileUseCase;
  private getProfileUseCase: GetProfileUseCase;
  private listAllUsersUseCase: ListAllUsersUseCase;
  private listCompaniesUseCase: ListCompaniesUseCase;
  private sendConnectionRequestUseCase: SendConnectionRequestUseCase;
  private acceptConnectionRequestUseCase: AcceptConnectionRequestUseCase;
  private rejectConnectionRequestUseCase: RejectConnectionRequestUseCase;
  private followAndUnfollowCompanyUseCase: FollowAndUnfollowCompanyUseCase;

  constructor(userRepo: IUserRepository, companyRepo: ICompanyRepository) {
    this.ownProfileUseCase = new OwnProfileUseCase(userRepo);
    this.getProfileUseCase = new GetProfileUseCase(userRepo);
    this.listAllUsersUseCase = new ListAllUsersUseCase(userRepo);
    this.listCompaniesUseCase = new ListCompaniesUseCase(companyRepo);
    this.sendConnectionRequestUseCase = new SendConnectionRequestUseCase(userRepo);
    this.acceptConnectionRequestUseCase = new AcceptConnectionRequestUseCase(userRepo);
    this.rejectConnectionRequestUseCase = new RejectConnectionRequestUseCase(userRepo);
    this.followAndUnfollowCompanyUseCase = new FollowAndUnfollowCompanyUseCase(userRepo, companyRepo);
  }

  // Own profile (User or Company)
  async ownProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id; // Assuming user middleware adds this
      const result = await this.ownProfileUseCase.execute(userId);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: 'Success', user: result.user });
    } catch (error) {
      next(error);
    }
  }

  // Get specific profile (User or Company)
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.getProfileUseCase.execute(id);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: 'Success', user: result.user });
    } catch (error) {
      next(error);
    }
  }

  // List all users except the logged-in one
  async listAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const result = await this.listAllUsersUseCase.execute(userId);
      if (!result.users || result.users.length === 0) {
        return res.status(400).json({ error: 'No users found' });
      }
      res.status(200).json({ message: 'Success', users: result.users });
    } catch (error) {
      next(error);
    }
  }

  // List all companies except the logged-in user
  async listCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const result = await this.listCompaniesUseCase.execute(userId);
      if (!result.companies || result.companies.length === 0) {
        return res.status(400).json({ error: 'No companies found' });
      }
      res.status(200).json({ message: 'Success', companies: result.companies });
    } catch (error) {
      next(error);
    }
  }

  // Send a connection request to another user
  async sendConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const targetUserId = req.params.userId;
      const userId = req.user?._id;
      const result = await this.sendConnectionRequestUseCase.execute(userId, targetUserId);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  }

  // Accept a connection request
  async acceptConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestId = req.params.userId;
      const userId = req.user?._id;
      const result = await this.acceptConnectionRequestUseCase.execute(userId, requestId);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: 'Request Accepted' });
    } catch (error) {
      next(error);
    }
  }

  // Reject a connection request
  async rejectConnectionRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestId = req.params.userId;
      const userId = req.user?._id;
      const result = await this.rejectConnectionRequestUseCase.execute(userId, requestId);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: 'Connection request removed' });
    } catch (error) {
      next(error);
    }
  }

  // Follow or unfollow a company
  async followAndUnfollowCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companyId = req.params.companyId;
      const userId = req.user?._id;
      const result = await this.followAndUnfollowCompanyUseCase.execute(userId, companyId);
      res.status(200).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  }
}

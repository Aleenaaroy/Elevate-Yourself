// backend/src/application/usecases/admin/DashboardValuesUseCase.ts
import { IUserRepository } from '../../../domain/repositories/interfaces/IUserRepository';
import { ICompanyRepository } from '../../../domain/repositories/interfaces/ICompanyRepository';
import { IJobRepository } from '../../../domain/repositories/interfaces/IJobRepository';
import { IPostRepository } from '../../../domain/repositories/interfaces/IPostRepository';

export class DashboardValuesUseCase {
    private userRepository: IUserRepository;
    private companyRepository: ICompanyRepository;
    private jobRepository: IJobRepository;
    private postRepository: IPostRepository;

    constructor(
        userRepository: IUserRepository,
        companyRepository: ICompanyRepository,
        jobRepository: IJobRepository,
        postRepository: IPostRepository
    ) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
        this.postRepository = postRepository;
    }

    async execute() {
        const currentYear = new Date().getFullYear();
        const users = await this.userRepository.find();
        const companies = await this.companyRepository.find();

        const userMonthlyCounts = Array(12).fill(0);
        const companyMonthlyCounts = Array(12).fill(0);
        
        users.forEach(user => {
            const userDate = new Date(user.createdOn!);
            if (userDate.getFullYear() === currentYear) {
                userMonthlyCounts[userDate.getMonth()]++;
            }
        });

        companies.forEach(company => {
            const companyDate = new Date(company.createdOn!);
            if (companyDate.getFullYear() === currentYear) {
                companyMonthlyCounts[companyDate.getMonth()]++;
            }
        });

        const jobPostingMonthlyCounts = await this.jobRepository.getJobPostingCountsByMonth(currentYear);
        const jobApplicationMonthlyCounts = await this.jobRepository.getJobApplicationCountsByMonth(currentYear);
        const totalUsers = users.length;
        const totalCompanies = companies.length;
        const totalPosts = await this.postRepository.countPosts();
        const totalJobs = await this.jobRepository.countJobs();

        return {
            totalUsers,
            totalCompanies,
            totalJobs,
            totalPosts,
            userMonthlyCounts,
            companyMonthlyCounts,
            jobPostingMonthlyCounts,
            jobApplicationMonthlyCounts
        };
    }
}

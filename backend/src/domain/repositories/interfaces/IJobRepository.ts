//backend\src\domain\repositories\interfaces\IJobRepository.ts

import { Job } from '../../entities/Job';

export interface IJobRepository {
    createJob(jobData: Job): Promise<Job>;
    findJobById(id: string): Promise<Job | null>;
    updateJob(id: string, jobData: Partial<Job>): Promise<Job | null>;
    deleteJob(id: string): Promise<boolean>;
    applyToJob(jobId: string, userId: string): Promise<Job | null>; 
    getApplicants(jobId: string): Promise<{ userId: string; appliedAt: Date; status: string; }[] | null>; 
    getJobPostingCountsByMonth(year: number): Promise<number[]>; 
    getJobApplicationCountsByMonth(year: number): Promise<number[]>;
    countJobs(): Promise<number>;
}

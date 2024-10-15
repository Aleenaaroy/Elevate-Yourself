// backend\src\domain\repositories\JobRepository.ts

import JobModel ,{ JobDocument }from '../../infrastructure/models/JobModel';
import { IJobRepository } from './interfaces/IJobRepository';
import { Job } from '../../domain/entities/Job';
import { Types } from 'mongoose';

export class JobRepository implements IJobRepository {
    async createJob(jobData: Job): Promise<Job> {
        const job = new JobModel(jobData);
        await job.save();
        return job.toObject();
    }

    async findJobById(id: string): Promise<Job | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        const job = await JobModel.findById(id).populate('postedBy').populate('industry');
        return job ? job.toObject() : null;
    }

    async updateJob(id: string, jobData: Partial<Job>): Promise<Job | null> {
        if (!Types.ObjectId.isValid(id)) return null;
        const updatedJob = await JobModel.findByIdAndUpdate(id, jobData, { new: true });
        return updatedJob ? updatedJob.toObject() : null;
    }

    async deleteJob(id: string): Promise<boolean> {
        if (!Types.ObjectId.isValid(id)) return false;
        const result = await JobModel.findByIdAndDelete(id);
        return !!result;
    }

   
    async applyToJob(jobId: string, userId: string): Promise<Job | null> {
        if (!Types.ObjectId.isValid(jobId) || !Types.ObjectId.isValid(userId)) return null;

        const job = await JobModel.findByIdAndUpdate(
            jobId,
            { $push: { 'applicants': { userId, appliedAt: new Date(), status: 'Pending' } } }, // Add the userId and status
            { new: true }
        );
        return job ? job.toObject() : null;
    }

    async getApplicants(jobId: string): Promise<{ userId: string; appliedAt: Date; status: string; }[] | null> {
        if (!Types.ObjectId.isValid(jobId)) return null;
    
        const job = await JobModel.findById(jobId)
            .select('applicants')
            .populate('applicants.userId', 'name email');
    
        if (!job) return null;
    
        return job.applicants?.map(applicant => ({
            userId: applicant.userId.toString(), 
            appliedAt: applicant.appliedAt || new Date(), 
            status: applicant.status || 'Pending' 
        })) || [];
    }
    async getJobPostingCountsByMonth(year: number): Promise<number[]> {
        const jobPostingCounts = await JobModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const monthlyCounts = Array(12).fill(0); // Initialize array with 12 months

        jobPostingCounts.forEach((jobCount: { _id: number; count: number }) => {
            monthlyCounts[jobCount._id - 1] = jobCount.count; // Months are 1-indexed in MongoDB
        });

        return monthlyCounts;
    }
    async getJobApplicationCountsByMonth(year: number): Promise<number[]> {
        const applicationCounts = await JobModel.aggregate([
            {
                $unwind: "$applicants"
            },
            {
                $match: {
                    "applicants.appliedAt": {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$applicants.appliedAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const monthlyCounts = Array(12).fill(0);

        applicationCounts.forEach((appCount: { _id: number; count: number }) => {
            monthlyCounts[appCount._id - 1] = appCount.count; // Months are 1-indexed
        });

        return monthlyCounts;
    }
    async countJobs(): Promise<number> {
        const jobCount = await JobModel.countDocuments();
        return jobCount;
    }
}

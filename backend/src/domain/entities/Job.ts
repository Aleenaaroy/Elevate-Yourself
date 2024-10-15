// backend\src\domain\entities\Job.ts

export interface JobApplicant {
    userId: string;
    appliedAt?: Date; 
    status?: 'Pending' | 'Accepted' | 'Rejected'; 
    resumeUrl?: string;
}

export interface Job {
    id?: string; 
    postedBy: string;
    position: string;
    location: string;
    salaryPackage: string; 
    requirements: string; 
    industry?: string; 
    createdAt?: Date; 
    applicants?: JobApplicant[]; 
}

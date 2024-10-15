//backend\src\types\Job.ts
export interface IJob {
    _id: string;
    postedBy: string;
    position: string;
    salaryPackage: string;
    location: string;
    requirements: string;
    industry: string;
    applicants: Array<{ userId: string; resumeUrl?: string; status: string }>;
}
// backend\src\domain\entities\User.ts
export interface User {
    id?: string;
    name: string;
    email: string;
    phone?: number;
    role: 'Candidate' | 'Company';
    password: string;
    isBlocked?: boolean;
    location?: string;
    headline?: string;
    skills?: string;
    profileImage?: string;
    education?: Education[];
    profession?: Profession[];
    resume?: Resume;
    savedPosts?: SavedPost[];
    pendingRequests?: ConnectionRequest[];
    manageRequests?: ConnectionRequest[];
    connections?: ConnectionRequest[];
    followingCompanies?: FollowingCompany[];
    appliedJobs?: AppliedJob[];
    chatId?: string;
    createdOn?: Date;
  }
  
  export interface Education {
    institute: string;
    fieldOfStudy: string;
    instituteLocation: string;
  }
  
  export interface Profession {
    companyName: string;
    jobLocation: string;
    role: string;
  }
  
  export interface Resume {
    data: Buffer;
    contentType: string;
  }
  
  export interface SavedPost {
    postId: string;
    addedAt?: Date;
  }
  
  export interface ConnectionRequest {
    userId: string;
  }
  
  export interface FollowingCompany {
    company: string;
  }
  
  export interface AppliedJob {
    jobId: string;
    status?: 'Pending' | 'Accepted' | 'Rejected';
    appliedAt?: Date;
  }
  
// backend\src\domain\entities\Company.ts
export interface Company {
    id?: string;
    name: string;
    email: string;
    phone: number;
    role: 'Candidate' | 'Company';
    password: string;
    isBlocked?: boolean;
    verify?: boolean;
    location?: string;
    headline?: string;
    profileImage?: string;
    savedPosts?: SavedPost[];
    followers?: Follower[];
    followingCompanies?: FollowingCompany[];
    createdOn?: Date;
  }
  
  export interface SavedPost {
    postId: string;
    addedAt?: Date;
  }
  
  export interface Follower {
    user?: string;
    company?: string;
  }
  
  export interface FollowingCompany {
    company: string;
  }
  
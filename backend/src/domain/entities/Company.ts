// backend\src\domain\entities\Company.ts
export interface Company {
  id: string;
  name: string;
  email: string;
  phone: number;
  role: 'Company';
  password: string;
  isBlocked: boolean;
  verify: boolean;
  location?: string;
  headline?: string;
  profileImage?: string;
  savedPosts?: Array<{
    postId: string;
    addedAt?: Date;
  }>;
  followers?: Array<{
    user?: string;
    company?: string;
  }>;
  followingCompanies?: Array<{
    company: string;
  }>;
  createdOn: Date;
}

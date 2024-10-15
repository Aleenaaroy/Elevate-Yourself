// backend\src\domain\entities\User.ts
export interface IEducation {
  _id?: string;
  institute: string;
  fieldOfStudy: string;
  instituteLocation: string;
}


export interface IProfession {
  _id?: string;
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
  addedAt: Date;
}

export interface ConnectionRequest {
  userId: string;
}

export interface FollowingCompany {
  company: string;
}

export interface AppliedJob {
  jobId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedAt: Date;
}

export interface User {
  id?: string; // Optional because MongoDB will automatically create this
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
  education?: IEducation[];
  profession?: IProfession[];
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

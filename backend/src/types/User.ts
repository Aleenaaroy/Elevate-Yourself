//backend\src\types\User.ts
export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: 'Candidate' | 'Company';
    resume?: string;
    connections?: Array<{ userId: string }>;
    education?: Array<IEducation>;
    profession?: Array<IProfession>;
    location?: string;
    headline?: string;
    profileImage?: string;
}

export interface IEducation {
    _id: string;
    institute: string;
    instituteLocation: string;
    fieldOfStudy: string;
}

export interface IProfession {
    _id: string;
    companyName: string;
    jobLocation: string;
    role: string;
}
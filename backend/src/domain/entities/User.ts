//backend\src\domain\entities\User.ts
export interface User {
    id?: string;
    name: string;
    email: string;
    role: 'Candidate' | 'Company';
    password: string;
    isBlocked: boolean;
    location?: string;
    headline?: string;
    skills?: string;
    profileImage?: string;
    education?: Education[];
    profession?: Profession[];
    resume?: { data: Buffer, contentType: string };
    savedPosts?: SavedPost[];
    otp?: string;
    otpExpires?: Date;
}

interface Education {
    institute: string;
    fieldOfStudy: string;
    location: string;
    from: Date;
    to: Date;
}

interface Profession {
    companyName: string;
    location: string;
    role: string;
}

interface SavedPost {
    postId: string;
    addedAt: Date;
}


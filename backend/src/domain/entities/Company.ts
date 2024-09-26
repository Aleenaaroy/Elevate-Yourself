// backend\src\domain\entities\Company.ts
export interface Company {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'Company';
    location?: string;
    industry?: string;
    profileImage?: string;
    isBlocked: boolean;
    companySize?: number;
    website?: string;
    otp?: string;
    otpExpires?: Date;
}

// backend\src\domain\repositories\CompanyRepository.ts
import { ICompanyRepository } from './ICompanyRepository';
import { CompanyModel } from '../../infrastructure/models/CompanyModel';
import { Company } from '../entities/Company';
import mongoose from 'mongoose';

export class CompanyRepository implements ICompanyRepository {
    async createCompany(company: Company): Promise<Company> {
        const createdCompany = new CompanyModel(company);
        await createdCompany.save();
        return createdCompany.toObject();
    }

    async findCompanyById(id: string): Promise<Company | null> {
        const company = await CompanyModel.findById(id).lean();
        if (company) {
            return { ...company, id: (company._id as mongoose.Types.ObjectId).toString() }; // Casting _id to string
        }
        return null;
    }

    async findCompanyByEmail(email: string): Promise<Company | null> {
        const company = await CompanyModel.findOne({ email }).lean();
        if (company) {
            return { ...company, id: (company._id as mongoose.Types.ObjectId).toString() }; // Casting _id to string
        }
        return null;
    }

    async blockCompany(companyId: string): Promise<void> {
        await CompanyModel.findByIdAndUpdate(companyId, { isBlocked: true });
    }

    async unblockCompany(companyId: string): Promise<void> {
        await CompanyModel.findByIdAndUpdate(companyId, { isBlocked: false });
    }
     async saveOtp(companyId: string, otp: string, otpExpires: Date): Promise<void> {
        console.log(`Saving OTP: ${otp}, Expires at: ${otpExpires} for user: ${companyId}`);
        await CompanyModel.findByIdAndUpdate(companyId, {
            otp: otp,
            otpExpires: otpExpires
        });
    }

     async findByOtp(otp: string): Promise<Company | null> {
        return CompanyModel.findOne({ otp });
    }
}

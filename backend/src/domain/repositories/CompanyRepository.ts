// backend\src\domain\repositories\CompanyRepository.ts
import { ICompanyRepository } from './ICompanyRepository';
import { CompanyModel } from '../../infrastructure/models/CompanyModel';
import { Company } from '../entities/Company';

export class CompanyRepository implements ICompanyRepository {
    async createCompany(company: Company): Promise<Company> {
        const createdCompany = new CompanyModel(company);
        await createdCompany.save();
        return createdCompany.toObject();
    }

    async findCompanyById(id: string): Promise<Company | null> {
        return CompanyModel.findById(id).lean();
    }

    async findCompanyByEmail(email: string): Promise<Company | null> {
        return CompanyModel.findOne({ email }).lean();
    }

    async blockCompany(companyId: string): Promise<void> {
        await CompanyModel.findByIdAndUpdate(companyId, { isBlocked: true });
    }

    async unblockCompany(companyId: string): Promise<void> {
        await CompanyModel.findByIdAndUpdate(companyId, { isBlocked: false });
    }
}

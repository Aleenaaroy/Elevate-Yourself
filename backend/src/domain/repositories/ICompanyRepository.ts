// backend\src\domain\repositories/ICompanyRepository.ts
import { Company } from '../entities/Company';

export interface ICompanyRepository {
    createCompany(company: Company): Promise<Company>;
    findCompanyById(id: string): Promise<Company | null>;
    findCompanyByEmail(email: string): Promise<Company | null>;
    blockCompany(companyId: string): Promise<void>;
    unblockCompany(companyId: string): Promise<void>;
}

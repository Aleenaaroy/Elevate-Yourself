// backend\src\domain\repositories\interfaces\ICompanyRepository.ts
import { Company } from '../../entities/Company';

export interface ICompanyRepository {
  createCompany(company: Company): Promise<Company>;
  findCompanyById(id: string): Promise<Company | null>;
  findCompanyByEmail(email: string): Promise<Company | null>;
  findCompanyByPhone(phone: number): Promise<Company | null>;
  updateCompany(id: string, company: Partial<Company>): Promise<Company | null>;
  deleteCompany(id: string): Promise<void>;
  getAllCompanies(): Promise<Company[]>;
}

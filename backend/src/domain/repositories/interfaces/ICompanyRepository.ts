// backend\src\domain\repositories\interfaces\ICompanyRepository.ts
import { Company } from '../../entities/Company';

export interface ICompanyRepository {
  findById(id: string): Promise<Company | null>;
  findByEmail(email: string): Promise<Company | null>;
  createCompany(company: Company): Promise<Company>;
  updateCompany(id: string, company: Partial<Company>): Promise<Company | null>;
  deleteCompany(id: string): Promise<boolean>;
  findByIdAndUpdate(id: string, updateData: Partial<Company>, options?: any): Promise<Company | null>;
  find(): Promise<Company[]>; 
  findAll(): Promise<Company[]>; 
}


// backend\src\domain\repositories\CompanyRepository.ts
import { ICompanyRepository } from './interfaces/ICompanyRepository';
import companyModel, { CompanyDocument } from '../../infrastructure/models/CompanyModel';
import { Company } from '../../domain/entities/Company';

export class CompanyRepository implements ICompanyRepository {
  async createCompany(company: Company): Promise<Company> {
    const createdCompany = new companyModel(company);
    await createdCompany.save();
    return this.toDomain(createdCompany);
  }

  async findCompanyById(id: string): Promise<Company | null> {
    const companyDocument = await companyModel.findById(id);
    return companyDocument ? this.toDomain(companyDocument) : null;
  }

  async findCompanyByEmail(email: string): Promise<Company | null> {
    const companyDocument = await companyModel.findOne({ email });
    return companyDocument ? this.toDomain(companyDocument) : null;
  }
  async findCompanyByPhone(phone: number): Promise<Company | null> {
    const companyDocument = await companyModel.findOne({ phone });
    return companyDocument ? this.toDomain(companyDocument) : null;
  }

  async updateCompany(id: string, company: Partial<Company>): Promise<Company | null> {
    const updatedCompany = await companyModel.findByIdAndUpdate(id, company, { new: true });
    return updatedCompany ? this.toDomain(updatedCompany) : null;
  }

  async deleteCompany(id: string): Promise<void> {
    await companyModel.findByIdAndDelete(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    const companies = await companyModel.find();
    return companies.map(company => this.toDomain(company));
  }

  private toDomain(companyDocument: CompanyDocument): Company {
    return {
      id: companyDocument._id.toString(),
      name: companyDocument.name,
      email: companyDocument.email,
      phone: companyDocument.phone,
      role: companyDocument.role,
      password: companyDocument.password,
      isBlocked: companyDocument.isBlocked,
      verify: companyDocument.verify,
      location: companyDocument.location,
      headline: companyDocument.headline,
      profileImage: companyDocument.profileImage,
      savedPosts: companyDocument.savedPosts,
      followers: companyDocument.followers,
      followingCompanies: companyDocument.followingCompanies,
      createdOn: companyDocument.createdOn
    };
  }
}
